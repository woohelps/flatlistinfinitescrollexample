import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, StatusBar, SafeAreaView, StyleSheet } from 'react-native';

const YourApp = () => {

  const axios = require('axios');
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const [data, setData] = useState([]);

  const makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?seed=1&page=${currentPage}&results=${size}`;
    axios.get(url)
      .then(res => {
        setData(currentPage === 1 ? res.data.results : [...data, ...res.data.results]);
      })
  };

  useEffect(()=> {
    makeRemoteRequest();
  }, [currentPage]);

  const ListItem = ({ item }) => (
    <View style={styles.item} key={item.email}>
      <Text style={styles.email}>{item.name.first + " " + item.name.last}</Text>
    </View>
  );

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={ListItem}
        keyExtractor={(item) => String(item.email)}
        onEndReached={handleLoadMore}
        onEndThreshold={0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  email: {
    fontSize: 32,
  },
});


export default YourApp;
