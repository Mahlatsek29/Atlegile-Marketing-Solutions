import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Container, Typography, Button } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import mapImage from "../../Global/images/mapImage.png";
import hdtv from "../../Global/images/hdtv.jpg";
import axios from "axios";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../../config";

import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  where,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

import { firebase, auth, db } from "../../config";
// import { timeStamp } from "console";
import ReactDOM from "react-dom";
import App from "../../../App";
import PlaceAutocomplete from "../../Global/PlaceAutocomplete";
const DateSelectionAndCheckout = () => {
  const navigation = useNavigation();
  const [orderTotal, setOrderTotal] = useState(0);
  const [tax, setTax] = useState(null);
  const [agentReferral, setAgentReferral] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState(null);
  const [rates, setRates] = useState([]);
  const [cartCount, setCartCount] = useState(2);
  const [data, setData] = useState([
    "Ben",
    "Paul",
    "Sibusiso",
    "Duduzile",
    "Ristar",
    "David",
    "Tshepo",
    "Linda",
    "Thobile",
  ]);
  const [newArr, setNewArr] = useState([]);
  // const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [randomGuy, setRandomGuy] = useState(
    data[Math.floor(Math.random() * 10)]
  );

  // const [rates, setRates] = useState([]);
  const [userData, setUserData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [addressInput, setAddessInput] = useState(false);
  const [address, setAddress] = useState({});
  const [coordinates, setCoordinates] = useState({});
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
    };
  }, []);
  // using local host URL for now which routes back to the initial screen but when hosted we will use the host URL
  const url = "https://atlegile-marketing-solutions.vercel.app/";
  // const url2 = "https://atlegile-marketing-solutions.vercel.app/Reciept";

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
          uid: user.uid,
          productId: data.productId,
          timestamp: data.timestamp,
          quantity: data.quantity,
          amount: data.price * data.quantity,
          image: data.image,
          name: data.name,
          deliveryGuy: randomGuy,
          // Add other relevant fields from your Cart collection
        });
      });

      setCartData(cartItems);
      setNewArr(cartProducts);
      // setNewArr([...cartItems]);
      console.log("cartData : ", cartData);
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

  const handleAddToCartHistory = async () => {
    if (!user) {
      alert("Please login first");
      return navigation.navigate("SignIn");
    }

    try {
      const cartCollectionRef = collection(firestore, "CartHistory");

      // Iterate through each object in the array and add it as a separate document
      for (const item of newArr) {
        await addDoc(cartCollectionRef, item);
      }

      console.log("All items added to the cart history!");
      navigation.navigate("DateSelectionAndCheckout");
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  // const updateCart = async () => {
  //   try {
  //     const docRef = doc(firestore, "Cart", user.uid);

  //     // Use an empty object to overwrite all existing fields with null values
  //     await updateDoc(docRef, {});

  //     console.log("Cart successfully emptied!");
  //     alert("Cart is now empty");
  //   } catch (error) {
  //     console.error("Error emptying cart:", error);
  //     alert("Error occurred while emptying cart");
  //   }
  // };
  const deleteCart = async () => {
    const cartCollectionRef = collection(firestore, "Cart");
    const querySnapshot = await getDocs(cartCollectionRef);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const handleAddToOrders = async () => {
    console.log("deliveryGuy : ", data[Math.floor(Math.random() * 10)]);
    console.log("name : ", userData);

    try {
      const ordersCollectionRef = collection(firestore, "Orders");

      // Add a new document with user information, product ID, product price, quantity, and image
      await addDoc(ordersCollectionRef, {
        createdAt: serverTimestamp(),
        deliveryAddress: "123 Sade Street, Johannesburg Gauteng 1658",
        deliveryDate: serverTimestamp(),
        deliveryFee: 150,
        deliveryGuy: randomGuy,
        name: userData?.name,
        userName: userData?.name,
        invoiceNumber: `#${Math.floor(Math.random() * 10000000)}555${Math.floor(
          Math.random() * 100000000
        )}`,
        DeliveryStatus: "Delivered",
        userId: userData?.uid,
        orderNumber: `#${
          userData?.uid?.slice(5, 15) + Math.floor(Math.random() * 10000)
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

    handleAddToCartHistory();
    // updateCart();
    deleteCart();
  };
  const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";

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
            submitted_length_cm: 20,
            submitted_width_cm: 20,
            submitted_height_cm: 10,
            submitted_weight_kg: 2,
          },
        ],
        declared_value: 1100,
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
  const AddressData = [
    {
      address: " 564 Zamakulungisa St, Emdeni South ",
      Township: "Soweto",
      PoBox: 1861,
    },
    {
      address: " 564 Zamakulungisa St, South ",
      Township: "Soweto",
      PoBox: 1861,
    },
    {
      address: " 564 Zamakulungisa St, Emdeni ",
      Township: "Soweto",
      PoBox: 1861,
    },
    {
      address: " 564 Zamakulungisa St, Emdeni South ",
      Township: "Soweto",
      PoBox: 1861,
    },
  ];
  // console.log("cartData 2 : ", cartData);

  const creattingShipment = async () => {
    const shipment = {
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
      collection_contact: {
        name: "Cornel Rautenbach",
        mobile_number: "",
        email: "cornel+sandy@uafrica.com",
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
      delivery_contact: {
        name: "Boiketlo Mochochoko",
        mobile_number: "0734157351",
        email: "mochochokoboiketlo@gmail.com",
      },
      parcels: [
        {
          parcel_description: "Standard flyer",
          submitted_length_cm: 20,
          submitted_width_cm: 20,
          submitted_height_cm: 10,
          submitted_weight_kg: 2,
        },
      ],
      opt_in_rates: [],
      opt_in_time_based_rates: [76],
      special_instructions_collection:
        "This is a test shipment - DO NOT COLLECT",
      special_instructions_delivery: "This is a test shipment - DO NOT DELIVER",
      declared_value: 1100,
      collection_min_date: "2021-05-21T00:00:00.000Z",
      collection_after: "08:00",
      collection_before: "16:00",
      delivery_min_date: "2021-05-21T00:00:00.000Z",
      delivery_after: "10:00",
      delivery_before: "17:00",
      custom_tracking_reference: "",
      customer_reference: "ORDERNO123",
      service_level_code: "ECO",
      mute_notifications: false,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${CourierAPIKey}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "https://api.shiplogic.com/v2/shipments",
        shipment,
        config
      );
      console.log("Courier API creating shpment response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting shipment details", error);

      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.log("No response received. Request made but no response.");
      } else {
        console.log("Error in making the request:", error.message);
      }
    }
  };

  const AddressComponent = ({ address, township, poBox, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 2,
          borderBottomColor: "#1D1D1D",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 2,
          flexWrap: "wrap",
          marginBottom: 15,
        }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          {address},
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          {township},
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          {poBox}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const AddressList = ({ data, onAddressPress }) => (
    <ScrollView
      style={{ height: 250, padding: 10 }}
      showsVerticalScrollIndicator={false}>
      {data.map((item, index) => (
        <AddressComponent
          key={index}
          address={item.address}
          township={item.Township}
          poBox={item.PoBox}
          onPress={() => onAddressPress(item)}
        />
      ))}
    </ScrollView>
  );

  const [selectedAddress, setSelectedAddress] = useState(AddressData[0]);
  const navigateToLanding = () => {
    navigation.navigate("Landing");
  };

  const navigateToOrderHistory = () => {
    navigation.navigate("OrderHistory");
  };

  useEffect(() => {
    const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);

    const calculatedReferral = totalAmount * 0.1;
    setAgentReferral(calculatedReferral);

    const taxAmount = totalAmount * 0.15;
    setTax(taxAmount);

    const delivery =
      selectedIndex !== null ? rates[selectedIndex].base_rate.charge : 0;

    const finalTotal = totalAmount + calculatedReferral + taxAmount + delivery;
    setOrderTotal(finalTotal);
  }, [cartData, selectedIndex, rates]);

  const handlePayment = () => {
    handleAddToOrders();
    creattingShipment(); //create a shipment before goignt to pay fast
    // Construct the payment URL with the necessary parameters
    const paymentUrl = `https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&return_url=${url}/&cancel_url=${url}/&notify_url=${url}/&amount=${orderTotal}&item_name=CartItems`;
    orderTotal.toFixed(2) + // Use the calculated orderTotal here
      "&item_name=TestProduct";

    // Open the payment URcartDatanL in the device's default browser
    Linking.openURL(paymentUrl);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs&libraries=places";
    script.defer = true;

    const handleScriptLoad = () => {
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    };

    script.onload = handleScriptLoad;

    // Check if the script is already present to avoid re-adding it
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.head.appendChild(script);
    }

    return () => {
      // Clean up if needed
      document.head.removeChild(script);
    };
  }, []);

  const handleInputChange = (text) => {
    setInputValue(text);
    handleSearch();
  };

  const handlePlaceSelect = ({ place, latLng }) => {
    // Do something with the selected place details and latitude/longitude
    console.log("Selected place:", place);
    console.log("Latitude and Longitude:", latLng);
    setAddress(place);
    setCoordinates(latLng);
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
              }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToLanding}
                    style={{ color: "grey" }}>
                    <Text>Acount /</Text>
                  </TouchableOpacity>
                </Typography>
                <Typography>
                  <TouchableOpacity
                    onPress={navigateToOrderHistory}
                    style={{ color: "grey" }}>
                    Cart
                  </TouchableOpacity>
                </Typography>
              </View>
              <Typography
                variant="h4"
                style={{ marginTop: "50px", fontWeight: "bold" }}>
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
                    key={index}>
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
                        }}>
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
                        }}>
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
                        }}>
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
                }}>
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
                }}>
                <Typography style={{ fontWeight: "bold" }}>Delivery</Typography>
                {selectedIndex !== null && (
                  <Typography style={{ fontWeight: "bold" }}>
                    R{rates[selectedIndex].rate}
                  </Typography>
                )}
              </View>

              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Typography style={{ fontWeight: "bold" }}>
                  {" "}
                  Agent Referral
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {selectedIndex !== null
                    ? `R${agentReferral.toFixed(2)}`
                    : "10%"}
                </Typography>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Typography style={{ fontWeight: "bold" }}> Tax </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {selectedIndex !== null ? `R${tax.toFixed(2)}` : "15%"}
                </Typography>
              </View>

              <View
                style={{
                  display: "flex",
                  marginTop: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
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
              }}>
              <View style={{ padding: "20px" }}>
                <Typography
                  variant="h5"
                  style={{
                    color: "#FFFFFF",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}>
                  DELIVERY DETAILS
                </Typography>
                {addressInput ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-star",

                      height: "62vh",
                    }}>
                    <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                  </View>
                ) : (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <Typography style={{ color: "#B7B9BC" }}>
                        Delivery Address
                      </Typography>
                      <TouchableOpacity
                        style={{
                          color: "#B7B9BC",
                          border: "1px white solid",
                          padding: 10,
                          borderRadius: 5,
                        }}
                        onPress={() => setAddessInput(true)} // Assuming setAddessInput is a function
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Typography variant="h6" style={{ color: "#FFFFFF" }}>
                        {`${selectedAddress.address}, ${selectedAddress.Township}, ${selectedAddress.PoBox}`}
                      </Typography>

                      <View
                        style={{
                          marginTop: "10px",
                          borderBottomWidth: 1,
                          borderBottomColor: "lightgrey",
                        }}></View>
                      <Typography
                        variant="h5"
                        sx={{ color: "#B7B9BC", fontSize: 20, marginTop: 1 }}>
                        Recent Addresses
                      </Typography>
                      <AddressList
                        data={AddressData}
                        onAddressPress={(selectedItem) =>
                          setSelectedAddress(selectedItem)
                        }
                      />
                    </View>
                  </>
                )}

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
                  }}>
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
                          backgroundColor:
                            selectedIndex === index ? "#2E5A88" : "transparent",
                        }}>
                        <View
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20px",
                          }}>
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
                  onClick={handlePayment}>
                  <Typography
                    style={{
                      fontSize: 16,
                      color: "#FFFFFF",
                    }}>
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
