import { View, Text, TouchableOpacity, TextInput } from 'react-native';
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
import React, { useState } from 'react';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { StackNavigationProp } from '@react-navigation/stack';
import Calendar from '../../../components/SvgComponents/Calendar.tsx';
import DatePicker from 'react-native-date-picker';
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
  const homeNavigate =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [goalName, setGoalName] = useState<string>('');
  const [summ, setSumm] = useState<string>('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const handleChangeSumm = (value: string) => {
    if (/^\d*[,.]?\d{0,2}$/.test(value) || value === '') {
      const normalizedValue = value.replace(',', '.');
      setSumm(normalizedValue);
    }
  };
//   function isValidDate(dateStr: string): boolean {
//     if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) return false;

//     const [day, month, year] = dateStr.split('.').map(Number);
//     const date = new Date(year, month - 1, day);
//     return (
//       date.getFullYear() === year &&
//       date.getMonth() === month - 1 &&
//       date.getDate() === day
//     );
//   }
//   const handleChangeDate = (value: string) => {
//     if (isValidDate(value) || value === '') {
//       const normalizedValue = value.replace(',', '.');
//       setDate(normalizedValue);
//     }
//   };
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
          style={styles.input}
          onChangeText={setGoalName}
          placeholderTextColor="#fff"
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.goalNameText}>Сумма:</Text>
        <TextInput
          value={summ}
          placeholder="5000"
          style={styles.input}
          onChangeText={handleChangeSumm}
          placeholderTextColor="#fff"
        />
      </View>

      <View style={styles.dateView}>
        <Text style={styles.goalNameText}>Дата выполнения:</Text>
        <TextInput
          value={date}
          placeholder="01.01.2025"
          style={styles.input}
          onChangeText={setDate}
          placeholderTextColor="#fff"
        />
        <View style={styles.calendar}>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
          >
            <Calendar />
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={new Date()}
          onConfirm={dateConf => {
            setOpen(false);
            console.log(dateConf);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>

      <MainButton onClick={() => {}} title="Создать цель" />
    </View>
  );
}

export default AddGoalScreen;
