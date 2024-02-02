import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Container,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Card,
  Grid,
} from "@mui/material";
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
  const [data, setData] = useState([
    "Ben",
    "Paul",
    "Sibusiso",
    "Mpho",
    "Ristar",
    "David",
    "Tshepo",
    "Linda",
    "Thobile",
  ]);
  const [shipmentStatus, setShipmentStatus] = useState("");
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

    const cartCollectionRef = collection(firestore, "Orders");
    const q = query(cartCollectionRef, where("userId", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cartItems.push({
          id: doc.id,
          DeliveryStatus: data.DeliveryStatus,
          // quantity: data.quantity,
          image: data.items[0].image,
          deliveryGuy: data.deliveryGuy,
          orderNumber: data.orderNumber,
          timestamp: data.deliveryDate.toDate(),
          trackingRef: data.trackingEventsRef,

          // Add other relevant fields from your Cart collection
        });
      });

      setCartData(cartItems);
      console.log("Cart Data is: ", cartData);
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
  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";
  useEffect(() => {
    const tackingShipment = async () => {
      // Check if cartData is not empty and contains trackingRef
      if (cartData.length > 0 && cartData[0].trackingRef) {
        const config = {
          headers: {
            Authorization: `Bearer ${CourierAPIKey}`,
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.get(
            `https://api.shiplogic.com/v2/tracking/shipments?tracking_reference=${cartData[0].trackingRef}`,
            config
          );
          console.log(
            "Courier API tracking shipment response:",
            response.data.shipments[0].status
          );
          console.log(
            "shipmentStatus is ",
            response.data.shipments[0].tracking_events[0].status
          );
          setShipmentStatus(
            response.data.shipments[0].tracking_events[0].status
          );
        } catch (error) {
          console.error("Error getting shipments", error);
          if (error.response) {
            console.log("Response data:", error.response.data);
          }
          return [];
        }
      } else {
        console.error("Tracking reference not available in cartData");
      }
    };

    tackingShipment();
  }, [cartData]);

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
    <View style={{ backgroundColor: "white" }}>
      <FollowUs />
      <Navbar />
      {/* <ScrollView style={{ flexDirection: "column", backgroundColor: "white" }}> */}
      <Container fixed sx={{ height: "85vh" }}>
        <Grid container spacing={2} xs={12} mx="auto">
          <View
            style={{
              marginTop: 50,
              padding: 10,
              height: 100,
              display: "flex",
              flexDirection: "row",
            }}>
            <Typography
              variant="h5"
              style={{
                height: 80,
                width: 200,
                marginRight: 12,
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}>
              ORDER HISTORY
            </Typography>
            <Typography
              style={{
                height: 80,
                width: 200,
                display: "flex",
                alignItems: "center",
              }}>
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
              }}>
              <View
                style={{
                  color: "gray",
                  borderBottomWidth: 2,
                  borderBottomColor: "lightgray",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
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
              }}>
              <TouchableOpacity>
                <Icon name="search" size={20} />
              </TouchableOpacity>
            </Typography>
          </View>

          <Grid container spacing={2}>
            {cartData.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigateToDeliveryAndChatSystem(item.status)}
                key={index}>
                <Grid item xs={12} key={item.id}>
                  <Card sx={{ height: "auto", borderBottomColor: "black" }}>
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", md: "row" }}
                      alignItems="center"
                      borderBottomWidth={2}
                      padding={2}>
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        marginBottom={{ xs: 2, md: 0 }}>
                        <ImageList cols={1} rowHeight="100%">
                          <ImageListItem style={{ width: "100%" }}>
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </ImageListItem>
                        </ImageList>
                      </Box>
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        paddingLeft={{ xs: 0, md: 2 }}
                        marginBottom={{ xs: 2, md: 0 }}>
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color="gray">
                          {item.orderNumber}
                        </Typography>
                        <Typography
                          style={{ fontSize: 18, fontWeight: "bold" }}>
                          {item.timestamp.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        paddingLeft={{ xs: 0, md: 2 }}
                        marginBottom={{ xs: 2, md: 0 }}>
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color="gray">
                          Delivered by
                        </Typography>
                        <Typography
                          style={{ fontSize: 18, fontWeight: "bold" }}>
                          {item.deliveryGuy}
                        </Typography>
                      </Box>
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        paddingLeft={{ xs: 0, md: 2 }}
                        marginBottom={{ xs: 2, md: 0 }}>
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color="gray">
                          Status
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color:
                              item.DeliveryStatus === "delivered"
                                ? "green"
                                : item.DeliveryStatus !== "delivered"
                                ? "orange"
                                : "black",
                          }}>
                          {shipmentStatus}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </TouchableOpacity>
            ))}
          </Grid>
        </Grid>
      </Container>
      {/* </ScrollView> */}

      <Footer />
    </View>
  );
};

export default OrderHistory;
