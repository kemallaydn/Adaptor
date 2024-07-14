import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const FancyButton = ({onPress, title }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.99,
      friction: 3,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.buttonContainer}>
      <AnimatedTouchable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, { transform: [{ scale: scaleValue }], backgroundColor: "rgba(0, 23, 31, 0.86)" }]}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '1%',
    flexGrow: 1,
  },
  button: {
    backgroundColor: 'rgba(0, 23, 31, 0.86)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,

  },
  buttonText: {
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FancyButton;
