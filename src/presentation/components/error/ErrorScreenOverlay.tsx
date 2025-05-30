import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useDataContext } from '../../../core/contexts/useDataContext';
import { RouteName } from '../../../navigation/RouteName';
import * as RootNavigation from '../../../navigation/rootNavigation';
import ErrorAnimation from '../../../assets/animations/error.json';
import LottieView from 'lottie-react-native';
import { Colors } from '../../../assets/styles/colors';

const ErrorScreenOverlay: React.FC = () => {
  const { appError, setAppError } = useDataContext();

  return (
    <>
      {appError && (
        <Modal>
          <View style={styles.overlay}>
            <Text style={styles.title}>Oops!</Text>
            <LottieView
              source={ErrorAnimation}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.message}>{appError}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                RootNavigation.replace(RouteName.HomeScreen, {});
                setAppError(null);
              }}>
              <Text style={styles.buttonText}>Return to home</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    alignSelf: 'stretch',
    backgroundColor: Colors.background,
  },
  animation: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.red,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ErrorScreenOverlay;
