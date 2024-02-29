import React from "react";
import { View } from "react-native";
import { Container, Typography, Button } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";

// Importing necessary modules from React and other components
const Reciept = () => {
  // Using the useNavigation hook to get the navigation object
  const navigation = useNavigation();

  // Function to navigate to the "Landing" page
  const navigateToLanding = () => {
    navigation.navigate("Landing");
  };

  // Return JSX representing the Receipt component
  return (
    <View style={{ backgroundColor: "white" }}>
      {/* Including FollowUs component */}
      <FollowUs />

      {/* Including Navbar component */}
      <Navbar />

      {/* Container component with fixed height and styles */}
      <Container fixed sx={{ height: "85vh", marginBottom: 25 }}>
        {/* Main content view with specific styles */}
        <View
          style={{
            height: "800px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* Displaying a checkbox icon */}
          <View>
            <Icon
              name="checkbox-outline"
              size={190}
              style={{
                marginTop: "20px",
                color: "#66BB6A",
                marginBottom: "10px",
              }}
            />
          </View>

          {/* Heading for thanking the user */}
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            THANK YOU FOR YOUR PURCHASE!
          </Typography>

          {/* Message thanking the user and indicating successful order placement */}
          <Typography style={{ fontWeight: "bold", marginTop: "40px" }}>
            Your order has been successfully placed, and we appreciate your
            trust in our products/services.
          </Typography>

          {/* Section displaying order details */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography style={{ marginTop: "40px" }}>
              Order Details:
            </Typography>
            <Typography>Order Number: #ABC246</Typography>
            <Typography>Date: 11 DEC 2023</Typography>
            <Typography>Total Amount: R4500.00</Typography>
          </View>

          {/* Additional message and contact information */}
          <Typography
            style={{
              fontWeight: "bold",
              marginBottom: "40px",
              marginTop: "40px",
            }}
          >
            Our team is working diligently to process and ship your order. If
            you have any questions or concerns, our customer support team is
            here to help. Contact us at 0123456789
          </Typography>

          {/* Button to continue shopping, with specific styles and onClick handler */}
          <Button
            style={{ borderRadius: "40px", backgroundColor: "#072840" }}
            variant="contained"
            onClick={navigateToLanding}
          >
            CONTINUE SHOPPING
          </Button>
        </View>
      </Container>

      {/* Including Footer component */}
      <Footer />
    </View>
  );
};

export default Reciept;
