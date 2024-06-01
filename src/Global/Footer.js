import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import lionImage from "../Global/images/BigLion..png";
import logo from "../../assets/logo.png";
import { Grid, Hidden } from "@mui/material";

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
    <Grid container spacing={2} sx={{
      display: 'flex', justifyContent: 'center',
      backgroundColor: "#070f18"

    }}>
      <Grid item xs={12} sm={10} md={2} >

      </Grid>

      <Grid item xs={12} sm={10} md={2} >


        <Image source={logo} style={{ height: 50, width: 75, }} resizeMode="contain" />
        <Text style={{ alignSelf: 'flex-end', color: 'white', paddingLeft: 10 }}>About SoWhereTo &gt; Access
        </Text>
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
            paddingLeft: 10
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
            <Text >SHOP</Text>
          </TouchableOpacity>
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
            onPress={() => navigation.navigate('About')} // navigate to 'AboutUs' screen
          >
            <Text >ABOUT US</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'white', paddingLeft: 10 }} >hey@sowheretoaccess.com</Text>
      </Grid>
      <Grid item xs={12} sm={10} md={3}>

        <View style={{ marginTop: 30 }}>
          <Text  style={{ color: 'white', paddingLeft: 10 }} >ORDER HISTORY</Text>
          <Text href="https://atlegilemarketing.co.za/about-ams/terms-of-service/" style={{ color: 'white', paddingLeft: 10 }}>TERMS & CONDITIONS</Text>
          <Text href="https://atlegilemarketing.co.za/privacy-policy/" style={{ color: 'white', paddingLeft: 10 }}>PRIVACY POLICY</Text>
        </View>
        <View style={12} sm={10} md={6} sx={{ display: 'flex' }}>


          <Text style={{color: 'white', marginTop: 80, paddingLeft: 10,marginBottom:20 }}>
            Atlegile Marketing Solutions (Pty) Ltd 2023
          </Text>
        </View>
      </Grid>

      <Grid item xs={12} sm={10} md={3} sx={{ display: 'flex' }} >

        {/* <Text style={{color:'white',paddingBottom:50}}>
              Atlegile Marketing Solutions (Pty) Ltd eCommerce 2023
            </Text> */}
      </Grid>




      <Grid item xs={12} sm={10} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }} >

        <View >
          <Image
            source={lionImage}
            resizeMode="cover"
            style={{
              width: 150,
              height: 130,
              opacity: 0.2,
            }}
          />
        </View>
      </Grid>

      {/* Render the lion image only on screens wider than 600 */}

    </Grid>
  );
}

