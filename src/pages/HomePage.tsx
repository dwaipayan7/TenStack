// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   ActivityIndicator,
//   Button,
//   Alert,
//   SafeAreaView,
// } from 'react-native';
// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// const HomePage = () => {
//   const [id, setId] = useState(1);

//   const getTodos = async (id: number) => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     // const res = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
//     const data = await res.json();
//     return data;
//   };

//   const { data, isFetching, refetch, error } = useQuery({
//     // queryKey: ['todos'],
//     queryKey: ['todos', id],
//     queryFn: () => getTodos(id),
//   });

//   if (error) {
//     Alert.alert('Getting Errors');
//   }

//   if (isFetching) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* <Button title='Refresh' onPress={() => refetch()}/> */}
//       <SafeAreaView>
//         <Button title="Increment ID" onPress={() => setId(prev => prev + 1)} />

//         <Text style = {{color: 'white'}}>{JSON.stringify(data, null, 2)}</Text>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default HomePage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     padding: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: '#fff',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import createTodoQueryOptions from '../queryOptions/todoQueryOptions';

const HomePage = () => {
  // const [on, setOn] = useState(true);
  const [id, setId] = useState(1);

  // const { data, isFetching, error } = useQuery(createTodoQueryOptions());
  const { data } = useSuspenseQuery(createTodoQueryOptions());

  // if (error) {
  //   Alert.alert('Error', 'Failed to fetch data');
  // }

  // if (isFetching) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#007bff" />
  //       <Text style={styles.loadingText}>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.idText}>Post ID: {id}</Text>

        <Button title="Next Post" onPress={() => setId(prev => prev + 1)} />

        {data?.map((todos: any) => (
          <View key={todos.id} style={styles.commentBox}>
            <Text style={styles.commentName}>{todos.title}</Text>
            <Text style={styles.commentBody}>{todos.completed}</Text>
          </View>
        ))}

        <View>
          <Text style={styles.commentBody}>{data[0]?.title}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  idText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 12,
  },
  commentBox: {
    backgroundColor: '#1e1e1e',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  commentName: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  commentBody: {
    color: '#ccc',
  },
});
