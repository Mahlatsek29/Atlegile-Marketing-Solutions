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
import { TextField } from "@mui/material";
import { firebase, firestore } from "../../config";

const AlternativeContact = ({ userEmail, navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleContinue = async () => {
    try {
      // Validate name and phone
      if (!name || !phone) {
        alert("Please enter both name and phone.");
        return;
      }
  
      // Validate userEmail
      if (!userEmail) {
        console.error("User email is undefined");
        alert("User email is undefined. Please check the user data.");
        return;
      }
  
      const userDocRef = firestore.collection("Users").where("email", "==", userEmail);
      const userSnapshot = await userDocRef.get();
  
      if (!userSnapshot.empty) {
        const userId = userSnapshot.docs[0].id;
  
        await firestore.collection("Users").doc(userId).update({
          alternativeContact: {
            name,
            phone,
          },
        });
  
        navigation.navigate("Landing");
      } else {
        console.error("User not found");
        alert("User not found. Please try again.");
      }
    } catch (error) {
      console.error("Error updating alternative contact:", error.message);
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

          <View>
            <Text style={styles.subtitle}>ALTERNATIVE CONTACT</Text>
          </View>
          <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            keyboardType="Name"
            />
             <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="Phone"
            />
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.buttonn} onPress={() => navigation.navigate("Landing")}>
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
    marginLeft: "29%",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
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
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonn: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 40,
    width: 200,
    height: 40,
    marginLeft: "15%",
    borderWidth: 1,
    borderColor: "#072840",
  },
  buttonTextt: {
    color: "#072840",
    fontWeight: "bold",
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
