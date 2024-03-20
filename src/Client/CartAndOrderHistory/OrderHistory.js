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
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState("");
  const { navigate } = useNavigation();

  // Effect hook to manage authentication state changes
  useEffect(() => {
    // Get the authentication instance
    const auth = getAuth();

    // Set up a listener for authentication state changes
    // Updates the 'user' state whenever the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function: unsubscribe the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Dependency array is empty, so this effect runs once after the initial render

  // Function to fetch user's orders from Firestore
  const fetchOrder = async () => {
    // Check if the user is authenticated
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    // Reference to the 'Orders' collection in Firestore
    const orderCollectionRef = collection(firestore, "Orders");

    // Query to get orders for the current user
    const q = query(orderCollectionRef, where("userId", "==", user.uid));

    try {
      // Fetch orders based on the query
      const querySnapshot = await getDocs(q);

      // Array to store processed order items
      const orderItems = [];

      // Iterate through each document in the query snapshot
      querySnapshot.forEach((doc) => {
        // Extract relevant data from the document
        const data = doc.data();

        // Structure the order item and push it to the array
        orderItems.push({
          id: doc.id,
          DeliveryStatus: data.DeliveryStatus,
          image: data.items[0].image,
          deliveryGuy: data.deliveryGuy,
          orderNumber: data.orderNumber,
          timestamp: data.deliveryDate,
          trackingRef: data.trackingEventsRef,
        });
      });

      // Update the state with the fetched order items
      setOrder(orderItems);
    } catch (error) {
      // Log an error message if fetching orders fails
      console.error("Error fetching orders:", error);
    }
  };

  // Effect hook to fetch orders when the 'user' state changes
  useEffect(() => {
    // Check if there is a user
    if (user) {
      // If user exists, fetch their orders
      fetchOrder();
    }
  }, [user]); // Dependency array includes 'user', so this effect runs whenever 'user' changes

  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";

  useEffect(() => {
    // Define an asynchronous function to track shipments
    const trackingShipment = async () => {
      // Check if there are orders and a tracking reference available
      if (order.length > 0 && order[0].trackingRef) {
        // Set up headers for the API request
        const config = {
          headers: {
            Authorization: `Bearer ${CourierAPIKey}`,
            "Content-Type": "application/json",
          },
        };

        try {
          // Make a GET request to the ShipLogic API to get shipment information
          const response = await axios.get(
            `https://api.shiplogic.com/v2/tracking/shipments?tracking_reference=${order[0].trackingRef}`,
            config
          );

          // Extract and set the shipment status based on the response
          setShipmentStatus(
            response.data.shipments[0].tracking_events[0].status
          );
        } catch (error) {
          // Log an error message if there's an issue with the API request
          console.error("Error getting shipments", error);
        }
      } else {
        // Log an error if the tracking reference is not available in the order
        console.error("Tracking reference not available in order");
      }
    };

    // Call the trackingShipment function when the 'order' dependency changes
    trackingShipment();
  }, [order]);

  // Define a function to navigate to the 'DeliveryAndChatSystem' screen with orderId
  const navigateToDeliveryAndChatSystem = (orderId) => {
    navigate("DeliveryOngoing", { orderId });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          {/* Section for displaying 'ORDER HISTORY' heading */}
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

          {/* Section for the search input */}
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

          {/* Section for the dropdown selection */}
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

          {/* Section for the search button */}
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
            width: "80%",
          }}
        >
          <Grid  xs={10} md={10}>
            {/* Map through the 'order' array to display order information */}
            {order.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigateToDeliveryAndChatSystem(item.id)}
                key={index}
              >
                {/* Grid item for each order */}
                <Grid item  xs={10} md={8} key={item.id}>
                  {/* Card component to display order details */}
                  <Card
                    sx={{
                      height: "auto",
                      borderBottomColor: "black",
                      marginBottom: 5,
                    }}
                  >
                    {/* Box for the main content of the card */}
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", md: "row" }}
                      alignItems="center"
                      borderBottomWidth={2}
                      padding={2}
                      marginBottom={{ xs: 2, md: 2 }}
                    >
                      {/* Box for displaying the order image */}
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

                      {/* Box for displaying order number and timestamp */}
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
                          {/* Use new Date() to format the date */}
                          {new Date(item.timestamp).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                      </Box>

                      {/* Box for displaying delivery person information */}
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

                      {/* Box for displaying order status */}
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
