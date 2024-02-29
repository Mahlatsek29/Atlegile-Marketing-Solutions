import { View, Text, ScrollView, TouchableOpacity } from "react-native";
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
import Skeleton from "@mui/material/Skeleton";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const Favourites = ({ item }) => {
  const [checkOrder, setCheckOrder] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isRed, setIsRed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // UseEffect to handle window resize and set mobile state
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

      // Query Firestore for products
      const cartCollectionRef = collection(firestore, "Favourites");
      const q = query(cartCollectionRef, where("uid", "==", user.uid));

      try {
        const querySnapshot = await getDocs(q);

        // Process product data and set state
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push(doc.data());
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
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

  // Function to fetch cart data from Firestore
  const fetchCartData = async () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    // Query Firestore for cart items
    const cartCollectionRef = collection(firestore, "Cart");
    const q = query(cartCollectionRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      // Process cart data and set state
      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cartItems.push({
          id: doc.id,
          // Add other relevant fields from your Cart collection
        });
      });

      setCartData(cartItems);
      console.log("Cart Data : ", cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // UseEffect to fetch cart data when the user is authenticated
  useEffect(() => {
    if (user) {
      fetchCartData();
    }
  }, [user]);

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
        navigate("/landing-page");
      }
    });
  };

  // Functions to handle navigation
  const handleorders = () => {
    setCheckOrder(true);
  };

  const handlefavorites = () => {
    navigate("/termsandconditions");
  };

  const handleterms = () => {
    navigate("/termsandconditions");
  };

  const handlepolicy = () => {
    navigate("/privacypolicy");
  };

  // UseEffect to set loading to false when products state changes
  useEffect(() => {
    setLoading(false);
  }, [products]);

  // Function to toggle heart icon for favorites
  const toggleHeart = async () => {
    try {
      // Firestore operations to add or remove from Favourites
    } catch (error) {
      console.error("Error toggling heart:", error);
    }
  };

  // Function to add product to cart
  const addToCart = async () => {
    try {
      // Firestore operation to add product to Cart
      setShowSnackbar1(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Functions to handle Snackbar close
  const handleSnackbarClose1 = () => {
    setShowSnackbar1(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // Loading state to render a Skeleton while data is being fetched
  if (loading) {
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
        {/* Skeleton loading state */}
      </Card>
    );
  }

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
              top: "60px", // Adjust the top position as needed
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: 2,
              //  justifyContent: 'space-around',
            }}
          >
            {products.map((product, index) => (
              <Card
                key={product.id} // Unique key for each card
                sx={{
                  width: 300,
                  height: 450,
                  margin: 2,
                }}
              >
                {/* Card content */}
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: "5%", // Adjust as needed
                    paddingTop: 10,
                  }}
                >
                  {/* Circular image container */}
                  <Box
                    style={{
                      borderRadius: "16px",
                      objectFit: "cover",
                      position: "relative",
                      backgroundColor: "whitesmoke",
                      width: "250px",
                      height: "250px",
                      borderRadius: "50%",
                      alignself: "center", // Typo: should be alignSelf
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Product image */}
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
                        left: 80,
                        width: "6vw",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignSelf: "center",
                      }}
                    >
                      {/* Heart icon */}
                      <TouchableOpacity>
                        <Icon
                          name={isRed ? "heart" : "heart-o"}
                          size={20}
                          style={{
                            padding: 10,
                            backgroundColor: "white",
                            borderRadius: "50%",
                          }}
                          onClick={toggleHeart}
                          color={isRed ? "red" : "black"}
                        />
                      </TouchableOpacity>

                      {/* Shopping Cart icon */}
                      <TouchableOpacity onPress={addToCart}>
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
                          <Text style={{}}>
                            ⭐ <Text style={{ color: "white" }}> 4.9</Text>
                          </Text>
                        </View>
                      </View>

                      {/* Product name and description */}
                      <Typography variant="h5" component="h5">
                        {product.name && product.name.slice(0, 15)}
                        {product.name && product.name.length < 50 ? "" : "..."}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        style={{ color: "gray" }}
                      >
                        {product.description &&
                          product.description.slice(0, 25)}
                        {product.description && product.description.length < 25
                          ? ""
                          : "..."}
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
                          <Icon2 name="download" size={20} /> 15 Sales
                        </Typography>
                        <View style={{ display: "flex", flexDirection: "row" }}>
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
              </Card>
            ))}
          </Box>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};
export default Favourites;
