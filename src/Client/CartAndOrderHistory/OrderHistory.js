import React, { useState, useEffect } from "react";
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
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Navbar from "../../Global/Navbar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { firestore } from "../../config";

const OrderHistory = () => {
  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState("");
  const { navigate } = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
          image: data.items[0].image,
          deliveryGuy: data.deliveryGuy,
          orderNumber: data.orderNumber,
          timestamp: data.deliveryDate.toDate(),
          trackingRef: data.trackingEventsRef,
        });
      });

      setCartData(cartItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartData();
    }
  }, [user]);

  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";

  useEffect(() => {
    const trackingShipment = async () => {
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

          setShipmentStatus(
            response.data.shipments[0].tracking_events[0].status
          );
        } catch (error) {
          console.error("Error getting shipments", error);
        }
      } else {
        console.error("Tracking reference not available in cartData");
      }
    };

    trackingShipment();
  }, [cartData]);

  const navigateToDeliveryAndChatSystem = (status) => {
    // Implement navigation logic based on the status or any other condition
    // For example, navigate to a specific screen based on the status
    navigate("DeliveryAndChatSystem", { status });
  };

  return (
    <View style={{ flex: 1 }}>
      <FollowUs />
      <Navbar />
      <Container
        fixed
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
              width: "100%",
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
              width: "100%",
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
              width: "100%",
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

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          
          }}
        >
          <Grid >
            {cartData.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigateToDeliveryAndChatSystem(item.status)}
                key={index}
              >
                <Grid item xs={10} md={8} key={item.id}>
                  <Card
                    sx={{
                      height: "auto",
                      borderBottomColor: "black",
                      marginBottom: 5,
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", md: "row" }}
                      alignItems="center"
                      borderBottomWidth={2}
                      padding={2}
                      marginBottom={{ xs: 2, md: 2 }}
                    >
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        marginBottom={{ xs: 2, md: 0 }}
                      >
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
                        marginBottom={{ xs: 2, md: 0 }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color="gray"
                        >
                          {item.orderNumber}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {item.timestamp.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        paddingLeft={{ xs: 0, md: 2 }}
                        marginBottom={{ xs: 2, md: 0 }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color="gray"
                        >
                          Delivered by
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {item.deliveryGuy}
                        </Typography>
                      </Box>
                      <Box
                        width={{ xs: "100%", md: "30%" }}
                        paddingLeft={{ xs: 0, md: 2 }}
                        marginBottom={{ xs: 2, md: 0 }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color="gray"
                        >
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
                          }}
                        >
                          {shipmentStatus}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </TouchableOpacity>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </View>
  );
};

export default OrderHistory;