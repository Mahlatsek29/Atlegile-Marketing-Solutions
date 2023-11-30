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
} from "react-native";
import { Modal, Title } from "react-native-paper";
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
export default function BusinessAccount() {
  const [editModal, setEditModal] = useState(false);
  const [bannerModal, setBannerModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [businessAuthorization, setBusinessAuthorization] = useState(false);
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

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
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
  };

  const handlePopUp = () => {
    console.log('this is happening')
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const newImage = [...images, dataUrl];
        setImages(newImage);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
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
                paddingVertical: "5%",            
                width: "100%",
                height: "2px",
              }}
              onPress={ handlePopUp}
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
                style={{ width: "20%", height: "40%" }}
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
          {/* <View id="sideNav">
            <View
              style={{
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "lightgray",
                  width: 150,
                  height: 150,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                }}
              >
                <Text>S</Text>
              </View>
            </View>

            <View style={{ alignItems: "center", flexDirection: "column" }}>
              <Text style={{ fontSize: 30, fontWeight: 700 }}>SARAH</Text>
              <Text style={{ fontSize: 14, fontWeight: 700 }}>0123456789</Text>
              <Text style={{ fontWeight: 700 }}>example@mail.ccom</Text>
            </View>

            <View style={{ textAlign: "center", marginTop: 30 }}>
              <Text>
                1235 Vilakazi Street, Orlando West, Soweto, 1804, South Africa
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
                padding: 30,
                backgroundColor: businessRegistered ? "white" : "",
                marginTop: 30,
              }}
            >
              <Text>
                <Text
                  style={{ color: "#072840", fontWeight: 600, fontSize: 22 }}
                >
                  Julian Jameson
                </Text>
                {"\n"}
                <Text style={{ color: "gray", fontWeight: 600 }}>
                  Alternative Contact
                </Text>
              </Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  borderStyle: "solid",
                  borderBottomWidth: businessRegistered ? 2 : 0,
                  borderBottomColor: "#072840",
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <button
                  name="md-stopwatch"
                  size={24}
                  color="#072840"
                  style={{ marginRight: 25 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  ORDER HISTORY
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderStyle: "solid",
                  borderBottomWidth: businessRegistered ? 2 : 0,
                  borderBottomColor: "#072840",
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <button
                  name="md-stopwatch"
                  size={24}
                  color="#072840"
                  style={{ marginRight: 25 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  FAVOURITES
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderStyle: "solid",
                  borderBottomWidth: businessRegistered ? 2 : 0,
                  borderBottomColor: "#072840",
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <button
                  name="md-stopwatch"
                  size={24}
                  color="#072840"
                  style={{ marginRight: 25 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  TERMS & CONDITIONS
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderStyle: "solid",
                  borderBottomWidth: businessRegistered ? 2 : 0,
                  borderBottomColor: "#072840",
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <button
                  name="md-stopwatch"
                  size={24}
                  color="#072840"
                  style={{ marginRight: 25 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  PRIVACY POLICY
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  color: "#f44336",
                  flexDirection: "row",
                  paddingTop: 40,
                  paddingBottom: 10,
                  alignItems: "center",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Text
                  style={{ color: "#f44336" }}
                  onPress={() => console.log("SIGN OUT")}
                >
                  SIGN OUT
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: businessRegistered ? "none" : "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 20,
                paddingBottom: 150,
              }}
            >
              <TouchableOpacity
                style={{
                  color: "#072840",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "1px #072840 solid",
                  padding: 10,
                  borderRadius: 20,
                  display: "inline-block",
                  marginTop: 5,
                  cursor: "pointer",
                  marginRight: 5,
                }}
                onPress={() => setBusinessAuthorization(true)}
              >
                REGISTER BUSINESS
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  color: "#072840",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "1px #072840 solid",
                  padding: 10,
                  borderRadius: 20,
                  display: "inline-block",
                  marginTop: 5,
                  cursor: "pointer",
                }}
                onPress={() => setBusinessAuthorization(true)}
              >
                REGISTER AS A FREELANCER
              </TouchableOpacity>
            </View>
          </View> */}
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
            {editModal ? (
              <Modal
                visible={true}
                onDismiss={() => setEditModal(false)}
                contentContainerStyle={{
                  position: "absolute",
                  width: "80%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                  //  zIndex: 1000,
                }}
              >
                <View
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
                ></View>
                <View
                  style={{
                    width: "34%",
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
                        width: "100%",
                        height: "100%",
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
                            There will be VAT, Service Fees, Delivery Fees added
                            to this amount.
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
              </Modal>
            ) : // <Modal
            //   visible={true}
            //   onDismiss={() => setEditModal(false)}
            //   contentContainerStyle={{
            //     position: "absolute",
            //     width: "80%",
            //     height: "100%",
            //     backgroundColor: "rgba(0, 0, 0, 0.5)",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     zIndex: 1000,
            //   }}
            // >
            //   <Container fixed style={{ height: "100vh" }}>
            //     <Grid container spacing={2} justifyContent="center">
            //       <Grid item xs={5}>
            //         <Card>
            //           <CardContent
            //             style={{
            //               textAlign: "center",
            //               justifyContent: "center",
            //               display: "flex",
            //               flexDirection: "column",
            //             }}
            //           >
            //             <Box
            //               sx={{
            //                 display: "flex",
            //                 alignItems: "center",
            //                 height: "300px",
            //               }}
            //             >
            //               <img
            //                 src={logo}
            //                 alt="Logo"
            //                 style={{ width: "100px", margin: "0 auto" }}
            //               />
            //             </Box>
            //             <Typography
            //               variant="h5"
            //               style={{ textAlign: "left", fontWeight: "bold" }}
            //             >
            //               ADD PRODUCTS + SERVICES
            //             </Typography>
            //             <form onSubmit={handleSubmit}>
            //               <Grid container spacing={2} direction="column">
            //                 <Box
            //                   style={{
            //                     display: "flex",
            //                     flexDirection: "row",
            //                     alignItems: "center",
            //                     height: "100px",
            //                   }}
            //                 >
            //                   {images.map((item, index) => (
            //                     <Card
            //                       key={index}
            //                       style={{
            //                         backgroundColor: "green",
            //                         height: "10vh",
            //                         width: "10vw",
            //                       }}
            //                     >
            //                       <CardMedia
            //                         component="img"
            //                         alt="Product Image"
            //                         height="140"
            //                         image={item}
            //                       />
            //                     </Card>
            //                   ))}
            //                   <Box
            //                     className="upload"
            //                     style={{
            //                       display: "flex",
            //                       alignItems: "center",
            //                       position: "relative",
            //                       backgroundColor: "yellow",
            //                       flexDirection: "column",
            //                     }}
            //                   >
            //                     <AntDesign
            //                       name="plus"
            //                       size={24}
            //                       color="black"
            //                     />
            //                     <Typography style={{ marginLeft: "8px" }}>
            //                       Upload
            //                     </Typography>

            //                     <input
            //                       type="file"
            //                       onChange={handleImageChange}
            //                       style={{
            //                         position: "absolute",
            //                         top: 0,
            //                         left: 0,
            //                         opacity: 0,
            //                         width: "100%",
            //                         height: "100%",
            //                         cursor: "pointer",
            //                       }}
            //                     />
            //                   </Box>
            //                 </Box>

            //                 <Grid
            //                   item
            //                   xs={12}
            //                   sm={6}
            //                   style={{ justifyContent: "center" }}
            //                 >
            //                   <TextField
            //                     variant="standard"
            //                     fullWidth
            //                     type="text"
            //                     label="Name"
            //                     value={name}
            //                     onChange={(e) => setName(e.target.value)}
            //                     required
            //                     style={{ width: "80%" }}
            //                   />
            //                   <Grid container spacing={2}>
            //                     <Grid item xs={8}>
            //                       <TextField
            //                         variant="standard"
            //                         fullWidth
            //                         type="text"
            //                         label="Price"
            //                         value={price}
            //                         onChange={(e) => setPrice(e.target.value)}
            //                         required
            //                         style={{ width: "100%" }}
            //                       />
            //                     </Grid>
            //                     <Grid item xs={3}>
            //                       <TextField
            //                         variant="standard"
            //                         fullWidth
            //                         type="text"
            //                         label="Quantity"
            //                         value={quantity}
            //                         onChange={(e) =>
            //                           setQuantity(e.target.value)
            //                         }
            //                         required
            //                         style={{ width: "100%" }}
            //                       />
            //                     </Grid>
            //                   </Grid>
            //                   <Typography
            //                     variant="body2"
            //                     style={{ marginTop: "8px" }}
            //                   >
            //                     There will be VAT, Fee, and Delivery Fees
            //                     added to this amount
            //                   </Typography>
            //                 </Grid>
            //               </Grid>

            //               <TextField
            //                 fullWidth
            //                 variant="standard"
            //                 type="text"
            //                 label="Description"
            //                 value={description}
            //                 onChange={(e) => setDescription(e.target.value)}
            //                 required
            //                 style={{ marginTop: "16px", width: "80%" }}
            //               />

            //               <TextField
            //                 fullWidth
            //                 variant="standard"
            //                 type="text"
            //                 label="Type of Product"
            //                 value={productType}
            //                 onChange={(e) => setProductType(e.target.value)}
            //                 required
            //                 style={{ marginTop: "16px", width: "80%" }}
            //               />

            //               <TextField
            //                 fullWidth
            //                 variant="standard"
            //                 type="text"
            //                 label="Other"
            //                 value={other}
            //                 onChange={(e) => setOther(e.target.value)}
            //                 required
            //                 style={{ marginTop: "16px", width: "80%" }}
            //               />

            //               <Button
            //                 variant="contained"
            //                 style={{
            //                   marginTop: "16px",
            //                   backgroundColor: COLORS.darkBlue,
            //                   borderRadius: 50,
            //                   width: "80%",
            //                 }}
            //                 type="submit"
            //               >
            //                 CONTINUE
            //               </Button>
            //             </form>
            //           </CardContent>
            //         </Card>
            //       </Grid>
            //     </Grid>
            //   </Container>
            // </Modal>
            null}

            {paymentModal ? (
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={() => setPaymentModal(false)}
                  contentContainerStyle={{
                    position: "absolute",
                    width: "80%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{ height: "100%", width: "33%" }}
                    onClick={() => setPaymentModal(false)}
                  ></View>
                  <View
                    style={{ height: "100%", width: "33%" }}
                    onClick={() => setPaymentModal(false)}
                  ></View>
                  <Card
                    style={{
                      height: "100%",
                      width: "34%",
                      backgroundColor: "white",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "60%",
                      }}
                    >
                      <Image
                        source={logo}
                        alt="cropped AMS Shadow Queen Logo BNY-1320x772"
                      />
                    </View>
                    <View
                      style={{
                        height: "40%",
                        paddingRight: 40,
                        paddingLeft: 40,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 30,
                          marginBottom: 5,
                        }}
                      >
                        PAYMENT INFO
                      </Text>
                      <View>
                        <View style={{ marginTop: 30 }}>
                          <TextInput
                            placeholder="Card Holder"
                            style={{
                              width: "100%",
                              border: "none",
                              borderBottomWidth: 1,
                              borderBottomColor: "gray",
                              paddingBottom: 5,
                            }}
                          />
                        </View>
                        <View style={{ marginTop: 30 }}>
                          <TextInput
                            placeholder="Card Number"
                            style={{
                              width: "100%",
                              border: "none",
                              borderBottomWidth: 1,
                              borderBottomColor: "gray",
                              paddingBottom: 5,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 40,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <TextInput
                              placeholder="Expiry Date"
                              style={{
                                border: "none",
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                paddingBottom: 5,
                              }}
                            />
                          </View>
                          <View style={{ flex: 1, marginLeft: 20 }}>
                            <TextInput
                              placeholder="CVV"
                              style={{
                                border: "none",
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                paddingBottom: 5,
                              }}
                            />
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={handleSavePaymentInfo}
                          style={{
                            color: "white",
                            fontWeight: 600,
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
                  </Card>
                </Modal>
              </Portal>
            ) : null}

            <Card
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingRight: 30,
                paddingBottom: 30,
                paddingTop: 30,
                paddingLeft: 30,
                height: "100px",
              }}
            >
              <View>
                <Title style={{ fontWeight: "700", fontSize: 30 }}>
                  PRODUCTS & SERVICES
                </Title>
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
              <View>
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
                  height: "100px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // paddingLeft: 10,

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
                      <TouchableOpacity onPress={() => setBusinessAuthorization(true)}>
  BUSINESS PLUS SUBSCRIPTION
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
