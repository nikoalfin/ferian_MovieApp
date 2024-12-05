import React from 'react';
import { Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#434343',
        headerLeft: ()=> <View/>,
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleLeft}>FER</Text>
            <Text style={styles.headerTitleRight}>MOVIE</Text>
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#434343', // Pink background
    height: 80, // Adjust height for a taller header
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Padding to avoid overlap with status bar
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleLeft: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EC8312', // Red color for "MAKS"
  },
  headerTitleRight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // Black color for "NEWS"
  },
});
