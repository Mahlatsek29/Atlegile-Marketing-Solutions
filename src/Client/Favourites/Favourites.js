import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Footer } from "../../Global/Footer";
import Navbar from "../../Global/Navbar";
import {
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  Snackbar,
} from "@mui/material";
import FollowUs from "../../Global/Header";
import sara from "../../Global/images/Sara.png";
import MuiAlert from "@mui/material/Alert";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore, firebase } from "../../config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigation } from "@react-navigation/native";
const Favourites = () => {
  const [checkOrder, setCheckOrder] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [review, setReview] = useState({});
  const [isRed, setIsRed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [cartItems, setCartItems] = useState([]);
  // UseEffect to handle window resize and set mobile state

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1080); // Adjust the breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for window size
    handleResize();

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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

  const toggleHeart = async (product) => {
    try {
      // Check if the product is undefined
      if (!product) {
        console.error("Product is undefined");
        return;
      }

      // Check if the product.id is undefined
      if (!product.productId) {
        console.error("Product ID is undefined", product);
        return;
      }

      // Reference to the "Favourites" collection in Firestore
      const favCollectionRef = firestore.collection("Favourites");
      // Reference to the document in the "Favourites" collection with the product ID
      const favDocRef = favCollectionRef.doc(product.productId);

      // Delete the product from the "Favourites" collection
      await favDocRef.delete();

      // Update the state to indicate that the heart icon should be filled
      setIsRed(false);

      // Set the state to show the success snackbar
      // setShowSnackbar(true);
    } catch (error) {
      // Log an error message if there's an error while toggling heart icon
      console.error("Error toggling heart:", error);
    }
  };

  // Function to toggle the cart icon to the shopping cart
  const toggleCart = async (product) => {
    try {
      console.log(product);
      // Reference to the 'Cart' collection in Firestore
      const cartCollectionRef = firestore.collection("Cart");

      // Check if the product already exists in the cart
      const existingCartItemQuerySnapshot = await cartCollectionRef
        .where("uid", "==", uid)
        .where("productId", "==", product.productId)

        .get();

      if (!existingCartItemQuerySnapshot.empty) {
        // Product exists in cart, delete it
        existingCartItemQuerySnapshot.forEach(async (doc) => {
          await doc.ref.delete();
        });
        setShowSnackbar1(false); // Do not show a snackbar for deletion
      } else {
        // Product does not exist in cart, add it
        await cartCollectionRef.add({
          uid: uid,
          productId: product.productId,
          description: product.description,
          price: product.price,
          name: product.businessName,
          quantity: 1,
          image: product.image,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Updated line
        });
        setShowSnackbar1(true); // Show a snackbar indicating the item was added to the cart
      }
    } catch (error) {
      // Log an error message if there's an issue adding to or deleting from the cart
      console.error("Error toggling cart:", error);
    }
  };
  // Toggle dropdown state
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // UseEffect to fetch user authentication state
  useEffect(() => {
    const auth = getAuth();

    // Set up listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Unsubscribe when component unmounts
    return () => {
      unsubscribe();
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
  }, [userData]);

  // UseEffect to fetch user details from Firestore
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = firestore.collection("Users").doc(user.uid);

        try {
          const userDoc = await userDocRef.get();

          // Set user data in state
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserData(userData);
          } else {
            console.error("User document does not exist");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    });

    // Unsubscribe when component unmounts
    return () => {
      unsubscribeAuth();
    };
  }, []);

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

  // Function to display contact information using Swal.fire
  const handlePress = () => {
    Swal.fire({
      icon: "info",
      title: "Contact Information",
      html: "<b>Name:</b> Julian James<br/><b>Phone Number:</b> 0123456789",
      confirmButtonText: "Close",
    });
  };

  // Function to handle sign-out confirmation using Swal.fire
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(firebase.auth());
        navigation.navigate("Landing");
      }
    });
  };

  // Functions to handle navigation
  const handleorders = () => {
    navigation.navigate("OrderHistory");
  };

  const handlefavorites = () => {
    navigation.navigate("Favourites");
  };

  const handleterms = () => {
    navigation.navigate("termsandconditions");
  };

  const handlepolicy = () => {
    navigation.navigate("privacypolicy");
  };

  // Functions to handle Snackbar close
  const handleSnackbarClose1 = () => {
    setShowSnackbar1(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      {/* Including FollowUs component */}
      <FollowUs />

      {/* Including Navbar component */}
      <Navbar />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {!isMobile && (
          // Desktop view - User information and options
          <View
            style={{
              paddingLeft: 30,
              backgroundColor: "whitesmoke",
              alignItems: "flex-start",
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              paddingRight={2}
            >
              {/* Dropdown content */}
              <View
                elevation={3}
                style={{
                  padding: "20px",
                  height: "100%",
                  width: "300px",
                  margin: "auto",
                  backgroundColor: "whitesmoke",
                }}
              >
                {/* User information section */}
                <Box textAlign="center">
                  <img
                    src={sara}
                    alt="User Image"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginTop: "80%",
                    }}
                  />
                  <Box sx={{ marginTop: "10%" }}>
                    <Typography variant="h6">
                      {userData?.name} {userData?.surname}
                    </Typography>
                    <Typography variant="subtitle1">
                      {userData?.phone}
                    </Typography>
                    <Typography variant="subtitle2">
                      {userData?.email}
                    </Typography>
                  </Box>
                </Box>

                {/* User location */}
                <Box>
                  <Typography sx={{ textAlign: "center" }}>
                    {userData?.location}
                  </Typography>
                </Box>

                {/* Options: Orders, Favorites, Terms and Conditions, Privacy Policy */}
                <Box style={{ marginTop: "50%" }}>
                  <Ionicons name="ios-timer-outline" size={15} color="gray" />
                  <Button
                    style={{ marginLeft: 5, color: "gray" }}
                    onClick={handleorders}
                  >
                    Orders
                  </Button>
                </Box>

                <Box>
                  <Ionicons name="ios-timer-outline" size={15} color="gray" />
                  <Button
                    style={{ marginLeft: 5, color: "gray" }}
                    onClick={handlefavorites}
                  >
                    Favorites
                  </Button>
                </Box>

                <Box>
                  <Ionicons name="ios-timer-outline" size={15} color="gray" />
                  <Button
                    style={{ marginLeft: 5, color: "gray" }}
                    onClick={handleterms}
                  >
                    Terms and Conditions
                  </Button>
                </Box>

                <Box sx={{}}>
                  <Ionicons name="ios-timer-outline" size={15} color="gray" />
                  <Button
                    style={{ marginLeft: 5, color: "gray" }}
                    onClick={handlepolicy}
                  >
                    Privacy Policy
                  </Button>
                </Box>

                {/* Additional content in the dropdown */}
                <Box
                  sx={{
                    marginTop: "40px",
                    backgroundColor: "rgba(266, 255, 255, 0.9)",
                    textAlign: "center",
                    padding: {
                      xs: "10px",
                      sm: "20px",
                    },
                  }}
                >
                  <Button
                    sx={{
                      fontWeight: "bolder",
                      color: "black",
                      marginTop: "10%",
                    }}
                    onClick={handlePress}
                  >
                    Julian James
                  </Button>

                  <Button sx={{ color: "gray", mt: 1, marginTop: "10%" }}>
                    Alternative Contact
                  </Button>
                </Box>

                {/* Sign out button */}
                <Box textAlign="center" marginTop="10%">
                  <Button onClick={handleSignOut} style={{ color: "red" }}>
                    SIGN OUT
                  </Button>
                </Box>
              </View>
            </Box>
          </View>
        )}

        {isMobile && (
          // Mobile view - Toggle button for the dropdown
          <Box style={{ textAlign: "center", padding: "10px" }}>
            <Ionicons
              name="ios-menu"
              size={30}
              color="black"
              onClick={toggleDropdown}
            />
          </Box>
        )}

        {isMobile && showDropdown && (
          // Container for the dropdown content
          <Box
            style={{
              position: "absolute",
              top: "60px", 
              right: "20px",
              backgroundColor: "whitesmoke",
              padding: "10px",
              zIndex: 999,
            }}
          >
            {/* User information section */}
            <Box textAlign="center">
              <img
                src={sara}
                alt="User Image"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginTop: "80%",
                }}
              />
              <Box sx={{ marginTop: "10%" }}>
                <Typography variant="h6">
                  {userData?.name} {userData?.surname}
                </Typography>
                <Typography variant="subtitle1">{userData?.phone}</Typography>
                <Typography variant="subtitle2">{userData?.email}</Typography>
              </Box>
            </Box>

            {/* User location */}
            <Box>
              <Typography sx={{ textAlign: "center" }}>
                {userData?.location}
              </Typography>
            </Box>

            {/* Options: Orders, Favorites, Terms and Conditions, Privacy Policy */}
            <Box style={{ marginTop: "50%" }}>
              <Ionicons name="ios-timer-outline" size={15} color="gray" />
              <Button
                style={{ marginLeft: 5, color: "gray" }}
                onClick={handleorders}
              >
                Orders
              </Button>
            </Box>

            <Box>
              <Ionicons name="ios-timer-outline" size={15} color="gray" />
              <Button
                style={{ marginLeft: 5, color: "gray" }}
                onClick={handlefavorites}
              >
                Favorites
              </Button>
            </Box>

            <Box>
              <Ionicons name="ios-timer-outline" size={15} color="gray" />
              <Button
                style={{ marginLeft: 5, color: "gray" }}
                onClick={handleterms}
              >
                Terms and Conditions
              </Button>
            </Box>

            <Box sx={{}}>
              <Ionicons name="ios-timer-outline" size={15} color="gray" />
              <Button
                style={{ marginLeft: 5, color: "gray" }}
                onClick={handlepolicy}
              >
                Privacy Policy
              </Button>
            </Box>

            {/* Additional content in the dropdown */}
            <Box
              sx={{
                marginTop: "40px",
                backgroundColor: "rgba(266, 255, 255, 0.9)",
                textAlign: "center",
                padding: {
                  xs: "10px",
                  sm: "20px",
                },
              }}
            >
              <Button
                sx={{
                  fontWeight: "bolder",
                  color: "black",
                  marginTop: "10%",
                }}
                onClick={handlePress}
              >
                Julian James
              </Button>

              <Button sx={{ color: "gray", mt: 1, marginTop: "10%" }}>
                Alternative Contact
              </Button>
            </Box>

            {/* Sign out button */}
            <Box textAlign="center" marginTop="10%">
              <Button onClick={handleSignOut} style={{ color: "red" }}>
                SIGN OUT
              </Button>
            </Box>
            {/* Add the rest of your dropdown components */}
          </Box>
        )}
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

          {width < 600 ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {products.map((product) => (
                // Card component representing each product
                <View
                  key={product.id || product.productId} // Unique key for each card
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
                        style={{ alignSelf: "center", width: 100, height: 100 }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={
                            product.image && product.image.length > 0
                              ? product.image
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
                        {/* <Typography variant="body2" component="body2">
                          {product.name && product.name.slice(0, 15)}
                          {product.name && product.name.length < 50
                            ? ""
                            : "..."}
                        </Typography> */}
                        <Typography variant="body2" component="body2">
                          {product.productName &&
                            product.productName.slice(0, 15)}
                          {product.productName &&
                          product.productName.length < 50
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
                              ⭐ {review[product.id] || 0}
                            </Text>
                          </View>
                          <TouchableOpacity>
                            <Icon
                              name="heart" // Always show a filled heart icon
                              size={20}
                              style={{
                                marginLeft: 5,
                              }}
                              onPress={() => {
                                // Check if product.id exists before calling toggleHeart
                                if (product.id || product.productId) {
                                  toggleHeart(product);
                                } else {
                                  console.error(
                                    "Product ID is missing",
                                    product
                                  );
                                }
                              }}
                              color="red" // Set the heart icon color to red
                            />
                          </TouchableOpacity>

                          {/* TouchableOpacity for adding product to the cart */}
                          <TouchableOpacity onPress={() => toggleCart(product)}>
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
                                    item.productId ===
                                    (product.id || product.productId)
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
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          {/* Typography component for displaying the original product price */}
                           <Typography
                            variant="body2"
                            component="p"
                            style={{ color: "gray", marginRight:5 }}
                          >
                            <Icon2 name="download" size={20} /> 15 In stalk
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
                      </View>

                      {/* Button for navigating to the product details screen */}
                      {/* <Button
                        style={{
                          border: "1px black solid",
                          alignSelf: "flex-start",
                          borderRadius: "50px",
                          marginBottom: 15,
                          color: "black",
                          cursor: "pointer",
                        }}
                        onClick={() => navigateProductDetails(product.id)}
                      >
                        VIEW <Icon name="arrow-right" size={20} />
                      </Button> */}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                margin: 2,
                //  justifyContent: 'space-around',
              }}
            >
              {products.map((product) => (
                <View
                  key={product.id || product.productId} // Unique key for each card
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: 1,
                    height: 450,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Card content */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 10,
                      margin: 20,
                    }}
                  >
                    {/* Circular image container */}
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
                      {/* Product image */}
                      <View
                        style={{ alignSelf: "center", width: 180, height: 180 }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={
                            product.image && product.image.length > 0
                              ? product.image
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
                            style={{ color: "#fff", textAlign: "center" }}
                          >
                            Sale
                          </Typography>
                        </Box>
                      </View>

                      {/* Snackbar for product added to favorites */}
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

                      {/* Heart and Shopping Cart icons */}
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
                        {/* TouchableOpacity for toggling heart icon */}
                        <TouchableOpacity>
                          <Icon
                            name="heart" // Always show a filled heart icon
                            size={20}
                            style={{
                              padding: 10,
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                            onPress={() => {
                              // Check if product.id exists before calling toggleHeart
                              if (product.id || product.productId) {
                                toggleHeart(product);
                              } else {
                                console.error("Product ID is missing", product);
                              }
                            }}
                            color="red" // Set the heart icon color to red
                          />
                        </TouchableOpacity>

                        {/* TouchableOpacity for adding product to the cart */}
                        <TouchableOpacity onPress={() => toggleCart(product)}>
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
                                  item.productId ===
                                  (product.id || product.productId)
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

                    {/* Product details */}
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "space-between",
                        marginTop: "5%",
                      }}
                    >
                      <View>
                        {/* Category and rating */}
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
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

                        {/* Product name and description */}
                        <Typography variant="h5" component="h5">
                          {product.productName &&
                            product.productName.slice(0, 15)}
                          {product.productName &&
                          product.productName.length < 50
                            ? ""
                            : "..."}
                        </Typography>
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
                          product.description.length > 25
                            ? `${product.description.slice(0, 25)}...`
                            : product.description}
                        </Typography>

                        {/* Sales and price */}
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
                            <Icon2 name="download" size={20} /> 15 In stalk
                          </Typography>
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
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
                    </View>
                  </View>
                </View>
              ))}
            </Box>
          )}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};
export default Favourites;
