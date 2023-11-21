import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Change the icon library if needed

import backgroundImage from "../../Global/images/bg-img.jpg";
import Logo from "../../Global/images/logo.png";

const Signin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email === '' || password === '') {
      console.log('Good');
    } else {
      console.log('Filling');
    }
  };

  const handleShop = () => {
    navigation.navigate('/');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      {/* Your background image */}
      <Image source={{ uri: backgroundImage }} style={{ ...StyleSheet.absoluteFillObject }} />

      {/* Your content container */}
      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 20, width: 300, borderRadius: 10, alignItems: 'center' }}>
        <View>
          <Image source={{ uri: Logo }} style={{ width: 137, height: 50, resizeMode: 'contain' }} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Title style={{ color: '#000', fontFamily: 'Lovelo', fontSize: 30, fontWeight: '900', lineHeight: 'normal', textTransform: 'uppercase' }}>
            SIGN IN
          </Title>
          <TouchableOpacity
            style={{
              width: 69,
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              cursor: 'pointer',
            }}
            onPress={handleShop}
          >
            <Text style={{ color: '#072840', fontFamily: 'Roboto', fontSize: 15, fontWeight: '500', letterSpacing: 0.46, textTransform: 'uppercase' }}>
              SHOP
            </Text>
            <Icon name="chevron-right" style={{ color: '#2196F3' }} />
          </TouchableOpacity>
        </View>

        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} style={{ alignSelf: 'stretch' }} />
        <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry style={{ alignSelf: 'stretch' }} />

        <Button
          mode="contained"
          onPress={handleSignIn}
          style={{
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginTop: 10,
            backgroundColor: '#072840',
          }}
        >
          Sign In
        </Button>

        <View style={{ marginTop: 10 }}>
          <Text style={{ textDecorationLine: 'underline', color: 'inherit', fontWeight: 'bold' }}>
            Forgot Password?
          </Text>
        </View>

        <View style={{ marginTop: 10, height: 30 }}>
          <Text style={{ color: '#072840', textAlign: 'center', fontWeight: 'bold' }}>
            DO NOT HAVE AN ACCOUNT?
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'https://accounts.google.com/InteractiveLogin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&ifkv=AVQVeyxNQ2A432r4bfY_nLZnSse1n4WLox8NOt3k4n4yU4mXFzdxmjwDpFI1rp9-wKRm_5q_I3Xgc&theme=glif&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
            )
          }
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="google" size={24} color="red" />
          <Text style={{ color: 'red', fontWeight: 'bold' }}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;
