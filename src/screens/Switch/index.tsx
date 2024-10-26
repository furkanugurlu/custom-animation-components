import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import CustomSwitch from './components/CustomSwitch';


const Switch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <CustomSwitch activeColor={'red'} inActiveColor={'#F2F5F7'} />
      </View>
      <View style={styles.switchContainer}>
        <CustomSwitch activeColor={'black'} inActiveColor={'#F2F5F7'} />
      </View>
      <View style={styles.switchContainer}>
        <CustomSwitch activeColor={'pink'} inActiveColor={'#F2F5F7'} />
      </View>
      <View style={styles.switchContainer}>
        <CustomSwitch activeColor={'purple'} inActiveColor={'#F2F5F7'} />
      </View>
      <View style={styles.switchContainer}>
        <CustomSwitch activeColor={'#234234'} inActiveColor={'#F2F5F7'} />
      </View>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    marginVertical: 10,
  },
});