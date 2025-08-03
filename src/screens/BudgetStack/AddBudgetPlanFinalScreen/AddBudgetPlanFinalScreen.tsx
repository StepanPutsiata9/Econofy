import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './AddBudgetPlanFinalScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cross from '../../../components/SvgComponents/Cross.tsx';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import React from 'react';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { StackNavigationProp } from '@react-navigation/stack';

type AddBudgetPlanFinalScreenProps = {
  navigation: StackNavigationProp<
    BudgetStackParamList,
    'AddBudgetPlanFinalScreen'
  >;
  route: RouteProp<BudgetStackParamList, 'AddBudgetPlanFinalScreen'>;
};

function AddBudgetPlanFinalScreen({
  navigation,
}: AddBudgetPlanFinalScreenProps) {
  useFocusEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
  });

  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

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
        <Text style={styles.title}>Создать план </Text>
        <TouchableOpacity
          onPress={() => budgetNavigate.navigate('BudgetScreen')}
        >
          <Cross />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.distributionView}>
          <Text style={styles.distributionText}>Распределение бюджета:</Text>
        </View>
        <View style={styles.analysisView}>
          <Text style={styles.analysisText}>Анализ плана:</Text>
        </View>
        <View style={styles.recommendationsView}>
          <Text style={styles.recommendationsText}>Рекомендации:</Text>
        </View>
        <View style={styles.warningView}>
          <Text style={styles.warningText}>
            <Text style={styles.greenText}>*</Text>Данный план был создан с
            помощью ИИ. Возможны ошибки.
          </Text>
        </View>

        <View style={styles.btnView}>
          <MainButton onClick={() => {}} title="Создать" />
        </View>
        <View style={styles.goBack}>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => budgetNavigate.goBack()}
          >
            <Text style={styles.goBackText}>Вернуться назад</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddBudgetPlanFinalScreen;
