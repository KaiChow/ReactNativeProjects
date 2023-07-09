import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default (props: any) => {
  const KEY = 'DEV.IO';
  const [text, onChangeText] = useState('');
  const [showText, setShowtext] = useState('');
  const onSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, text);
    } catch (error) {
      console.log(error);
    }
  };
  const onGet = async () => {
    try {
      const result = await AsyncStorage.getItem(KEY);
      setShowtext(result || '');
    } catch (error) {
      console.log(error);
    } 1
  };
  return (
    <SafeAreaView style={styles.root}>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text}></TextInput>
      <Button title={'Save'} onPress={onSave} />
      <Button title={'GET'} onPress={onGet} />
      <Text>Result:{showText}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  button: {
    margin: 12
  }
});
