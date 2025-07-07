import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';

const CustomLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
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

const styles = StyleSheet.create({
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#5BFF6F',
    borderTopColor: 'transparent',
  },
});

export default CustomLoader;