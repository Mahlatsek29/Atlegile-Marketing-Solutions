import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
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
  TextField,
} from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import mapImage from "../../Global/images/mapImage.png";
import hdtv from "../../Global/images/hdtv.jpg";
import { useRoute } from "@react-navigation/native";
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { firestore } from "../../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
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

  const [chats, setChats] = useState([
    // Initial chat data
    { messages: "Hello!", dateAntTime: "12:30 PM", status: "sent" },
    { messages: "Hi there!", dateAntTime: "12:35 PM", status: "recieved" },
  ]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";
 
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
    const fetchOrdertData = async () => {
      try {
        const ordertDocRef = doc(firestore, "Orders", orderId);
        const orderDocSnapshot = await getDoc(ordertDocRef);

        if (orderDocSnapshot.exists()) {
          const orderData = orderDocSnapshot.data();
          console.log("Fetched product data:", orderData);
          setOrder(orderData);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchOrdertData();
  }, [firestore, orderId, user]);

  useEffect(() => {
    const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);
    const calculatedReferral = totalAmount * 0.1;
    setAgentReferral(calculatedReferral);

    const finalTotal = totalAmount + calculatedReferral + tax + deliveryAmount;
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

  const handleMessageButtonClick = () => {
    setChatmodelVisible(!chatmodelVisble);
  };

  

  const navigateToLanding = () => {
    navigation.navigate("Landing");
  };

  const navigateToOrderHistory = () => {
    navigation.navigate("OrderHistory", { orderId });
  };

   const tackingShipment = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${CourierAPIKey}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `https://api.shiplogic.com/v2/tracking/shipments?tracking_reference=${order.trackingEventsRef}`,
        config
      );
      console.log("Courier API tracking shipment response:", response.data);
      if (
        response.data &&
        response.data.shipments &&
        response.data.shipments.length > 0
      ) {
        setShipmentTrack(response.data);
      } else {
        console.error("Incomplete or undefined data received from the API");
      }
    } catch (error) {
      console.error("Error getting shipments", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
      // handle the error as needed
    }
  }, [order]);

  
 
  return (
    <>
      {chatmodelVisble && (
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
                <TouchableOpacity
                  onPress={handleSend}
                  style={{
                    backgroundColor: "#072840",
                    borderRadius: 40,
                    padding: 10,
                    marginLeft: 10,
                  }}
                >
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
                    <Typography>
                      {order.orderNumber}
                    </Typography>
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
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Order Summary
                        </Typography>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          Delivery
                        </Typography>

                        <Typography style={{ fontWeight: "bold" }}>
                          R {order.deliveryFee}
                        </Typography>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          {" "}
                          Agent Referral
                        </Typography>
                        <Typography style={{ fontWeight: "bold" }}>
                          R {order.agentReferralAmount}
                        </Typography>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography style={{ fontWeight: "bold" }}>
                          {" "}
                          Tax{" "}
                        </Typography>
                        <Typography style={{ fontWeight: "bold" }}>
                          R {order.Tax}
                        </Typography>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                          Total
                        </Typography>
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
                  mpr={4}
                >
                  <Box mb={4}>
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
                      {order.coordinates && (
                        <MapContainer
                          center={[
                            order.coordinates.lat,
                            order.coordinates.lng,
                          ]}
                          zoom={13}
                          ref={mapRef}
                          style={{
                            height: "20vh",
                            width: "100%",
                            borderRadius: "25px",
                          }}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                            position={[
                              order.coordinates.lat,
                              order.coordinates.lng,
                            ]}
                          >
                            <Popup>
                              <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                size="lg"
                                color="black"
                              />
                            </Popup>
                          </Marker>
                          {/* Additional map layers or components can be added here */}
                        </MapContainer>
                      )}

                      <Typography style={{ color: "grey", marginTop: "14px" }}>
                        Delivery Notes
                      </Typography>
                      <Typography style={{ color: "white" }}>
                        In essence, AMS aims to not only help businesses grow
                        but also make a positive image on society by nurturing
                        local talent and fostering sustainable busibess growth.
                      </Typography>
                      <View
                        style={{
                          marginTop: "10px",
                          borderBottomWidth: 1,
                          borderBottomColor: "lightgrey",
                        }}
                      ></View>
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
                          {" "}
                          
                                {shipment.status}
                                
                        </Typography>
                        </View>
                        ))}
                      </View>

                      <TouchableOpacity
                        style={{
                          marginTop: 20,
                          width: 120,
                          height: 30,
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 15,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                        onPress={handleMessageButtonClick}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "white",
                            margin: 0,
                            marginLeft: 5,
                          }}
                        >
                          MESSAGE
                        </Text>
                      </TouchableOpacity>
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
                      <Button
                        variant="outlined"
                        style={{
                          marginTop: 60,
                          // width: 350,
                          // height: 30,
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
                            // margin: 0,
                            // marginLeft: 5,
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
    </>
  );
};

export default DeliveryOngoing;
