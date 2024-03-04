import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
 
  TouchableOpacity,
 
} from "react-native";
import {
  Typography,
  Button,
  Card,
  Box,
  CardMedia,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Skeleton from "@mui/material/Skeleton";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import {  firestore } from "../../config";
import { useNavigation } from "@react-navigation/native";
import {
   getDocs,
  query,
  where,
  collection,  
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
const Products = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const businessName = route.params?.businessId || null;
  const [isRed, setIsRed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [review, setReview] = useState({});

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
          product.images && product.images.length > 0 ? product.images[0] : "", // Set the image to the first image in the array if available
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

  // This useEffect hook is triggered whenever the 'productId' dependency changes
  useEffect(() => {
    // Define an asynchronous function 'fetchReviews' to retrieve and process reviews
    const fetchReviews = async () => {
      try {
        // Iterate over the array of products and fetch reviews for each product
        for (const product of products) {
          // Attempt to fetch the document related to reviews for the given 'productId' from Firestore
          const ReviewsDoc = await firestore
            .collection("Reviews")
            .doc(product.id)
            .get();

          // Extract the data from the Firestore document
          const ReviewsData = ReviewsDoc.data();

          // Extract the 'reviews' array from the data, or default to an empty array
          const reviewsArray = ReviewsData?.reviews || [];

          // Filter out reviews with missing or zero 'myRatings'
          const validReviews = reviewsArray.filter(
            (review) => review.myRatings > 0
          );

          // Calculate the total sum of 'myRatings' from valid reviews
          const totalRatings = validReviews.reduce(
            (sum, review) => sum + review.myRatings,
            0
          );

          // Calculate the average rating by dividing the total ratings by the number of valid reviews
          const averageRating =
            validReviews.length > 0 ? totalRatings / validReviews.length : 0;

          // Set the calculated average rating in the component's state using the 'setReview' function
          setReview((prevReviews) => ({
            ...prevReviews,
            [product.id]: averageRating,
          }));
        }
      } catch (error) {
        // Log an error message if there's an issue fetching or processing the reviews
        console.error("Error fetching product data:", error);
      } finally {
        // Set loading state to false, indicating that the reviews have been fetched or an error occurred
        setLoading(false);
      }
    };

    // Call the 'fetchReviews' function when the component mounts or when 'products' changes
    fetchReviews();
  }, [products]);

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
            <View
              key={product.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: 1,
                height: 450,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* View for styling and layout within each Card */}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                  margin: 20,
                }}
              >
                {/* Box for styling product display */}
                <Box
                  style={{
                    objectFit: "cover",
                    position: "relative",
                    backgroundColor: "gold",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    alignself: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{ alignSelf: "center", width: 180, height: 180 }}
                  >
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
                        borderRadius: "100px",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    {/* Box for displaying a sale label */}
                    <Box
                      style={{
                        backgroundColor: "#E74040",
                        position: "absolute",
                        top: 0,
                        padding: 2,
                        width: "30%",
                        borderRadius: "8%",
                        alignSelf: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{ color: "#fff", textAlign: "center" }}
                      >
                        Sale
                      </Typography>
                    </Box>
                  </View>

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
                        <Text style={{ color: "white" }}>
                          ⭐ {review[product.id] || 0}
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
                      style={{
                        color: "gray",
                        wordWrap: "break-word",
                        display: "inline",
                      }}
                    >
                      {product.description && product.description.length > 25
                        ? `${product.description.slice(0, 25)}...`
                        : product.description}
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
                        <Icon2 name="download" size={20} /> {product.quantity}{" "}
                        Sales
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
            </View>
          ))}
        </Box>

        {/* Render Footer component */}
        <Footer />
      </View>
    </>
  );
};

export default Products;
