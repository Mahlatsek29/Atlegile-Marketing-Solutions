import React, { useState, useRef, useEffect } from "react";
import BlackSilk from "../../Global/images/blackSilk.jpg";
// import { IoMdStopwatch } from "react-icons/io";
//import { GoCheckCircleFill } from "react-icons/go";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import BusinessAccountPlus from "../../Global/images/BusinessPlus+.jpg";
// import Card from "../../Components/Card/Card";
// import FollowUs from "../../Global/Navbar/FollowUs/FollowUs";
import NavBar from "../../Global/Navbar";
// import "./businessAccount.css";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  TextInput,
  ScrollView,
  Portal,
  Modal,
} from "react-native";
// import { Modal, Title } from "react-native-paper";
import { Footer } from "../../Global/Footer";
import ProductCard from "../../Global/Card";
const logo = require("../../Global/images/cropped-AMS-Shadow-Queen-Logo_BNY-1320x772 1.png");
const bg = require("../../Global/images/blackSilk.jpg");
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Box,
} from "@mui/material";
import { AntDesign } from "@expo/vector-icons";
//import logo from "../../Global/images/logo.png";
import { COLORS } from "../../Global/Color";
import Header from "../../Global/Header";
import { Ionicons } from "@expo/vector-icons";
import { height } from "@mui/system";
import SideNav from "../../Global/SideNav";
import { Dimensions } from "react-native";
import Card2 from "../../Global/Card2";

import background from "../../Global/images/Reed.jpg";

import Banner from "../../Global/images/media bg-cover.png";
import placeholder from "../../Global/images/login.jpg";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import { storage, firestore } from "../../config";

import { PaperTextInput } from "react-native-paper";

export default function BusinessAccount() {
  const [editModal, setEditModal] = useState(false);
  const [bannerModal, setBannerModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [businessAuthorization, setBusinessAuthorization] = useState(true);
  const [subscreibed, setSubscreibed] = useState(false);
  const [businessRegistered, setBusinessRegistered] = useState(true);

  const [productName, setProductName] = useState("");
  const [otherBanner, setOtherBanner] = useState("");
  const [priceOriginal, setPriceOriginal] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [bannerListLength, setBannerListLength] = useState(0);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [other, setOther] = useState("");
  const [images, setImages] = useState([]);
  const [landing, setLanding] = useState(true);
  const [addProduct, setAddProduct] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const emptyOption = [""];

  const [businessName, setBusinessName] = useState("");

  const [selectedProductCategory, setProductCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const handlePaymentButtonPress = () => {
    const paymentUrl =
      "https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&return_url=https://atlegilemarketing.firebaseapp.com/&cancel_url=https://atlegilemarketing.firebaseapp.com/&notify_url=https://atlegilemarketing.firebaseapp.com/&amount=3170.00&item_name=TestProduct";

    // Open the payment URL in the device's default browser
    Linking.openURL(paymentUrl);
  };

  const productCategory = [
    ...emptyOption,
    "Electronics",
    "Clothing and Apparel",
    "Home and Furniture",
    "Beauty and Personal Care",
    "Sports and Outdoors",
    "Toys and Games",
    "Books and Stationery",
    "Health and Wellness",
    "Automotive",
    "Grocery and Gourmet",
    "Jewelry and Watches",
    "Home Improvement",
    "Pet Supplies",
    "Office Supplies",
    "Music and Instruments",
    "Garden and Outdoor Living",
    "Art and Craft Supplies",
    "Travel and Luggage",
    "Baby and Maternity",
    "Electrical and Lighting",
  ];
  const list = [1, 2];
  let bannerListIndex = 0;
  let bannerList = [
    {
      backgroundImage: bg,
      productName: "Cell Phone",
      priceDiscount: 2,
      quantity: 3,
      priceOriginal: 24,
      other: "Product Banner",
    },
  ];

  const increment = () => {
    if (bannerListIndex === bannerList.length - 1) {
      bannerListIndex = 0;
    }
    if (bannerListIndex < bannerList.length - 1) {
      bannerListIndex += 1;
    }
  };

  const decrement = () => {
    if (bannerListIndex === 0) {
      bannerListIndex = bannerList.length - 1;
    }
    if (bannerListIndex > 0) {
      bannerListIndex -= 1;
    }
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    //console.log("selectedImage: ", selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !price ||
      !quantity ||
      !description ||
      !productType ||
      !other
    ) {
      alert("Please fill in all fields before continuing.");
      return;
    }

    console.log("Form submitted:", {
      name,
      price,
      quantity,
      description,
      productType,
      other,
    });
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSaveEditProduct = () => {
    setEditModal(false);
  };

  const handleSaveAddBanner = () => {
    console.log("productName: ", productName);
    console.log("priceOriginal: ", priceOriginal);
    console.log("priceDiscount: ", priceDiscount);
    console.log("otherBanner: ", otherBanner);
    console.log("bannerList: ", bannerList);
    bannerList.push({
      backgroundImage: image,
      productName: productName,
      priceDiscount: priceDiscount,
      quantity: quantity,
      priceOriginal: priceOriginal,
      other: otherBanner,
    });
    setBannerListLength(bannerList.length);
    setBannerModal(false);
  };

  const handleSavePaymentInfo = () => {
    setPaymentModal(false);
    setBusinessAuthorization(true);
  };

  const handlePopUp = () => {
    setLanding(false);
  };
  useEffect(() => {
    // Simulate a button click when the component mounts
    const businessPlusModalButton =
      document.getElementById("businessPlusModal");

    if (businessPlusModalButton) {
      businessPlusModalButton.click();
    }
  }, []);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const dataUrl = e.target.result;
  //       const newImage = [...images, dataUrl];
  //       setImages(newImage);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  const handleContinue = async () => {
    // const isFormValid =
    //   !!name &&
    //   !!businessName &&
    //   !!price &&
    //   !!quantity &&
    //   !!brand &&
    //   selectedProductCategory !== "";

    // if (
    //   !name ||
    //   !price ||
    //   !quantity ||
    //   !businessName ||
    //   !selectedProductCategory ||
    //   !brand
    // ) {
    //   alert("Please fill in all fields before continuing.");
    //   return;
    // }

    if (images.length > 0) {
      try {
        // Store the data in Firestore
        const productRef = await firestore.collection("Products").add({
          name,
          businessName,
          price,
          quantity,
          description,
          selectedProductCategory,
          brand,
          // ... (other fields)
        });

        // Upload images to Firebase Storage
        const uploadTasks = images.map((image, index) => {
          const imageRef = storage.ref(
            `product_images/${productRef.id}/image${index}`
          );
          return imageRef.put(image.file); // Use put method instead of putFile
        });

        const uploadSnapshots = await Promise.all(uploadTasks);

        // Get download URLs of the images
        const downloadURLs = await Promise.all(
          uploadSnapshots.map((snapshot) => snapshot.ref.getDownloadURL())
        );

        // Update the product document with image URLs
        await productRef.update({ images: downloadURLs });

        // You can navigate to the next screen or perform other actions here
        alert("Product added successfully!");
        const paymentUrl =
          "https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&return_url=https://atlegilemarketing.firebaseapp.com/&cancel_url=https://atlegilemarketing.firebaseapp.com/&notify_url=https://atlegilemarketing.firebaseapp.com/&amount=3170.00&item_name=TestProduct";

        // Open the payment URL in the device's default browser
        Linking.openURL(paymentUrl);
      } catch (error) {
        console.error("Error storing data in Firestore:", error);
      }
    } else {
      alert("Please pick an image");
    }
  };

  return (
    <>
      {editModal ? (
        <View
          // visible={true}
          // onDismiss={() => setPaymentModal(false)}
          style={{
            top: 65,
            position: "absolute",
            // width: "100%",
            // height: "100%",
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            zIndex: 9999,
            alignSelf: "flex-end",
          }}
        >
          {/* <View
                  style={{
                    width: "33%",
                  }}
                  onTouchEnd={() => setEditModal(false)}
                ></View>
                <View
                  style={{
                    width: "33%",
                  }}
                  onTouchEnd={() => setEditModal(false)}
                ></View> */}
          <View
            style={{
              height: "100vh",
              backgroundColor: "white",
              //   backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40%",
              }}
            >
              <Image
                source={require("../../Global/images/logo.svg")} // Make sure to provide the correct path to your logo
                style={{
                  width: "50%",
                  height: "30%",
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={{ height: "60%", paddingRight: 40, paddingLeft: 40 }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 30,
                  marginBottom: 5,
                }}
              >
                EDIT PRODUCT
              </Text>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                >
                  {image && (
                    <Image
                      source={{ uri: image }} // Assuming image is a URI
                      style={{
                        backgroundColor: "#fafafa",
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: 100,
                        padding: 7,
                        marginRight: 10,
                      }}
                    />
                  )}
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "#fafafa",
                      borderWidth: 1,
                      borderColor: "lightgray",
                      width: 100,
                      padding: 20,
                    }}
                    onPress={openFileInput}
                  >
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      +
                    </Text>
                    <Text style={{ color: "gray" }}>Upload</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Name"
                  onChangeText={(text) => setProductName(text)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 5,
                    marginTop: 30,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextInput
                      placeholder="Price"
                      onChangeText={(text) => setPrice(text)}
                      style={{
                        border: "none",
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        paddingBottom: 5,
                        marginTop: 40,
                      }}
                    />
                    <Text style={{ fontSize: 12, paddingRight: 10 }}>
                      There will be VAT, Service Fees, Delivery Fees added to
                      this amount.
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder="Quantity"
                      onChangeText={(text) => setQuantity(text)}
                      style={{
                        border: "none",
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        paddingBottom: 5,
                        marginTop: 40,
                        marginLeft: 20,
                      }}
                    />
                    <Text></Text>
                  </View>
                </View>
                <TextInput
                  placeholder="Description"
                  onChangeText={(text) => setDescription(text)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 5,
                    marginTop: 40,
                  }}
                />
                <TextInput
                  placeholder="Type of Product"
                  onChangeText={(text) => setProductType(text)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 5,
                    marginTop: 40,
                  }}
                />
                <TextInput
                  placeholder="Other"
                  onChangeText={(text) => setOther(text)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 5,
                    marginTop: 40,
                  }}
                />

                <TouchableOpacity
                  onPress={handleSaveEditProduct}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 14,
                    backgroundColor: "#072840",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 10,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "white" }}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {addProduct ? (
        <View
          // visible={true}
          // onDismiss={() => setPaymentModal(false)}
          style={{
            top: 65,
            position: "absolute",
            // width: "100%",
            // height: "100%",
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            zIndex: 9999,
            alignSelf: "flex-end",
          }}
        >
          <Grid
            container
            style={{
              width: "100%",
              //marginBottom: "-10vh",
              //   border: "1px solid green",
            }}
          >
            <Grid
              item
              lg={8}
              md={8}
              sm={{ hidden: true }}
              style={{
                // border: "1px solid",
                // backgroundColor: "blue",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid
                Container
                lg={6}
                md={6}
                style={{
                  //   backgroudColor: "blue",
                  width: "100vw",
                  //   border: "1px solid yellow",
                }}
              ></Grid>
              <Grid
                Container
                lg={6}
                md={6}
                style={{
                  // backgroudColor: "yellow",
                  width: "100vw",
                  // border: "1px solid yellow",
                  marginBottom: "-8px",
                }}
              >
                {/* <img
              src={Banner}
              style={{
                height: "21vh",
                width: "65vw",
                paddingTop: "30vh",
                marginLeft: "10px",
                marginRight: "2px",
              }}
            /> */}
              </Grid>
            </Grid>

            <Grid
              item
              lg={4}
              md={4}
              style={{
                // border: "1px solid red",
                backgroundColor: "#fff",
                marginLeft: "-10px",
                width: "100%",
                height: "98vh",
                // marginLeft: "2px",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Grid
                style={{ backgroundColor: "whitesmoke", alignSelf: "center" }}
              >
                <img
                  src={logo}
                  style={{ height: "9vh", width: "90%", paddingTop: "15vh" }}
                />
              </Grid>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div
                  className="form-container"
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    width: "75%",
                    // backgroundColor: "red",
                    marginLeft: "80px",
                    marginBottom: "30px",
                  }}
                >
                  <Typography
                    style={{
                      color: "#000",
                      textAlign: "left",
                      fontSize: "25px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    ADD PRODUCTS + SERVICES
                  </Typography>
                  {/* <h6>inputs will be stored here</h6> */}

                  <div
                    className="uploadContainer"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Product Image ${index + 1}`}
                          style={{
                            padding: "10px",
                            marginRight: "10px",
                            width: "16%",
                            height: "8vh",
                          }}
                        />
                      ))
                    ) : (
                      <img
                        src={placeholder}
                        alt="Placeholder"
                        style={{
                          padding: "5px",
                          marginRight: "10px",
                          width: "16%",
                          height: "8vh",
                        }}
                      />
                    )}

                    <label
                      htmlFor="imageInput"
                      className="add"
                      style={{
                        backgroundColor: "whitesmoke",
                        color: "#000",
                        padding: "25px",
                        // paddingBottom:'20px',
                        width: "5%",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                    >
                      +
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      multiple // Allow selecting multiple files
                    />
                  </div>

                  <View style={{ alignSelf: "center" }}>
                    <form onSubmit={handleContinue}>
                      <TextField
                        fullWidth
                        id="outlined-number"
                        label="Name"
                        type="text"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "100%" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <TextField
                        fullWidth
                        id="outlined-number"
                        label="Business Name"
                        type="text"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "100%", marginTop: "10px" }}
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                          fullWidth
                          id="outlined-number"
                          label="Price"
                          type="text"
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{
                            width: "45%",
                            marginRight: "10px",
                            marginTop: "10px",
                          }}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                        <TextField
                          fullWidth
                          id="outlined-number"
                          label="Quantity"
                          type="text"
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "45%", marginTop: "10px" }}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          required
                        />
                      </View>
                      <br />
                      <TextField
                        fullWidth
                        id="outlined-number"
                        label="Description"
                        type="text"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          //   backgroundColor: "dodgerblue",
                          width: "100%",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                      <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        label="product Category"
                        variant="standard"
                        value={selectedProductCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        style={{
                          width: "100%",
                          // marginTop: "5px",
                          marginRight: "10px",
                          textAlign: "left",
                        }}
                        required
                      >
                        {productCategory.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        fullWidth
                        id="outlined-number"
                        label="Brand"
                        type="text"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          width: "100%",
                          marginLeft: "5px",
                          marginTop: "10px",
                        }}
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                      />
                      <Button
                        variant="contained"
                        style={{
                          width: "100%",
                          height: "10%",
                          //   padding: "15px",
                          margin: "20px 0px",
                          background: "#072840",
                          borderRadius: "30px",
                        }}
                        type="submit"
                      >
                        continue
                      </Button>
                    </form>
                  </View>
                </div>
              </Box>
            </Grid>
          </Grid>
        </View>
      ) : null}
      {paymentModal ? (
        <View
          // visible={true}
          // onDismiss={() => setPaymentModal(false)}
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "flex-end", // Align to the end
            zIndex: 9999,

            flexDirection: "row",
          }}
        >
          <View style={{ height: "100vh" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  height: "50vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: logo }}
                  style={{
                    height: "9%",
                    width: "80%",
                    paddingTop: "30%",
                    scale: "0.5",
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "75%",
                  marginLeft: 80,
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    textAlign: "left",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  PAYMENT INFO
                </Text>
                <TextField
                  id="standard-basic"
                  label="Card Holder"
                  variant="standard"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="standard-basic"
                  label="Card Number"
                  variant="standard"
                  style={{ width: "100%" }}
                />
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    id="standard-basic"
                    label="Expiary"
                    variant="standard"
                    style={{ width: "45%", marginRight: "15px" }}
                  />
                  <TextField
                    id="standard-basic"
                    label="CVV"
                    variant="standard"
                    style={{ width: "45%", marginRight: "15px" }}
                  />
                </View>
                <Button
                  mode="contained"
                  onPress={handlePaymentButtonPress}
                  style={{
                    width: "80%",
                    height: "15%",
                    margin: 20,
                    borderRadius: 30,
                    backgroundColor: "#072840",
                  }}
                >
                  Continue
                </Button>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {bannerModal ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
            display: "flex",
            alignItems: "center",
            zIndex: 1000, // Adjust as needed
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "felx-end",
              alignItems: "center",
              width: 50,
            }}
          >
            <Card
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "33%",
                }}
                onTouchEnd={() => setBannerModal(false)}
              ></View>
              <View
                style={{
                  height: "100%",
                  width: "33%",
                }}
                onTouchEnd={() => setBannerModal(false)}
              ></View>
              <View
                style={{
                  width: "34%",
                  height: "100%",
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40%",
                  }}
                >
                  <Image
                    source={require("../../Global/images/logo.svg")} // Make sure to provide the correct path to your logo
                    style={{
                      width: "20%",
                      height: "20%",
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View
                  style={{ height: "60%", paddingRight: 40, paddingLeft: 40 }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 30,
                      marginBottom: 5,
                    }}
                  >
                    ADD BANNER
                  </Text>
                  <View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingBottom: 20,
                      }}
                    >
                      {image && (
                        <Image
                          source={{ uri: image }} // Assuming image is a URI
                          style={{
                            backgroundColor: "#fafafa",
                            borderWidth: 1,
                            borderColor: "lightgray",
                            width: 100,
                            padding: 7,
                            marginRight: 10,
                          }}
                        />
                      )}
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          backgroundColor: "#fafafa",
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: 100,
                          padding: 20,
                        }}
                        onPress={openFileInput}
                      >
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 20,
                            fontWeight: "700",
                          }}
                        >
                          +
                        </Text>
                        <Text style={{ color: "gray" }}>Upload</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      placeholder="Product Name"
                      onChangeText={(text) => setProductName(text)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        paddingBottom: 5,
                        marginTop: 30,
                      }}
                    />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <TextInput
                          placeholder="Discount Price"
                          onChangeText={(text) => setPriceDiscount(text)}
                          style={{
                            border: "none",
                            borderBottomWidth: 1,
                            borderBottomColor: "gray",
                            paddingBottom: 5,
                            marginTop: 40,
                          }}
                        />
                      </View>
                      <View>
                        <TextInput
                          placeholder="Quantity"
                          onChangeText={(text) => setQuantity(text)}
                          style={{
                            border: "none",
                            borderBottomWidth: 1,
                            borderBottomColor: "gray",
                            paddingBottom: 5,
                            marginTop: 40,
                            marginLeft: 20,
                          }}
                        />
                      </View>
                    </View>
                    <TextInput
                      placeholder="Original Price"
                      onChangeText={(text) => setPriceOriginal(text)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        paddingBottom: 5,
                        marginTop: 40,
                      }}
                    />
                    <TextInput
                      placeholder="Other"
                      onChangeText={(text) => setOtherBanner(text)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        paddingBottom: 5,
                        marginTop: 40,
                      }}
                    />

                    <TouchableOpacity
                      onPress={handleSaveAddBanner}
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 14,
                        backgroundColor: "#072840",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: 10,
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ color: "white" }}>SAVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </View>
      ) : null}

      {landing && !businessAuthorization ? (
        <View
          style={{
            top: 50,
            position: "absolute",
            // width:"100%",
            // height:"100vh",
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              width: "60%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 50,
                paddingHorizontal: "10%",
                paddingVertical: "3%",
                width: "100%",
                height: "5px",
                // backgroundColor:"green"
              }}
              onPress={handlePopUp}
            >
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={{
                  top: 50,
                  position: "absolute",
                  right: 50,
                  width: 20, // Use numbers for dimensions, not strings
                  height: 20,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                //  paddingBottom: 20,
                //paddingTop: 20,
                height: "20vh",
                width: "100%",
              }}
            >
              <Image
                source={logo}
                alt="cropped AMS Shadow Queen Logo BNY-1320x772"
                style={{ width: "15%", height: "35%" }}
              />
            </View>

            <Text
              style={{
                fontWeight: 700,
                fontSize: 15,
                marginTop: "-30px",
                textAlign: "center",
              }}
            >
              BUSINESS REGISTRATION AUTHORIZATION
            </Text>

            <Text style={{ textAlign: "center", fontSize: 15 }}>
              Welcome to AMS, where we strive to ensure a secure and trustworthy{" "}
              <br />
              environment for businesses and customers alike. As part of our
              <br />
              commitment to maintaining the integrity of our platform, we have
              <br />
              implemented an authorization process for new business
              <br />
              registrations. This process is designed to verify the legitimacy
              <br />
              and authenticity of the businesses that join our community.
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: 20,
                paddingBottom: 20,
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px gray solid",
                  width: "35%",
                  padding: 10,
                  margin: 10,
                }}
              >
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  Enhance Trust
                </Typography>

                <Typography sx={{ textAlign: "center", marginTop: "-10px" }}>
                  By confirming the legitimacy of businesses, <br /> we build
                  trust among our users, making it a<br /> safer place to
                  conduct business.
                </Typography>
              </Card>

              <Card
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px gray solid",
                  width: "35%",
                  padding: 10,
                  margin: 10,
                }}
              >
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Review
                </Typography>
                <Typography sx={{ textAlign: "center", marginTop: "-10px" }}>
                  Our dedicated team will review the
                  <br /> provided details, ensuring they align with
                  <br /> our platform's policies and standards.
                </Typography>
              </Card>

              <Card
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px gray solid",
                  width: "35%",
                  padding: 10,
                  margin: 10,
                }}
              >
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Verification
                </Typography>
                <Typography sx={{ textAlign: "center", marginTop: "-10px" }}>
                  In some cases, we may request additional
                  <br /> documents or information to verify the
                  <br /> authenticity of your business.
                </Typography>
              </Card>

              <Card
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px gray solid",
                  width: "35%",
                  padding: 10,
                  margin: 10,
                }}
              >
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Approval
                </Typography>
                <Typography sx={{ textAlign: "center", marginTop: "-10px" }}>
                  Once your registration is approved, your
                  <br /> business profile will be live on our platform,
                  <br /> and you can start receiving orders for your
                  <br /> products and services.
                </Typography>
              </Card>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingTop: 20,
                paddingBottom: 20,
                width: "60%",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "49%",
                  marginBottom: 10,
                }}
              >
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    marginBottom: 20,
                    fontWeight: "bold",
                  }}
                >
                  TIMEFRAME
                </Typography>
                <Typography sx={{ marginTop: "-20px" }}>
                  The authorization process typically takes [X] business days,
                  depending on the complexity of your business and the accuracy
                  of the information provided.
                </Typography>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  width: "49%",
                  marginBottom: 10,
                }}
              >
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    marginBottom: 20,
                    fontWeight: "bold",
                  }}
                >
                  CONTACT US
                </Typography>
                <Typography sx={{ marginTop: "-20px" }}>
                  If you have any questions or require assistance during the
                  authorization process, please don't hesitate to contact our
                  support team at [Contact Information].
                </Typography>
              </View>
            </View>
            <Card
              style={{
                flexDirection: "column",
                border: "1px lightgray solid",
                padding: 40,
                height: "40vh",
                marginBottom: 30,
              }}
            >
              <Image
                source={BusinessAccountPlus}
                alt="business plus logo"
                style={{ width: "45%", height: "25%", marginBottom: 5 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  style={{
                    color: "#252b42",
                    fontWeight: "700",
                    fontSize: 32,
                    width: "50%",
                  }}
                >
                  BUSINESS PLUS SUBSCRIPTION
                </Typography>

                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "20%",
                  }}
                >
                  <Typography
                    style={{
                      color: "#23a6f0",
                      fontWeight: "700",
                      fontSize: 40,
                      marginBottom: -10,
                    }}
                  >
                    R150
                  </Typography>
                  <Typography
                    style={{
                      color: "#b8d9f7",
                      fontWeight: "700",
                      fontSize: 20,
                    }}
                  >
                    Per Month
                  </Typography>
                </View>
              </View>
              <Typography
                style={{
                  color: "#9e9e9e",
                  fontWeight: "700",
                  fontSize: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Unlock More Opportunities with Business Plus Subscription
              </Typography>
              <View style={{ flexDirection: "column" }}>
                <Typography
                  style={{
                    marginTop: 15,
                    fontWeight: "700",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color="#2dc071"
                  />{" "}
                  List Unlimited Products
                </Typography>
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color="#2dc071"
                  />{" "}
                  Priority Support
                </Typography>
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color="#2dc071"
                  />{" "}
                  Exclusive Promotions
                </Typography>
              </View>
            </Card>
          </View>
        </View>
      ) : null}
      <Header />
      <NavBar />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: businessRegistered ? "20%" : "100%",
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: "#f5f5f5",
            justifyContent: "center",
          }}
        >
          <SideNav />
        </View>

        <View
          style={{ display: businessRegistered ? "" : "none", width: "80%" }}
        >
          <View
            style={{
              height: "150px",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={BlackSilk}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </View>
          <View
            style={{
              height: "110px",
              backgroundColor: "#072840",
              paddingTop: 20,
              paddingLeft: 30,
            }}
          >
            <Text
              style={{
                display: "flex",
                color: "white",
                flexDirection: "column",
              }}
            >
              <Text
                style={{ fontWeight: "600", fontSize: 18, marginBottom: -5 }}
              >
                BUSINESS
              </Text>
              <Text
                style={{ fontWeight: "600", fontSize: 30, marginBottom: 5 }}
              >
                SECURETECH SOLUTIONS
              </Text>
              <Text style={{ fontWeight: "600", fontSize: 14 }}>
                secure.tech.co.za
              </Text>
            </Text>
          </View>

          <View
          // style={{backgroundColor:"white"}}
          >
            <Card
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingRight: 30,
                paddingBottom: 30,
                paddingTop: 30,
                paddingLeft: 30,
                // height: "100px",
              }}
            >
              <View>
                <Text style={{ fontWeight: "700", fontSize: 30 }}>
                  PRODUCTS & SERVICES
                </Text>
                <Text
                  style={{
                    display: businessAuthorization ? "none" : "",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Please add a minimum of 3 products
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: 14,
                    backgroundColor: "#fe951c",
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 20,
                    display: businessAuthorization ? "none" : "flex",
                    marginTop: 5,
                    justifyContent: "center",
                  }}
                >
                  AUTHORIZATION PENDING
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => setAddProduct(true)}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 14,
                      backgroundColor: "#072840",
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 25,
                      paddingRight: 25,
                      borderRadius: 20,
                      display: !businessAuthorization ? "none" : "flex",
                      marginRight: 20,
                    }}
                  >
                    ADD PRODUCT
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: 14,
                    backgroundColor: "#072840",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 25,
                    paddingRight: 25,
                    borderRadius: 20,
                    display: "flex",
                  }}
                >
                  BUSINESS PLUS R150/PM
                </Text>
              </View>
            </Card>

            {businessAuthorization ? (
              <Card
                style={{
                  width: "100%",
                  // height: "80px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // paddingLeft: 10,
                  // paddingBottom: 30,
                  // paddingTop: 30,
                  display: "flex",
                }}
              >
                {bannerListLength > -1 ? (
                  <View
                    style={{
                      backgroundImage: `url(${bannerList[bannerListIndex].backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 15,
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={decrement}
                      style={{ marginRight: 20 }}
                    >
                      <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        {bannerList[bannerListIndex].other}
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {bannerList[bannerListIndex].productName}
                      </Text>
                      <Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#c29920",
                          }}
                        >
                          R{bannerList[bannerListIndex].priceDiscount}
                        </Text>{" "}
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 400,
                            color: "white",
                          }}
                        >
                          R{bannerList[bannerListIndex].priceOriginal}
                        </Text>
                      </Text>
                    </View>
                    <TouchableOpacity onPress={increment}>
                      <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    width: "15%",
                    borderRadius: 20,
                    border: "1px gray dashed",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    marginLeft: 10,
                  }}
                  onPress={() => setBannerModal(true)}
                >
                  <Text>ADD BANNER</Text>
                </TouchableOpacity>
              </Card>
            ) : null}

            <ScrollView style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingRight: 10,
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      margin: 50,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {list.map((item, index) => (
                      <ProductCard
                        key={index}
                        open={() => setEditModal(true)}
                      />
                    ))}
                  </View>
                </View>

                {businessAuthorization ? null : (
                  <View
                    style={{
                      width: 350,
                      flexDirection: "column",
                      border: "1px lightgray solid",
                      padding: 40,
                      alignItems: "center",
                      height: 500,
                      //   zIndex:500,
                    }}
                  >
                    {/* <TouchableOpacity
                 // onPress={setBusinessAuthorization(true)}
                  > */}
                    <Image
                      source={require("../../Global/images/BusinessPlus+.jpg")}
                      alt="business plus logo"
                      style={{ width: "85%", height: "20%", marginBottom: 5 }}
                    />
                    {/* </TouchableOpacity> */}

                    <Text
                      style={{
                        color: "#252b42",
                        fontWeight: "700",
                        fontSize: 32,
                        textAlign: "center",
                      }}
                    >
                      <TouchableOpacity onPress={() => setPaymentModal(true)}>
                        <Text>BUSINESS PLUS SUBSCRIPTION</Text>
                      </TouchableOpacity>
                    </Text>
                    <Text
                      style={{
                        color: "#9e9e9e",
                        fontWeight: "700",
                        fontSize: 16,
                        textAlign: "center",
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      Unlock More Opportunities with Business Plus Subscription
                    </Text>
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#23a6f0",
                          fontWeight: "700",
                          fontSize: 40,
                          marginBottom: -10,
                        }}
                      >
                        R150
                      </Text>
                      <Text
                        style={{
                          color: "#b8d9f7",
                          fontWeight: "700",
                          fontSize: 20,
                        }}
                      >
                        Per Month
                      </Text>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          marginTop: 15,
                          fontWeight: "700",
                          fontSize: 18,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Ionicons
                          name="checkmark-circle"
                          size={30}
                          color="#2dc071"
                        />{" "}
                        List Unlimited Products
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 18,
                          marginTop: 15,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Ionicons
                          name="checkmark-circle"
                          size={30}
                          color="#2dc071"
                        />{" "}
                        Priority Support
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 18,
                          marginTop: 15,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Ionicons
                          name="checkmark-circle"
                          size={30}
                          color="#2dc071"
                        />{" "}
                        Exclusive Promotions
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <Footer />
      {/* <div style={{ marginTop: "40vh" }}></div> */}
    </>
  );
}
