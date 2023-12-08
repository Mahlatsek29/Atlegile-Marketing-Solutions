import React, { useState } from "react";
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
import TextField from "@mui/material/TextField";

const AlternativeContact = ({ navigation }) => {
  const user = firebase.auth().currentUser;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || phone.trim() === "") {
      alert("Please fill in all fields before continuing.");
      return;
    }

    try {
      const userRef = firestore.collection("Users").doc(user.uid);
      await userRef.set({
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone,
        gender: userData.gender,
        email: userData.email,
        location: userData.location,
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        alternativeContact: {
          name,
          phone,
          timestamp: serverTimestamp(),
        },
      });

      console.log(
        "Alternative contact information submitted to 'Users' collection in Firestore."
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Error submitting alternative contact information:",
        error.message
      );
    }
  };

  const handleNotNow = () => {
    console.log("Not Now button clicked");
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

          <View>
            <Text style={styles.subtitle}>ALTERNATIVE CONTACT</Text>
          </View>
          <View style={{ width: "75%" }}>
            <TextField
              id="outlined-number"
              label="Name"
              type="text"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-number"
              label="Phone"
              type="text"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonn}
              onPress={() => navigation.navigate("Landing")}
            >
              <Text style={styles.buttonTextt}>NOT NOW</Text>
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
    marginLeft: "20%",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#072840",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "120%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonn: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: "10%",
    width: "120%",
    borderColor: "#072840",
  },
  buttonTextt: {
    color: "#072840",
    fontWeight: "bold",
    textAlign: "center",
    
  },
  input: {
    // borderWidth: 1,
    borderColor: "#ccc",
    // borderRadius: 4,
    borderBottomWidth: 1,
    marginVertical: 8,
    padding: 8,
    width: "100%",
  },
});

export default AlternativeContact;
