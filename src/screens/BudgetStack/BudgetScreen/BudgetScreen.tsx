import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import PageCoin from '../../../components/SvgComponents/PageCoin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetScreen.ts';
import BudgetPlan from './BudgetPlan/BudgetPlan.tsx';
import Plus from '../../../components/ui/Plus/Plus.tsx';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { fetchAllPlans } from '../../../store/slices/Budget.slice.ts';
import { useAppDispatch, RootState } from '../../../store/store.ts';
import { useSelector } from 'react-redux';
import { IBudgetPlan } from '../../../store/slices/Budget.slice.ts';
import { LoadContainer } from '../../LoadScreen/LoadScreen.tsx';
import ErrorMessage from '../../../components/ui/ErrorMessage/ErrorMessage.tsx';
import React from 'react';
import BackendError from '../../../components/ui/BackendErrorModal/BackendError.tsx';
type BudgetScreenProps = {
  navigation: StackNavigationProp<BudgetStackParamList, 'BudgetScreen'>;
  route: RouteProp<BudgetStackParamList, 'BudgetScreen'>;
};

const renderItem: ListRenderItem<IBudgetPlan> = ({ item }) => (
  <BudgetPlan item={item} />
);
function Budget({ navigation }: BudgetScreenProps) {
  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.budgets,
  );

  const refreshData = useCallback(() => {

    console.log('refreshed data');
    setRefreshing(true)
    dispatch(fetchAllPlans());
    setRefreshing(false)
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          transitionDuration: '0ms',
          animationEnabled: true,
        },
      });
      return () => {};
    }, [navigation]),
  );

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  useEffect(() => {
    setErrorModalVisible(!!error);
  }, [error]);
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <>
      <BackendError
        errorModalVisible={errorModalVisible}
        setErrorModalVisible={setErrorModalVisible}
        onPress={refreshData}
      />
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
          <Text style={styles.title}>Бюджет</Text>
          <PageCoin />
        </View>
        {loading && <LoadContainer />}
        {error && <ErrorMessage />}
        {!loading &&
          !error &&
          (data?.length !== 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refreshData} 
                tintColor={"#5BFF6F"} colors={["#5BFF6F"]}/>
              }
              style={[styles.budgetsView, { marginBottom: insets.bottom + 75 }]}
              data={data}
              renderItem={renderItem}
              keyExtractor={itemKey => itemKey.id}
            />
          ) : (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Созданных планов пока нет</Text>
            </View>
          ))}
        <Plus
          onPress={() => {
            budgetNavigate.navigate('AddBudgetPlan');
          }}
        />
      </View>
    </>
  );
}

export default React.memo(Budget);
