import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from "react-native";
import lionImage from "../Global/images/BigLion..png";
import logo from "../../assets/logo.png";
import { Grid } from "@mui/material";

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
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#070f18" }}>
      <Grid item xs={12} sm={10} md={2}></Grid>
      <Grid item xs={12} sm={10} md={2}>
        <Image source={logo} style={{ height: 50, width: 75 }} resizeMode="contain" />
        <Text style={{ alignSelf: 'flex-end', color: 'white', paddingLeft: 10 }}>About SoWhereTo &gt; Access</Text>
        <View style={{ display: "flex", flexDirection: "row", marginVertical: "15px", paddingLeft: 10 }}>
        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('Shop')}>
  <Text>SHOP</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('AboutUs')}>
  <Text>ABOUT US</Text>
</TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:hey@sowheretoaccess.com')}>
          <Text style={{ color: 'white', paddingLeft: 10 }}>hey@sowheretoaccess.com</Text>
        </TouchableOpacity>
      </Grid>
      <Grid item xs={12} sm={10} md={3}>
        <View style={{ marginTop: 30 }}>
          <Text style={{ color: 'white', paddingLeft: 10 }}>ORDER HISTORY</Text>
          <Text style={{ color: 'white', paddingLeft: 10 }} onPress={() => Linking.openURL("https://atlegilemarketing.co.za/about-ams/terms-of-service/")}>TERMS & CONDITIONS</Text>
          <Text style={{ color: 'white', paddingLeft: 10 }} onPress={() => Linking.openURL("https://atlegilemarketing.co.za/privacy-policy/")}>PRIVACY POLICY</Text>
        </View>
        <View style={styles.footerTextContainer}>
          <Text style={{ color: 'white', marginTop: 80, paddingLeft: 10, marginBottom: 20 }}>
            Atlegile Marketing Solutions (Pty) Ltd 2023
          </Text>
        </View>
      </Grid>
      <Grid item xs={12} sm={10} md={3} sx={{ display: 'flex' }}></Grid>
      <Grid item xs={12} sm={10} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <View>
          <Image
            source={lionImage}
            resizeMode="cover"
            style={{ width: 150, height: 130, opacity: 0.2 }}
          />
        </View>
      </Grid>
    </Grid>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: "15px",
    color: "#fff",
    backgroundColor: "#FFFFFF",
    marginRight: "5px",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 3,
    paddingRight: 3,
  },
  footerTextContainer: {
    display: 'flex'
  }
});
