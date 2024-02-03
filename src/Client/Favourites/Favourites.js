import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import SideNav from "../../Global/SideNav";
import { Footer } from "../../Global/Footer";
import Navbar from "../../Global/Navbar";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import FollowUs from "../../Global/Header";
import Card2 from "../../Global/Card2";
import sara from "../../Global/images/Sara.png";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../config";
//import { auth, firestore, storage } from "../../config";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import FavouriteCard from "../../Global/FavouriteCard";
const Favourites = ({ item }) => {
  const [checkOrder, setCheckOrder] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
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

  const fetchCartData = async () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const cartCollectionRef = collection(firestore, "Cart");
    const q = query(cartCollectionRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cartItems.push({
          id: doc.id,
          product: data.product,
          quantity: data.quantity,
          amount: data.price * data.quantity,
          image: data.image,
          name: data.name,
          orderId: data.productId,
          timestamp: data.timestamp.toDate(),
          // Add other relevant fields from your Cart collection
        });
      });

      setCartData(cartItems);
      console.log("Cart Data : ", cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    // Fetch cart data when the user is authenticated
    if (user) {
      fetchCartData();
    }
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

  return (
    <View>
      <FollowUs />
      <Navbar />
      <View style={{ display: "flex", flexDirection: "row",backgroundColor:'white' }}>
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
                  <Typography variant="subtitle1">{userData?.phone}</Typography>
                  <Typography variant="subtitle2">{userData?.email}</Typography>
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
        {checkOrder ? (
          <View>
            <Container fixed sx={{ height: "85vh" }}>
              <View
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
                      color: "gray",
                      borderBottomWidth: 2,
                      borderBottomColor: "lightgray",
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
                        width: "100%",
                        height: 80,
                        borderBottomWidth: 2,
                        borderBottomColor: "#1D1D1D",
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
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          Status
                        </Text>
                        <Text
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
