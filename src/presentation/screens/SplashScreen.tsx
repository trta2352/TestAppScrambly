import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteName } from '../../navigation/RouteName';
import { useStackNavigation } from '../../navigation/navigation';
import LoadingAnimation from '../../assets/animations/loading.json';
import LottieView from 'lottie-react-native';
import { useDataContext } from '../../core/contexts/useDataContext';
import { Colors } from '../../assets/styles/colors';

const SplashScreen: React.FC = () => {
  const navigation = useStackNavigation();
  const { isLoading } = useDataContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(RouteName.HomeScreen);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <LottieView
        source={LoadingAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
