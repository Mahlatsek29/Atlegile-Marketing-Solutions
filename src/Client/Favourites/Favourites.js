import { View, Text, ScrollView } from "react-native";
import React from "react";
import SideNav from "../../Global/SideNav";
import { Footer } from "../../Global/Footer";
import Navbar from "../../Global/Navbar";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import FollowUs from "../../Global/Header";
import Card2 from "../../Global/Card2";

const Favourites = ({ item }) => {
  return (
    <View>
      <FollowUs />
      <Navbar />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <SideNav />

        <ScrollView>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "40px",
              padding: "10px",
            }}
          >
            FAVOURITES
          </Typography>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <ScrollView horizontal={true}>
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
            </ScrollView>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <ScrollView horizontal={true}>
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};
export default Favourites;
