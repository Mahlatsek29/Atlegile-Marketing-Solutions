import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-community/google-signin';
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      {/* Your background image */}
      <Image source={{ uri: backgroundImage }} style={{ ...StyleSheet.absoluteFillObject }} />

      {/* Your content container */}
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 20,
          width: 300,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <View>
          <Image source={{ uri: Logo }} style={{ width: 137, height: 50, resizeMode: 'contain' }} />
        </View>

        <Title
          style={{
            color: '#000',
            fontFamily: 'Lovelo',
            fontSize: 30,
            fontWeight: '900',
            lineHeight: 'normal',
            textTransform: 'uppercase',
            marginTop: 10,
          }}
        >
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
            marginTop: 10,
          }}
          onPress={handleShop}
        >
          <Text
            style={{
              color: '#072840',
              fontFamily: 'Roboto',
              fontSize: 15,
              fontWeight: '500',
              letterSpacing: 0.46,
              textTransform: 'uppercase',
            }}
          >
            SHOP
          </Text>
          <ChevronRightIcon style={{ color: '#2196F3' }} />
        </TouchableOpacity>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ alignSelf: 'stretch', marginTop: 10 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={{ alignSelf: 'stretch', marginTop: 10 }}
        />

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

        <GoogleSigninButton
          style={{ width: 192, height: 48, marginTop: 10 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => console.log('Google sign in pressed')}
        />
      </View>
    </View>
  );
};

export default Signin;
