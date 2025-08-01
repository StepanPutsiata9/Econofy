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
        
      )} */}

      <Plus onPress={() =>{budgetNavigate.navigate('AddBudgetPlan')}} />
      <BudgetPlan item={item} />
    </View>
  );
}

export default Budget;
