import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import {styles} from "./Loader.ts"
const CustomLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
    animate();
    return () => rotation.setValue(0); // Сброс при размонтировании
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View >
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
    </View>
  );
};



export default CustomLoader;