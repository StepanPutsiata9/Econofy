import { View, Text } from 'react-native';
import PageCoin from '../../../components/SvgComponents/PageCoin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetScreen.ts';
import BudgetPlan from './BudgetPlan/BudgetPlan.tsx';
import Plus from '../../../components/ui/Plus/Plus.tsx';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import { StackNavigationProp } from '@react-navigation/stack';
// import { useCallback, useEffect } from 'react';
// import { fetchAllPlans } from '../../../store/slices/Budget.slice.ts';
// import { useAppDispatch, RootState} from '../../../store/store.ts';
// import { useSelector } from 'react-redux';
// import {IBudgetPlan} from "../../../store/slices/Budget.slice.ts"
type BudgetScreenProps = {
  navigation: StackNavigationProp<BudgetStackParamList, 'BudgetScreen'>;
  route: RouteProp<BudgetStackParamList, 'BudgetScreen'>;
};
function Budget({navigation}:BudgetScreenProps) {
   useFocusEffect(() => {  
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: 'flex',
            transitionDuration: '0ms',
            animationEnabled: true,
          },
        });
    });
  const insets = useSafeAreaInsets();
  const budgetNavigate=useNavigation<NativeStackNavigationProp<BudgetStackParamList>>()
  // const refreshData = useCallback(() => {
  //   dispatch(fetchAllPlans());
  // }, [dispatch]);
  // useEffect(() => {
  //   refreshData();
  // }, [refreshData]);
  // const dispatch = useAppDispatch();
  // const {data,loading,error}=useSelector((state:RootState)=>state.budgets)
  //   const renderItem: ListRenderItem<IBudgetPlan> = ({ item }) => (
  //     <BudgetPlan item={item} />
  //   );
  const item = {
    title: 'Название плана 2',
    date: '10.06.2026',
    spentMoney: 2000,
    limitMoney: 4500,
    remainder: 2500,
    term: '3 месяца',
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
        <Text style={styles.title}>Бюджет</Text>
        <PageCoin />
      </View>
      {/* {loading && <LoadContainer />}
      {error && <ErrorMessage />} */}
        {/* {!loading && !error && (
          <FlatList
            style={[styles.budgetsView, { marginBottom: insets.bottom + 75 }]}
            data={data}
            renderItem={renderItem}
            keyExtractor={itemKey => itemKey.id}
          />
        )} */}
      
      <BudgetPlan item={item} />
      <Plus onPress={() =>{budgetNavigate.navigate('AddBudgetPlan')}} />
    </View>
  );
}

export default Budget;
