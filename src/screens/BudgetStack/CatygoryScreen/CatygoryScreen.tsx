import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { styles } from './CatygoryScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cross from '../../../components/SvgComponents/Cross.tsx';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import React, { useMemo } from 'react';
import { IExpenses } from '../../../store/slices/Budget.slice.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { LoadContainer } from '../../LoadScreen/LoadScreen.tsx';
import ErrorMessage from '../../../components/ui/ErrorMessage/ErrorMessage.tsx';

type TOneSpendingProps = {
  item: IExpenses;
};
type ScreenParams = {
  allSpending: number;
};

function SpendingInfo() {
  const insets = useSafeAreaInsets();
  const { spendingError, spendingInfo, spendingLoading } = useSelector(
    (state: RootState) => state.budgets,
  );
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

  const route =
    useRoute<RouteProp<{ ScreenName: ScreenParams }, 'ScreenName'>>();
  const { allSpending } = route.params;
  const renderItem: ListRenderItem<IExpenses> = ({ item }) => (
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
      {spendingLoading && <LoadContainer />}
      {spendingError && <ErrorMessage />}
      {!spendingLoading && !spendingError && (
        <>
          <View style={styles.titleView}>
            <Text style={styles.title}>{spendingInfo!.category}</Text>
            <TouchableOpacity onPress={() => budgetNavigate.goBack()}>
              <Cross />
            </TouchableOpacity>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.spendingText}>
              Общие затраты: <Text style={styles.greenText}>{allSpending}</Text>
            </Text>
          </View>
          <View style={styles.spendView}>
            <Text style={styles.spendingText}>
              Всего трат:{' '}
              <Text style={styles.greenText}>
                {spendingInfo?.expenses.length}
              </Text>
            </Text>
          </View>
          <FlatList
            data={spendingInfo!.expenses}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </View>
  );
}

function OneSpending({ item }: TOneSpendingProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}`;
  };
  const time = useMemo(() => {
    return formatDate(item.createdAt.slice(0, 10));
  }, [item.createdAt]);
  return (
    <View style={styles.containerView}>
      <View style={styles.titleAndDate}>
        <Text style={styles.dateText}>{time}</Text>
        <Text style={styles.titleText}>{item.category}</Text>
      </View>
      <Text style={styles.spendText}>{item.expense}</Text>
    </View>
  );
}

export default SpendingInfo;
