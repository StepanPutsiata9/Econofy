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
import { useSelector } from 'react-redux';
import { RootState,
  //  useAppDispatch 
  } from '../../../store/store.ts';
import { LoadContainer } from '../../LoadScreen/LoadScreen.tsx';
import ErrorMessage from '../../../components/ui/ErrorMessage/ErrorMessage.tsx';

type AddBudgetPlanFinalScreenProps = {
  navigation: StackNavigationProp<
    BudgetStackParamList,
    'AddBudgetPlanFinalScreen'
  >;
  route: RouteProp<BudgetStackParamList, 'AddBudgetPlanFinalScreen'>;
};

const TypewriterText = ({
  text = '',
  speed = 30,
  style = {},
  onComplete = () => {},
}) => {
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
  const [currentStage, setCurrentStage] = useState<
    'circle' | 'analysis' | 'recommendations' | 'done'
  >('circle');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [circleCompleted, setCircleCompleted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { creatingData, creatingLoading, creatingError } = useSelector(
    (state: RootState) => state.budgets,
  );
  // const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { height: 0 } });
      setCurrentStage('circle');
      setAnalysisComplete(false);
      return () => {
        setCurrentStage('done');
      };
    }, [navigation]),
  );

  const insets = useSafeAreaInsets();
  const budgetNavigate =
    useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

  const recommendationsText = creatingData?.recommendations
    .map((item, index) => ` ${index + 1}.${item}`)
    .join('\n');

  const handleCircleComplete = () => {
    setCircleCompleted(true);
    setCurrentStage('analysis');
  };
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
        <TouchableOpacity onPress={() => budgetNavigate.popTo('BudgetScreen')}>
          <Cross />
        </TouchableOpacity>
      </View>
      {creatingLoading && <LoadContainer />}
      {creatingError && <ErrorMessage />}
      {!creatingLoading && !creatingError && (
        <ScrollView>
          <View style={styles.distributionView}>
            <Text style={styles.distributionText}>Распределение бюджета:</Text>
            <Pie
              data={creatingData!.budgetPlan}
              handleCircleComplete={handleCircleComplete}
              shouldAnimated={true}
            />
          </View>
          {currentStage !== 'circle' && (
            <View style={styles.analysisView}>
              <Text style={styles.analysisText}>Анализ плана:</Text>
              {(currentStage === 'analysis' && (
                <TypewriterText
                  text={creatingData?.analysis}
                  speed={10}
                  style={styles.warningText}
                  onComplete={handleAnalysisComplete}
                />
              )) ||
                ((currentStage === 'recommendations' ||
                  currentStage === 'done') && (
                  <Text style={styles.warningText}>
                    {creatingData?.analysis}
                  </Text>
                ))}
            </View>
          )}
          {currentStage !== 'circle' && currentStage !== 'analysis' && (
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
          )}

          <View style={styles.warningView}>
            <Text style={styles.warningText}>
              <Text style={styles.greenText}>*</Text>Данный план был создан с
              помощью ИИ. Возможны ошибки.
            </Text>
          </View>

          {currentStage === 'done' && (
            <View style={styles.btnView}>
              <MainButton onClick={() => {}} title="Создать" />
            </View>
          )}
          <View style={styles.goBack}>
            <TouchableOpacity
              style={styles.goBackBtn}
              onPress={() => budgetNavigate.goBack()}
            >
              <Text style={styles.goBackText}>Вернуться назад</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default AddBudgetPlanFinalScreen;
