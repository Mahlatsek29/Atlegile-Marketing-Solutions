import { View, TouchableOpacity, Image, Text, Modal } from "react-native";
import { Typography, Button } from "@mui/material";
import Icon from "react-native-vector-icons/Fontisto";
import React, { useState, useEffect } from "react";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import { useNavigation } from "@react-navigation/native";
import sara from "../../Global/images/Sara.png";
import { firebase } from "../../config";
import { signOut } from "firebase/auth";
// import { auth } from "react-native-firebase";

const UserProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming you have the user's UID (replace 'userId' with the actual UID)
        const userId = "dGHFGyde9e37r084rdP7";
        const userRef = firebase.firestore().collection("Users").doc(userId);
        const doc = await userRef.get();

        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        // Assuming you have the user's UID (replace 'userId' with the actual UID)
        const userId2 = "YI6BJyHCjgObep37vdDr";
        const orderHistoryRef = firebase
          .firestore()
          .collection("OrderHistory")
          .where("userId", "==", userId2);
        const querySnapshot = await orderHistoryRef.get();

        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });

        setOrderHistory(orders);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchUserData();
    fetchOrderHistory();
  }, []);

  const handleOrderHistoryNav = () => {
    navigation.navigate("OrderHistory");
  };

  const handleBusiness = () => {
    navigation.navigate("BusinessRegistration");
    // alert('button clicked!')
  };

  const handleFavourites = () => {
    navigation.navigate("Favourites");
    // alert('button clicked!')
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
                // backgroundColor: "red",
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography style={{ fontWeight: 700 }} variant="h4">
              {userData && userData.name}
            </Typography>
            <Typography style={{ fontWeight: 700 }} variant="h7">
              {userData && userData.phone}
            </Typography>
            <Typography style={{ fontWeight: 700 }} variant="h7">
              {userData && userData.email}
            </Typography>
          </View>
          <View
            style={{
              marginTop: 30,
              textAlign: "center",
            }}
          >
            {userData && (
              <View
                style={{
                  marginTop: 30,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{userData.location}</Typography>
              </View>
            )}
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
              Julian Jameson
            </Typography>
            <Typography style={{ color: "gray", fontWeight: 600 }} variant="h7">
              Alternative Contact
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
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
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
                {/* Map out order history here */}
                {orderHistory.map((order, index) => (
                  <View key={index}>
                    <Text style={{ color: "black" }}>
                      Product Name: {order.productName}, Purchase Date:{" "}
                      {order.createdAt}, Total: {order.price}
                      {console.log(order.price)}
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
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
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
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
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
                marginBottom: "5px",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
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
                marginRight: "5px",
                borderRadius: "20px",
              }}
              variant="outlined"
              onClick={handleBusiness}
            >
              REGISTER BUSINESS
            </Button>
            <Button
              style={{
                color: "#072840",
                borderRadius: "20px",
                outlineColor: "#072840",
              }}
              variant="outlined"
            >
              REGISTER AS A FREELANCER
            </Button>
            <Button
              style={{
                color: "#072840",
                borderRadius: "20px",
                outlineColor: "#072840",
              }}
              variant="outlined"
              onClick={() => signOut(firebase.auth())}
            >
              Sign Out
            </Button>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default UserProfile;
