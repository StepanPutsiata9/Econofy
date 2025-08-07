import { PieChart } from 'react-native-chart-kit';
import { Text, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './Pie.ts';

interface ICircleItem {
  name: string;
  population: number;
  color: string;
}

interface IPieProps {
  data: ICircleItem[];
  handleCircleComplete: () => void;
  shouldAnimated: boolean;
}

const TypewriterLegendItem = ({
  item,
  speed = 30,
  startAnimation,
  onComplete,
}: {
  item: ICircleItem;
  speed?: number;
  startAnimation: boolean;
  onComplete: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItem, setShowItem] = useState(false);
  const text = `${item.name}-${item.population} BYN`;

  useEffect(() => {
    if (startAnimation) {
      setShowItem(true);

      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);

          if (currentIndex + 1 >= text.length) {
            onComplete();
          }
        }, speed);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, speed, startAnimation, onComplete]);

  return (
    showItem && (
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
        <Text style={styles.legendText}>{displayedText}</Text>
      </View>
    )
  );
};

export default function Pie({ data, handleCircleComplete, shouldAnimated }: IPieProps) {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [currentLegendIndex, setCurrentLegendIndex] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const filteredData = data.filter(item => item.population !== 0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimationStarted(true);
    });
  }, [scaleAnim, rotationAnim]);

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const scaleInterpolate = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const handleLegendItemComplete = () => {
    if (currentLegendIndex < filteredData.length - 1) {
      setCurrentLegendIndex(prev => prev + 1);
    } else {
      handleCircleComplete();
    }
  };

  useEffect(() => {
    setCurrentLegendIndex(0);
    setAnimationStarted(false);
  }, [data]);

  return (
    <View>
      <View style={styles.chartWrapper}>
        <Animated.View
          style={{
            transform: [
              { rotate: rotateInterpolate },
              { scale: scaleInterpolate },
            ],
          }}
        >
          <PieChart
            data={data}
            width={310}
            height={310}
            center={[77.5, 0]}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
        </Animated.View>
      </View>

      <View style={styles.legendContainer}>
        {shouldAnimated
          ? filteredData.map((item, index) => (
              <TypewriterLegendItem
                key={`${item.name}-${index}`}
                item={item}
                speed={30}
                startAnimation={animationStarted && index <= currentLegendIndex}
                onComplete={handleLegendItemComplete}
              />
            ))
          : data.map(
              (item, index) =>
                item.population !== 0 && (
                  <View key={`${item.name}-${index}`} style={styles.legendItem}>
                    <View
                      style={[styles.legendColor, { backgroundColor: item.color }]}
                    />
                    <Text style={styles.legendText}>
                      {item.name}-{item.population} BYN
                    </Text>
                  </View>
                )
            )}
      </View>
    </View>
  );
}