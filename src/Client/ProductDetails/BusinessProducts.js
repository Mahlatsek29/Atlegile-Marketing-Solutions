import { View, ScrollView } from "react-native";
import { Container,Typography } from "@mui/material";
import React from "react";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import ProductCard from "../../Global/Card2";

const BusinessProducts = () => {
  return (
    <View>
      <Navbar />
      <SearchBar />
      <View>
        <Container fixed>
          <View style={{ marginTop: 20 }}>
            <Typography>Home / VAAS /</Typography>
          </View>
          <View style={{ color: "white", marginTop: 20 }}>
            <Typography
              variant="h4"
              style={{
                height: 140,
                display: "flex",
                fontWeight: "600",
                alignItems: "center",
                backgroundColor: "#072840",
              }}
            >
              PRODUCTS
            </Typography>
          </View>
          <View style={{ padding: 30 }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: 10 }}
            >
              MINDMATTERS PUBLICATIONS
            </Typography>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}
            >
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}
            >
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </View>
          <View style={{ padding: 30 }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: 10 }}
            >
              MINDMATTERS PUBLICATIONS
            </Typography>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}
            >
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </View>
        </Container>
      </View>
    </View>
  );
};

export default BusinessProducts;
