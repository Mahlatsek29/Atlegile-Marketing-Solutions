import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,

} from "react-native";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  ImageList,
  ImageListItem,
 
} from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import { useRoute } from "@react-navigation/native";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

const MAP_LIBRARIES = ["places"];

const DeliveryOngoing = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const mapRef = useRef(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [agentReferral, setAgentReferral] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [chatmodelVisble, setChatmodelVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [cartData, setCartData] = useState([]);
  const [shipmentTrack, setShipmentTrack] = useState([]);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState("");
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);

  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs",
    libraries: MAP_LIBRARIES,
  });
  if (loadError) {
    return (
      <View>
        <Text>Error loading Google Maps API</Text>
      </View>
    );
  }
  // Set up initial chat data using state
  const [chats, setChats] = useState([
    { messages: "Hello!", dateAntTime: "12:30 PM", status: "sent" },
    { messages: "Hi there!", dateAntTime: "12:35 PM", status: "received" },
  ]);

  // useEffect hook to handle authentication state changes
  useEffect(() => {
    // Get the authentication instance
    const auth = getAuth();

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the user state with the current user information
      setUser(user);
    });

    // Clean up the subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const CourierAPIKey = "12e89740f3804694a06756409292005f";

  // useEffect to handle authentication state changes
  useEffect(() => {
    // Get the authentication instance
    const auth = getAuth();

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the user state with the current user information
      setUser(user);
    });

    // Clean up the subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect to fetch order data based on orderId and user
  useEffect(() => {
    // Asynchronously fetch order data
    const fetchOrderData = async () => {
      try {
        // Create a Firestore document reference for the specified orderId
        const orderDocRef = doc(firestore, "Orders", orderId);

        // Get a snapshot of the order document
        const orderDocSnapshot = await getDoc(orderDocRef);

        if (orderDocSnapshot.exists()) {
          // If the document exists, extract and set order data
          const orderData = orderDocSnapshot.data();
          console.log("Fetched order data:", orderData);
          setOrder(orderData);
        } else {
          // Log a message if the order document is not found
          console.log("Order not found");
        }
      } catch (error) {
        // Log an error message if there's an issue fetching order data
        console.error("Error fetching order data:", error);
      } finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    // Call the fetchOrderData function when dependencies (firestore, orderId, user) change
    fetchOrderData();
  }, [firestore, orderId, user]);

  // useEffect to calculate order-related values when dependencies change
  useEffect(() => {
    // Calculate the total amount of items in the cart
    const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);

    // Calculate the referral amount as 10% of the total amount
    const calculatedReferral = totalAmount * 0.1;

    // Set the calculated referral amount in the state
    setAgentReferral(calculatedReferral);

    // Calculate the final order total including tax and delivery amount
    const finalTotal = totalAmount + calculatedReferral + tax + deliveryAmount;

    // Set the final order total in the state
    setOrderTotal(finalTotal);
  }, [cartData, tax, deliveryAmount]);

  const handleSend = () => {
    // Check if the message is not empty
    if (message.trim() !== "") {
      // Create a new message object
      const newMessage = {
        messages: message,
        dateAntTime: new Date().toLocaleTimeString(),
        status: "sent",
      };
      setChats([...chats, newMessage]);
      setMessage("");
    }
  };

  // Function to toggle the visibility of the chat modal
  const handleMessageButtonClick = () => {
    // Toggle the visibility state of the chat modal
    setChatmodelVisible(!chatmodelVisble);
  };

  // Function to navigate to the Landing screen
  const navigateToLanding = () => {
    // Use the navigation object to navigate to the "Landing" screen
    navigation.navigate("Landing");
  };

  // Function to navigate to the OrderHistory screen with the specified orderId
  const navigateToOrderHistory = () => {
    // Use the navigation object to navigate to the "OrderHistory" screen with the orderId as a parameter
    navigation.navigate("OrderHistory", { orderId });
  };

  // Define a memoized trackingShipment function using useCallback
  const tackingShipment = useCallback(async () => {
    // Set up headers for the API request
    const config = {
      headers: {
        Authorization: `Bearer ${CourierAPIKey}`,
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a GET request to the ShipLogic API to get shipment tracking information
      const response = await axios.get(
        `https://api.shiplogic.com/v2/tracking/shipments?tracking_reference=${order.trackingEventsRef}`,
        config
      );

      // Log the API response for tracking shipment
      console.log("Courier API tracking shipment response:", response.data);

      // Check if the response contains valid shipment data
      if (
        response.data &&
        response.data.shipments &&
        response.data.shipments.length > 0
      ) {
        // Set the shipment tracking data in the state
        setShipmentTrack(response.data);
      } else {
        // Log an error if the data received from the API is incomplete or undefined
        console.error("Incomplete or undefined data received from the API");
      }
    } catch (error) {
      // Log an error and handle it appropriately
      console.error("Error getting shipments", error);

      // Check if there is a response in the error object and log it
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
      // Handle the error as needed
    }
  }, [order]);

  // useEffect hook to call the tackingShipment function when the 'order' dependency changes
  useEffect(() => {
    // Call the tackingShipment function
    tackingShipment();
  }, [tackingShipment]);

  return (
    <View style={{backgroundColor:"white"}}>
      {chatmodelVisble && (
        // Modal overlay for the chat window
        <View
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "40vw",
            }}
          >
            <View
              style={{
                height: "65%",
                width: "80%",
                backgroundColor: "white",
              }}
            >
              {/* Close button for the chat window */}
              <TouchableOpacity
                onPress={() => setChatmodelVisible(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
              >
                {/* X icon button */}
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>

              {/* Chat message area */}
              <ScrollView
                style={{
                  flex: 1,
                  padding: 10,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  CHAT TO DRIVER
                </Text>

                {/* Map through chats to display messages */}
                {chats.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      alignSelf:
                        item.status === "sent" ? "flex-start" : "flex-end",
                      maxWidth: "60%",
                      flexDirection: "row",
                    }}
                  >
                    {/* Message bubble */}
                    <View
                      style={{
                        backgroundColor:
                          item.status === "sent"
                            ? "#E6E6E6"
                            : item.status === "recieved"
                            ? "#072840"
                            : "#FFFFFF",
                        padding: 10,
                        maxWidth: "100%",
                        wordWrap: "break-word",
                        borderTopRightRadius:
                          item.status === "sent"
                            ? 20
                            : item.status === "recieved"
                            ? 20
                            : 0,
                        borderBottomRightRadius:
                          item.status === "sent"
                            ? 20
                            : item.status === "recieved"
                            ? 0
                            : 0,
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius:
                          item.status === "sent"
                            ? 0
                            : item.status === "recieved"
                            ? 20
                            : 0,
                      }}
                    >
                      {/* Display the message text */}
                      <Text
                        style={{
                          color:
                            item.status === "sent"
                              ? "black"
                              : item.status === "recieved"
                              ? "#FFFFFF"
                              : "black",
                        }}
                      >
                        {item.messages}
                      </Text>
                    </View>

                    {/* Display the message timestamp */}
                    <View
                      style={{
                        fontSize: 14,
                        width: "100%",
                        height: "auto",
                        justifyContent:
                          item.status === "sent"
                            ? "flex-start"
                            : item.status === "recieved"
                            ? "flex-end"
                            : "inherit",
                      }}
                    >
                      <Text>{item.dateAntTime}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Input area for sending a message */}
              <View
                style={{
                  height: "12%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                {/* Input field for typing a message */}
                <TextInput
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    color: "black",
                  }}
                  placeholder="Type your message here"
                  placeholderTextColor="grey"
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />

                {/* Button to send the message */}
                <TouchableOpacity
                  onPress={handleSend}
                  style={{
                    backgroundColor: "#072840",
                    borderRadius: 40,
                    padding: 10,
                    marginLeft: 10,
                  }}
                >
                  {/* "SEND" text on the button */}
                  <Text style={{ color: "white" }}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      <FollowUs />
      <Navbar />
      <ScrollView style={{ flexDirection: "column", backgroundColor: "white" }}>
        <Container fixed sx={{ minHeight: "90vh" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Grid container spacing={2} mx="auto">
              <Grid item xs={12} md={8}>
                {/* Left Side Content */}
                <Box mt={2} pr={4}>
                  {/* Heading displaying the order number */}

                  {/* Container for navigation links */}
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    {/* Account link */}
                    <Typography>
                      <TouchableOpacity
                        onPress={navigateToLanding}
                        style={{ color: "grey" }}
                      >
                        <Text>Acount /</Text>
                      </TouchableOpacity>
                    </Typography>

                    {/* Cart link */}
                    <Typography>
                      <TouchableOpacity
                        onPress={navigateToOrderHistory}
                        style={{ color: "grey" }}
                      >
                        Order History /
                      </TouchableOpacity>
                    </Typography>
                    <Typography>{order.orderNumber}</Typography>
                  </View>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ORDER {order.orderNumber}
                  </Typography>
                  {/* Heading for the cart section */}
                  <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    PRODUCTS
                  </Typography>
                  {/* ScrollView container with specific styles */}
                  <ScrollView
                    style={{ flex: 1, height: "50vh", alignSelf: "center" }}
                    showsVerticalScrollIndicator={false}
                  >
                    {/* Grid container for displaying items in the cart */}

                    <Grid container spacing={2}>
                      {order.items &&
                        order.items.map((item, index) => (
                          // Grid item for each item in the cart
                          <Grid item xs={12} key={index}>
                            {/* Card component representing each item */}
                            <Card
                              sx={{
                                height: "auto",
                                borderBottomColor: "black",
                              }}
                            >
                              {/* Box component for organizing content */}
                              <Box
                                display="flex"
                                flexDirection={{ xs: "column", md: "row" }}
                                alignItems="center"
                                borderBottomWidth={2}
                                padding={2}
                              >
                                {/* Box for displaying product image */}
                                <Box
                                  width={{ xs: "100%", md: "30%" }}
                                  marginBottom={{ xs: 2, md: 0 }}
                                >
                                  {/* ImageList for rendering product image */}
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
                                {/* Box for displaying product name */}
                                <Box
                                  width={{ xs: "100%", md: "30%" }}
                                  paddingLeft={{ xs: 0, md: 2 }}
                                  marginBottom={{ xs: 2, md: 0 }}
                                >
                                  {/* Typography for the "Product" label */}
                                  <Typography
                                    fontSize={16}
                                    fontWeight="bold"
                                    color="gray"
                                  >
                                    Product
                                  </Typography>
                                  {/* Typography for displaying the product name */}
                                  <Typography fontSize={18} fontWeight="bold">
                                    {item.name}
                                  </Typography>
                                </Box>
                                {/* Box for displaying quantity */}
                                <Box
                                  width={{ xs: "100%", md: "30%" }}
                                  paddingLeft={{ xs: 0, md: 2 }}
                                  marginBottom={{ xs: 2, md: 0 }}
                                >
                                  {/* Typography for the "Quantity" label */}
                                  <Typography
                                    fontSize={16}
                                    fontWeight="bold"
                                    color="gray"
                                  >
                                    Quantity
                                  </Typography>
                                  {/* Typography for displaying the quantity */}
                                  <Typography fontSize={18} fontWeight="bold">
                                    {item.quantity}
                                  </Typography>
                                </Box>
                                {/* Box for displaying amount */}
                                <Box
                                  width={{ xs: "100%", md: "30%" }}
                                  paddingLeft={{ xs: 0, md: 2 }}
                                >
                                  {/* Typography for the "Amount" label */}
                                  <Typography
                                    fontSize={16}
                                    fontWeight="bold"
                                    color="gray"
                                  >
                                    Amount
                                  </Typography>
                                  {/* Typography for displaying the amount */}
                                  <Typography fontSize={18} fontWeight="bold">
                                    {item.amount}
                                  </Typography>
                                </Box>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </ScrollView>

                  {order.items && (
                    // Check if there are items in the order
                    <>
                      {/* Order Summary Section */}
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Title for Order Summary */}
                        <Typography style={{ fontWeight: "bold" }}>
                          Order Summary
                        </Typography>
                      </View>

                      {/* Delivery Section */}
                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Title for Delivery */}
                        <Typography style={{ fontWeight: "bold" }}>
                          Delivery
                        </Typography>

                        {/* Display the delivery fee */}
                        <Typography style={{ fontWeight: "bold" }}>
                          R {order.deliveryFee}
                        </Typography>
                      </View>

                      {/* Agent Referral Section */}
                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Title for Agent Referral */}
                        <Typography style={{ fontWeight: "bold" }}>
                          Agent Referral
                        </Typography>

                        {/* Display the agent referral amount */}
                        <Typography style={{ fontWeight: "bold" }}>
                          R {order.agentReferralAmount}
                        </Typography>
                      </View>

                      {/* Tax Section */}
                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Title for Tax */}
                        <Typography style={{ fontWeight: "bold" }}>
                          Tax
                        </Typography>

                        {/* Display the tax amount */}
                        <Typography style={{ fontWeight: "bold" }}>
                          R {order.Tax}
                        </Typography>
                      </View>

                      {/* Total Section */}
                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Title for Total */}
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                          Total
                        </Typography>

                        {/* Display the total order amount */}
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                          R {order.totalAmount}
                        </Typography>
                      </View>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Right Side Content */}
                <Box
                  backgroundColor="#062338"
                  mt={2}
                  p={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  mp={4}
                >
                  <Box mb={4}>
                    {/* Delivery Details Section */}
                    <View>
                      <Typography
                        variant="h5"
                        style={{
                          color: "#FFFFFF",
                          marginBottom: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        DELIVERY DETAILS
                      </Typography>

                      {/* Delivery Address Section */}
                      <View
                        style={{
                          borderBottom: "1px white solid",
                          marginBottom: 15,
                        }}
                      >
                        <Typography style={{ color: "grey" }}>
                          Delivery Address
                        </Typography>
                        <Typography variant="h6" style={{ color: "lightgrey" }}>
                          {order.deliveryAddress}
                        </Typography>
                      </View>

                      {/* Map Section */}
                      {order.coordinates && isLoaded ? (
                        <GoogleMap
                          center={{
                            lat: order.coordinates.lat,
                            lng: order.coordinates.lng,
                          }}
                          mapContainerStyle={{
                            height: "20vh",
                            width: "100%",
                            borderRadius: "25px", // Adjust the height as needed
                          }}
                          zoom={15}
                        >
                          <Marker
                            position={{
                              lat: order.coordinates.lat,
                              lng: order.coordinates.lng,
                            }}
                          />
                        </GoogleMap>
                      ) : (
                        <View>
                          <Text>Loading...</Text>
                        </View>
                      )}

                      {/* Delivery Notes Section */}
                      <Typography style={{ color: "grey", marginTop: "14px" }}>
                        Delivery Notes
                      </Typography>
                      <Typography style={{ color: "white" }}>
                        In essence, AMS aims to not only help businesses grow
                        but also make a positive image on society by nurturing
                        local talent and fostering sustainable business growth.
                      </Typography>
                      <View
                        style={{
                          marginTop: "10px",
                          borderBottomWidth: 1,
                          borderBottomColor: "lightgrey",
                        }}
                      ></View>

                      {/* Shipment Tracking Section */}
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "grey",
                            height: 14,
                            width: 14,
                            borderRadius: "50px",
                            marginRight: "8px",
                          }}
                        ></View>
                        {shipmentTrack &&
                          shipmentTrack.shipments &&
                          shipmentTrack.shipments.map((shipment, index) => (
                            <View key={index}>
                              <Typography
                                style={{ color: "white", marginTop: "6px" }}
                              >
                                {shipment.status}
                              </Typography>
                            </View>
                          ))}
                      </View>

                      
                      {/* Authentication PIN Section */}
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "8px",
                        }}
                      >
                        <Typography style={{ color: "lightgrey" }}>
                          AUTH PIN
                        </Typography>
                        <Typography
                          variant="h5"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          {order.Pin}
                        </Typography>
                      </View>

                      {/* Ongoing Button Section */}
                      <Button
                        variant="outlined"
                        style={{
                          marginTop: 60,
                          borderWidth: 1,
                          borderColor: "lightgrey",
                          borderRadius: 15,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: 16,
                            color: "lightgrey",
                          }}
                        >
                          ONGOING
                        </Typography>
                      </Button>
                    </View>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </View>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default DeliveryOngoing;
