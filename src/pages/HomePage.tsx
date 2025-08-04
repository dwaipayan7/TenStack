import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
  const getTodos = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    return data;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  if (isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Button title='Refresh' onPress={() => refetch()}/>

      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
  },
});
