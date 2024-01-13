import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const BackBtn = () => {

  const navigation = useNavigation();

  const navigateHome = () => {
    navigation.navigate("Landing");
  };

  return (
    <View>
        <TouchableOpacity onPress={navigateHome}>
        <AntDesign name="leftcircle" size={24} color="#072840"/>
        </TouchableOpacity>
    </View>
  )
}

export default BackBtn

const styles = StyleSheet.create({})