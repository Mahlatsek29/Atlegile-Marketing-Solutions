import React from "react";
// import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
// import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
// import { useFetchProfileData } from "../../hooks/useFetchUsers";
import Icon from "react-native-vector-icons/FontAwesome5";
import { View, Image, Text } from "react-native";

const Navbar = () => {
  const imageLogo = require("../../assets/logo.png");
  const uid = localStorage.getItem("user");
  // const { userData } = useFetchProfileData(uid);
  const userData = null;
  return (
    <Toolbar
      sx={{
        color: "#252b42",
        // background: "red",
        display: "flex",
        flexDirection: "row",
      }}>
      <View>
        <Image
          source={require("../../assets/logo.png")}
          // alt="Your Logo"
          style={{ width: 120, height: 60, resizeMode: "contain" }}
        />
      </View>
      {/* <Typography>Logo</Typography> */}
      {/* <Text>Logo</Text> */}

      <View
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}>
        {!uid ? (
          <View
            style={{
              marginLeft: "auto",
              display: "flex",
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
            // component={Link}
            // to="/shop"
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
            // component={Link}
            // to="/about-us"
            >
              About Us
            </Button>
            <Button
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
            // component={Link}
            // to="/sign-in"
            >
              Sign In
            </Button>
            <Button
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
            // component={Link}
            // to="/sign-up"
            >
              Sign Up
            </Button>
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
            // component={Link}
            // to="/shop"
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
            // component={Link}
            // to="/about-us"
            >
              About Us
            </Button>

            {/* <IconButton color="inherit" onClick={() => alert("Go to Cart")}>
              <ShoppingCartIcon />
            </IconButton> */}
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
                  {
                    // userData?.name && userData?.name.charAt(0).toUpperCase()
                  }
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
                  Jane
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
