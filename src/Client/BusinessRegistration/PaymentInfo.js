import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { View, Text, TextInput, Picker, Image } from "react-native";
import { Button, Card, TextInput as PaperTextInput } from "react-native-paper";

import background from "../../Global/images/Reed.jpg";
import logo from "../../Global/images/logo.svg";
import Banner from "../../Global/images/media bg-cover.png";

const PaymentInfo = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear + index);
  const months = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, "0")
  );
  const expiryOptions = years
    .map((year) => {
      return months.map((month) => `${month}/${year}`);
    })
    .flat();
  const [selectedExpiry, setSelectedExpiry] = useState("");

  const handleExpiryChange = (value) => {
    setSelectedExpiry(value);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://your-website.com/payment-info" }}
        style={{ flex: 1 }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Image
          source={{ uri: background }}
          style={{
            flex: 1,
            resizeMode: "cover",
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginBottom: -100,
        }}>
        <View style={{ flex: 2, justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            {/* Your image component */}
            <Image
              source={{ uri: Banner }}
              style={{
                height: "21%",
                width: "100%",
                paddingTop: "30%",
                marginLeft: 10,
                marginRight: 2,
              }}
            />
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: "#fff", marginLeft: -10 }}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <Image
                source={{ uri: logo }}
                style={{ height: "9%", width: "80%", paddingTop: "30%" }}
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
              <Text style={{ color: "#000", textAlign: "left", fontSize: 32 }}>
                PAYMENT INFO
              </Text>
              <PaperTextInput label="Card Holder" style={{ width: "100%" }} />
              <PaperTextInput
                label="Card Number"
                keyboardType="numeric"
                style={{ width: "100%", marginBottom: 10, marginTop: 10 }}
              />
              <Picker
                selectedValue={selectedExpiry}
                onValueChange={(value) => handleExpiryChange(value)}
                style={{ width: "48%" }}>
                {expiryOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
              <PaperTextInput
                label="Cvv"
                style={{ width: "50%", marginLeft: 5 }}
              />
              <Button
                mode="contained"
                onPress={() => console.log("Continue button pressed")}
                style={{
                  width: "80%",
                  height: "10%",
                  margin: 20,
                  borderRadius: 30,
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
