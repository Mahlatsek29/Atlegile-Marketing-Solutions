import React, { useEffect, useState } from "react";
import { Button, Toolbar, Typography, Box, Badge } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth, firestore } from "../config";
import { ShoppingCart } from "@mui/icons-material";

const Navbar = () => {
  const navigation = useNavigation();
  const imageLogo = require("../../assets/logo.png");
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [showMenu, setShowMenu] = useState(false);
  const { width } = Dimensions.get("window");

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateTo = (screen) => {
    if (width < 600) {
      toggleMenu();
    }
    navigation.navigate(screen);
  };

  return (
    <Toolbar
      sx={{
        color: "#252B42",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
        <Image
          source={imageLogo}
          style={{ width: 120, height: 60, resizeMode: "contain" }}
        />
      </TouchableOpacity>
      {width < 600 ? (
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name={showMenu ? "times" : "bars"} size={20} color="#252B42" />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {userData ? (
            <>
              <Button onClick={() => navigateTo("Landing")} color="inherit">
                Shop
              </Button>
              <Button onClick={() => navigateTo("AboutUs")} color="inherit">
                About Us
              </Button>
              <Box onClick={() => navigateTo("DateSelectionAndCheckout")}>
                <Badge
                  badgeContent={cartCount}
                  color="primary"
                  style={{ margin: "0px 15px" }}
                >
                  <ShoppingCart color="action" style={{ color: "black" }} />
                </Badge>
              </Box>
              <TouchableOpacity
                onPress={() => navigateTo("UserProfile")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "gray",
                    borderRadius: "8%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 16,
                      color: "white",
                      padding: 10,
                    }}
                  >
                    AS
                  </Typography>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Typography variant="subtitle1">
                    Welcome, {userData.name}
                  </Typography>
                  <Typography style={{ fontSize: 12 }}>
                    {userData.username}
                  </Typography>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Button onClick={() => navigateTo("Landing")} color="inherit">
                Shop
              </Button>
              <Button onClick={() => navigateTo("AboutUs")} color="inherit">
                About Us
              </Button>
              <TouchableOpacity onPress={() => navigateTo("SignIn")}>
                <Button color="inherit">Sign In</Button>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo("SignUp")}>
                <Button color="inherit">Sign Up</Button>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      {showMenu && width < 600 && (
        <View
          style={{
            position: "absolute",
            top: 60,
            right: 10,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            zIndex: 999,
          }}
        >
          <Button onPress={() => navigateTo("Landing")} color="inherit">
            Shop
          </Button>
          <Button onPress={() => navigateTo("AboutUs")} color="inherit">
            About Us
          </Button>
          {userData ? (
            <>
              <Button onPress={() => navigateTo("UserProfile")} color="inherit">
                Profile
              </Button>
              <Button
                onPress={() => navigateTo("DateSelectionAndCheckout")}
                color="inherit"
              >
                Cart
              </Button>
            </>
          ) : (
            <>
              <Button onPress={() => navigateTo("SignIn")} color="inherit">
                Sign In
              </Button>
              <Button onPress={() => navigateTo("SignUp")} color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </View>
      )}
    </Toolbar>
  );
};

export default Navbar;
