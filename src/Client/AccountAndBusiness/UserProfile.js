import { View, TouchableOpacity, Image, Text, Modal } from "react-native";
import { Typography, Button } from "@mui/material";
import Icon from "react-native-vector-icons/Fontisto";
import React, { useState, useEffect } from "react";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import { useNavigation } from "@react-navigation/native";
import sara from "../../Global/images/Sara.png";
import { auth, firestore } from "../../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = firestore.collection("Users").doc(user.uid);

        try {
          const userDoc = await userDocRef.get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            console.error("User document does not exist");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleOrderHistoryNav = () => {
    navigation.navigate("OrderHistory");
  };

  const handleBusiness = () => {
    navigation.navigate("BusinessRegistration");
  };

  const handleFavourites = () => {
    navigation.navigate("Favourites");
  };

  return (
    <View>
      <FollowUs />
      <Navbar />

      <View
        style={{
          height: "800px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View>
          <View
            style={{
              marginTop: 20,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={sara}
              style={{
                width: "180px",
                height: "180px",
                display: "flex",
                alignItems: "center",
                borderRadius: "50%",
                justifyContent: "center",
              }}
            />
          </View>

          <View
            style={{
              padding: 30,
              marginTop: 30,
              display: "flex",
              marginBottom: "5px",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{ color: "#072840", fontWeight: 600 }}
              variant="h6"
            >
              {userData?.name} {userData?.surname}
            </Typography>
            <Typography style={{ color: "gray", fontWeight: 600 }} variant="h7">
              {userData?.alternativeContact?.name} {userData?.alternativeContact?.phone}
            </Typography>
          </View>
          <View>
            <View
              style={{
                border: "none",
                paddingBottom: 10,
                flexDirection: "row",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: 5 }} />
              <TouchableOpacity
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                onPress={handleOrderHistoryNav}
              >
                <Text>ORDER HISTORY</Text>
              </TouchableOpacity>
            </View>
            {showOrderHistory && (
              <View>
                {orderHistory.map((order, index) => (
                  <View key={index}>
                    <Text style={{ color: "black" }}>
                      Product Name: {order.productName}, Purchase Date:{" "}
                      {order.createdAt}, Total: {order.price}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <View
              style={{
                border: "none",
                display: "flex",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: 5 }} />
              <TouchableOpacity
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                onPress={handleFavourites}
              >
                <Text>FAVOURITES </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                border: "none",
                display: "flex",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: 5 }} />
              <TouchableOpacity
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                <Text>TERMS & CONDITIONS </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                border: "none",
                display: "flex",
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 5,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: 5 }} />
              <TouchableOpacity
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                <Text>PRIVACY POLICY </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                color: "#072840",
                marginRight: 5,
                borderRadius: 20,
              }}
              variant="outlined"
              onPress={handleBusiness}
            >
              REGISTER BUSINESS
            </Button>
            <Button
              style={{
                color: "#072840",
                borderRadius: 20,
                outlineColor: "#072840",
                marginRight: 5,
              }}
              variant="outlined"
            >
              REGISTER AS A FREELANCER
            </Button>
            <Button
              style={{
                color: "#072840",
                borderRadius: 20,
                outlineColor: "#072840",
                marginRight: 5,
              }}
              variant="outlined"
              onPress={() => signOut(auth)}
            >
              Sign Out
            </Button>
            <Button
              style={{
                color: "#072840",
                borderRadius: 20,
                outlineColor: "#072840",
                marginRight: 5,
              }}
              variant="outlined"
              onPress={() => {
                navigation.navigate("AccountAndBusiness");
              }}
            >
              Manage Business
            </Button>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default UserProfile;
