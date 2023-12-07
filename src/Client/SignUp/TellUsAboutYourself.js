import React, { useState } from "react";
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

const TellUsAboutYourself = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const user = firebase.auth().currentUser;

  const handleContinue = async () => {
    // Ensure that all required fields are not empty
    if (!name.trim() || !surname.trim() || !phone.trim() || !gender.trim() || !email.trim() || !location.trim()) {
      alert("Please fill in all fields before continuing.");
      return;
    }

    try {
      const userRef = firestore.collection("Users").doc(user.uid);

      // Directly use state values here
      await userRef.set({
        name: name.trim(),
        surname: surname.trim(),
        phone: phone.trim(),
        gender: gender.trim(),
        email: email.trim(),
        location: location.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
      });

      console.log("User information successfully submitted to Firestore.");

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
  
    // alignItems: "center",
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 150,
    resizeMode: "contain",
    // marginLeft: "29%",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    // marginBottom: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 15,
  },
  pickerItem: {
    color: "#072840",

  },
  button: {
    backgroundColor: "#072840",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "75%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
});

export default TellUsAboutYourself;
