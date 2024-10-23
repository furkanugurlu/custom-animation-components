import { View, Text, StyleSheet, Pressable, PressableProps } from 'react-native'
import React, { useState } from 'react'
import Onboarding from './components/Onboarding';

const PaginationIndicator = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Onboarding
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
      />
    </View>
  )
}

export default PaginationIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
