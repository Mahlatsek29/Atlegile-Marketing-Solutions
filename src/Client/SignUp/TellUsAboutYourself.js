import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Picker,
} from "react-native";
import { firebase, firestore } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TellUsAboutYourself = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const user = firebase.auth().currentUser;

  const handleContinue = async () => {
    if (!name || !surname || !phone || !gender || !email || !location) {
      alert("Please fill in all fields before continuing.");
      return;
    }

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

      navigation.navigate("AlternativeContact");
    } catch (error) {
      console.error("Error submitting user information:", error.message);
      alert("Error submitting user information. Please try again.");
    }
  };

  const genderOptions = ["Male", "Female", "Other"];

  return (
    <ImageBackground
      source={require("../../Global/images/Reed.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../../Global/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>MAIN ACCOUNT HOLDER</Text>
        <Text style={styles.subtitle}>TELL US ABOUT YOURSELF</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { marginRight: 5 }]}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={surname}
            onChangeText={(text) => setSurname(text)}
            keyboardType="default"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <Picker
          itemStyle={styles.pickerItem}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          {genderOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
          keyboardType="default"
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
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
  
    alignItems: "center",
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
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 8,
    padding: 8,
    width: "100%",
  },
  pickerItem: {
    color: "#072840",

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
  row: {
    flexDirection: "row",
  },
});

export default TellUsAboutYourself;
