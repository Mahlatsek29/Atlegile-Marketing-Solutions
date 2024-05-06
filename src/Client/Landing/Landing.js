import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Container, Typography, Grid, Button } from "@mui/material";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import { firebase, firestore, auth } from "../../config";
import BusinessCard from "./BusinessCard";

const Landing = () => {
  const [businesses, setBusinesses] = useState([]);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setWidth(window.width);
    };

    Dimensions.addEventListener("change", handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener("change", handleDimensionsChange);
    };
  }, []);

  useEffect(() => {
    // Define an asynchronous function to fetch products
    const fetchProducts = async () => {
      // Reference to the "Products" collection in Firestore
      const productsRef = firebase.firestore().collection("Products");

      try {
        // Get a snapshot of the documents in the collection
        const snapshot = await productsRef.get();

        // Initialize an empty array to store unique company names
        const collection = [];

        // Map through the documents and extract data
        const productsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        // Extract unique company names from the data and push to the collection array
        productsData.map((item) => collection.push(item.company));

        // Update the state with unique company names
        setBusinesses([...new Set(collection)]);
      } catch (error) {
        // Handle errors if any occur during the fetching process
        console.error("Error fetching products:", error);
      }
    };

    // Call the fetchProducts function when the component mounts (empty dependency array)
    fetchProducts();
  }, []);

  return (
    <>
      {width < 600 ? (
        <View style={styles.container}>
          {/* Including FollowUs component */}
          <FollowUs />

          {/* Including Navbar component */}
          <Navbar />
          {/* Including SearchBar component */}
          <SearchBar />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Header Grid */}
            <Grid
              item
              xl={12}
              style={{
                alignItems: "center", // Centering horizontally
                justifyContent: "center",
              }}
            >
              {/* Header Text */}
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "30px 50px", // Margin top and bottom 30px, left and right 50px
                  fontSize: 34, // Font size 34
                }}
              >
                EXPLORE
              </Text>
            </Grid>

            {/* Button Grid */}
            <Grid
              item
              style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
            >
              {/* Buy Button */}
              <TouchableOpacity
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 150,
                  justifyContent: "center", // Centering content vertically
                  alignItems: "center", // Centering content horizontally
                  borderWidth: 3,
                  borderColor: "gold", // Border color
                  margin: 5,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "#FFF" }}>Buy</Text>
              </TouchableOpacity>

              {/* Sell Button */}
              <TouchableOpacity
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 150,
                  justifyContent: "center", // Centering content vertically
                  alignItems: "center", // Centering content horizontally
                  borderWidth: 3,
                  borderColor: "gold", // Border color
                  margin: 5,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "#FFF" }}>Sell</Text>
              </TouchableOpacity>

              {/* Support Button */}
              <TouchableOpacity
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 150,
                  justifyContent: "center", // Centering content vertically
                  alignItems: "center", // Centering content horizontally
                  borderWidth: 3,
                  borderColor: "gold", // Border color
                  margin: 5,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "#FFF" }}>Support</Text>
              </TouchableOpacity>
            </Grid>
          </View>

          <Grid
            container
            spacing={2}
            sx={{ display: "flex" }}
          >
            <Grid item xs={12} sm={10} md={9}>
              {/* FlatList to display businesses using BusinessCard component */}
              <FlatList
                data={businesses}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <BusinessCard business={item} />}
              />
            </Grid>
          </Grid>

          {/* Grid layout for a section with business information */}
          <Grid
            container
            style={{
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Grid item with responsive sizing */}
            <Grid
              item
              xl={6}
              lg={8}
              md={8}
              sm={10}
              xs={10}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* View containing information about Africa's business support */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width: "66vw",
                }}
              >
                {/* First block of information */}
                <View
                  style={{
                    margin: 5,
                    height: "auto",
                    width: "32vw",
                    padding: 5,
                  }}
                >
                  {/* Heading */}
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "bolder",
                      justifySelf: "center",
                      paddingTop: "4vh",
                    }}
                  >
                    AFRICA'S BUSINESS <br /> SUPPORT
                  </Typography>
                  {/* Subheading */}
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      flexWrap: "wrap",
                    }}
                  >
                    High Impact Enterprises + Skills Development Solutions
                  </Typography>
                  {/* Buttons */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginVertical: "15px",
                    }}
                  >
                    <button
                      style={{
                        borderRadius: "15px",
                        color: "#fff",
                        backgroundColor: "#000",
                        marginRight: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}
                    >
                      SHOP
                    </button>
                    <button
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 3,
                        paddingRight: 3,
                        borderRadius: "15px",
                      }}
                    >
                      ABOUT US
                    </button>
                  </View>
                </View>

                {/* Second block of information with multiple projects */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "32vw",
                  }}
                >
                  {/* Each project block with details */}
                  <View
                    style={{
                      border: "1px solid orange",
                      padding: 5,
                      marginRight: 5,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "12px" }}>
                      soWhereTo <br /> Township Business
                    </Typography>
                    <Typography style={{ color: "orange" }}>
                      VIEW PROJECT
                    </Typography>
                  </View>
                  <View
                    style={{
                      border: "1px solid orange",
                      padding: 5,
                      marginRight: 5,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "12px" }}>
                      soWhereTo <br /> Youth Training
                    </Typography>
                    <Typography style={{ color: "orange" }}>
                      VIEW PROJECT
                    </Typography>
                  </View>
                  <View
                    style={{
                      border: "1px solid orange",
                      padding: 5,
                      marginRight: 5,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "12px" }}>
                      soWhereTo <br /> @HUB Support
                    </Typography>
                    <Typography style={{ color: "orange" }}>
                      VIEW PROJECT
                    </Typography>
                  </View>
                </View>
              </View>
            </Grid>
          </Grid>

          <Footer />
        </View>
      ) : (
        <View style={styles.container}>
          {/* Including FollowUs component */}
          <FollowUs />

          {/* Including Navbar component */}
          <Navbar />
          {/* Including SearchBar component */}
          <SearchBar />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Header Grid */}
            <Grid
              item
              xl={12}
              style={{
                alignItems: "center", // Centering horizontally
                justifyContent: "center",
              }}
            >
              {/* Header Text */}
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "30px 50px", // Margin top and bottom 30px, left and right 50px
                  fontSize: 34, // Font size 34
                }}
              >
                EXPLORE
              </Text>
            </Grid>

            {/* Button Grid */}
            <Grid
              item
              style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
            >
              {/* Buy Button */}
              <TouchableOpacity
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 150,
                  justifyContent: "center", // Centering content vertically
                  alignItems: "center", // Centering content horizontally
                  borderWidth: 3,
                  borderColor: "gold", // Border color
                  margin: 5,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "#FFF" }}>Buy</Text>
              </TouchableOpacity>

              {/* Sell Button */}
              <TouchableOpacity
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 150,
                  justifyContent: "center", // Centering content vertically
                  alignItems: "center", // Centering content horizontally
                  borderWidth: 3,
                  borderColor: "gold", // Border color
                  margin: 5,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "#FFF" }}>Sell</Text>
              </TouchableOpacity>

              {/* Support Button */}
              <TouchableOpacity
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 150,
                  justifyContent: "center", // Centering content vertically
                  alignItems: "center", // Centering content horizontally
                  borderWidth: 3,
                  borderColor: "gold", // Border color
                  margin: 5,
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "#FFF" }}>Support</Text>
              </TouchableOpacity>
            </Grid>
          </View>

          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12} sm={10} md={9}>
              {/* FlatList to display businesses using BusinessCard component */}
              <FlatList
                data={businesses}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <BusinessCard business={item} />}
              />
            </Grid>
          </Grid>

          {/* Grid layout for a section with business information */}
          <Grid
            container
            style={{
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Grid item with responsive sizing */}
            <Grid
              item
              xl={6}
              lg={8}
              md={8}
              sm={10}
              xs={10}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* View containing information about Africa's business support */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width: "66vw",
                }}
              >
                {/* First block of information */}
                <View
                  style={{
                    margin: 5,
                    height: "auto",
                    width: "32vw",
                    padding: 5,
                  }}
                >
                  {/* Heading */}
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "bolder",
                      justifySelf: "center",
                      paddingTop: "4vh",
                    }}
                  >
                    AFRICA'S BUSINESS <br /> SUPPORT
                  </Typography>
                  {/* Subheading */}
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      flexWrap: "wrap",
                    }}
                  >
                    High Impact Enterprises + Skills Development Solutions
                  </Typography>
                  {/* Buttons */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginVertical: "15px",
                    }}
                  >
                    <button
                      style={{
                        borderRadius: "15px",
                        color: "#fff",
                        backgroundColor: "#000",
                        marginRight: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}
                    >
                      SHOP
                    </button>
                    <button
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 3,
                        paddingRight: 3,
                        borderRadius: "15px",
                      }}
                    >
                      ABOUT US
                    </button>
                  </View>
                </View>

                {/* Second block of information with multiple projects */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "32vw",
                  }}
                >
                  {/* Each project block with details */}
                  <View
                    style={{
                      border: "1px solid orange",
                      padding: 5,
                      marginRight: 5,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "12px" }}>
                      soWhereTo <br /> Township Business
                    </Typography>
                    <Typography style={{ color: "orange" }}>
                      VIEW PROJECT
                    </Typography>
                  </View>
                  <View
                    style={{
                      border: "1px solid orange",
                      padding: 5,
                      marginRight: 5,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "12px" }}>
                      soWhereTo <br /> Youth Training
                    </Typography>
                    <Typography style={{ color: "orange" }}>
                      VIEW PROJECT
                    </Typography>
                  </View>
                  <View
                    style={{
                      border: "1px solid orange",
                      padding: 5,
                      marginRight: 5,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "12px" }}>
                      soWhereTo <br /> @HUB Support
                    </Typography>
                    <Typography style={{ color: "orange" }}>
                      VIEW PROJECT
                    </Typography>
                  </View>
                </View>
              </View>
            </Grid>
          </Grid>

          <Footer />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default Landing;
