/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Animated,
  View,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
} from 'react-native';

import { useAnimation } from '../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style }: Props) => {
  const { opacity, fadeIn } = useAnimation();

  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && (
        <ActivityIndicator
          style={{ position: 'absolute' }}
          color="#5856d6"
          size={30}
        />
      )}
      <Animated.Image
        source={{ uri }}
        onLoadEnd={finishLoading}
        style={{ ...(style as any), opacity }}
      />
    </View>
  );
};
