import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from "react-native";
import { firebase, firestore, authG, provider } from "../../config";
import { COLORS } from "../../Global/Color";
import { useNavigation } from "@react-navigation/native";
import TextField from "@mui/material/TextField";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CircularProgress from "@mui/material/CircularProgress";
import BackBtn from '../../Global/BackBtn'
import * as WebBrowser from 'expo-web-browser'
import { signInWithPopup } from 'firebase/auth';


WebBrowser.maybeCompleteAuthSession()

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameAlternative, setNameAlternative] = useState(null);
  const [phoneAlternative, setPhoneAlternative] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //  webClientId: "184474823085-418vvmk20snlfnsjobm9cclmg33rl0co.apps.googleusercontent.com",
  //  iosClientId: "184474823085-7l43l8ldfoomntckfhe2fa664sldttea.apps.googleusercontent.com"
  // })



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

  const googleSignUp = async () => {
    try {
      const result = await signInWithPopup(authG, provider);
      console.log(result.user);
      navigation.navigate("TellUsAboutYourself");
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <ImageBackground
    source={require("../../Global/images/Reed.jpg")}
    style={styles.background}>

    <View style={styles.container}>
      {/* Logo image container */}
      <View style={{}}>
        <Image
          source={require("../../Global/images/logo.png")}
          style={styles.logo}
        />
      </View>
      {/* SignUp text container */}
      <View
        style={{
          width: "120%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        <Text style={styles.title}>SIGN UP </Text>
        {/*Insert arrow logo */}
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
      {/* TextInput fields container */}
      <View style={{ width: "75%" }}>
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
    
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
{loading ? (
  <CircularProgress size={25} />
) : (
  <Text style={styles.buttonText}>SIGN UP</Text>
)}
</TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText}> ALREADY HAVE AN ACCOUNT?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={googleSignUp}>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    height: 40,
    // marginBottom: 10,
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
    alignItems:'center',
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  linkText: {
    color: COLORS.darkBlue,
    textAlign: "center",
    marginTop: 20,
  },
  linkText1: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  businessButton: {
    borderColor: COLORS.darkBlue,
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
