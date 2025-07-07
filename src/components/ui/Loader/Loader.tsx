import { StyleSheet, Animated, Easing, View } from 'react-native';
import React, { useEffect, useRef, useCallback } from 'react';

const CustomLoader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const startAnimation = useCallback(() => {
    animationRef.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false
      })
    );
    animationRef.current.start();
  }, [spinValue]); 

  useEffect(() => {
    startAnimation();
    
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [startAnimation]); 

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#5BFF6F',
    borderTopColor: 'transparent'
  }
});

export default CustomLoader;