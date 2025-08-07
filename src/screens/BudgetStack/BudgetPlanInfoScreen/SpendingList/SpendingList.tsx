import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './SpendingList.ts';
import SpendingCard from './SpendingCard/SpendingCard.tsx';
import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import { SpendingCardItem } from '../../../../store/slices/Budget.slice.ts';

interface ISpendinListProps {
  data: SpendingCardItem[];
}
function SpendingList({ data }: ISpendinListProps) {
   const sortedData = useMemo(() => 
    [...data].sort((a, b) => b.spendingMoney - a.spendingMoney), 
    [data]
  );
  const initialData = useMemo(() => sortedData.slice(0, 3), [sortedData]);
  const [filtredData, setFiltredData] = useState(initialData);
  const handleToggleData = useCallback(() => {
    setFiltredData(prev => (prev.length === 3 ? data : initialData));
  }, [data, initialData]);
  return (
    <>
      {filtredData.length !== 0 ? (
        <>
          <View>
            {filtredData.map((item, index) => {
              return <SpendingCard item={item} key={index} />;
            })}
          </View>
          <TouchableOpacity onPress={handleToggleData}>
            <Text style={styles.showHideText}>
              {filtredData.length === 3 ? 'Все категории' : 'Скрыть категории'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Нету трат</Text>
      )}
    </>
  );
}

export default React.memo(SpendingList);
