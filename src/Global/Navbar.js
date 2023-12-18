import React, { useEffect, useState } from "react";
import { Button, Toolbar, Typography, Box, Badge } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth, firestore } from "../config";
import { ShoppingCart } from "@mui/icons-material";
const Navbar = () => {
  const navigation = useNavigation();
  const imageLogo = require("../../assets/logo.png");
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const cartCollectionRef = firestore
          .collection("Cart")
          .where("uid", "==", user.uid);

        const unsubscribeCartSnapshot = cartCollectionRef.onSnapshot(
          (snapshot) => {
            const itemCount = snapshot.docs.length;
            setCartCount(itemCount);
          }
        );

        const userDocRef = firestore.collection("Users").doc(user.uid);
        const unsubscribeSnapshot = userDocRef.onSnapshot((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.error("User data not found");
          }
        });

        return () => {
          unsubscribeCartSnapshot();
          unsubscribeSnapshot();
        };
      } else {
        setUserData(null);
        setCartCount(0); // Reset cart count when user is not authenticated
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const navigateAboutUs = () => {
    navigation.navigate("AboutUs");
  };
  const navigateLanding = () => {
    navigation.navigate("Landing");
  };

  return (
    <Toolbar
      sx={{
        color: "#252B42",
        display: "flex",
        flexDirection: "row",
      }}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 120, height: 60, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}>
        {userData ? (
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
                  backgroundColor: "#252B42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit">
              Shop
            </Button>
            <Button
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252B42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit"
              onClick={() => navigation.navigate("AboutUs")}>
              About Us
            </Button>
            <Box
              onClick={() => {
                navigation.navigate("DateSelectionAndCheckout");
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}>
              <Badge
                badgeContent={cartCount}
                color="primary"
                style={{ margin: "0px 15px" }}>
                <ShoppingCart color="action" style={{ color: "black" }} />
              </Badge>
            </Box>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={() => navigation.navigate("UserProfile")}>
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
                  AS
                </Typography>
              </View>
              <View
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  navigation.navigate("AccountAndBusiness");
                }}>
                <Typography variant="subtitle1">
                  Welcome, {userData.name}
                </Typography>
                <Typography
                  style={{
                    fontSize: "0.8rem",
                  }}>
                  {userData.username}
                </Typography>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
            }}>
            <Button
              onClick={navigateLanding}
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252B42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit">
              Shop
            </Button>
            <Button
              onClick={navigateAboutUs}
              sx={{
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#252B42",
                  borderRadius: "25px",
                  color: "white",
                },
              }}
              color="inherit">
              About Us
            </Button>
            <TouchableOpacity>
              <Button
                onClick={navigateToSignIn}
                sx={{
                  transition: "backgroundCcolor 0.3s, color 0.3s",
                  border: "1px solid #252B42",
                  borderRadius: "25px",
                  marginLeft: "10px",
                  "&:hover": {
                    backgroundColor: "#252B42",
                    borderRadius: "25px",
                    color: "white",
                  },
                }}
                color="inherit">
                Sign In
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                onClick={navigateToSignUp}
                sx={{
                  transition: "backgroundCcolor 0.3s, color 0.3s",
                  border: "1px solid #252B42",
                  borderRadius: "25px",
                  marginLeft: "10px",
                  "&:hover": {
                    backgroundColor: "#252B42",
                    borderRadius: "25px",
                    color: "white",
                  },
                }}
                color="inherit">
                Sign Up
              </Button>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Toolbar>
  );
};
export default Navbar;
