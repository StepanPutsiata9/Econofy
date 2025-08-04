import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { styles } from './BudgetPlanInfoScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cross from '../../../components/SvgComponents/Cross.tsx';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetStackParamList } from '../../../types/navigation.types.ts';
import React, { useState, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import SpendingList from "./SpendingList/SpendingList.tsx"
import Arrow from '../../../components/SvgComponents/Arrow.tsx';
import Pie from '../../../components/ui/Pie/Pie.tsx';

type BudgetPlanInfoScreenProps = {
  navigation: StackNavigationProp<BudgetStackParamList, 'BudgetPlanInfoScreen'>;
  route: RouteProp<BudgetStackParamList, 'BudgetPlanInfoScreen'>;
};

function BudgetPlanInfoScreen({ navigation }: BudgetPlanInfoScreenProps) {
  useFocusEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
  });

  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

  const [analysisExpanded, setAnalysisExpanded] = useState(false);
  const [recommendationsExpanded, setRecommendationsExpanded] = useState(false);

  const analysisSpinValue = useRef(new Animated.Value(0)).current;
  const recommendationsSpinValue = useRef(new Animated.Value(0)).current;
  const fadeAnimAnalysis = useRef(new Animated.Value(0)).current;
  const fadeAnimRecommendations = useRef(new Animated.Value(0)).current;
  const spinArrow = (
    spinValue: Animated.Value,
    text: Animated.Value,
    expanded: boolean,
  ) => {
    Animated.timing(spinValue, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(text, {
      toValue: expanded ? 1 : 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const analysisRotate = analysisSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const recommendationsRotate = recommendationsSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const toggleAnalysis = () => {
    const newValue = !analysisExpanded;
    setAnalysisExpanded(newValue);
    spinArrow(analysisSpinValue, fadeAnimAnalysis, newValue);
  };

  const toggleRecommendations = () => {
    const newValue = !recommendationsExpanded;
    setRecommendationsExpanded(newValue);
    spinArrow(recommendationsSpinValue, fadeAnimRecommendations, newValue);
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
        <Text style={styles.title}>План </Text>
        <TouchableOpacity
          onPress={() => budgetNavigate.navigate('BudgetScreen')}
        >
          <Cross />
        </TouchableOpacity>
      </View>
      <ScrollView>

        <View style={styles.distributionView}>
          <Text style={styles.distributionText}>Распределение бюджета:</Text>
          <Pie/>
        </View>

        <View style={styles.analysisView}>
          <Text style={styles.analysisText}>Анализ плана</Text>
          <TouchableOpacity onPress={toggleAnalysis}>
            <Animated.View style={{ transform: [{ rotate: analysisRotate }] }}>
              <Arrow color={'#fff'} />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.contentView,
            {
              opacity: fadeAnimAnalysis,
              display: analysisExpanded ? 'flex' : 'none',
            },
          ]}
        >
          <Text style={styles.contentText}>
            Здесь будет текст анализа вашего плана... Contrary to popular
            belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock, a Latin professor at Hampden-Sydney
            College in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC.
          </Text>
        </Animated.View>

        <View style={styles.recommendationsView}>
          <Text style={styles.recommendationsText}>Рекомендации</Text>
          <TouchableOpacity onPress={toggleRecommendations}>
            <Animated.View
              style={{ transform: [{ rotate: recommendationsRotate }] }}
            >
              <Arrow color={'#fff'} />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.contentView,
            {
              opacity: fadeAnimRecommendations,
              display: recommendationsExpanded ? 'flex' : 'none',
            },
          ]}
        >
          <Text style={styles.contentText}>
            Здесь будут рекомендации по вашему бюджету... Contrary to popular
            belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock, a Latin professor at Hampden-Sydney
            College in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC.
          </Text>
        </Animated.View>

        <View style={styles.warningView}>
          <Text style={styles.warningText}>
            <Text style={styles.greenText}>*</Text>Данный план был создан с
            помощью ИИ. Возможны ошибки.
          </Text>
        </View>

        <View style={styles.spendingGraf}>
          <Text style={styles.spendingText}>График расходов:</Text>
          <SpendingList/>
        </View>
      </ScrollView>
    </View>
  );
}

export default BudgetPlanInfoScreen;
