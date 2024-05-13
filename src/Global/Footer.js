import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions,TouchableOpacity  } from "react-native";
import lionImage from "../Global/images/BigLion..png";
import logo from "../../assets/logo.png";

export function Footer() {
  const [width, setWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setWidth(window.width);
    };

    Dimensions.addEventListener("change", handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener("change", handleDimensionsChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.section1Left}></View>
        <View style={styles.section1Right}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.heading}>SoWhereTo Access</Text>
          {/* <Text style={styles.description}>
            Welcome to AMS, where we specialize in building beautiful brands,
            marketing African businesses, and connecting them with a global
            customer base, driving sales of their exceptional products and
            services.
          </Text> */}
           <View
               
               style={{
                 display: "flex",
                 flexDirection: "row",
                 marginVertical: "15px",
               }}
             >
               <TouchableOpacity
                 style={{
                   borderRadius: "15px",
                   color: "#fff",
                   backgroundColor: "#FFFFFF",
                   marginRight: "5px",
                   justifyContent: "center",
                   alignItems: "center",
                   paddingLeft: 3,
                   paddingRight: 3,
                 }}
                 onPress={() => navigation.navigate('Shop')} // navigate to 'Shop' screen
               >
                 <Text style={styles.buttonText}>SHOP</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={{
                   justifyContent: "center",
                   alignItems: "center",
                   backgroundColor: "#FFFFFF",
                   paddingLeft: 3,
                   paddingRight: 3,
                   borderRadius: "15px",
                 }}
                 onPress={() => navigation.navigate('About')} // navigate to 'AboutUs' screen
               >
                 <Text style={styles.buttonText}>ABOUT US</Text>
               </TouchableOpacity>
                  </View>
          <Text style={styles.email}>hey@sowheretoaccess.com</Text>
        </View>
        <View style={styles.section1Links}>
          <View style={styles.linksContainer}>
            <Text style={styles.link1}>ORDER HISTORY</Text>
            <Text style={styles.link2}>TERMS & CONDITIONS</Text>
            <Text style={styles.link3}>PRIVACY POLICY</Text>
          </View>
        </View>
        <View style={styles.section1Image}></View>
      </View>
      {width > 600 ? (
        <View style={styles.section2}>
          <View style={styles.section2TextContainer}>
            <Text style={styles.section2Text}>
              Atlegile Marketing Solutions (Pty) Ltd eCommerce 2023
            </Text>
          </View>
          <View style={styles.section2ImageContainer}>
            <Image
              source={lionImage}
              style={styles.section2Image}
              resizeMode="cover"
            />
          </View>
        </View>
      ) : null}
      {/* Render the lion image only on screens wider than 600 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#070F18",
    width: "100%",
    flex: 1,
  },
  section1: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  section1Left: {
    flex: 6,
  },
  section1Right: {
    flex: 6,
  },
  logo: {
    marginTop: 10,
    width: 173,
    height: 63,
  },
  heading: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  description: {
    fontSize: 11,
    color: "#FFF",
  },
  email: {
    marginTop: 10,
    fontSize: 12,
    color: "#FFF",
  },
  section1Links: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  linksContainer: {
    marginLeft: 20,
  },
  link1: {
    marginBottom: 3,
    color: "#FFF",
  },
  link2: {
    marginBottom: 3,
    color: "#FFF",
  },
  link3: {
    color: "#FFF",
  },
  section1Image: {
    flex: 6,
  },
  section2: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  section2TextContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  section2Text: {
    textAlign: "center",
    color: "#FFF",
  },
  section2ImageContainer: {
    flex: 2.5,
    backgroundColor: "#070F18",
    opacity: 0.2,
  },
  section2Image: {
    width: "100%",
    height: 250,
  },
});
