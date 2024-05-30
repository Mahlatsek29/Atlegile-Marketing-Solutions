import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import CircularProgress from "@mui/material/CircularProgress"; // This import might cause an issue in a React Native project. Make sure you're using a proper CircularProgress component for React Native.
import { firebase } from "../../config"; // Assuming firebase import is correct
import { Paper } from "@mui/material";

const Signin = () => {
  const navigation = useNavigation(); // React Navigation hook for navigation
  const [email, setEmail] = useState(""); // State variable for email input
  const [password, setPassword] = useState(""); // State variable for password input
  const [loading, setLoading] = useState(false); // State variable for loading indicator
  const window = Dimensions.get("window"); // Getting window dimensions

  // Function to handle sign-in
  const handleSignin = async () => {
    try {
      setLoading(true); // Set loading state to true
      // Validate email and password
      if (email.trim() === "" || password.trim() === "") {
        alert("Please fill in all fields before signing in.");
        return;
      }
      // Sign in user with email and password
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (userCredential.user) {
        console.log("User signed in:", userCredential.user);
        navigation.navigate("Landing"); // Navigate to Landing screen upon successful sign-in
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Error signing in. Please try again."); // Alert user if sign-in fails
    } finally {
      setLoading(false); // Set loading state to false after sign-in attempt
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Add necessary imports and definitions for Google Sign-In here
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      alert("Error signing in with Google. Please try again.");
    }
  };

  const handleShop = () => {
    navigation.navigate("Landing"); // Navigate to Landing screen when user wants to shop
  };

  // Calculate container width and height dynamically
  const containerWidth = window.width > 400 ? 400 : window.width * 0.9;
  const containerHeight = window.height > 600 ? 600 : window.height * 0.9;

  return (
    <ImageBackground
      source={require("../../Global/images/Reed.jpg")} // Background image
      style={styles.background}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          position: "fixed",
          minWidth: 280,
          height: "98%",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column", // Make the container a column
          justifyContent: "space-between", // Push the content to the end
          alignSelf: "center",
          width: "90%",
          "@media (min-width: 600px)": {
            alignSelf: "flex-end",
            width: 400,
            margin: 1,
          },
        }}
      >
        {/* Logo image container */}
        <View style={{flex:1, display: "flex", alignSelf: "center",justifyContent:'center' }}>
          <Image
            source={require("../../Global/images/logo4.png")}
            style={styles.logo}
          />
        </View>
        <View
          style={{
            marginBottom:60,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Sign-in text container */}
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                marginBottom: 10,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              SIGN IN{" "}
            </Text>

            {/* Insert arrow logo */}
            <TouchableOpacity onPress={handleShop}>
              <Text
                style={{ fontSize: 14, marginBottom: -20, fontWeight: "500" }}
              >
                SHOP{" "}
                <AntDesign
                  style={styles.arrow}
                  name="right"
                  size={20}
                  color="#072840"
                />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "80%", display: "flex", alignSelf: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{ width: "80%",  display:'flex',alignSelf:'center' }}>
            <Text
              style={{
                position: "relative",
                alignSelf:'flex-end', 
                marginVertical: 10,
                cursor: "pointer",
              
                fontWeight: "500",
                color: "#072840",
              }}
            >
              FORGOT PASSWORD?
            </Text>
          </View>

          {/* Sign-in button */}
          <TouchableOpacity style={{display:'flex',alignSelf:'center',backgroundColor: "#072840",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "75%",
    alignItems: "center",}} onPress={handleSignin}>
            {loading ? (
              <CircularProgress size={25} /> // Loading indicator
            ) : (
              <Text style={{color: "white",
              textAlign: "center",
              fontWeight: "bold",}}>SIGN IN</Text> // Sign-in text
            )}
          </TouchableOpacity>
          <View style={{width: "80%",  display:'flex',alignSelf:'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={{
                position: "relative",
                left: 10,
                marginVertical: 10,
                cursor: "pointer",
                alignSelf: "center",
                fontWeight: "500",
                color: "#072840",
              }}
            >
              DON'T HAVE AN ACCOUNT?
            </TouchableOpacity>
          </View>
          {/* Google sign-in button */}
          <TouchableOpacity onPress={handleGoogleSignIn}>
            <Text style={styles.linkText1}>
              {/* <AntDesign name="google" size={15} color="red" /> SIGN UP WITH GOOGLE */}
            </Text>
          </TouchableOpacity>
        </View>
        {/* TextInput fields container */}
      </Paper>
    </ImageBackground>
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
  linkText1: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  arrow: {
    marginLeft: 10,
  },
});

export default Signin;
