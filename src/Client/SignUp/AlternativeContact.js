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
import { useNavigation } from "@react-navigation/native";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress


const AlternativeContact = () => {
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading


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

      navigation.navigate("Landing");

      console.log(
        "Alternative contact information submitted to 'Users' collection in Firestore."
      );
    } catch (error) {
      console.error(
        "Error submitting alternative contact information:",
        error.message
      )
    }finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };


  const handleNotNow = () => {
    console.log("Not Now button clicked");
  };

  return (
    <ImageBackground
      source={require("../../Global/images/Reed.jpg")}
      style={styles.background}>
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
              {loading ? (
                <CircularProgress size={25} />
              ) : (
                <Text style={styles.buttonText}>CONTINUE</Text>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonn}
              onPress={() => navigation.navigate("Landing")}>
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
    display:'flex',
    alignItems:'center'
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
