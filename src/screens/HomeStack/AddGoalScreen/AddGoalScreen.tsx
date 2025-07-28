import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { styles } from './AddGoalScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cross from '../../../components/SvgComponents/Cross.tsx';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../types/navigation.types.ts';
import React, { useEffect, useRef, useState } from 'react';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { StackNavigationProp } from '@react-navigation/stack';
import Calendar from '../../../components/SvgComponents/Calendar.tsx';
import { useAppDispatch } from '../../../store/store.ts';
import { createNewGaol } from '../../../store/slices/Home.slice.ts';
import DatePickerModal from './CalendarModal.tsx';
type AddGoalScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'AddGoalScreen'>;
  route: RouteProp<HomeStackParamList, 'AddGoalScreen'>;
};

function AddGoalScreen({ navigation }: AddGoalScreenProps) {
  useFocusEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          transitionDuration: '0ms',
          animationEnabled: true,
        },
      });
    };
  });

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const homeNavigate =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [goalName, setGoalName] = useState<string>('');
  const [summ, setSumm] = useState<string>('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState<string>('');
  const [moneyError, setMoneyError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const [isVisible, setIsVisible] = useState(false);
  const handleChangeSumm = (value: string) => {
    if (/^\d*[,.]?\d{0,2}$/.test(value) || value === '') {
      const normalizedValue = value.replace(',', '.');
      setSumm(normalizedValue);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (titleError || moneyError || dateError) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [fadeAnim, titleError, moneyError, dateError]);
  const checkError = (
    title: string,
    dateCompleted: string,
    allMoney: number,
  ) => {
    let result = true;
    if (title.length === 0) {
      setTitleError('Задайте название цели');
      setGoalName('');
      result = false;
    }
    if (dateCompleted.length === 0) {
      setDateError('Задайте дату выполнения');
      setDate('');
      result = false;
    }
    if (!allMoney) {
      setMoneyError('Задайте сумму накопления');
      setSumm('');
      result = false;
    }

    if (dateCompleted.length !== 0 && !isValidDate(dateCompleted)) {
      setDateError('Неправильный формат даты');
      setDate('');
      result = false;
    }

    return result || false;
  };

  const setSummInput = (text: string) => {
    if (text.length === 1) {
      setMoneyError('');
    }
    handleChangeSumm(text);
  };
  const setDateInput = (text: string) => {
    if (text.length === 1) {
      setDateError('');
    }
    setDate(text);
  };
  const setTitleInput = (text: string) => {
    if (text.length === 1) {
      setTitleError('');
    }
    setGoalName(text);
  };

  function isValidDate(dateStr: string): boolean {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) return false;

    const [day, month, year] = dateStr.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }
  const createGoal = (title: string, date: string, summ: number) => {
    if (!checkError(title, date, summ)) {
      return;
    }
    homeNavigate.goBack();
    async function postGoal() {
      await dispatch(createNewGaol({ title, date, allMoney: summ }));
    }
    postGoal();
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
        <Text style={styles.title}>Создать цель</Text>
        <TouchableOpacity onPress={() => homeNavigate.goBack()}>
          <Cross />
        </TouchableOpacity>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.goalNameText}>Название:</Text>
        <TextInput
          value={goalName}
          placeholder="Моя цель"
          style={[styles.input, titleError && styles.errorInput]}
          onChangeText={setTitleInput}
          placeholderTextColor="#fff"
        />
        {titleError ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.errorText}>{titleError}</Text>
          </Animated.View>
        ) : null}
      </View>

      <View style={styles.infoView}>
        <Text style={styles.goalNameText}>Сумма:</Text>
        <TextInput
          value={summ}
          placeholder="5000"
          style={[styles.input, moneyError && styles.errorInput]}
          onChangeText={setSummInput}
          placeholderTextColor="#fff"
        />
        {moneyError ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.errorText}>{moneyError}</Text>
          </Animated.View>
        ) : null}
      </View>

      <View style={styles.dateView}>
        <Text style={styles.goalNameText}>Дата выполнения:</Text>
        <TextInput
          value={date}
          placeholder="01.01.2025"
          style={[styles.input, dateError && styles.errorInput]}
          onChangeText={setDateInput}
          placeholderTextColor="#fff"
        />
        {dateError ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.errorText}>{dateError}</Text>
          </Animated.View>
        ) : null}
        <View style={styles.calendar}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
          >
            <Calendar color={dateError ? '#FF1B44' : '#5BFF6F'} />
          </TouchableOpacity>
        </View>
      </View>
      <MainButton
        onClick={() => createGoal(goalName, date, Number(summ))}
        title="Создать цель"
      />
      <DatePickerModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        selectedDate={date}
        setSelectedDate={setDate}
      />
    </View>
  );
}

export default AddGoalScreen;
