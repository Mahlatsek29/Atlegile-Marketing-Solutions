import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Container,
  Grid,
  TextField,
  Avatar,
  CardMedia,
  Snackbar,
  Skeleton,
  Card,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ReviewsCard from "./ReviewsCard";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "../../config";
import { firebase, auth } from "../../config";
import Navbar from "../../Global/Navbar";

export default function ProductDetails({ navigation, route }) {
  const { productId } = route.params;
  const [myRatings, setMyRatings] = useState(2.5);
  const [product, setProduct] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const user = firebase.auth().currentUser;

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const handleChangeProduct = (relatedProductId) => {
    // Navigate to the new product's details page
    navigation.navigate("ProductDetails", { productId: relatedProductId });
  };

  // Function to toggle the heart (like) icon for a product in the user's favorites

  const toggleHeart = async () => {
    try {
      // Reference to the 'Favourites' collection in Firestore
      const favCollectionRef = firestore.collection("Favourites");

      // Reference to the document within 'Favourites' collection based on productId
      const favDocRef = favCollectionRef.doc(productId);

      // Retrieve the document snapshot from Firestore
      const favDoc = await favDocRef.get();

      if (favDoc.exists) {
        // Document exists, meaning the product is already in favorites
        // Remove the product from favorites by deleting the document
        await favDocRef.delete();
        // Set the state to indicate that the heart icon should not be red (not favorited)
        setIsRed(false);
      } else {
        // Document does not exist, meaning the product is not in favorites
        // Add the product to favorites by creating a new document
        await favDocRef.set({
          productId: productId,
          uid: uid,
          productName: product.name,
          description: product.description,
          price: product.price,
          businessName: product.businessName,
          company: product.company,
          brand: product.brand,
          image: product.images[0],
        });
        // Set the state to indicate that the heart icon should be red (favorited)
        setIsRed(true);
        // Set a flag to show a snackbar or notification that the product is added to favorites
        setShowSnackbar(true);
      }
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error toggling heart:", error);
    }
  };

  // Function to add a product to the user's shopping cart

  const addToCart = async () => {
    try {
      // Reference to the 'Cart' collection in Firestore
      const cartCollectionRef = firestore.collection("Cart");

      // Add a new document to the 'Cart' collection with product details
      await cartCollectionRef.add({
        uid: uid, // User ID associated with the cart
        productId: productId, // ID of the product being added
        description: product.description, // Description of the product
        price: product.price, // Price of the product
        name: product.name, // Name of the product
        quantity: 1, // Initial quantity set to 1 (can be adjusted)
        // Image of the product, if available; otherwise, an empty string
        image:
          product.images && product.images.length > 0 ? product.images[0] : "",
        // Additional fields can be added based on the product structure
      });

      // Set a flag to show a snackbar or notification that the product is added to the cart
      setShowSnackbar1(true);
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error adding to cart:", error);
    }
  };

  // Function to handle the addition of a product to the user's shopping cart

  const handleAddToCart = async () => {
    // Check if the user is authenticated
    if (!user) {
      // If not authenticated, display an alert and navigate to the sign-in screen
      alert("Please login first");
      return navigation.navigate("SignIn");
    }

    try {
      // Reference to the 'Cart' collection in Firestore
      const cartCollectionRef = collection(firestore, "Cart");

      // Add a new document to the 'Cart' collection with user and product details
      await addDoc(cartCollectionRef, {
        uid: user.uid, // User ID associated with the cart
        productId: productId, // ID of the product being added
        price: product.price, // Price of the product
        name: product.name, // Name of the product
        quantity: quantity, // Quantity of the product being added
        // Image of the product, using the current selected image
        image: product.images[currentImage],
        // Timestamp indicating when the product is added to the cart
        timestamp: serverTimestamp(),
      });

      // Log a message indicating successful addition to the cart
      console.log("Item added to the cart!");

      // Navigate to the date selection and checkout screen
      navigation.navigate("DateSelectionAndCheckout");
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error adding item to cart:", error);
    }
  };

  // Function to fetch reviews for a specific product from the Firestore database

  const fetchReviews = async () => {
    try {
      // Reference to the document within 'Reviews' collection based on productId
      const reviewsCollectionRef = doc(firestore, "Reviews", productId);

      // Retrieve the document snapshot from Firestore
      const reviewsCollectionSnapshot = await getDoc(reviewsCollectionRef);

      // Check if the reviews collection for the product exists
      if (reviewsCollectionSnapshot.exists()) {
        // Extract reviews data from the snapshot
        const reviewsData = reviewsCollectionSnapshot.data();

        // Log fetched reviews data for debugging purposes
        console.log("Fetched reviews data:", reviewsData);

        // Set the reviews state with the fetched reviews or an empty array if none
        setReviews(reviewsData.reviews || []);
      } else {
        // Log a message if the reviews collection is not found for the specified product
        console.log("Reviews collection not found for product:", productId);

        // Set the reviews state to an empty array
        setReviews([]);
      }
    } catch (error) {
      // Handle any errors that might occur during the process
      console.log("Error fetching reviews:", error);
    }
  };

  // useEffect hook to fetch reviews when the component mounts or when the productId changes
  useEffect(() => {
    fetchReviews();
  }, [firestore, productId]);

  // ... (your existing code)

  // Function to handle the posting of a review for a specific product to the Firestore database

  const handleReviewPost = async () => {
    try {
      // Get the reference to the Reviews document within 'Reviews' collection based on productId
      const reviewsCollectionRef = doc(firestore, "Reviews", productId);

      // Check if the document exists in the Reviews collection
      const reviewsCollectionSnapshot = await getDoc(reviewsCollectionRef);

      if (reviewsCollectionSnapshot.exists()) {
        // If the document exists, update it by adding the new review to the existing reviews
        await updateDoc(reviewsCollectionRef, {
          reviews: [
            ...reviews,
            {
              myRatings,
              productId,
              review,
            },
          ],
        });
      } else {
        // If the document does not exist, create a new one with the new review
        await setDoc(reviewsCollectionRef, {
          reviews: [
            {
              myRatings,
              productId,
              review,
            },
          ],
        });
      }

      // Fetch the updated reviews after posting the new review
      fetchReviews();

      // Clear the review input after successfully posting the review
      setReview("");
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error posting review:", error);
    }
  };

  if (!productId) {
    // Handle the case where productId is not provided
    return <Typography>No Product ID provided</Typography>;
  }

  // useEffect hook to fetch and set product data when the component mounts or when the productId changes

  useEffect(() => {
    // Async function to fetch product data from Firestore
    const fetchProductData = async () => {
      try {
        // Reference to the document within 'Products' collection based on productId
        const productDocRef = doc(firestore, "Products", productId);

        // Retrieve the document snapshot from Firestore
        const productDocSnapshot = await getDoc(productDocRef);

        // Check if the product document exists
        if (productDocSnapshot.exists()) {
          // Extract product data from the snapshot
          const productData = productDocSnapshot.data();

          // Log fetched product data for debugging purposes
          console.log("Fetched product data:", productData);

          // Set the product state with the fetched product data
          setProduct(productData);
        } else {
          // Log a message if the product is not found
          console.log("Product not found");
        }
      } catch (error) {
        // Handle any errors that might occur during the data fetching process
        console.error("Error fetching product data:", error);
      } finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    // Call the fetchProductData function when the component mounts or when the productId changes
    fetchProductData();
  }, [firestore, productId]);

  // useEffect hook to fetch related products when the component mounts or when the product changes

  useEffect(() => {
    // Async function to fetch related products from Firestore
    const fetchProducts = async () => {
      // Reference to the 'Products' collection in Firestore
      const productsCollectionRef = collection(firestore, "Products");

      // Construct a query to get products with the same businessName, limiting to 4 results
      const q = query(
        productsCollectionRef,
        where("businessName", "==", product.businessName),
        limit(4)
      );

      try {
        // Retrieve the query snapshot from Firestore
        const querySnapshot = await getDocs(q);

        // Array to store fetched product data
        const productsData = [];

        // Iterate through the query snapshot and extract document IDs and data
        querySnapshot.forEach((doc) => {
          const productWithId = { id: doc.id, ...doc.data() };
          productsData.push(productWithId);
        });

        // Log fetched product data for debugging purposes
        console.log("productsData is ", productsData);

        // Set the state with the fetched related products
        setRelatedProducts(productsData);

        // Set loading to false after data fetching is complete
        setLoading(false);
      } catch (error) {
        // Handle any errors that might occur during the data fetching process
        console.error("Error fetching product data:", error);
      }
    };

    // Call the fetchProducts function when the component mounts or when the product changes
    fetchProducts();
  }, [product]); // Adjust the dependency to include only necessary variables

  // Function to handle closing the snackbar for successful cart item addition
  const handleSnackbarClose1 = () => {
    setShowSnackbar1(false);
  };

  // Function to handle closing the snackbar for successful product addition to favorites
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // Render a loading state using Skeleton while data is being fetched

  if (loading) {
    // Container styling to center and occupy the full viewport height
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "50vh",
          minHeight: "100vh", // Set minimum height to occupy the full viewport height
        }}
      >
        {/* Main content container */}
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {/* Skeleton for product image */}
          <Skeleton
            variant="rectangular"
            width="40%"
            animation="wave"
            height={540}
          />
          {/* Skeleton for product name */}
          <Skeleton variant="text" width="50%" height={35} />
          {/* Add more Skeleton components as needed for your design */}
        </Container>

        {/* Additional container for secondary information */}
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            alignSelf: "left",
            alignItems: "left",
            width: "30%",
            left: -90,
          }}
        >
          {/* Skeletons for additional text information */}
          <Skeleton
            variant="text"
            width="70%"
            height={80}
            style={{ marginLeft: "2%" }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={80}
            style={{ marginLeft: "2%" }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={80}
            style={{ marginLeft: "2%" }}
          />
        </Container>
      </Box>
    );
  }

  if (!product) {
    // Render a message or handle the case where product is not available
    return <Typography>No Product Found</Typography>;
  }

  // Function to handle moving to the next image in the product gallery
  const handleNext = () => {
    // Update the current image index using modulo to loop back to the beginning if needed
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  // Function to handle moving to the previous image in the product gallery
  const handlePrev = () => {
    // Update the current image index using modulo to loop to the end if needed
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  // Function to increase the quantity of the product in the shopping cart
  const increaseQuantity = () => {
    // Increment the quantity by 1
    setQuantity(quantity + 1);
  };

  // Function to decrease the quantity of the product in the shopping cart, ensuring it does not go below 1
  const decreaseQuantity = () => {
    // Decrement the quantity by 1 if it's greater than 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to handle clicking on a thumbnail to switch to the corresponding image
  const handleThumbnailClick = (index) => {
    // Set the current image index to the clicked thumbnail's index
    setCurrentImage(index);
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <Navbar />
      <Box sx={{ height: "100%", overflowY: "auto" }}>
        <Container maxWidth="md">
          {/* Breadcrumbs to navigate through the application */}
          <Box sx={{ pl: 2, pb: 2, backgroundColor: "white" }}>
            <Breadcrumbs>
              {/* Home breadcrumb link */}
              <Link
                color="inherit"
                href="/"
                sx={{ fontSize: 15, textDecoration: "none" }}
              >
                Home
              </Link>
              {/* Company breadcrumb link */}
              <Link
                color="inherit"
                href="/vaas"
                sx={{ fontSize: 15, textDecoration: "none" }}
              >
                {product.company}
              </Link>
              {/* Current page breadcrumb */}
              <Typography
                color="textPrimary"
                sx={{ fontSize: 15, textDecoration: "none" }}
              >
                Digital Marketing Solutions
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Main content container */}
          <Box sx={{ display: "flex", flexDirection: "row", mb: 10 }}>
            {/* Left side panel for product images and thumbnails */}
            <Box sx={{ height: "100%", width: "50%", borderRadius: 2 }}>
              <Box sx={{ position: "relative" }}>
                {/* Button to navigate to the previous image */}
                <IconButton
                  onClick={handlePrev}
                  sx={{ position: "absolute", top: "50%", left: "5px" }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                {/* Product image */}
                <img
                  src={product.images[currentImage]}
                  alt={`image-${currentImage}`}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: "blue",
                  }}
                />
                {/* Button to navigate to the next image */}
                <IconButton
                  onClick={handleNext}
                  sx={{ position: "absolute", top: "50%", right: "5px" }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              {/* Thumbnails for other product images */}
              <Box sx={{ display: "flex", mt: 1, flexWrap: "wrap" }}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`thumbnail-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: 10,
                      border: "1px solid red",
                      opacity: index === currentImage ? 1 : 0.5,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Right side panel for product details, quantity, and reviews */}
            <Box sx={{ height: "100%", width: "50%", pl: 2 }}>
              {/* Display mode button */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button sx={{ border: "1px #072840 solid", borderRadius: 20 }}>
                  <Typography
                    sx={{ fontWeight: "600", fontSize: 10, color: "#072840" }}
                  >
                    PHYSICAL
                  </Typography>
                </Button>
              </Box>
              {/* Product details */}
              <Box sx={{ mt: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: 20 }}>
                    {product.name}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography>{product.description}</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "600" }}>
                    R{product.price}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "600", color: "lightgray" }}>
                    Quantity
                  </Typography>
                </Box>
                {/* Quantity control and Add to Cart button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid container sx={{ mt: 2, width: "50%", p: 1 }}>
                    {/* Decrease quantity button */}
                    <Grid
                      item
                      xs={2}
                      onClick={decreaseQuantity}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RemoveIcon />
                    </Grid>
                    {/* Display quantity */}
                    <Grid
                      item
                      xs={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {quantity}
                    </Grid>
                    {/* Increase quantity button */}
                    <Grid
                      item
                      xs={2}
                      onClick={increaseQuantity}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AddIcon />
                    </Grid>
                  </Grid>
                  {/* Add to Cart button */}
                  <Button
                    onClick={handleAddToCart}
                    sx={{ backgroundColor: "#072840", borderRadius: 20 }}
                  >
                    <Typography
                      sx={{ fontSize: 15, color: "white", pl: 1, pr: 1 }}
                    >
                      ADD TO CART
                    </Typography>
                  </Button>
                </Box>
              </Box>

              {/* Digital product information */}
              <Box sx={{ borderLeft: "10px red solid" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                  }}
                >
                  {/* Digital product icon */}
                  <Box onClick={increaseQuantity} sx={{ pr: 2 }}>
                    <Avatar sx={{ backgroundColor: "#d32f2f", p: 1 }}>
                      <CreditCardOutlinedIcon sx={{ color: "white" }} />
                    </Avatar>
                  </Box>
                  {/* Digital product information */}
                  <Box onClick={decreaseQuantity}>
                    <Typography sx={{ fontWeight: "600" }}>
                      Digital Product
                    </Typography>
                    <Typography sx={{ mt: "1" }}>
                      Please note that you will receive digital products in your
                      email
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Reviews section */}
              <Box>
                <Typography
                  sx={{ fontWeight: "600", fontSize: 15, mt: 3, mb: 4 }}
                >
                  REVIEWS
                </Typography>
                {/* Render individual review cards */}
                <Box>
                  {reviews.map((review) => (
                    <ReviewsCard key={review.id} review={review} />
                  ))}
                </Box>
                {/* User rating and review input */}
                <Box sx={{}}>
                  <Rating
                    name="hover-feedback"
                    value={myRatings}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setMyRatings(newValue);
                    }}
                  />
                  <TextField
                    fullWidth
                    id="review"
                    label="Write a review"
                    variant="standard"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  {/* Button to submit a review */}
                  <Button
                    fullWidth
                    sx={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "#072840",
                      fontWeight: "500",
                      color: "white",
                      width: "100%",
                      borderRadius: 20,
                      fontSize: 15,
                      p: 1,
                    }}
                    onClick={handleReviewPost}
                    variant="filled"
                  >
                    REVIEW
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {/*END - Right side Panel*/}

          {/* Section for displaying related products */}
          <Box>
            <Typography sx={{ fontWeight: "600", fontSize: 20, mt: 3, mb: 4 }}>
              RELATED PRODUCTS
            </Typography>
            <Box sx={{ pl: 2 }}>
              {/* Display the company name of the related products */}
              <Typography sx={{ fontWeight: "600", fontSize: 15, mb: 2 }}>
                {product.company}
              </Typography>
              {/* Container for related product cards */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  margin: 2,
                }}
              >
                {/* Map through related products and create a card for each */}
                {relatedProducts &&
                  relatedProducts.map((relatedProduct) =>
                    productId !== relatedProduct.id ? (
                      <Card
                        key={relatedProduct.id}
                        sx={{
                          width: 300,
                          height: 450,
                          margin: 2,
                        }}
                      >
                        {/* Image and additional information for the related product */}
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: "5%", // Adjust as needed
                            paddingTop: 10,
                          }}
                        >
                          {/* Container for the product image and sale label */}
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
                            {/* Product image */}
                            <CardMedia
                              component="img"
                              height="140"
                              image={
                                relatedProduct.images &&
                                relatedProduct.images.length > 0
                                  ? relatedProduct.images[0]
                                  : "../../assets/image/headsets.png"
                              }
                              alt={relatedProduct.name}
                              style={{
                                position: "relative",
                                borderRadius: "100px",
                                objectFit: "cover",
                                width: 220,
                                height: 220,
                                alignSelf: "center",
                              }}
                            />
                            {/* Sale label */}
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
                              <Typography
                                variant="h5"
                                style={{ color: "#fff", textAlign: "center" }}
                              >
                                sale
                              </Typography>
                            </Box>
                            {/* Snackbar for product added to favorites */}
                            <Snackbar
                              open={showSnackbar}
                              autoHideDuration={3000} // Adjust as needed
                              onClose={handleSnackbarClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }} // Set position to top center
                            >
                              <MuiAlert
                                onClose={handleSnackbarClose}
                                severity="success"
                                sx={{ width: "100%" }}
                              >
                                Product added to favorites!
                              </MuiAlert>
                            </Snackbar>
                            {/* Buttons for adding to favorites and cart */}
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
                              {/* Button to toggle heart icon for favorites */}
                              <TouchableOpacity
                                onPress={() => toggleHeart(relatedProduct)}
                              >
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
                              {/* Button to add product to cart */}
                              <TouchableOpacity
                                onPress={() => addToCart(relatedProduct)}
                                disabled={!relatedProduct}
                              >
                                {/* Snackbar for product added to cart */}
                                <Snackbar
                                  open={showSnackbar1}
                                  autoHideDuration={3000} // Adjust as needed
                                  onClose={handleSnackbarClose1}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }} // Set position to top center
                                >
                                  <MuiAlert
                                    onClose={handleSnackbarClose1}
                                    severity="success"
                                    sx={{ width: "100%" }}
                                  >
                                    Product added to Cart!
                                  </MuiAlert>
                                </Snackbar>
                                {/* Shopping cart icon */}
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
                          {/* Additional information about the related product */}
                          <View
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                              marginTop: "5%", // Adjust as needed
                             
                            }}
                          >
                            <View>
                              {/* Category, rating, product name, and description */}
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                {/* Category and star rating */}
                                <Text
                                  style={{
                                    flex: 1,
                                    fontSize: "15px",
                                    color: "#4FC3F7",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {relatedProduct.selectedProductCategory}
                                </Text>
                                <View
                                  style={{
                                    backgroundColor: "#072840",
                                    paddingHorizontal: 5,
                                    paddingVertical: 3,
                                    borderRadius: 15,
                                  }}
                                >
                                  <Text style={{}}>
                                    ⭐{" "}
                                    <Text style={{ color: "white" }}> 4.9</Text>
                                  </Text>
                                </View>
                              </View>
                              {/* Product name */}
                              <Typography variant="h5" component="h5">
                                {relatedProduct.name &&
                                  relatedProduct.name.slice(0, 15)}
                                {relatedProduct.name &&
                                relatedProduct.name.length < 50
                                  ? ""
                                  : "..."}
                              </Typography>
                              {/* Product description */}
                              <Typography
                                variant="subtitle2"
                                component="p"
                                style={{ color: "gray" }}
                              >
                                {relatedProduct.description &&
                                  relatedProduct.description.slice(0, 25)}
                                {relatedProduct.description &&
                                relatedProduct.description.length < 25
                                  ? ""
                                  : "..."}
                              </Typography>
                              {/* Sales quantity */}
                              <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="space-between"
                              >
                                <Typography
                                  variant="body2"
                                  component="p"
                                  style={{ color: "gray" }}
                                >
                                  <Icon2 name="download" size={20} />{" "}
                                  {relatedProduct.quantity} Sales
                                </Typography>
                                {/* Prices */}
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  {/* Original price */}
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
                                    R{relatedProduct.price}
                                  </Typography>
                                  {/* Discounted price */}
                                  <Typography
                                    variant="subtitle2"
                                    component="p"
                                    style={{
                                      color: "rgb(97, 151, 97)",
                                      fontSize: "18px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    R{relatedProduct.price}
                                  </Typography>
                                </View>
                              </Box>
                            </View>
                            {/* Button to view more details */}
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
                              onClick={() =>
                                handleChangeProduct(relatedProduct.id)
                              }
                            >
                              <Text>VIEW </Text>
                              <Icon name="arrow-right" size={20} />
                            </Button>
                          </View>
                        </View>
                      </Card>
                    ) : null
                  )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </View>
  );
}
