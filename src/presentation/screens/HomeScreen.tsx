import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BACKEND_BASE_URL } from 'react-native-dotenv';
import { useDataContext } from '../../core/contexts/useDataContext';

const HomeScreen: React.FC = () => {
  const { posts } = useDataContext();
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
      <Text style={styles.welcomeText}>{BACKEND_BASE_URL}</Text>
      <View style={{ padding: 30 }} />
      <Text style={styles.welcomeText}>{posts.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
