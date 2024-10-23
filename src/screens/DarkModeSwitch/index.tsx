import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Setting from './screen/Settings';

function DarkModeSwitch(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Setting />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default DarkModeSwitch;
