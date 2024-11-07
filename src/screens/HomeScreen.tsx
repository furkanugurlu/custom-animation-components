import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const data = [
  {key: 'darkmodeswitch', name: 'Dark Mode Switch'},
  {key: 'customtoast', name: 'Custom Toast'},
  {key: 'accordion', name: 'Accordion'},
  {key: 'onboradingpaginationindicator', name: 'Onboarding Pagination Indicator'},
  {key: 'switch', name: 'Custom Switch'},
  {key: 'reanimatedcarousel', name: 'Reanimated Carousel'},
];

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.key)}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default HomeScreen;
