import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Container, Typography, Button } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import mapImage from "../../Global/images/mapImage.png";
import hdtv from "../../Global/images/hdtv.jpg";

const DateSelectionAndCheckout = () => {
  const navigation = useNavigation();
  const [orderTotal, setOrderTotal] = useState(0);

  const data = [
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
  ];

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

  const handlePayment = () => {
    // Construct the payment URL with the necessary parameters
    const paymentUrl =
      "https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&return_url=https://atlegilemarketing.firebaseapp.com/&cancel_url=https://atlegilemarketing.firebaseapp.com/&notify_url=https://atlegilemarketing.firebaseapp.com/&amount=" +
      orderTotal.toFixed(2) + // Use the calculated orderTotal here
      "&item_name=TestProduct";

    // Open the payment URL in the device's default browser
    Linking.openURL(paymentUrl);
  };

  return (
    <>
      <FollowUs />
      <Navbar />
      <View>
        <Container fixed sx={{ height: "90vh" }}>
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
                    Acount /
                  </TouchableOpacity>
                </Typography>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToOrderHistory}
                    style={{ color: "grey" }}
                  >
                    Cart
                  </TouchableOpacity>
                </Typography>
              </View>
              <Typography
                variant="h4"
                style={{ marginTop: "50px", fontWeight: "bold" }}
              >
                CART
              </Typography>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                ORDER #ABC246
              </Typography>
              <View>
                {data.map((item, index) => (
                  <View
                    style={{
                      width: "100%",
                      height: "48%",
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
                height: "790px",
                width: "35%",
                marginTop: "20px",
              }}
            >
              <View style={{ padding: "20px" }}>
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
                <Typography style={{ color: "#B7B9BC" }}>
                  Delivery Address
                </Typography>
                <Typography variant="h6" style={{ color: "#FFFFFF" }}>
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
                    // backgroundColor: "grey",
                    height: 150,
                    marginTop: 16,
                    borderRadius: 25,
                    backgroundImage: `url(${mapImage})`,
                  }}
                ></View>
                <Typography style={{ color: "#B7B9BC", marginTop: "14px" }}>
                  Delivery Notes
                </Typography>
                <Typography style={{ color: "#FFFFFF" }}>
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
                <Typography style={{ color: "#FFFFFF", marginTop: "14px" }}>
                  Select Delivery date
                </Typography>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      // backgroundColor: "grey",
                      height: "100px",
                      width: "80px",
                      marginTop: "10px",
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Typography style={{ color: "white" }}>Jul</Typography>
                      <Typography variant="h5" style={{ color: "white" }}>
                        02
                      </Typography>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: "grey",
                      height: "100px",
                      width: "80px",
                      marginTop: "10px",
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Typography style={{ color: "white" }}>Jul</Typography>
                      <Typography variant="h5" style={{ color: "white" }}>
                        04
                      </Typography>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: "grey",
                      height: "100px",
                      width: "80px",
                      marginTop: "10px",
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Typography style={{ color: "white" }}>Jul</Typography>
                      <Typography variant="h5" style={{ color: "white" }}>
                        06
                      </Typography>
                    </View>
                  </TouchableOpacity>
                </View>

                <Button
                  variant="outlined"
                  style={{
                    marginTop: 90,
                    borderWidth: 1,
                    borderColor: "lightgrey",
                    borderRadius: 15,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onClick={handlePayment}
                >
                  <Typography
                    style={{
                      fontSize: 16,
                      color: "#FFFFFF",
                    }}
                  >
                    CHECKOUT
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

export default DateSelectionAndCheckout;
