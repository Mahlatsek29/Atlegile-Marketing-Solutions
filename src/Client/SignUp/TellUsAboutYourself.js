import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { firebase, firestore } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextField from '@mui/material/TextField';

const AccountHolder = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState(30);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    
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

   
      navigation.navigate("Landing");
    } catch (error) {
      console.error("Error handling continue:", error.message);
      alert("Error. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../Global/images/Reed.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../Global/images/logo.png")}
            style={styles.logo}
          />
          <View
            style={{
              width: "120%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.title}>MAIN ACCOUNT HOLDER </Text>
          </View>

          <View>
            <Text style={styles.subtitle}>TELL US ABOUT YOURSELF</Text>
          </View>

          <View style={{display:"flex",flexDirection:"row"}} >
            <View style={{marginRight:5}}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            </View>
            <View>
           <TextField
              id="standard-basic"
              label="Surname"
              variant="standard"
              onChangeText={(text) => setSurname(text)}
              value={surname}
            />
            </View>
          </View>

          <View>
          <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
    
    <TextField
              id="standard-basic"
              label="Location"
              variant="standard"
              onChangeText={(text) => setLocation(text)}
              value={location}
            />
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
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "30%",
    marginLeft: "69%",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 150,
    resizeMode: "contain",
    marginLeft: "29%",
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
    marginRight: "30%",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    // borderWidth: 1,
    borderColor: "#ccc",
    // borderRadius: 4,
    marginVertical: 8,
    padding: 8,
    width: "100%",
  },
  button: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#072840",
    borderRadius: 40,
    width: 200,
    height: 40,
    marginLeft: "15%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  row : {
    display: "flex",
    justifyContent: "row"
  }
});

export default AccountHolder;
