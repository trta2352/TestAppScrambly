import React from 'react';
import Navigator from './src/navigation/Navigator';
import DataProvider from './src/core/contexts/useDataContext';
import ErrorScreenOverlay from './src/presentation/components/error/ErrorScreenOverlay';
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DataProvider>
        <ErrorScreenOverlay />
        <Navigator />
      </DataProvider>
    </SafeAreaView>
  );
};

export default App;
