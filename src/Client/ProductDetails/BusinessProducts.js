import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Typography, Grid, Button,Box } from "@mui/material";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import ProductCard from "../../Global/Card";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import shop from "../../Global/images/svg_landing.svg";
import shop2 from "../../Global/images/svg_landing.svg";
import { firebase, auth } from "../../config";
import { useNavigation } from "@react-navigation/native";

export default function BusinessProducts() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const scrollViewRef1 = useRef(null);
  const scrollViewRef2 = useRef(null);
  const scrollViewRef3 = useRef(null);

  const navigatebusinessproduct = () => {
    navigation.navigate("BusinessProducts");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = firebase.firestore().collection("Products");

      try {
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = (scrollViewRef) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  const scrollRight = (scrollViewRef) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <>
      <FollowUs />
      <Navbar />
      <SearchBar />
      <Box>

      </Box>
      <Footer />
    </>
  );
}
