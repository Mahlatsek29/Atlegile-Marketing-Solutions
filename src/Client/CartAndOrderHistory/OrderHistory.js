import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Container, Typography } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Navbar from "../../Global/Navbar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import hdtv from "../../Global/images/hdtv.jpg";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import mapImage from "../../Global/images/mapImage.png";
import axios from "axios";
import { firestore } from "../../config";

const OrderHistory = () => {
  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
    };
  }, []);
  // using local host URL for now which routes back to the initial screen but when hosted we will use the host URL
  // const url = "http://localhost:19006";
  // const url2 = "https://atlegile-marketing-solutions.vercel.app/Reciept";

  // const fetchCartData = async () => {
  //   if (!user) {
  //     console.error("User not authenticated.");
  //     return;
  //   }

  //   const cartCollectionRef = collection(firestore, "Cart");
  //   const q = query(cartCollectionRef, where("uid", "==", user.uid));

  //   try {
  //     const querySnapshot = await getDocs(q);

  //     const cartItems = [];
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       cartItems.push({
  //         id: doc.id,
  //         product: data.product,
  //         quantity: data.quantity,
  //         amount: data.price * data.quantity,
  //         image: data.image,
  //         name: data.name,
  //         // Add other relevant fields from your Cart collection
  //       });
  //     });

  //     setCartData(cartItems);
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch cart data when the user is authenticated
  //   if (user) {
  //     fetchCartData();
  //   }
  // }, [user]); // Fetch cart data whenever the user changes

  const fetchCartData = async () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const cartCollectionRef = collection(firestore, "Cart");
    const q = query(cartCollectionRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cartItems.push({
          id: doc.id,
          product: data.product,
          quantity: data.quantity,
          amount: data.price * data.quantity,
          image: data.image,
          name: data.name,
          orderId: data.productId,
          timestamp: data.timestamp.toDate(),
          // Add other relevant fields from your Cart collection
        });
      });

      setCartData(cartItems);
      console.log("Cart Data : ", cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    // Fetch cart data when the user is authenticated
    if (user) {
      fetchCartData();
    }
  }, [user]); // Fetch cart data whenever the user changes

  // const data = [
  //   { date: "27 JUL, 2023", name: "SIBUSISO", status: "ONGOING" },
  //   { date: "27 JUL, 2023", name: "SIBUSISO", status: "DELIVERED" },
  //   { date: "27 JUL, 2023", name: "SIBUSISO", status: "DELIVERED" },
  //   { date: "27 JUL, 2023", name: "SIBUSISO", status: "DELIVERED" },
  // ];

  // const navigateToDeliveryAndChatSystem = (status) => {
  //   if (status === "DELIVERED") {
  //     navigation.navigate("DeliveryAndChatSystem");
  //   } else if (status === "ONGOING") {
  //     navigation.navigate("DeliveryOngoing");
  //   }
  // };
  console.log("Cart Data 1 : ", cartData);
  console.log("Cart Data timeStamp : ", cartData[0]?.timestamp.toString());

  return (
    <View>
      <FollowUs />
      <Navbar />
      <Container fixed sx={{ height: "85vh" }}>
        <View
          style={{
            marginTop: 50,
            padding: 10,
            height: 100,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h5"
            style={{
              height: 80,
              width: 200,
              marginRight: 12,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            ORDER HISTORY
          </Typography>
          <Typography
            style={{
              height: 80,
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "lightgray",
                color: "gray",
              }}
              placeholder="Search"
              placeholderTextColor="gray"
            />
          </Typography>
          <Typography
            style={{
              height: 80,
              width: 200,
              marginRight: "10px",
            }}
          >
            <View
              style={{
                color: "gray",
                borderBottomWidth: 2,
                borderBottomColor: "lightgray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "gray", marginTop: 25 }}>
                Please Select
              </Text>
              <Icon1
                name="angle-down"
                size={20}
                style={{ marginTop: "28px" }}
              />
            </View>
          </Typography>
          <Typography
            style={{
              height: 50,
              width: 50,
              marginTop: 15,
            }}
          >
            <TouchableOpacity>
              <Icon name="search" size={20} />
            </TouchableOpacity>
          </Typography>
        </View>

        <View>
          {cartData.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigateToDeliveryAndChatSystem(item.status)}
              key={index}
            >
              <View
                style={{
                  width: "100%",
                  height: 80,
                  borderBottomWidth: 2,
                  borderBottomColor: "#1D1D1D",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 2,
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  alt="product-image"
                  style={{
                    width: "20%",
                    height: "100%",
                    // backgroundColor: "#000026",
                    // backgroundImage: `url(${hdtv})`,
                  }}
                />
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    #{item?.orderId.slice(0, 9)}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item?.timestamp.toDateString()}
                  </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    Delivered by
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Dilivery Guy
                  </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    Status
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color:
                        item.status === "DELIVERED"
                          ? "green"
                          : item.status === "ONGOING"
                          ? "orange"
                          : "black",
                    }}
                  >
                    {/* {item?.status} */}
                    Delivered
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
      <Footer />
    </View>
  );
};

export default OrderHistory;
