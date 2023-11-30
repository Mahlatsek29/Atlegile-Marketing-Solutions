import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { firebase, firestore } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountHolder = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState(30);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Retrieve email from local storage
    AsyncStorage.getItem("userEmail")
      .then((storedEmail) => {
        if (storedEmail) {
          setEmail(storedEmail);
        }
      })
      .catch((error) => console.error("Error retrieving email:", error));
  }, []);

  const handleContinue = async () => {
    try {
   
      const userDocRef = await firestore.collection("Users").add({
        name,
        surname,
        gender,
        email,
        location,
      });

      console.log("User document created with ID:", userDocRef.id);

      // Navigate to the next screen
      navigation.navigate("NextScreen");
    } catch (error) {
      console.error("Error handling continue:", error.message);
      alert("Error. Please try again.");
    }
  };

  return (
    <ImageBackground source={require('../../Global/images/Reed.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View>
          <Image source={require('../../Global/images/logo.png')} style={styles.logo} />
          <View style={{ width: '120%', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={styles.title}>MAIN ACCOUNT HOLDER </Text>
          </View>

          <View>
            <Text style={styles.subtitle}>TELL US ABOUT YOURSELF</Text>
          </View>

          <View>
            <TextField id="standard-basic" label="Name" variant="standard" value={name} onChangeText={(text) => setName(text)} />
            <TextField id="standard-basic" label="Surname" variant="standard" value={surname} onChangeText={(text) => setSurname(text)} />
          </View>

          <View>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">Gender</InputLabel>
                <NativeSelect value={gender} onChange={(event) => setGender(event.target.value)}>
                  <option value={10}>Male</option>
                  <option value={20}>Female</option>
                  <option value={30}>Prefer not to say</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </View>

          <View>
            <TextField id="standard-basic" label="Email" variant="standard" value={email} onChangeText={(text) => setEmail(text)} />
            <TextField id="standard-basic" label="Location" variant="standard" value={location} onChangeText={(text) => setLocation(text)} />
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
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
})

export default AccountHolder