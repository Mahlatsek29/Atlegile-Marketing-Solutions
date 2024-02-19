import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

import { Footer } from "../../Global/Footer";
import Navbar from "../../Global/Navbar";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
} from "@mui/material";
import FollowUs from "../../Global/Header";
import Card2 from "../../Global/Card2";
import sara from "../../Global/images/Sara.png";
import MuiAlert from "@mui/material/Alert";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Skeleton from "@mui/material/Skeleton";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../config";
//import { auth, firestore, storage } from "../../config";

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
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1080); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      console.log("userData is", userData);
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const cartCollectionRef = collection(firestore, "Favourites");
      const q = query(cartCollectionRef, where("uid", "==", user.uid));

      try {
        const querySnapshot = await getDocs(q);

        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push(doc.data());
        });
        console.log("productsData is ", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [userData]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = firestore.collection("Users").doc(user.uid);

        try {
          // Fetch user details from Firestore
          const userDoc = await userDocRef.get();

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

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    const fetchFavouritesData = async () => {
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const favouritesCollectionRef = collection(firestore, "Favourites");
      const q = query(favouritesCollectionRef, where("uid", "==", user.uid));

      try {
        const querySnapshot = await getDocs(q);

        const favouritesItems = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          favouritesItems.push({
            id: doc.id,
            productName: data.productName,
            price: data.price,
            description: data.description,
            company: data.company,
            businessName: data.businessName,
            images: data.images,
            selectedProductCategory: data.selectedProductCategory,
            // Add other fields from your Favourites collection
            // For example: product, quantity, price, image, etc.
            // Modify the fields as per your actual data structure
          });
        });
        console.log(favouritesItems);
        setFavouritesData(favouritesItems);
      } catch (error) {
        console.error("Error fetching favourites data:", error);
      }
    };

    fetchFavouritesData();
  }, [user]);

  const handlePress = () => {
    Swal.fire({
      icon: "info",
      title: "Contact Information",
      html: "<b>Name:</b> Julian James<br/><b>Phone Number:</b> 0123456789",
      confirmButtonText: "Close",
    });
  };

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

  useEffect(() => {
    console.log("Product Data:", products);
    setLoading(false); // Add this line to set loading to false
  }, [products]);

  const toggleHeart = async () => {
    try {
      const favCollectionRef = firestore.collection("Favourites");
      const favDocRef = favCollectionRef.doc(productId);

      const favDoc = await favDocRef.get();

      if (favDoc.exists) {
        // Document exists, remove from Favourites
        await favDocRef.delete();
        setIsRed(false);
      } else {
        // Document does not exist, add to Favourites
        await favDocRef.set({
          productId: productId,
          uid: uid,
          productName: product.name,
          description: product.description,
          price: product.price,
          // serverTimestamp: firestore.FieldValue.serverTimestamp(),
          businessName: product.businessName,
          company: product.company,
          brand: product.brand,
          // Add other relevant fields
        });
        setIsRed(true);
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error("Error toggling heart:", error);
    }
  };

  const addToCart = async () => {
    try {
      const cartCollectionRef = firestore.collection("Cart");
      await cartCollectionRef.add({
        uid: uid,
        productId: productId,
        description: product.description,
        price: product.price,
        name: product.name,
        quantity: 1,
        image:
          product.images && product.images.length > 0 ? product.images[0] : "",
        // Add other relevant fields
      });
      setShowSnackbar1(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handleSnackbarClose1 = () => {
    setShowSnackbar1(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  if (loading) {
    // Render a loading state using Skeleton
    return (
      <Card className="card-container">
        <Skeleton
          variant="rectangular"
          width={270}
          height={270}
          animation="wave"
        />
        <CardContent>
          <Skeleton variant="text" width={100} height={20} animation="wave" />
          <Skeleton variant="text" width={200} height={16} animation="wave" />
          <Skeleton variant="text" width={200} height={16} animation="wave" />
          <Skeleton variant="text" width={80} height={14} animation="wave" />
        </CardContent>
      </Card>
    );
  }
  return (
    <View>
      <FollowUs />
      <Navbar />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        {!isMobile && (
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

                <Box>
                  <Typography sx={{ textAlign: "center" }}>
                    {userData?.location}
                  </Typography>
                </Box>

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
            {/* Your dropdown content here */}
            <Box textAlign="center">
              <img
                src={sara}
                alt="User Image"
                style={{
                  marginTop: 50,
                  padding: 10,
                  height: 100,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    height: 80,
                    width: 200,
                    marginRight: 12,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  ORDERS
                </Typography>
                <Typography
                  style={{
                    height: 80,
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "lightgray",
                      color: "gray",
                    }}
                    placeholder="Search"
                    placeholderTextColor="gray"
                  />
                </Typography>
                <Typography
                  style={{
                    height: 80,
                    width: 200,
                    marginRight: "10px",
                  }}
                >
                  <View
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
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "gray", marginTop: 25 }}>
                      Please Select
                    </Text>
                    <Icon1
                      name="angle-down"
                      size={20}
                      style={{ marginTop: "28px" }}
                    />
                  </View>
                </Typography>
                <Typography
                  style={{
                    height: 50,
                    width: 50,
                    marginTop: 15,
                  }}
                >
                  <TouchableOpacity>
                    <Icon name="search" size={20} />
                  </TouchableOpacity>
                </Typography>
              </View>

              <View>
                {cartData.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => navigateToDeliveryAndChatSystem(item.status)}
                    key={index}
                  >
                    <View
                      style={{
                        paddingHorizontal: 10,
                        position: "absolute",
                        bottom: 30,
                        left: 80,
                        width: "6vw",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 2,
                      }}
                    >
                      <Image
                        source={{ uri: item?.image }}
                        alt="product-image"
                        style={{
                          width: "20%",
                          height: "100%",
                          // backgroundColor: "#000026",
                          // backgroundImage: `url(${hdtv})`,
                        }}
                      />
                      <View style={{ width: "30%", paddingLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          #
                          {item?.orderId.slice(0, 4) +
                            Math.floor(Math.random() * 10000)}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {item?.timestamp.toDateString()}
                        </Text>
                      </View>
                      <View style={{ width: "30%", paddingLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          Delivered by
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          Dilivery Guy
                        </Text>
                      </View>
                      <View style={{ width: "30%", paddingLeft: 10 }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: "15px",
                            color: "#4FC3F7",
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          Status
                        </Text>
                        <View
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color:
                              item.status === "DELIVERED"
                                ? "green"
                                : item.status === "ONGOING"
                                ? "orange"
                                : "black",
                          }}
                        >
                          {/* {item?.status} */}
                          Delivered
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Container>
          </View>
        ) : (
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
               // display: "flex",
                flexDirection: "row",
                //justifyContent: "space-evenly",
                flexWrap:'wrap'
              }}
            >
              {products.map((product, index) => (
                <FavouriteCard key={index} productData={product}  style={{marginBottom:10}}/>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
      <Footer />
    </View>
  );
};
export default Favourites;
