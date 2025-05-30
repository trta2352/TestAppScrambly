import React from 'react';
import Navigator from './src/navigation/Navigator';
import DataProvider from './src/core/contexts/useDataContext';
import ErrorScreenOverlay from './src/presentation/components/error/ErrorScreenOverlay';

const App = () => {
  return (
    <DataProvider>
      <ErrorScreenOverlay />
      <Navigator />
    </DataProvider>
  );
};

export default App;
