import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions,TouchableOpacity  } from "react-native";
import lionImage from "../Global/images/BigLion..png";
import logo from "../../assets/logo.png";
import { Grid , Hidden} from "@mui/material";

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
      
       <Grid item xs={12} sm={10} md={3} >
        
        <View style={{backgroundColor:'brown',display:'flex',justifyContent:'center'}}>

        </View>
          <Image source={logo} style={{alignSelf:'flex-end',hight:100,width:100}} resizeMode="contain" />
          <Text style={{alignSelf:'flex-end',color:'white'}}>SoWhereTo Access</Text>
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
          <Text style={{color:'white'}} >hey@sowheretoaccess.com</Text>
        </Grid>
      <Grid item xs={12} sm={10} md={3} sx={{display:'flex', alignItems:'flex-end'}} >
            <Text style={{color:'white',paddingBottom:50}}>
              Atlegile Marketing Solutions (Pty) Ltd eCommerce 2023
            </Text>
          </Grid>
        <Grid item xs={12} sm={10} md={2} >
          <View >
            <Text style={{color:'white'}} >ORDER HISTORY</Text>
            <Text style={{color:'white'}}>TERMS & CONDITIONS</Text>
            <Text style={{color:'white'}}>PRIVACY POLICY</Text>
          </View>
        </Grid>

  
      
      <Grid item xs={12} sm={10} md={2} sx={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}} >
          
          <View >
            <Image
              source={lionImage}
            resizeMode="cover"
            style={{
              width: 250,
    height: 220}}
            />
          </View>
      </Grid>

      {/* Render the lion image only on screens wider than 600 */}
    
      </Grid>
  );
}

