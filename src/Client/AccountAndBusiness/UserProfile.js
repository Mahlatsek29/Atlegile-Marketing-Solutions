// Importing necessary components and libraries
import { View, TouchableOpacity, Image, Text } from "react-native";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../config";

// Functional component for user profile
const UserProfile = () => {
  // Initializing navigation
  const navigation = useNavigation();

  // State variables for user data, order history, and others
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(true);
  const [user, setUser] = useState(null);

  // Effect hook to listen for changes in authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
    };
  }, []);

  // Effect hook to fetch user details from Firestore when user is authenticated
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = firestore.collection("Users").doc(user.uid);

        // Fetch user details from Firestore
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

  // Navigation function to handle moving to the Order History screen
  const handleOrderHistoryNav = () => {
    navigation.navigate("OrderHistory");
  };

  // Navigation function to handle moving to the Business Registration screen
  const handleBusiness = () => {
    navigation.navigate("BusinessRegistration");
  };

  // Navigation function to handle moving to the Favourites screen
  const handleFavourites = () => {
    navigation.navigate("Favourites");
  };
  

  return (
    // Main container view
    <View style={{ backgroundColor: "white" }}>
      {/* Included FollowUs component */}
      <FollowUs />
      {/* Included Navbar component */}
      <Navbar />

      {/* User profile view */}
      <View
        style={{
          height: "520px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Profile picture */}
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

          {/* User details section */}
          <View
            style={{
              textAlign: "center",
            }}
          ></View>
          <View
            style={{
              padding: 30,
              marginTop: 10,
              display: "flex",
              marginBottom: "5px",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* User name and contact information */}
            {userData && userData.business ? (
              <Typography
                style={{ color: "#072840", fontWeight: 600 }}
                variant="h6"
              >
                {userData.businessName}
              </Typography>
            ) : (
              <>
                <Typography
                  style={{ color: "#072840", fontWeight: 600 }}
                  variant="h6"
                >
                  {userData?.name} {userData?.surname}
                </Typography>
                <Typography
                  style={{ color: "gray", fontWeight: 600 }}
                  variant="h7"
                >
                  {/* {userData?.alternativeContact.name}{" "}
                  {userData?.alternativeContact.phone} */}
                </Typography>
              </>
            )}
          </View>

          {/* Order history and navigation buttons */}
          <View>
            {/* Order History button */}
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

            {/* Display order history if available */}
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

            {/* Other navigation buttons */}
            {/* Favourites button */}
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

            {/* Terms & Conditions button */}
            {/* <View
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
            </View> */}

            {/* Privacy Policy button */}
            {/* <View
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
            </View> */}
          </View>

          {/* Action buttons */}
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* Register Business button */}
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

            {/* Register as a Talent button */}
            {/* <Button
              onClick={handleBusiness}
              style={{
                color: "#072840",
                borderRadius: "20px",
                outlineColor: "#072840",
                marginRight: "5px",
              }}
              variant="outlined"
            >
              REGISTER AS A TALENT
            </Button> */}

            {/* Sign Out button */}
            <Button
  style={{
    color: "#072840",
    borderRadius: "20px",
    outlineColor: "#072840",
    marginRight: "5px",
  }}
  variant="outlined"
  onClick={async () => {
    await signOut(firebase.auth());
    navigation.navigate("Landing");
  }}
>
  Sign Out
</Button>

            {/* Manage Business button */}
            {(userData?.talent || userData?.business) && (
              <Button
                style={{
                  color: "#072840",
                  borderRadius: "20px",
                  outlineColor: "#072840",
                  marginRight: "5px",
                }}
                variant="outlined"
                onClick={() => {
                  navigation.navigate("AccountAndBusiness");
                }}
              >
                Manage Business
              </Button>
            )}
          </View>
        </View>
      </View>

      {/* Included Footer component */}
      <Footer />
    </View>
  );
};

export default UserProfile;