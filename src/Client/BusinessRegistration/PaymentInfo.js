import React, { useState } from "react";
import { View, Text, Image, Linking } from "react-native";
import { Button, TextInput as PaperTextInput } from "react-native-paper";

import background from "../../Global/images/Reed.jpg";
import logo from "../../Global/images/logo.svg";
import Banner from "../../Global/images/media bg-cover.png";
import { TextField } from "@mui/material";

const PaymentInfo = () => {
  const [showWebView, setShowWebView] = useState(false);

  const handlePaymentButtonPress = () => {
    const paymentUrl =
      "https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&return_url=https://atlegilemarketing.firebaseapp.com/&cancel_url=https://atlegilemarketing.firebaseapp.com/&notify_url=https://atlegilemarketing.firebaseapp.com/&amount=3170.00&item_name=TestProduct";

    // Open the payment URL in the device's default browser
    Linking.openURL(paymentUrl);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        <Image
          source={{ uri: background }}
          style={{ flex: 1, resizeMode: "cover" }}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 2, justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: Banner }}
              style={{
                height: "21%",
                width: "100%",
                paddingTop: "30%",
                marginLeft: 10,
                marginRight: 2,
                top: 480,
              }}
            />
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: "#fff", marginLeft: -10 }}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <Image
                source={{ uri: logo }}
                style={{
                  height: "9%",
                  width: "80%",
                  paddingTop: "30%",
                  scale: "0.5",
                }}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "75%",
                marginLeft: 80,
                marginBottom: 30,
              }}>
              <Text style={{ color: "#000", textAlign: "left", fontSize: 30, fontWeight:'bold' }}>
                PAYMENT INFO
              </Text>
              <TextField
                id="standard-basic"
                label="Card Holder"
                variant="standard"
                style={{ width: "100%" }}
              />
              <TextField
                id="standard-basic"
                label="Card Number"
                variant="standard"
                style={{ width: "100%" }}
              />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  id="standard-basic"
                  label="Expiary"
                  variant="standard"
                  style={{ width: "45%", marginRight: "15px" }}
                />
                <TextField
                  id="standard-basic"
                  label="CVV"
                  variant="standard"
                  style={{ width: "45%", marginRight: "15px" }}
                />
                
               {/* <TextField
                id="outlined-select-currency"
                select
                label="Expiry"
                variant="standard"
                // helperText="Please select your currency"
                value={selectedExpiry}
                onChange={handleExpiryChange}
                style={{ width: "48%" }}>
                {expiryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField> */}
              </View>
              <Button
                mode="contained"
                onPress={handlePaymentButtonPress}
                style={{
                  width: "80%",
                  height: "15%",
                  margin: 20,
                  borderRadius: 30,
                  backgroundColor: "#072840",
                }}>
                Continue
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentInfo;
