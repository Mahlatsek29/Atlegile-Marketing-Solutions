import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import { Container, Typography, Button } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import mapImage from "../../Global/images/mapImage.png";
import hdtv from "../../Global/images/hdtv.jpg";
import axios from "axios";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
// import { auth, firestore } from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../../config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
  // collection,
  serverTimestamp,
} from "firebase/firestore";
// import firebaseConfig from "../../config";
// export { firebase, auth, firestore, storage, db };
import { firebase, auth, db } from "../../config";

/*
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
  state = {
    searchFocused: false,
  };

  render() {
    const { searchFocused } = this.state;
    const { onLocationSelected } = this.props;

    return (
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        placeholderTextColor="#333"
        onPress={onLocationSelected}
        query={{
          key: 'AIzaSyAGs6J8iZJ7mZeP6de9SyenOcA6MwFrwJc',
          language: 'pt',
        }}
        textInputProps={{
          onFocus: () => {
            this.setState({ searchFocused: true });
          },
          onBlur: () => {
            this.setState({ searchFocused: false });
          },
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: 'absolute',
            top: Platform.select({ ios: 60, android: 40 }),
            width: '100%',
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 54,
            marginHorizontal: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: '#DDD',
            fontSize: 18,
          },
          listView: {
            borderWidth: 1,
            borderColor: '#DDD',
            backgroundColor: '#FFF',
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            marginTop: 10,
          },
          description: {
            fontSize: 16,
          },
          row: {
            padding: 17,
            height: 58,
          },
        }}
      />
    );
  }
}

*/

const DateSelectionAndCheckout = () => {
  const navigation = useNavigation();
  const [orderTotal, setOrderTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [agentReferral, setAgentReferral] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [cartData, setCartData] = useState([]);
  //  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [data, setData] = useState([
    "Ben",
    "Paul",
    "Sibusiso",
    "Mpho",
    "Ristar",
    "David",
    "Tshepo",
    "Linda",
    "Thobile",
  ]);
  const [newArr, setNewArr] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const [rates, setRates] = useState([]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    setUserId(auth.currentUser.uid);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
    };
  }, []);
  // using local host URL for now which routes back to the initial screen but when hosted we will use the host URL
  const url = "http://localhost:19006";
  // const url2 = "https://atlegile-marketing-solutions.vercel.app/Reciept";
  const handleAddToCart = async () => {
    // if (!user) {
    //   alert("Please login first");
    //   return navigation.navigate("SignIn");
    // }
    // setNewArr(cartData);
    console.log("deliveryGuy : ", data[Math.floor(Math.random() * 10)]);
    console.log("name : ", userData?.name);

    try {
      const cartCollectionRef = collection(firestore, "Orders");

      // Add a new document with user information, product ID, product price, quantity, and image
      await addDoc(cartCollectionRef, {
        createdAt: "November 28, 2023 at 3:16:31 PM UTC+2",
        deliveryAddress: "123 Sade Street, Johannesburg Gauteng 1658",
        deliveryDate: "November 28, 2023 at 3:16:31 PM UTC+2",
        deliveryFee: 150,
        deliveryGuy: data[Math.floor(Math.random() * 10)],
        name: userData?.name,
        orderNumber: `#${
          newArr[0]?.productId?.slice(0, 4) + Math.floor(Math.random() * 10000)
        }`,
        // orderSummary: 3000,
        totalAmount: orderTotal,
        items: [...newArr],
      });

      console.log("Item added to the cart!");
      // navigation.navigate("DateSelectionAndCheckout");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // const app = initializeApp(firebaseConfig);
  // const firestore = getFirestore(app);

  const fetchCartData = async () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const cartCollectionRef = collection(db, "Cart");
    const q = query(cartCollectionRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      const cartItems = [];
      const cartProducts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cartItems.push({
          id: doc.id,
          product: data.product,
          quantity: data.quantity,
          amount: data.price * data.quantity,
          image: data.image,
          name: data.name,
          // Add other relevant fields from your Cart collection
        });
        cartProducts.push({
          id: doc.id,
          productId: data.productId,
          timestamp: data.timestamp,
          quantity: data.quantity,
          amount: data.price * data.quantity,
          image: data.image,
          name: data.name,
          // Add other relevant fields from your Cart collection
        });
      });

      setCartData(cartItems);
      setNewArr(cartProducts);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    // Fetch cart data when the user is authenticated
    if (user) {
      fetchCartData();
    }
  }, [user]); // Fetch cart data whenever the user changes

  useEffect(() => {
    const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);
    const calculatedReferral = totalAmount * 0.1;
    setAgentReferral(calculatedReferral);

    const finalTotal = totalAmount + calculatedReferral + tax + deliveryAmount;
    setOrderTotal(finalTotal);
  }, [cartData, tax, deliveryAmount]);

  const handlePress = (index) => {
    setSelectedIndex(index);
  };
  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";
  // useEffect(() => {
  //   const fetchUsers = () => {
  //     // const userDocRef = firestore.collection("Users").doc(userId);
  //     console.log("Hi here");
  //     const userDocRef = collection(firestore, "Users");
  //     const q = query(userDocRef, where("userid", "==", userId));

  //     onSnapshot(
  //       q,
  //       (querySnapshot) => {
  //         // querySnapshot?.docs.forEach((doc)
  //         querySnapshot?.docs.forEach((doc) => {
  //           // console.log("see the data : ", doc.data());
  //           // let dataCol = [];
  //           // dataCol.push(doc.data());
  //           const data = doc.data();
  //           // console.log("see the data : ", doc.data());
  //           // let dataCol = [];
  //           // dataCol.push(doc.data());
  //           // setData(dataCol);
  //           console.log("data", data);
  //           setUserData(data);
  //           console.log("Hi here 2");
  //           // setName(data?.artistName);
  //           // setImage({ uri: data?.photoUrl });
  //           // setDateOfBirth(data?.dateofbirth);
  //           // setBio(data?.biography);
  //           // setSignature({ uri: data?.signature });
  //         });
  //       },
  //       (error) => {
  //         console.log("error : ", error);
  //       }
  //     );

  //     // const unsubscribeSnapshot = q.onSnapshot((doc) => {
  //     //   if (doc.exists) {
  //     //     setUserData(doc.data());
  //     //     console.log("Hi here");
  //     //     console.log("Users Data col : ", userData);
  //     //   } else {
  //     //     console.error("User data not found");
  //     //   }
  //     // });
  //     // unsubscribeSnapshot();
  //   };

  //   fetchUsers();
  //   console.log("Users Data : ", userData);
  //   console.log("one user : ", userId);
  // }, []);
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const cartCollectionRef = firestore
          .collection("Cart")
          .where("uid", "==", user.uid);

        const unsubscribeCartSnapshot = cartCollectionRef.onSnapshot(
          (snapshot) => {
            const itemCount = snapshot.docs.length;
            setCartCount(itemCount);
          }
        );

        const userDocRef = firestore.collection("Users").doc(user.uid);
        const unsubscribeSnapshot = userDocRef.onSnapshot((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
            console.log("data from users : ", doc.data());
          } else {
            console.error("User data not found");
          }
        });

        return () => {
          unsubscribeCartSnapshot();
          unsubscribeSnapshot();
        };
      } else {
        setUserData(null);
        setCartCount(0); // Reset cart count when user is not authenticated
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);
  console.log("UserData : ", userData);

  useEffect(() => {
    const gettingRate = async () => {
      const theRates = {
        collection_address: {
          type: "business",
          company: "uAfrica.com",
          street_address: "1188 Lois Avenue",
          local_area: "Menlyn",
          city: "Pretoria",
          zone: "Gauteng",
          country: "ZA",
          code: "0181",
          lat: -25.7863272,
          lng: 28.277583,
        },
        delivery_address: {
          type: "residential",
          company: "",
          street_address: "10 Midas Avenue",
          local_area: "Olympus AH",
          city: "Pretoria",
          zone: "Gauteng",
          country: "ZA",
          code: "0081",
          lat: -25.80665579999999,
          lng: 28.334732,
        },
        parcels: [
          {
            submitted_length_cm: 42.5,
            submitted_width_cm: 38.5,
            submitted_height_cm: 5.5,
            submitted_weight_kg: 3,
          },
        ],
        declared_value: 1500,
        collection_min_date: "2021-05-21",
        delivery_min_date: "2021-05-21",
      };

      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "https://api.shiplogic.com/v2/rates",
          theRates,
          config
        );
        console.log("Courier API rates response:", response.data);
        if (response.data.rates) {
          setRates(response.data.rates);
        } else {
          console.log("Rates not found in the response");
        }
      } catch (error) {
        console.error("Error getting rates", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      }
    };
    gettingRate();
  }, []);

  const navigateToLanding = () => {
    navigation.navigate("Landing");
  };

  const navigateToOrderHistory = () => {
    navigation.navigate("OrderHistory");
  };

  useEffect(() => {
    const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);

    // Calculate agent referral
    const calculatedReferral = totalAmount * 0.1;
    setAgentReferral(calculatedReferral);

    // Calculate other amounts (tax, delivery)
    const taxAmount = totalAmount * 0.15;
    setTax(taxAmount);

    const delivery = 150.0;
    setDeliveryAmount(delivery);

    // Calculate the final order total
    const finalTotal = totalAmount + calculatedReferral + taxAmount + delivery;
    setOrderTotal(finalTotal);
  }, [cartData]);

  const handlePayment = () => {
    handleAddToCart();
    // Construct the payment URL with the necessary parameters
    const paymentUrl = `https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&return_url=${url}/&cancel_url=${url}/&notify_url=${url}/&amount=${orderTotal}&item_name=CartItems`;
    orderTotal.toFixed(2) + // Use the calculated orderTotal here
      "&item_name=TestProduct";

    // Open the payment URL in the device's default browser
    Linking.openURL(paymentUrl);
  };

  return (
    <>
      <FollowUs />
      <Navbar />
      <ScrollView style={{ flexDirection: "column" }}>
        <Container fixed sx={{ minHeight: "90vh" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                height: "800px",
                width: "65%",
                marginTop: "20px",
                marginRight: "10px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToLanding}
                    style={{ color: "grey" }}
                  >
                    Acount /
                  </TouchableOpacity>
                </Typography>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToOrderHistory}
                    style={{ color: "grey" }}
                  >
                    Cart
                  </TouchableOpacity>
                </Typography>
              </View>
              <Typography
                variant="h4"
                style={{ marginTop: "50px", fontWeight: "bold" }}
              >
                CART
              </Typography>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                ORDER #ABC246
              </Typography>
              <ScrollView style={{ flex: 1 }}>
                {cartData.map((item, index) => (
                  <View
                    style={{
                      width: "100%",
                      height: "20vh",
                      borderBottomWidth: 2,
                      borderBottomColor: "#1D1D1D",
                      // backgroundColor: "yellow",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 2,
                    }}
                    key={index}
                  >
                    {/* <View
                      style={{
                        width: "25%",
                        // height: "100%",
                        backgroundColor: "#000026",
                        // backgroundColor:'red'
                      }}> */}
                    <Image
                      source={{ uri: item.image }} // Assuming image is stored as a URL in Firebase
                      style={{
                        width: "30%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                    {/* </View> */}
                    <View style={{ width: "30%", paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        Product
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.name}
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
                        Quantity
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.quantity}
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
                        Amount
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              {/* <View>
                <Text>Hello world</Text>
              </View> */}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  Order Summary
                </Typography>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>Delivery</Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {deliveryAmount}
                </Typography>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  {" "}
                  Agent Referal
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>10%</Typography>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}> Tax </Typography>
                <Typography style={{ fontWeight: "bold" }}>15%</Typography>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  R {orderTotal}
                </Typography>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#062338",
                //height: "790px",
                width: "35%",
                marginTop: "20px",
              }}
            >
              <View style={{ padding: "20px" }}>
                <Typography
                  variant="h5"
                  style={{
                    color: "#FFFFFF",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  DELIVERY DETAILS
                </Typography>
                <View
                  style={{
                    marginTop: "10px",
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                  }}
                ></View>
                <View
                  style={{
                    // backgroundColor: "grey",
                    height: 150,
                    marginTop: 16,
                    borderRadius: 25,
                    backgroundImage: `url(${mapImage})`,
                  }}
                ></View>
                <Typography style={{ color: "#B7B9BC", marginTop: "14px" }}>
                  Delivery Notes
                </Typography>
                <Typography style={{ color: "#FFFFFF" }}>
                  In essence, AMS aims to not only help businesses grow but also
                  make a positive image on society by nurturing local talent and
                  fostering sustainable busibess growth.
                </Typography>
                <View
                  style={{
                    marginTop: "10px",
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                  }}
                ></View>
                <Typography style={{ color: "#FFFFFF", marginTop: "14px" }}>
                  Select Delivery date
                </Typography>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap", // Added flexWrap to allow wrapping
                    width: "100%",
                  }}
                >
                  {rates.map((rate, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => handlePress(index)}
                        style={{
                          height: "100px",
                          width: "80px",
                          marginTop: "10px",
                          borderWidth: 1,
                          borderColor: "white",
                          marginRight: 10,
                          //  marginBottom: 10,
                          backgroundColor:
                            selectedIndex === index ? "#2E5A88" : "transparent", // Conditional background color
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20px",
                          }}
                        >
                          {/* Extracting month and day from the delivery date */}
                          <Typography style={{ color: "white" }}>
                            {new Date(
                              rate.service_level.delivery_date_to
                            ).toLocaleString("default", { month: "short" })}
                          </Typography>
                          <Typography variant="h5" style={{ color: "white" }}>
                            {new Date(
                              rate.service_level.delivery_date_to
                            ).getDate()}
                          </Typography>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <Button
                  variant="outlined"
                  style={{
                    marginTop: 90,
                    borderWidth: 1,
                    borderColor: "lightgrey",
                    borderRadius: 15,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onClick={handlePayment}
                >
                  <Typography
                    style={{
                      fontSize: 16,
                      color: "#FFFFFF",
                    }}
                  >
                    CHECKOUT
                  </Typography>
                </Button>
              </View>
            </View>
          </View>
        </Container>

        <Footer />
        {/* <View style={{backgroundColor: 'blue', width: '100%', height: 200 }}></View> */}
      </ScrollView>
    </>
  );
};

export default DateSelectionAndCheckout;
