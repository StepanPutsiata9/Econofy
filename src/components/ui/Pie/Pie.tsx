import { PieChart } from 'react-native-chart-kit';
import { Text, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {styles} from "./Pie.ts"
const data = [
  {
    name: 'Еда',
    population: 35,
    color: '#FF6384',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Транспорт',
    population: 20,
    color: '#36A2EB',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Спорт',
    population: 35,
    color: '#63ff9fff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Медицина',
    population: 35,
    color: '#e00000ff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Косметика',
    population: 20,
    color: '#8836ebff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

export default function Pie() {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

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
    ]).start();
  }, [scaleAnim,rotationAnim]);

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const scaleInterpolate = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

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
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

