import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
export default () => {
  const [msg, setMsg] = useState('');
  const doFetch = () => {
    fetch('https://api.devio.org/uapi/test/test?requestPrams=aa')
      .then(res => res.json())
      .then(result => {
        setMsg(JSON.stringify(result));
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity onPress={doFetch}>
        <Text>加载</Text>
      </TouchableOpacity>
      <Text>{msg}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
