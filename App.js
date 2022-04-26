import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMockData();
  }, []);

  const fetchMockData = () => {
    fetch('https://625885c892dc8873186269f4.mockapi.io/data')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error('request failed', err);
      });
  };
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data?.[0])}</Text>
      <Button title="Make API Request" onPress={fetchMockData}>
        Make request
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
