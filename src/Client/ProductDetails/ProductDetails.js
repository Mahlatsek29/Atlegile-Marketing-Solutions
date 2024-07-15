import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
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
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
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
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import firebaseConfig from "../../config";
import { firestore, auth, firebase } from "../../config";
import Navbar from "../../Global/Navbar";
import Header from "../../Global/Header";
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
  const [uid, setUid] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const handleChangeProduct = (relatedProductId) => {
    // Navigate to the new product's details page
    navigation.navigate("ProductDetails", { productId: relatedProductId });
  };

  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    return () => {
      // Unsubscribe from the auth state observer when the component unmounts
      authObserver();
    };
  }, []);

  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setWidth(window.width);
    };

    Dimensions.addEventListener("change", handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener("change", handleDimensionsChange);
    };
  }, []);
  // UseEffect to fetch product data when userData changes
  useEffect(() => {
    const fetchProductData = async () => {
      // Check if user is authenticated
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      // Reference to the Firestore collection
      const favouritesCollectionRef = collection(firestore, "Favourites");

      // Query to get products for the current user
      const q = query(favouritesCollectionRef, where("uid", "==", user.uid));
      // Reference to the 'Cart' collection in Firestore
      const cartCollectionRef = firestore.collection("Cart");

      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsData = [];
        snapshot.forEach((doc) => {
          productsData.push(doc.data());
        });
        setProducts(productsData);
      });
      // Real-time listener for Cart collection
      const cartUnsubscribe = cartCollectionRef
        .where("uid", "==", uid)
        .onSnapshot((snapshot) => {
          const cartItemsData = [];
          snapshot.forEach((doc) => {
            cartItemsData.push(doc.data());
          });
          setCartItems(cartItemsData);
        });

      return () => {
        unsubscribe();
        cartUnsubscribe();
      };
    };

    // Fetch product data on mount or when userData changes
    fetchProductData();
  }, [uid]);

  // Function to toggle the heart (like) icon for a product in the user's favorites
  const toggleHeart = async (product) => {
    try {
      if (!product || !product.id) {
        console.error("Product or productId is missing or undefined.");
        return;
      }

      // Reference to the 'Favourites' collection in Firestore
      const favCollectionRef = collection(firestore, "Favourites");

      // Reference to the specific document in the 'Favourites' collection based on the 'productId'
      const favDocRef = doc(favCollectionRef, product.id);

      // Retrieve the document from Firestore
      const favDocSnap = await getDoc(favDocRef);

      if (favDocSnap.exists()) {
        // Document exists, remove from Favourites
        await deleteDoc(favDocRef);
        setIsRed(false); // Set the heart icon to not red
      } else {
        // Document does not exist, add to Favourites
        await setDoc(favDocRef, {
          productId: product.id,
          selectedProductCategory: product.selectedProductCategory,
          uid: uid,
          productName: product.name,
          description: product.description,
          price: product.price,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          businessName: product.businessName,
          company: product.company,
          brand: product.brand,
          image: product.images[0],
        });
        setIsRed(true); // Set the heart icon to red
        setShowSnackbar(true); // Show a snackbar indicating the item was added to favorites
      }
    } catch (error) {
      // Log an error message if there's an issue toggling the heart icon
      console.error("Error toggling heart:", error);
    }
  };
  // Function to toggle the cart icon to the shopping cart
  const toggleCart = async (product) => {
    try {
      if (!product || !product.id) {
        console.error("Product or productId is missing or undefined.");
        return;
      }

      // Reference to the 'Cart' collection in Firestore
      const cartCollectionRef = collection(firestore, "Cart");

      // Check if the product already exists in the cart
      const existingCartItemQuerySnapshot = await getDocs(
        query(
          cartCollectionRef,
          where("uid", "==", uid),
          where("productId", "==", product.id)
        )
      );

      if (!existingCartItemQuerySnapshot.empty) {
        // Product exists in cart, delete it
        existingCartItemQuerySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setShowSnackbar1(false); // Do not show a snackbar for deletion
      } else {
        // Product does not exist in cart, add it
        await addDoc(cartCollectionRef, {
          uid: uid,
          productId: product.id,
          description: product.description,
          price: product.price,
          name: product.businessName,
          quantity: 1,
          image: product.images,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Updated line
        });
        setShowSnackbar1(true); // Show a snackbar indicating the item was added to the cart
      }
    } catch (error) {
      // Log an error message if there's an issue adding to or deleting from the cart
      console.error("Error toggling cart:", error);
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

        // Set the reviews state with the fetched reviews or an empty array if none
        setReviews(reviewsData.reviews || []);
      } else {
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
    const fetchProducts = async () => {
      const productsCollectionRef = collection(firestore, "Products");

      // Construct a query to get products with the same businessName, limiting to 4 results
      const productQuery = query(
        productsCollectionRef,
        where("businessName", "==", product.businessName),
        limit(4)
      );

      const favouritesCollectionRef = collection(firestore, "Favourites");
      const cartCollectionRef = collection(firestore, "Cart");

      try {
        // Retrieve the query snapshot from Firestore for related products
        const productQuerySnapshot = await getDocs(productQuery);
        const relatedProductsData = [];

        // Iterate through the related products query snapshot and extract document IDs and data
        productQuerySnapshot.forEach((doc) => {
          const productWithId = { id: doc.id, ...doc.data() };
          relatedProductsData.push(productWithId);
        });

        // Set the state with the fetched related products
        setRelatedProducts(relatedProductsData);

        // Construct a query to get favorite products based on user ID
        const favouritesQuery = query(
          favouritesCollectionRef,
          where("uid", "==", user.uid)
        );

        // Retrieve the query snapshot from Firestore for favorite products
        const favouritesQuerySnapshot = await getDocs(favouritesQuery);
        const favoriteProductsData = [];

        // Iterate through the favorite products query snapshot and extract data
        favouritesQuerySnapshot.forEach((doc) => {
          favoriteProductsData.push(doc.data());
        });

        // Set the state with the fetched favorite products
        setFavoriteProducts(favoriteProductsData);

        // Subscribe to real-time updates for favorite products
        const unsubscribeFavourites = onSnapshot(
          favouritesQuery,
          (snapshot) => {
            const updatedFavoriteProductsData = [];
            snapshot.forEach((doc) => {
              updatedFavoriteProductsData.push(doc.data());
            });
            setFavoriteProducts(updatedFavoriteProductsData);
          }
        );

        // Construct a query to get cart items based on user ID
        const cartQuery = query(
          cartCollectionRef,
          where("uid", "==", user.uid)
        );

        // Retrieve the query snapshot from Firestore for cart items
        const cartQuerySnapshot = await getDocs(cartQuery);
        const cartItemsData = [];

        // Iterate through the cart items query snapshot and extract data
        cartQuerySnapshot.forEach((doc) => {
          cartItemsData.push(doc.data());
        });

        // Set the state with the fetched cart items
        setCartItems(cartItemsData);
        // Subscribe to real-time updates for cart items
        const unsubscribeCart = onSnapshot(cartQuery, (snapshot) => {
          const updatedCartItemsData = [];
          snapshot.forEach((doc) => {
            updatedCartItemsData.push(doc.data());
          });
          setCartItems(updatedCartItemsData);
        });

        // Set loading to false after data fetching is complete
        setLoading(false);

        // Return a cleanup function to unsubscribe from real-time updates
        return () => {
          unsubscribeFavourites();
          unsubscribeCart();
        };
      } catch (error) {
        // Handle any errors that might occur during the data fetching process
        console.error("Error fetching product data:", error);
      }
    };

    // Call the fetchProducts function when the component mounts or when the product changes
    fetchProducts();
  }, [product, uid, firestore]);

  // Adjust the dependency to include only necessary variables

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
      <Header />
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
                    backgroundColor: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5) 0%, #D4AF37 10%, #B48811 40%, #A2790D 50%, #E7BE3A 90%)",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: 20,
                mt: 3,
                mb: 4,
                display: "flex",
                alignSelf: "flex-start",
              }}
            >
              RELATED PRODUCTS
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                flexDirection: "column",
              }}
            >
              {/* Display the company name of the related products */}
              <Typography
                sx={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontWeight: "600",
                  fontSize: 15,
                  mb: 2,
                }}
              >
                {product.company}
              </Typography>
              {width < 600 ? (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {/* Map through related products and create a card for each */}
                  {relatedProducts &&
                    relatedProducts.map((relatedProduct) =>
                      productId !== relatedProduct.id ? (
                        <View
                          key={relatedProduct.id}
                          style={{
                            display: "flex",
                            margin: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            // backgroundColor: "yellow",
                          }}
                        >
                          {/* View for styling and layout within each Card */}
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              // paddingTop: 10,
                              margin: 5,
                            }}
                          >
                            {/* Box for styling product display */}
                            <Box
                              style={{
                                objectFit: "cover",
                                position: "relative",
                                background:
                                  "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5) 0%, #D4AF37 10%, #B48811 40%, #A2790D 50%, #E7BE3A 90%)",
                                width: "110px",
                                height: "110px",
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
                                style={{
                                  alignSelf: "center",
                                  width: 100,
                                  height: 100,
                                }}
                              >
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
                                    borderRadius: "100px",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </View>

                              {/* Snackbar for showing a success message when adding to favorites */}
                              <Snackbar
                                open={showSnackbar}
                                autoHideDuration={3000}
                                onClose={handleSnackbarClose}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
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
                                ></View>

                                {/* Typography component for displaying the product name */}
                                <Typography variant="body2" component="body2">
                                  {relatedProduct.name && relatedProduct.name.slice(0, 15)}
                                  {relatedProduct.name && relatedProduct.name.length < 50
                                    ? ""
                                    : "..."}
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
                                  {product.description &&
                                  product.description.length > 12
                                    ? `${product.description.slice(0, 12)}...`
                                    : product.description}
                                </Typography>
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 5,
                                    marginTop: 5,
                                  }}
                                >
                                  <View
                                      style={{
                                        backgroundColor: "#072840",
                                        paddingHorizontal: 5,
                                        paddingVertical: 3,
                                        borderRadius: 15,
                                      }}
                                    >
                                      <Text style={{ color: "white" }}>
                                        ⭐ {review[relatedProduct.id] || 0}
                                      </Text>
                                    </View>
                                  <TouchableOpacity>
                                    <Icon
                                      name={
                                        favoriteProducts.find(
                                          (item) =>
                                            item.productId === relatedProduct.id
                                        )
                                          ? "heart"
                                          : "heart-o"
                                      }
                                      size={20}
                                      style={{
                                        marginLeft: 5,
                                      }}
                                      onPress={() =>
                                        toggleHeart(relatedProduct)
                                      } // Use onPress instead of onClick for TouchableOpacity
                                      color={
                                        favoriteProducts.find(
                                          (item) =>
                                            item.productId === relatedProduct.id
                                        )
                                          ? "red"
                                          : "black"
                                      }
                                    />
                                  </TouchableOpacity>
                                  {/* Button to add product to cart */}
                                  <TouchableOpacity
                                    onPress={() => toggleCart(relatedProduct)}
                                  >
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
                                    <Icon3
                                      name={
                                        cartItems.find(
                                          (item) =>
                                            item.productId === relatedProduct.id
                                        )
                                          ? "cart"
                                          : "cart-outline"
                                      }
                                      size={20}
                                      style={{
                                        marginLeft: 5,
                                      }}
                                      color="black"
                                    />
                                  </TouchableOpacity>
                                  {/* Box for displaying additional product details */}
                                  <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                  >
                                     {/* Typography component for displaying sales information */}
                                     {/* <Typography
                                     variant="body2"
                                     component="p"
                                     style={{ color: "gray" }}
                                     >
                                     <Icon2 name="download" size={20} /> {product.quantity}{" "}
                                      Sales
                                     </Typography> */}

                                    {/* View for displaying product price */}
                                  </Box>
                                </View>
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
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
                                    R{relatedProduct.price}
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
                                    R{relatedProduct.price}
                                  </Typography>
                                </View>
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
                                  onClick={() =>
                                    handleChangeProduct(relatedProduct.id)
                                  }
                                >
                                  <Text>VIEW </Text>
                                  <Icon name="arrow-right" size={20} />
                                </Button>
                            </View>
                          </View>
                        </View>
                      ) : null
                    )}
                </View>
              ) : (
                <>
                  {/* Container for related product cards */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      // margin: 2,
                      alignSelf: "center",
                    }}
                  >
                    {/* Map through related products and create a card for each */}
                    {relatedProducts &&
                      relatedProducts.map((relatedProduct) =>
                        productId !== relatedProduct.id ? (
                          <View
                            key={relatedProduct.id}
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              margin: 1,
                              height: 450,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* Image and additional information for the related product */}
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: 10,
                                margin: 20,
                              }}
                            >
                              {/* Container for the product image and sale label */}
                              <Box
                                style={{
                                  objectFit: "cover",
                                  position: "relative",
                                  background:
                                    "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5) 0%, #D4AF37 10%, #B48811 40%, #A2790D 50%, #E7BE3A 90%)",
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
                                  style={{
                                    alignSelf: "center",
                                    width: 180,
                                    height: 180,
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
                                      borderRadius: "100px",
                                      objectFit: "cover",
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                  {/* Sale label */}
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
                                      style={{
                                        color: "#fff",
                                        textAlign: "center",
                                      }}
                                    >
                                      Sale
                                    </Typography>
                                  </Box>
                                </View>

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
                                    width: "auto",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignSelf: "center",
                                  }}
                                >
                                  <TouchableOpacity>
                                    <Icon
                                      name={
                                        favoriteProducts.find(
                                          (item) =>
                                            item.productId === relatedProduct.id
                                        )
                                          ? "heart"
                                          : "heart-o"
                                      }
                                      size={20}
                                      style={{
                                        padding: 10,
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                      }}
                                      onPress={() =>
                                        toggleHeart(relatedProduct)
                                      } // Use onPress instead of onClick for TouchableOpacity
                                      color={
                                        favoriteProducts.find(
                                          (item) =>
                                            item.productId === relatedProduct.id
                                        )
                                          ? "red"
                                          : "black"
                                      }
                                    />
                                  </TouchableOpacity>
                                  {/* Button to add product to cart */}
                                  <TouchableOpacity
                                    onPress={() => toggleCart(relatedProduct)}
                                  >
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
                                    <Icon3
                                      name={
                                        cartItems.find(
                                          (item) =>
                                            item.productId === relatedProduct.id
                                        )
                                          ? "cart"
                                          : "cart-outline"
                                      }
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
                                      <Text style={{ color: "white" }}>
                                        ⭐ {review[relatedProduct.id] || 0}
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
                                      {relatedProduct.quantity} In stalk
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
                          </View>
                        ) : null
                      )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </View>
  );
}
