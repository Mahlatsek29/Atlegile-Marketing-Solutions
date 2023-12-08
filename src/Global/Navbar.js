import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigation } from '@react-navigation/native';

import Icon from "react-native-vector-icons/FontAwesome5";
import { View, Image, Text, TouchableOpacity } from "react-native";

const Navbar = () => {
  const navigation = useNavigation();
  const imageLogo = require("../../assets/logo.png");
  const uid = null
  const userData = null;

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };


  const navigateaboutus = () => {
    navigation.navigate('AboutUs')
  }

  const navigatelanding = () => {
    navigation.navigate('Landing')
  }
  return (
    <Toolbar
      sx={{
        color: "#252b42",
        display: "flex",
        flexDirection: "row",
      }}>
      <View>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 120, height: 60, resizeMode: "contain" }}
        />
      </View>


      <View
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}>
        {!uid ? (
          <View
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
            }}>
            <Button onClick={navigatelanding}
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252b42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit"
          
            >
              Shop
            </Button>
            <Button onClick={navigateaboutus}
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252b42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit"
         
            >
              About Us
            </Button>

            <TouchableOpacity>
              <Button onClick={navigateToSignIn}
                sx={{
                  transition: "backgroundCcolor 0.3s, color 0.3s",
                  border: "1px solid #252b42",
                  borderRadius: "25px",
                  marginLeft: "10px",
                  "&:hover": {
                    backgroundColor: "#252b42",
                    borderRadius: "25px",
                    color: "white",
                  },
                }}
                color="inherit"
             
              >
                Sign In
              </Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button onClick={navigateToSignUp}
                sx={{
                  transition: "backgroundCcolor 0.3s, color 0.3s",
                  border: "1px solid #252b42",
                  borderRadius: "25px",
                  marginLeft: "10px",

                  "&:hover": {
                    backgroundColor: "#252b42",
                    borderRadius: "25px",
                    color: "white",
                  },
                }}
                color="inherit"
          
              >
                Sign Up
              </Button>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <Button
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252b42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit"
           
            >
              Shop
            </Button>
            <Button
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252b42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit"
         
            >
              About Us
            </Button>

         
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}>
              <Icon
                name="shopping-cart"
                size={20}
                style={{ paddingHorizontal: 10 }}
              />
            </Box>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={() => alert("Go to Profile")}>
              <View
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "gray",
                  borderRadius: "8%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Typography
                  style={{
                    fontSize: "1.4rem",
                    color: "white",
                    padding: "10px",
                  }}>
                  {}
                  AS
                </Typography>
              </View>
              <View style={{ marginLeft: "10px" }}>
                <Typography variant="subtitle1">
                  Welcome, {userData?.name}
                </Typography>
                <Typography
                  style={{
                    fontSize: "0.8rem",
                  }}>
                  Sara
                </Typography>
              </View>
            </View>
          </View>
        )}
      </View>
    </Toolbar>
  );
};

export default Navbar;
