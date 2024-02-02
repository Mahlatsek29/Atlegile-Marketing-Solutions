import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { firebase, firestore } from "../../config";
import { useNavigation } from "@react-navigation/native";
import TextField from "@mui/material/TextField";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameAlternative, setNameAlternative] = useState(null);
  const [phoneAlternative, setPhoneAlternative] = useState(null);
  const [loading, setLoading] = useState(false);


  const navigateSignUpBussiness = () => {
    navigation.navigate("BusinessRegistration");
  };

  const navigateToShop = () => {
    navigation.navigate("Landing");
  };

  const navigatealreadyhaveaccount = () => {
    navigation.navigate("SignIn");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields before signing in.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        console.log("User signed up:", userCredential.user);
        await firestore
          .collection("Users")
          .doc(userCredential.user.uid)
          .set({
            email: email,
            alternativeContact: {
              name: nameAlternative,
              phone: phoneAlternative,
            },
          });

        navigation.navigate("TellUsAboutYourself");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up. Please try again.");
    }
    finally {
      setLoading(false); // Set loading back to false after the sign-up process completes
    }
  };

  return (
    // <ImageBackground
    //   source={require("../../Global/images/Reed.jpg")}
    //   style={styles.background}>
    //   <View style={styles.container}>
    //     <View>
    //       <Image
    //         source={require("../../Global/images/logo.png")}
    //         style={styles.logo}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         width: "120%",
    //         flexDirection: "row",
    //         justifyContent: "space-around",
    //       }}>
    //       <Text style={styles.title}>SIGN UP </Text>
    //       <Text style={{ fontSize: "70%", marginBottom: "-20%" }}>
    //         SHOP{" "}
    //         <FontAwesome
    //           style={styles.arrow}
    //           name="angle-right"
    //           size={20}
    //           color="#072840"
    //         />{" "}
    //       </Text>
    //     </View>
    //     <View style={{ width: "75%" }}>
    //       <TextField
    //         id="outlined-number"
    //         label="Email"
    //         type="text"
    //         variant="standard"
    //         InputLabelProps={{
    //           shrink: true,
    //         }}
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <TextField
    //         id="outlined-number"
    //         label="Password"
    //         type="text"
    //         variant="standard"
    //         InputLabelProps={{
    //           shrink: true,
    //         }}
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         secureTextEntry={true}
    //       />
    //     </View>
    //     <TouchableOpacity style={styles.button} onPress={handleSignup}>
    //       <Text style={styles.buttonText}>SIGN UP</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={navigatealreadyhaveaccount}>
    //       <Text style={styles.linkText}> ALREADY HAVE AN ACCOUNT?</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={styles.linkText1}>
    //         {" "}
    //         <AntDesign name="google" size={15} color="red" />
    //         SIGN UP WITH GOOGLE
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.businessButton}
    //       onPress={navigateSignUpBussiness}>
    //       <Text style={styles.buttonText1}>
    //         SIGN UP AS A BUSINESS{" "}
    //         <FontAwesome
    //           style={styles.arrow}
    //           name="angle-right"
    //           size={20}
    //           color="#072840"
    //         />
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </ImageBackground>

    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}>
      <Image
        source={require("../../Global/images/Reed.jpg")}
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          width: "37vw",
          position: "absolute",
          right: 16,
          top: 16,
          bottom: 16,
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
        }}>
        <View>
          <Image
            source={require("../../Global/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <View
          style={{
            width: "120%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}>
          <Text style={styles.title}>SIGN UP </Text>
          <TouchableOpacity onPress={navigateToShop}>
            <Text style={{ fontSize: "70%", marginBottom: "-20%" }}>
              SHOP{" "}
              <FontAwesome
                style={styles.arrow}
                name="angle-right"
                size={20}
                color="#072840"
              />{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "75%", marginTop: 15 }}>
          <TextField
            id="outlined-number"
            label="Email"
            type="text"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-number"
            label="Password"
            type="password"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
  {loading ? (
    <CircularProgress size={25} />
  ) : (
    <Text style={styles.buttonText}>SIGN UP</Text>
  )}
</TouchableOpacity>
        <TouchableOpacity onPress={navigatealreadyhaveaccount}>
          <Text style={styles.linkText}> ALREADY HAVE AN ACCOUNT?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText1}>
            {" "}
            <AntDesign name="google" size={15} color="red" />
            SIGN UP WITH GOOGLE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.businessButton}
          onPress={navigateSignUpBussiness}>
          <Text style={styles.buttonText1}>
            SIGN UP AS A BUSINESS{" "}
            <FontAwesome
              style={styles.arrow}
              name="angle-right"
              size={20}
              color="#072840"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
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
    height: 100,
    marginVertical: 30,
    resizeMode: "contain",
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
    display:'flex',
    alignItems:"center"
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
    marginTop: "10%",
    width: "75%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText1: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#072840",
  },
  arrow: {
    marginLeft: "10px",
  },
});

export default Signup;
