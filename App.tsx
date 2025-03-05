import React from 'react';
import { SafeAreaView } from 'react-native';
import NumbersFactScreen from './API_Fetch';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NumbersFactScreen />
    </SafeAreaView>
  );
};

export default App;
