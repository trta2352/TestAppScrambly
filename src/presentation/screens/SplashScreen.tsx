import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteName } from '../../navigation/RouteName';
import { useStackNavigation } from '../../navigation/navigation';

const SplashScreen: React.FC = () => {
  const navigation = useStackNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.navigate(RouteName.HomeScreen);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});

export default SplashScreen;
