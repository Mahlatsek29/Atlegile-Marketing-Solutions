import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigation } from '@react-navigation/native';

import { firebase, firestore } from '../../config';

const AccountHolder = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const user = firebase.auth().currentUser;

  const handleAccountHolder = async () => {
    // const user = firebase.auth().currentUser;

    if (!name || !surname || !phone || !gender || !email || !location) {
      alert("Please fill in all fields before continuing.");
      return;
    }


    localStorage.setItem("user", user.uid);

    try {
      const userRef = firestore.collection("Users").doc(user.uid);

      await userRef.set({
        name,
        surname,
        phone,
        gender,
        email,
        location,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
      });

      console.log("User information submitted to Users collection in Firestore.");

      // navigate("/contact");
      navigation.navigate('AlternativeContact');
    } catch (error) {
      console.error("Error submitting user information:", error.message);
      alert("Error submitting user information. Please try again.");
    }
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSurnameChange = (value) => {
    setSurname(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  return (
    <ImageBackground source={require('../../Global/images/Reed.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../Global/images/logo.png')} style={styles.logo} />
        <View style={{ width: '120%', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.title}>MAIN ACCOUNT HOLDER </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>TELL US ABOUT YOURSELF</Text>
        </View>
        <View>
        <TextField id="standard-basic" 
        style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            placeholder="Name"
            variant="standard"
          />
          <TextField id="standard-basic" 
          style={styles.input}
            value={surname}
            onChangeText={handleSurnameChange}
            label="Surname"
            variant="standard"
          />
        </View>
        <View>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{ name: 'Gender', id: 'uncontrolled-native', }}
                onChange={(e) => handleGenderChange(e.target.value)}
              >
                <option value={10}>Male</option>
                <option value={20}>Female</option>
                <option value={30}>Prefer not to say</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </View>
        <View>
        <TextField id="standard-basic" 
            value={email}
            onChangeText={handleEmailChange}
            label="Email"
            variant="standard"
          />
         <TextField id="standard-basic" 
            value={location}
            onChangeText={handleLocationChange}
            label="Location"
            variant="standard"
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleAccountHolder} style={styles.button}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '30%',
    marginLeft: '69%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 150,
    resizeMode: 'contain',
    marginLeft: '29%'
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginRight: '30%'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#072840',
    borderRadius: 40,
    width: 200,
    height: 40,
    marginLeft: '15%'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AccountHolder;
