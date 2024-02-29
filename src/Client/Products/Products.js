import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  Box,
  CardMedia,
  Snackbar,
  CardContent,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Skeleton from "@mui/material/Skeleton";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import { firebase, firestore, auth } from "../../config";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  onSnapshot,
  Timestamp,
  FieldPath,
} from "firebase/firestore";
import BusinessCard from "../Landing/BusinessCard";

import { useRoute } from "@react-navigation/native";
const Products = () => {
  const navigation = useNavigation();
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const scrollViewRef1 = useRef(null);
  const scrollViewRef2 = useRef(null);
  const scrollViewRef3 = useRef(null);
  const route = useRoute();
  const businessName = route.params?.businessId || null;
  const [collectionList, setCollectionList] = useState([]);
  const [firebaseCollection, setFirebaseCollection] = useState(null);
  const [isRed, setIsRed] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);

  // Function to navigate to product details screen with the specified productId
const navigateProductDetails = (productId) => {
  // Navigate to the "ProductDetails" screen with the provided productId as a parameter
  navigation.navigate("ProductDetails", { productId });
};

// Function to toggle the heart icon for adding/removing product from favorites
const toggleHeart = async (product) => {
  try {
    // Check if the product or its ID is undefined
    if (!product || !product.id) {
      // Log an error message and return if product or product ID is undefined
      console.error("Product or product ID is undefined", product);
      return;
    }

    // Reference to the "Favourites" collection in Firestore
    const favCollectionRef = firestore.collection("Favourites");
    // Reference to the document in the "Favourites" collection with the product ID
    const favDocRef = favCollectionRef.doc(product.id);

    // Retrieve the document snapshot for the product in "Favourites" collection
    const favDoc = await favDocRef.get();

    // Check if the document exists in "Favourites" collection
    if (favDoc.exists) {
      // Document exists, remove the product from favorites
      await favDocRef.delete();
      // Set the state to indicate that the heart icon should not be filled
      setIsRed(false);
    } else {
      // Document does not exist, add the product to favorites
      await favDocRef.set({
        productId: product.id,
        uid: uid,
        productName: product.name,
        description: product.description,
        price: product.price,
        businessName: product.businessName,
        company: product.company,
        brand: product.brand,
        // Set the image of the product (first image from the array)
        image:
          product.images && product.images.length > 0
            ? product.images[0]
            : "",
      });
      // Set the state to indicate that the heart icon should be filled
      setIsRed(true);
      // Set the state to show the success snackbar
      setShowSnackbar(true);
    }
  } catch (error) {
    // Log an error message if there's an error while toggling heart icon
    console.error("Error toggling heart:", error);
  }
};

 // Function to add a product to the cart
const addToCart = async (product) => {
  try {
    // Check if the product or its ID is undefined
    if (!product || !product.id) {
      console.error("Product or product ID is undefined", product);
      return;
    }

    // Reference to the "Cart" collection in Firestore
    const cartCollectionRef = firestore.collection("Cart");

    // Add a new document to the "Cart" collection with product details
    await cartCollectionRef.add({
      uid: uid,
      productId: product.id,
      description: product.description,
      price: product.price,
      name: product.name,
      quantity: 1, // Set initial quantity to 1 when adding to the cart
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "", // Set the image to the first image in the array if available
    });

    setShowSnackbar1(true); // Display a snackbar to notify the user about the successful addition
  } catch (error) {
    console.error("Error adding to cart:", error); // Log any errors that occur during the process
  }
};

// Function to handle closing the snackbar for cart notifications
const handleSnackbarClose1 = () => {
  setShowSnackbar1(false);
};

// Function to handle closing the general snackbar
const handleSnackbarClose = () => {
  setShowSnackbar(false);
};

useEffect(() => {
  // Define an asynchronous function to fetch products based on businessName
  const fetchProducts = async () => {
    // Reference to the "Products" collection in Firestore
    const cartCollectionRef = collection(firestore, "Products");

    // Define a query to retrieve products with a specific businessName
    const q = query(
      cartCollectionRef,
      where("businessName", "==", businessName)
    );

    try {
      // Retrieve the query snapshot from Firestore
      const querySnapshot = await getDocs(q);

      // Initialize an empty array to store product data
      const productsData = [];

      // Iterate through each document in the query snapshot
      querySnapshot.forEach((doc) => {
        // Extract the document ID and merge it with document data
        const productWithId = { id: doc.id, ...doc.data() };

        // Push the merged data into the productsData array
        productsData.push(productWithId);
      });

      // Log the fetched products data for debugging purposes
      console.log("productsData is ", productsData);

      // Update the state with the fetched products data
      setProducts(productsData);

      // Set loading state to false after successfully fetching products
      setLoading(false);
    } catch (error) {
      // Log any errors that occur during the fetch process
      console.error("Error fetching product data:", error);
    }
  };

  // Invoke the fetchProducts function when the component mounts (empty dependency array)
  fetchProducts();
}, []);

// Conditionally render a loading state using Skeleton when the 'loading' state is true
if (loading) {
  // Return a Card component containing Skeleton elements to represent a loading state
  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Skeleton element representing a rectangular shape (e.g., an image or product placeholder) */}
      <Skeleton
        variant="rectangular"
        width={270}
        height={270}
        animation="wave"
      />

      {/* Skeleton element representing a text placeholder with specified width and height */}
      <Skeleton variant="text" width={100} height={20} animation="wave" />
      <Skeleton variant="text" width={200} height={16} animation="wave" />
      <Skeleton variant="text" width={200} height={16} animation="wave" />
      <Skeleton variant="text" width={80} height={14} animation="wave" />
    </Card>
  );
}


  return (
    <>
     // View component wrapping the entire product display screen with a white background
<View style={{ backgroundColor: "white" }}>
  {/* Render FollowUs component */}
  <FollowUs />

  {/* Render Navbar component */}
  <Navbar />

  {/* Render SearchBar component */}
  <SearchBar />

  {/* Map through the 'products' array and render a Card for each product */}
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      margin: 2,
    }}
  >
    {products.map((product) => (
      // Card component representing each product
      <Card
        key={product.id}
        sx={{
          width: 300,
          height: 450,
          margin: 2,
        }}
      >
        {/* View for styling and layout within each Card */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: "5%", // Adjust as needed
            paddingTop: 10,
          }}
        >
          {/* Box for styling product display */}
          <Box
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              position: "relative",
              backgroundColor: "whitesmoke",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              alignself: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            {/* CardMedia component representing the product image */}
            <CardMedia
              component="img"
              height="140"
              image={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "../../assets/image/headsets.png"
              }
              alt={product.name}
              style={{
                position: "relative",
                borderRadius: "100px",
                objectFit: "cover",
                width: 220,
                height: 220,
                alignSelf: "center",
              }}
            />

            {/* Box for displaying a sale label */}
            <Box
              style={{
                backgroundColor: "#E74040",
                position: "absolute",
                bottom: 200,
                padding: 2,
                width: "22%",
                borderRadius: "8%",
                alignSelf: "center",
              }}
            >
              {/* Typography component for displaying the sale label */}
              <Typography
                variant="h5"
                style={{ color: "#fff", textAlign: "center" }}
              >
                sale
              </Typography>
            </Box>

            {/* Snackbar for showing a success message when adding to favorites */}
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MuiAlert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Product added to favorites!
              </MuiAlert>
            </Snackbar>

            {/* Box containing heart and shopping cart icons with interaction */}
            <Box
              style={{
                paddingHorizontal: 10,
                position: "absolute",
                bottom: 30,
                left: 80,
                width: "6vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              {/* TouchableOpacity for toggling heart icon */}
              <TouchableOpacity onPress={() => toggleHeart(product)}>
                {/* Icon component representing the heart icon */}
                <Icon
                  name={isRed ? "heart" : "heart-o"}
                  size={20}
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                  color={isRed ? "red" : "black"}
                />
              </TouchableOpacity>

              {/* TouchableOpacity for adding product to the cart */}
              <TouchableOpacity
                onPress={() => addToCart(product)}
                disabled={!product}
              >
                {/* Snackbar for showing a success message when adding to the cart */}
                <Snackbar
                  open={showSnackbar1}
                  autoHideDuration={3000}
                  onClose={handleSnackbarClose1}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MuiAlert
                    onClose={handleSnackbarClose1}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Product added to Cart!
                  </MuiAlert>
                </Snackbar>

                {/* Icon component representing the shopping cart icon */}
                <Icon
                  name="shopping-cart"
                  size={20}
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                  color="black"
                />
              </TouchableOpacity>
            </Box>
          </Box>

          {/* View for styling and layout within each Card */}
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            {/* View for displaying product details */}
            <View>
              {/* View for displaying product category and rating */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Text component displaying the product category */}
                <Text
                  style={{
                    flex: 1,
                    fontSize: "15px",
                    color: "#4FC3F7",
                    fontWeight: "bold",
                  }}
                >
                  {product.selectedProductCategory}
                </Text>

                {/* View for displaying star rating */}
                <View
                  style={{
                    backgroundColor: "#072840",
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    borderRadius: 15,
                  }}
                >
                  {/* Text component displaying the star rating */}
                  <Text>
                    ⭐ <Text style={{ color: "white" }}> 4.9</Text>
                  </Text>
                </View>
              </View>

              {/* Typography component for displaying the product name */}
              <Typography variant="h5" component="h5">
                {product.name && product.name.slice(0, 15)}
                {product.name && product.name.length < 50 ? "" : "..."}
              </Typography>

              {/* Typography component for displaying the product description */}
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: "gray" }}
              >
                {product.description && product.description.slice(0, 25)}
                {product.description && product.description.length < 25
                  ? ""
                  : "..."}
              </Typography>

              {/* Box for displaying additional product details */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                {/* Typography component for displaying sales information */}
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "gray" }}
                >
                  <Icon2 name="download" size={20} /> {product.quantity} Sales
                </Typography>

                {/* View for displaying product price */}
                <View style={{ display: "flex", flexDirection: "row" }}>
                  {/* Typography component for displaying the original product price */}
                  <Typography
                    variant="subtitle2"
                    component="p"
                    style={{
                      color: "#BDBDBD",
                      fontSize: "18px",
                      fontWeight: "700",
                      marginRight: "10px",
                    }}
                  >
                    R{product.price}
                  </Typography>

                  {/* Typography component for displaying the discounted product price */}
                  <Typography
                    variant="subtitle2"
                    component="p"
                    style={{
                      color: "rgb(97, 151, 97)",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    R{product.price}
                  </Typography>
                </View>
              </Box>
            </View>

            {/* Button for navigating to the product details screen */}
            <Button
              style={{
                border: "2px black solid",
                alignSelf: "flex-start",
                paddingHorizontal: "5px",
                borderRadius: "50px",
                marginBottom: 15,
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => navigateProductDetails(product.id)}
            >
              VIEW <Icon name="arrow-right" size={20} />
            </Button>
          </View>
        </View>
      </Card>
    ))}
  </Box>

  {/* Render Footer component */}
  <Footer />
</View>

    </>
  );
};

export default Products;
