import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Container, Typography } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import mapImage from "../../Global/images/mapImage.png";
import hdtv from "../../Global/images/hdtv.jpg";

const DeliveryAndChatSystem = () => {
  const navigation = useNavigation();
  const [orderTotal, setOrderTotal] = useState(0);
  const [chatmodelVisble, setChatmodelVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    // Initial chat data
    { messages: "Hello!", dateAntTime: "12:30 PM", status: "sent" },
    { messages: "Hi there!", dateAntTime: "12:35 PM", status: "recieved" },
  ]);

  const data = [
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
  ];

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
    // Calculate the total amount from the data
    const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);

    // Calculate the agent referral amount (10%)
    const agentReferral = totalAmount * 0.1;

    // Calculate the tax amount (15%)
    const tax = totalAmount * 0.15;

    // Add the delivery amount (R150.0)
    const deliveryAmount = 150.0;

    // Calculate the final order total
    const finalTotal = totalAmount + agentReferral + tax + deliveryAmount;

    setOrderTotal(finalTotal);
  }, [data]);

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
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
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
        <Container fixed sx={{ height: "88vh" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                height: "700px",
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
                <Typography>#AABBCC</Typography>
              </View>
              <Typography
                variant="h6"
                style={{ marginTop: "50px", fontWeight: "bold" }}
              >
                ORDER #AABBCC
              </Typography>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                PRODUCTS
              </Typography>
              <Typography style={{ marginBottom: "10px", fontWeight: "bold" }}>
                27 JUL, 2023
              </Typography>
              <View>
                {data.map((item, index) => (
                  <View
                    style={{
                      width: "100%",
                      height: "40%",
                      borderBottomWidth: 2,
                      borderBottomColor: "#1D1D1D",
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
                        backgroundImage: `url(${hdtv})`,
                      }}
                    />
                    <View style={{ width: "30%", paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        Products
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
                        Item
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.item}
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
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  marginTop: "200px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  Order Summary
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  R18 000.00
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
                  {orderTotal.toFixed(2)}
                </Typography>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#062338",
                height: "750px",
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
                <Typography style={{ color: "white" }}>
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
              </View>
            </View>
          </View>
        </Container>
      </View>
      <Footer />
    </>
  );
};

export default DeliveryAndChatSystem;
