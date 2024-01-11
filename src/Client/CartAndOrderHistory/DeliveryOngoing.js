import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Container, Typography, Button } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import mapImage from "../../Global/images/mapImage.png";
import hdtv from "../../Global/images/hdtv.jpg";

import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../config";
import axios from "axios";
const DeliveryOngoing = () => {
  const navigation = useNavigation();
  const [orderTotal, setOrderTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [agentReferral, setAgentReferral] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [chatmodelVisble, setChatmodelVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    // Initial chat data
    { messages: "Hello!", dateAntTime: "12:30 PM", status: "sent" },
    { messages: "Hi there!", dateAntTime: "12:35 PM", status: "recieved" },
  ]);

  const [cartData, setCartData] = useState([]);
  const [shipmentTrack, setShipmentTrack] = useState([]);
  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";
  const fetchCartData = async () => {
    const userId = "52TkIacrD4ermeLEhLU6udYXnhQ2";

    const cartCollectionRef = collection(firestore, "Cart");
    const q = query(cartCollectionRef, where("uid", "==", userId));

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
        // Add other relevant fields from your Cart collection
      });
    });

    setCartData(cartItems);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

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
    navigation.navigate("OrderHistory");
  };

  useEffect(() => {
    const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);

    // Calculate agent referral
    const calculatedReferral = totalAmount * 0.1;
    setAgentReferral(calculatedReferral);

    // Calculate other amounts (tax, delivery)
    const taxAmount = totalAmount * 0.15;
    setTax(taxAmount);

    const delivery = 150.0;
    setDeliveryAmount(delivery);

    // Calculate the final order total
    const finalTotal = totalAmount + calculatedReferral + taxAmount + delivery;
    setOrderTotal(finalTotal);
  }, [cartData]);

  const getShipment = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${CourierAPIKey}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        "https://api.shiplogic.com/v2/shipments?tracking_reference=TN7PRG",
        config
      );
      console.log("Courier API shipment No response:", response.data);
      return response.data.shipments;
    } catch (error) {
      console.error("Error getting shipments", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
      return [];
    }
  };
  useEffect(() => {
    const tackingShipment = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          "https://api.shiplogic.com/v2/tracking/shipments?tracking_reference=TN7PRG",
          config
        );
        console.log("Courier API traking shipment response:", response.data);

        setShipmentTrack(response.data);
      } catch (error) {
        console.error("Error getting shipments", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
        return [];
      }
    };

    tackingShipment();
    console.log("shipmentTrack:", shipmentTrack.shipments);
    //console.log("tracking_events:", shipmentTrack.shipments[0].tracking_events);
    //console.log("status:", shipmentTrack.shipments[0].tracking_events[0].status);
  }, []);
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
      <View>
        <Container fixed sx={{ height: "93vh" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                height: "800px",
                width: "65%",
                marginTop: "20px",
                marginRight: "10px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToLanding}
                    style={{ color: "grey" }}
                  >
                  <Text>Acount /</Text>  
                  </TouchableOpacity>
                </Typography>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToOrderHistory}
                    style={{ color: "grey" }}
                  >
                   <Text>Order History /</Text> 
                  </TouchableOpacity>
                </Typography>
                <Typography>#ABC246</Typography>
              </View>
              <Typography
                variant="h6"
                style={{ marginTop: "50px", fontWeight: "bold" }}
              >
                ORDER #ABC246
              </Typography>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                PRODUCTS
              </Typography>
              <Typography style={{ marginBottom: "10px", fontWeight: "bold" }}>
                {new Date().toLocaleDateString()}
              </Typography>
              <View>
                {cartData.map((item, index) => (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      borderBottomWidth: 2,
                      borderBottomColor: "#1D1D1D",
                      // backgroundColor:'yellow',
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 2,
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        width: "25%",
                        height: "100%",
                        backgroundColor: "#000026",
                        // backgroundColor:'red'
                      }}
                    >
                      <Image
                        source={{ uri: item.image }} // Assuming image is stored as a URL in Firebase
                        style={{
                          width: "100%",
                          height: "15vh",
                          resizeMode: "cover",
                        }}
                      />
                    </View>
                    <View style={{ width: "30%", paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        Product
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.product}
                      </Text>
                    </View>
                    <View style={{ width: "30%", paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        Quantity
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.quantity}
                      </Text>
                    </View>
                    <View style={{ width: "30%", paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        Amount
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  marginTop: "240px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  Order Summary
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {/* {cartItems.amount} */}
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
                <Typography style={{ fontWeight: "bold" }}>Delivery</Typography>
                <Typography style={{ fontWeight: "bold" }}>R150.00</Typography>
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
                  Agent Referal
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>10%</Typography>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}> Tax </Typography>
                <Typography style={{ fontWeight: "bold" }}>15%</Typography>
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
                  R{orderTotal.toFixed(2)}
                </Typography>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#062338",
                height: "800px",
                width: "35%",
                marginTop: "20px",
              }}
            >
              <View style={{ padding: "20px" }}>
                <Typography
                  variant="h5"
                  style={{
                    color: "white",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  DELIVERY DETAILS
                </Typography>
                <Typography style={{ color: "grey" }}>
                  Delivery Address
                </Typography>
                <Typography variant="h6" style={{ color: "lightgrey" }}>
                  564 Zamakulungisa St, Emdeni South, Soweto, 1861
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
                    backgroundColor: "grey",
                    height: 150,
                    marginTop: 16,
                    borderRadius: 25,
                    backgroundImage: `url(${mapImage})`,
                  }}
                ></View>
                <Typography style={{ color: "grey", marginTop: "14px" }}>
                  Delivery Notes
                </Typography>
                <Typography style={{ color: "lightgrey" }}>
                  In essence, AMS aims to not only help businesses grow but also
                  make a positive image on society by nurturing local talent and
                  fostering sustainable busibess growth.
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
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "grey",
                      height: 14,
                      width: 14,
                      borderRadius: 7, // Adjusted the borderRadius to a number
                      marginRight: 8,
                    }}
                  ></View>
                  {shipmentTrack.shipments && (
                      <Typography style={{ color: "lightgrey", marginTop: 6 }}>
                        {shipmentTrack.shipments[0].status}
                      </Typography>
                    )}
                </View>

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
                  <Typography style={{ color: "lightgrey", marginTop: "6px" }}>
                    Processing...
                  </Typography>
                </View>
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
                  <Typography style={{ color: "lightgrey", marginTop: "6px" }}>
                    On the way...
                  </Typography>
                </View>
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
                  <Typography style={{ color: "lightgrey", marginTop: "6px" }}>
                    Delivered.
                  </Typography>
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
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      borderRadius: 8,
                      backgroundColor: "gray",
                      marginRight: 5,
                    }}
                  />
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
                    1254
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
            </View>
          </View>
        </Container>
      </View>
      <Footer />
    </>
  );
};

export default DeliveryOngoing;
