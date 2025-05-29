import React from 'react';
import Navigator from './src/navigation/Navigator';
import DataProvider from './src/core/contexts/useDataContext';

const App = () => {
  return (
    <DataProvider>
      <Navigator />
    </DataProvider>
  );
};

export default App;
