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
import React, { useState, useEffect } from 'react';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { StackNavigationProp } from '@react-navigation/stack';
import Pie from '../../../components/ui/Pie/Pie.tsx';

type AddBudgetPlanFinalScreenProps = {
  navigation: StackNavigationProp<
    BudgetStackParamList,
    'AddBudgetPlanFinalScreen'
  >;
  route: RouteProp<BudgetStackParamList, 'AddBudgetPlanFinalScreen'>;
};

const TypewriterText = ({ text = "", speed = 30, style = {}, onComplete = () => {} }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <Text style={style}>{displayedText}</Text>;
};

function AddBudgetPlanFinalScreen({
  navigation,
}: AddBudgetPlanFinalScreenProps) {
  const [currentStage, setCurrentStage] = useState<'analysis' | 'recommendations' | 'done'>('analysis');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
      setCurrentStage('analysis');
      setAnalysisComplete(false);
      
      return () => {
        setCurrentStage('done');

      };
    }, [navigation])
  );

  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

  const analysisText = `Contrary to popular belief, Lorem Ipsum is not simply random text.
It has roots in a piece of classical Latin literature from 45 BC,
making it over 2000 years old. Richard McClintock, a Latin professor
at Hampden-Sydney College in Virginia, looked up one of the more
obscure Latin words, consectetur, from a Lorem Ipsum passage, and
going through the cites of the word in classical literature,
discovered the undoubtable source. Lorem Ipsum comes from sections
1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
of Good and Evil) by Cicero, written in 45 BC.`;

  const recommendationsText = `This book is a treatise on the theory of ethics, very popular during the
Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
amet..", comes from a line in section 1.10.32. The standard chunk
of Lorem Ipsum used since the 1500s is reproduced below for those interested.`;

  const handleAnalysisComplete = () => {
    setAnalysisComplete(true);
    setCurrentStage('recommendations');
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
        <Text style={styles.title}>Создать план </Text>
        <TouchableOpacity
          // onPress={() => budgetNavigate.navigate('BudgetScreen')}
          onPress={() => budgetNavigate.popTo('BudgetScreen')}
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
          <Text style={styles.analysisText}>Анализ плана:</Text>
          {currentStage !== 'done' ? (
            <TypewriterText 
              text={analysisText} 
              speed={10} 
              style={styles.warningText}
              onComplete={handleAnalysisComplete}
            />
          ) : (
            <Text style={styles.warningText}>{analysisText}</Text>
          )}
        </View>
        
        <View style={styles.recommendationsView}>
          <Text style={styles.recommendationsText}>Рекомендации:</Text>
          {currentStage === 'recommendations' ? (
            <TypewriterText 
              text={recommendationsText} 
              speed={10} 
              style={styles.warningText}
              onComplete={() => setCurrentStage('done')}
            />
          ) : (
            <Text style={styles.warningText}>
              {currentStage === 'done' ? recommendationsText : ''}
            </Text>
          )}
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