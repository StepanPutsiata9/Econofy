import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import { styles } from './AddBudgetPlan.ts';
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
import Calendar from '../../../components/SvgComponents/Calendar.tsx';
import DatePickerModal from '../../../components/ui/CalendarModal/CalendarModal.tsx';
import {useAppDispatch } from '../../../store/store.ts';
import { setDataFromFirstAddBudgetScreen } from '../../../store/slices/Budget.slice.ts';


type AddBudgetPlanScreenProps = {
  navigation: StackNavigationProp<BudgetStackParamList, 'AddBudgetPlan'>;
  route: RouteProp<BudgetStackParamList, 'AddBudgetPlan'>;
};

function AddBudgetPlanScreen({ navigation }: AddBudgetPlanScreenProps) {
  useFocusEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
    console.log(navigation.getParent());
  });
  const dispatch=useAppDispatch();
  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();
 
  const [budgetName, setBudgetName] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [date, setDate] = useState('');
  const [safeSumm, setSafeSumm] = useState<string>('');

  const [titleError, setTitleError] = useState<string>('');
  const [salaryError, setSalaryError] = useState<string>('');
  const [safeSummError, setSafeSummError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const [isVisible, setIsVisible] = useState(false);
  const handleChangeSalary = (value: string) => {
    if (/^\d*[,.]?\d{0,2}$/.test(value) || value === '') {
      const normalizedValue = value.replace(',', '.');
      setSalary(normalizedValue);
    }
  };
  const handleChangeSafeSumm = (value: string) => {
    if (
      /^(?!0\d|60\.01|\d{3}|6[1-9]|[7-9]\d)(\d{1,2}([,.]\d{0,2})?|60(?!\d)|0?([,.]\d{0,2})?)$/.test(
        value,
      ) ||
      value === ''
    ) {
      const normalizedValue = value.replace(',', '.');
      setSafeSumm(normalizedValue);
    }
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (titleError || salaryError || dateError || safeSummError) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [fadeAnim, salaryError, dateError, titleError, safeSummError]);
  const checkError = (
    title: string,
    dateCompleted: string,
    allMoney: number,
    safeSummText: number,
  ) => {
    let result = true;
    if (title.length === 0) {
      setTitleError('Задайте название плана');
      setBudgetName('');
      result = false;
    }
    if (dateCompleted.length === 0) {
      setDateError('Задайте дату выполнения');
      setDate('');
      result = false;
    }
    if (!allMoney) {
      setSalaryError('Задайте уровень дохода');
      setSalary('');
      result = false;
    }
    if (!safeSummText) {
      setSafeSummError('Задайте процент накопления');
      setSalary('');
      result = false;
    }

    if (dateCompleted.length !== 0 && !isValidDate(dateCompleted)) {
      setDateError('Неправильный формат даты');
      setDate('');
      result = false;
    }

    return result || false;
  };

  const setSalaryInput = (text: string) => {
    if (text.length === 1) {
      setSalaryError('');
    }
    handleChangeSalary(text);
  };
  const setSafeSummInput = (text: string) => {
    if (text.length === 1) {
      setSafeSummError('');
    }
    handleChangeSafeSumm(text);
  };
  const setDateInput = (text: string) => {
    if (text.length !== 0) {
      setDateError('');
    }
    setDate(text);
  };
  const setBudgetInput = (text: string) => {
    if (text.length === 1) {
      setTitleError('');
    }
    setBudgetName(text);
  };

  function isValidDate(dateStr: string): boolean {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) return false;

    const [day, month, year] = dateStr.split('.').map(Number);
    const nowDate = new Date(year, month - 1, day);
    return (
      nowDate.getFullYear() === year &&
      nowDate.getMonth() === month - 1 &&
      nowDate.getDate() === day
    );
  }
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
        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>Название:</Text>
          <TextInput
            value={budgetName}
            placeholder="Мой план"
            style={[styles.input, titleError && styles.errorInput]}
            onChangeText={setBudgetInput}
            placeholderTextColor="#fff"
          />
          {titleError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{titleError}</Text>
            </Animated.View>
          ) : null}
        </View>

        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>Уровень месячного дохода:</Text>
          <TextInput
            value={salary}
            placeholder="1500-2500"
            style={[styles.input, salaryError && styles.errorInput]}
            onChangeText={setSalaryInput}
            placeholderTextColor="#fff"
          />
          {salaryError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{salaryError}</Text>
            </Animated.View>
          ) : null}
        </View>

        <View style={styles.infoView}>
          <Text style={styles.budgetNameText}>Процент накопления:</Text>
          <TextInput
            value={safeSumm}
            placeholder="0-60"
            style={[styles.input, safeSummError && styles.errorInput]}
            onChangeText={setSafeSummInput}
            placeholderTextColor="#fff"
          />
          {safeSummError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{safeSummError}</Text>
            </Animated.View>
          ) : null}
        </View>
        <View style={styles.dateView}>
          <Text style={styles.budgetNameText}>Срок:</Text>
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
          onClick={() => {
            if (!checkError(budgetName, date, Number(salary), Number(safeSumm))) {
              
              return;
            }
            const numSalary=Number(salary);
            const numSafeSumm=Number(safeSumm);
            dispatch(setDataFromFirstAddBudgetScreen({budgetName, date,numSalary,numSafeSumm}))
            budgetNavigate.navigate('AddBudgetPlanSecondScreen');
          }}
          title="Далее"
        />
        <DatePickerModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          selectedDate={date}
          setSelectedDate={setDateInput}
        />
      </ScrollView>
    </View>
  );
}

export default AddBudgetPlanScreen;
