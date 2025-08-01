import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import { styles } from './AddBudgetPlanSecondScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cross from '../../../components/SvgComponents/Cross.tsx';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import React, { useEffect, useRef, useState } from 'react';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { StackNavigationProp } from '@react-navigation/stack';

type AddBudgetPlanSecondScreenProps = {
  navigation: StackNavigationProp<
    BudgetStackParamList,
    'AddBudgetPlanSecondScreen'
  >;
  route: RouteProp<BudgetStackParamList, 'AddBudgetPlanSecondScreen'>;
};

function AddBudgetPlanSecondScreen({
  navigation,
}: AddBudgetPlanSecondScreenProps) {
  useFocusEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
  });

  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

  const [roomCount, setRoomCount] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<string>('');
  const [transferCount, setTransferCount] = useState<string>('');
  const [credits, setCredits] = useState<string>('');
  const [hobbys, setHobbys] = useState<string>('');
  const [extraSpending, setExtraSpending] = useState<string>('');
  const [roomError, setRoomError] = useState<string>('');
  const [peopleError, setPeopleError] = useState<string>('');
  const [transferError, setTransferError] = useState<string>('');
  const [creditsError, setCreditsError] = useState<string>('');
  const [hobbysError, setHobbysError] = useState<string>('');


  const handleChange1To15 = (value: string) => {
    if (/^([1-9]|1[0-5])?$/.test(value) || value === '') {
      setRoomCount(value);
    }
  };
  const handleChange1To10 = (value: string) => {
    if (/^([1-9]|10)?$/.test(value) || value === '') {
      setPeopleCount(value);
    }
  };
  const handleChange0To20 = (value: string) => {
    if (/^([0-9]|1[0-9]|20)?$/.test(value) || value === '') {
      setTransferCount(value);
    }
  };
  const handleChange = (value: string,setValue:(str:string)=>void) => {

  if (/^\d*[,.]?\d{0,2}$/.test(value) || value === "") {
    const normalizedValue = value.replace(',', '.');
    setValue(normalizedValue);
  }
};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (roomError || peopleError || transferError || creditsError || hobbysError) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [fadeAnim, roomError, peopleError, transferError, creditsError, hobbysError]);
  const checkError = (
    room: string,
    people:string,
    transfer:string,
    creditsStr:string,
    hobbysStr:string,
  ) => {
    let result = true;
    if (room.length === 0) {
      setRoomError('Задайте количество комант');
      setRoomCount('');
      result = false;
    }
    if (people.length === 0) {
      setPeopleError('Задайте количество членов семьи');
      setPeopleCount('');
      result = false;
    }
    if (transfer.length === 0) {
      setTransferError('Задайте количество поездок');
      setTransferCount('');
      result = false;
    }
    if (creditsStr.length === 0) {
      setCreditsError('Задайте сумму списания по кредиту');
      setCredits('');
      result = false;
    }
    if (hobbysStr.length === 0) {
      setHobbysError('Задайте стоимость хобби');
      setHobbys('');
      result = false;
    }
    return result || false;
  };

  const setRoomsInput = (text: string) => {
    if (text.length === 1) {
      setRoomError('');
    }
    handleChange1To15(text);
  };
  const setPeopleInput = (text: string) => {
    if (text.length === 1) {
      setPeopleError('');
    }
    handleChange1To10(text);
  };
  const setHobbysInput = (text: string) => {
    if (text.length === 1) {
      setHobbysError('');
    }
   handleChange(text,setHobbys);
  };
  const setCreditsInput = (text: string) => {
    if (text.length === 1) {
      setCreditsError('');
    }
   handleChange(text,setCredits);
  };
  const setTransferInput = (text:string) => {
    if (text.length === 1) {
      setTransferError('');
    }
    handleChange0To20(text);
  }
  const setExtraSpendingInput = (text: string) => {
    setExtraSpending(text);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.titleView}>
        <Text style={styles.title}>Создать план</Text>
        <TouchableOpacity onPress={() => budgetNavigate.goBack()}>
          <Cross />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.titleInfoView}>
          <Text style={styles.titleInfoText}>
            Эти данные необходимы для создания{' '}
            <Text style={styles.greenText}>подробного</Text> плана
            бюджетирования
          </Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>
            Количество комнат в квартире:
          </Text>
          <TextInput
            value={roomCount}
            placeholder="1-15"
            style={[styles.input, roomError && styles.errorInput]}
            onChangeText={setRoomsInput}
            placeholderTextColor="#fff"
          />
          {roomError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{roomError}</Text>
            </Animated.View>
          ) : null}
        </View>

        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>Количество членов семьи:</Text>
          <TextInput
            value={peopleCount}
            placeholder="1-10"
            style={[styles.input, peopleError && styles.errorInput]}
            onChangeText={setPeopleInput}
            placeholderTextColor="#fff"
          />
          {peopleError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{peopleError}</Text>
            </Animated.View>
          ) : null}
        </View>

        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>
            Количество поездок на общ. транспорте в день (на семью):
          </Text>
          <TextInput
            value={transferCount}
            placeholder="0-20"
            style={[styles.input, transferError && styles.errorInput]}
            onChangeText={setTransferInput}
            placeholderTextColor="#fff"
          />
          {transferError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{transferError}</Text>
            </Animated.View>
          ) : null}
        </View>
        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>Кредиты (в месяц):</Text>
          <TextInput
            value={credits}
            placeholder="600"
            style={[styles.input, creditsError && styles.errorInput]}
            onChangeText={setCreditsInput}
            placeholderTextColor="#fff"
          />
          {creditsError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{creditsError}</Text>
            </Animated.View>
          ) : null}
        </View>
        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>Хобби (в месяц):</Text>
          <TextInput
            value={hobbys}
            placeholder="125"
            style={[styles.input, hobbysError && styles.errorInput]}
            onChangeText={setHobbysInput}
            placeholderTextColor="#fff"
          />
          {hobbysError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{hobbysError}</Text>
            </Animated.View>
          ) : null}
        </View>
        <View style={styles.extraView}>
          <Text style={styles.budgetNameText}>
            Дополнительные расходы (в месяц):
          </Text>
          <TextInput
            value={extraSpending}
            placeholder="Доп. траты..."
            multiline={true}
            scrollEnabled={true}
            style={styles.extraInput}
            onChangeText={setExtraSpendingInput}
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.btnView}>
          <MainButton
            onClick={() => {
              if (!checkError(roomCount,peopleCount,transferCount,credits,hobbys)) {
                return;
              }
            }}
            title="Далее"
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default AddBudgetPlanSecondScreen;
