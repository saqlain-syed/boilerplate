import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import Main from './src/Main.js';
import { ScrollView } from 'react-native';

export default function App() {
  return (
    <PaperProvider>
          <Main />
      </PaperProvider>
  );
}

