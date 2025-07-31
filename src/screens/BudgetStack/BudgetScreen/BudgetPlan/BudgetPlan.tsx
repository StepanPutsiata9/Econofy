import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './BudgetPlan';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { useMemo, useState } from 'react';
import AddSpendingModal from "./AddSpendingModal/AddSpendingModal.tsx"
interface IBudgetPlanItem {
  title: string;
  date: string;
  spentMoney: number;
  limitMoney: number;
  remainder: number;
  term:string;
}
interface IBudgetPlanProps{
    item:IBudgetPlanItem
}
function BudgetPlan({item}: IBudgetPlanProps) {
  const progress = item.remainder/item.limitMoney;
  const colorProgressBar: string = useMemo((): string => {
    if (progress <= 1 && progress >= 0.6) {
      return '#5BFF6F';
    } else if (progress < 0.6 && progress >= 0.3) {
      return '#FFE15B';
    } else if (progress < 0.3 && progress >= 0) {
      return '#FF1B44';
    }
    return '';
  }, [progress]);
  const [addModalVisible,setAddModalVisible]=useState<boolean>(false);
  return (
    <>
    <AddSpendingModal addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible}/>
    <View style={styles.budgetPlan}>
      <View style={styles.titleLine}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.infoView}>
        <View style={styles.moneyCountView}>
          <Text style={styles.countText}>
            Потрачено: <Text style={styles.countNumber}> {item.spentMoney}</Text>
          </Text>
          <Text style={styles.countText}>
            Лимит: <Text style={styles.countNumber}> {item.limitMoney}</Text>
          </Text>
          <Text style={styles.countText}>
            Остаток: <Text style={styles.countNumber}> {item.remainder}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.termText}>Срок: {item.term}</Text>
        </View>
      </View>
      <View style={styles.progressView}>
        <ProgressBar
          progress={progress}
          width={null}
          height={3}
          color={colorProgressBar}
          unfilledColor="#B2B2B2"
          borderWidth={0}
          borderRadius={4}
          animated={true}
          animationType="spring"
          animationConfig={{
            tension: 20,
            friction: 3,
            duration: 500,
          }}
        />
      </View>
      <View style={styles.addConsumption}>
        <TouchableOpacity onPress={() => {setAddModalVisible(true)}}>
          <Text style={styles.addConsumptionText}>Добавить расход+</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>

  );
}

export default BudgetPlan;
