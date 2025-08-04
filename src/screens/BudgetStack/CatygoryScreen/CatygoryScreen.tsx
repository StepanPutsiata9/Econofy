import { View, Text, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import { styles } from './CatygoryScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cross from '../../../components/SvgComponents/Cross.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import React from 'react';

type OneSpendingItem = {
  title: string;
  date: string;
  spend: string;
};
type OneSpendingProps = {
  item: OneSpendingItem;
};
function AddBudgetPlanScreen() {
  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();
  const date = [
    { title: 'Продукты', date: '02.08', spend: '100' },
    { title: 'Продукты', date: '03.08', spend: '150' },
    { title: 'Продукты', date: '04.08', spend: '105' },
    { title: 'Продукты', date: '05.08', spend: '95' },
  ] as OneSpendingItem[];
  const renderItem: ListRenderItem<OneSpendingItem> = ({ item }) => (
    <OneSpending item={item} />
  );
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
        <Text style={styles.title}>Продукты</Text>
        <TouchableOpacity onPress={() => budgetNavigate.goBack()}>
          <Cross />
        </TouchableOpacity>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.monthText}>Август</Text>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.spendingText}>
          Общие затраты: <Text style={styles.greenText}>938.00</Text>
        </Text>
      </View>
      <View style={styles.spendView}>
        <Text style={styles.spendingText}>
          Всего трат: <Text style={styles.greenText}>12</Text>
        </Text>
      </View>
      <FlatList
        data={date}
        renderItem={renderItem}
        keyExtractor={item => item.date}
      />
    </View>
  );
}

function OneSpending({ item }: OneSpendingProps) {
  console.log(item);

  return (
    <View style={styles.containerView}>
      <View style={styles.titleAndDate}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
      </View>
      <Text style={styles.spendText}>{item.spend}</Text>
    </View>
  );
}

export default AddBudgetPlanScreen;
