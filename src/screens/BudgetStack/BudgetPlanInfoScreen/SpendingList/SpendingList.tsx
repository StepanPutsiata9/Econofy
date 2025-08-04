import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './SpendingList.ts';
import SpendingCard from './SpendingCard/SpendingCard.tsx';
import { useCallback, useMemo, useState } from 'react';
import React from 'react';
const DATA = [
  {
    title: 'Продукты',
    spendingCount: '22',
    spendingMoney: 506.7,
    logo: 'STORE',
  },
  {
    title: 'Косметика',
    spendingCount: '1',
    spendingMoney: 150.7,
    logo: 'COSMETICS',
  },
  {
    title: 'ЖКХ',
    spendingCount: '12',
    spendingMoney: 100.7,
    logo: 'HOUSING_AND_COMMUNAL_SERVICES',
  },
  {
    title: 'Интернет/Соединение',
    spendingCount: '8',
    spendingMoney: 67.7,
    logo: 'INTERNET',
  },
  {
    title: 'Интернет/Соединение',
    spendingCount: '8',
    spendingMoney: 67.7,
    logo: 'INTERNET',
  },
  {
    title: 'Интернет/Соединение',
    spendingCount: '8',
    spendingMoney: 67.7,
    logo: 'INTERNET',
  },
  {
    title: 'Интернет/Соединение',
    spendingCount: '8',
    spendingMoney: 67.7,
    logo: 'INTERNET',
  },
  {
    title: 'Интернет/Соединение',
    spendingCount: '8',
    spendingMoney: 67.7,
    logo: 'INTERNET',
  },
];
function SpendingList() {
  const initialData = useMemo(() => DATA.slice(0, 3), []);
  const [filtredData, setFiltredData] = useState(initialData);
    const handleToggleData = useCallback(() => {
    setFiltredData(prev => prev.length === 3 ? DATA : initialData);
  }, [initialData]);
  return (
    <>
      <View>
        {filtredData.map((item, index) => {
          return <SpendingCard item={item} key={index} />;
        })}
      </View>
      <TouchableOpacity
        onPress={handleToggleData}
      >
        <Text style={styles.showHideText}>
          {filtredData.length === 3 ? 'Все категории' : 'Скрыть категории'}
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default React.memo(SpendingList);
