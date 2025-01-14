import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { firebase, firestore } from "../../config";
import TextField from "@mui/material/TextField";
import { useNavigation } from "@react-navigation/native";
import CircularProgress from "@mui/material/CircularProgress";

const AlternativeContact = () => {
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const window = Dimensions.get("window"); // Getting window dimensions

  const handleContinue = async (e) => {
    e.preventDefault();
  
    if (name.trim() === "" || phone.trim() === "") {
      alert("Please fill in all fields before continuing.");
      return;
    }
  
    try {
      setLoading(true); // Set loading to true when the request starts
  
      const userRef = firestore.collection("Users").doc(user.uid);
  
      // Get the existing user data
      const userData = await userRef.get();
  
      // Update the user data with alternative contact information
      await userRef.set(
        {
          alternativeContact: {
            name: name,
            phone: phone,
          },
        },
        { merge: true }
      );
  
      setLoading(false); // Set loading to false when the request completes
  
      // Alert user and navigate based on the button clicked
      if (e.target.innerText === "CONTINUE") {
        alert("Alternative successfully added. Welcome!");
        navigation.navigate("Landing");
      } else {
        alert("Welcome!");
      }
    } catch (error) {
      // Log and alert if there's an error submitting user information
      console.error("Error submitting alternative contact information:", error.message);
      alert("Error submitting alternative contact information. Please try again.");
      setLoading(false); // Set loading to false when the request fails
    }
  };


  // Calculate container width and height dynamically
  const containerWidth = window.width > 400 ? 400 : window.width * 0.9;
  const containerHeight = window.height > 600 ? 600 : window.height * 0.9;

  return (
  // View component representing the entire screen
<View style={{ flex: 1 }}>
  {/* ImageBackground component for setting the background image */}
  <ImageBackground
    source={require("../../Global/images/Reed.jpg")}
    style={styles.background}
  >
    {/* View container with dynamic width and height styles */}
    <View
      style={{ ...styles.container, width: containerWidth, height: "95%" }}
    >
      {/* Image component for displaying the logo */}
      <Image
        source={require("../../Global/images/logo5.png")}
        style={styles.logo}
      />

      {/* View for displaying the title */}
      <View
        style={{
          width: "120%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* Text component displaying the title */}
        <Text style={styles.title}>ALTERNATIVE CONTACTS</Text>
      </View>

      {/* View for input fields with a width of 75% */}
      <View style={{ width: "75%" }}>
        {/* TextField component for entering the Name */}
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

        {/* TextField component for entering the Phone number */}
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

      {/* TouchableOpacity for triggering the 'handleContinue' function */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        {/* Conditional rendering based on 'loading' state */}
        {loading ? (
          // CircularProgress component shown when loading is true
          <CircularProgress size={25} />
        ) : (
          // Text component displaying "CONTINUE" when loading is false
          <Text style={styles.buttonText}>CONTINUE</Text>
        )}
      </TouchableOpacity>

      {/* TouchableOpacity for triggering the 'handleContinue' function */}
      <TouchableOpacity style={styles.businessButton} onPress={handleContinue}>
        {/* Text component displaying "NOT NOW" */}
        <Text style ={styles.buttonText1}>
          NOT NOW
        </Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
</View>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",

    margin: "3%",

    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 70,
    height: 70, 
    marginBottom: 50,
    resizeMode: "contain",
    marginTop:20,
    borderRadius: 35, 
    overflow: "hidden", 
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    height: 40,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#072840",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "75%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
  linkText1: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  businessButton: {
    borderColor: "#072840",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "75%",
    alignItems: "center",
  },
  buttonText1: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#072840",
  },
  arrow: {
    marginLeft: 10,
  },
});

export default AlternativeContact;