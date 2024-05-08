import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { firebase, firestore, auth } from "../../config"; // Adjust the path based on your project structure
import ProductCard from "../../Global/Card";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { brown } from "@mui/material/colors";

export default function BusinessCard({ business }) {
  const scrollViewRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const [width, setWidth] = useState(Dimensions.get("window").width);
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
    const fetchProducts = async () => {
      const productsRef = firebase.firestore().collection("Products");
      try {
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  let oneCompany = products.filter((item) => item.company === business);

  const scrollLeft = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  const scrollRight = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleContentSizeChange = (contentWidth) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    // This useEffect is responsible for fetching banner data when the component mounts.
    const fetchBanners = async () => {
      try {
        // Access the "Banner" collection in Firestore
        const bannerCollection = firestore.collection("Banner");
        // Retrieve the snapshot of the documents in the collection
        const snapshot = await bannerCollection.get();

        // Map the snapshot documents to a more usable format
        const bannerData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            bannerImage: data.bannerImage,
            discountPrice: data.discountPrice,
            originalPrice: data.originalPrice,
            other: data.other,
            productName: data.productName,
            quantity: data.quantity,
            company: data.company,
          };
        });

        setBanners(bannerData);
      } catch (error) {
        // Log an error message if fetching fails
        console.error("Error fetching banner images:", error);
      }
    };

    // Invoke the fetchBanners function when the component mounts (empty dependency array)
    fetchBanners();
  }, []);

  useEffect(() => {
    // This useEffect is triggered whenever the 'banners' or 'business' dependencies change.
    // It sets the current banner based on the 'business' value.
    const matchingBanner = banners.find(
      (banner) => banner.company === business
    );
    setCurrentBanner(matchingBanner);
  }, [banners, business]);

  useEffect(() => {
    // This useEffect sets up an interval to automatically switch banners every 10 seconds.
    const interval = setInterval(() => {
      if (currentBanner.bannerImage.length > 0) {
        // Update the currentIndex to the next image in the banner array
        setCurrentIndex((prevIndex) =>
          prevIndex === currentBanner.bannerImage.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 10000);

    // Cleanup: Clear the interval when the component unmounts or 'currentBanner' changes
    return () => {
      clearInterval(interval);
    };
  }, [currentBanner]);

  // Functions to handle click events for navigating to the previous and next banners
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentBanner.bannerImage.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentBanner.bannerImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {width < 600 ? (
        <>
          {business.length >= 3 ? ( // a business will only be shown if there are more than three oreducts
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "40vh",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 10,
                }}
              >
                {/* Left scroll button */}
                {/* <TouchableOpacity onPress={scrollLeft}>
                  <ArrowBackIosIcon />
                </TouchableOpacity> */}

                {/* Right scroll button */}
                {/* <TouchableOpacity onPress={scrollRight}>
                  <ArrowForwardIosIcon />
                </TouchableOpacity> */}

                {/* Container for the business name and product list */}
                <View
                  style={{
                    zIndex: -10,
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  {/* Business name and "View All" link */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                    }}
                  >
                    {/* Business name */}
                    <Typography
                      variant="body2"
                      style={{
                        // fontSize: "30px",
                        fontWeight: "bolder",
                        marginTop: "10px",
                      }}
                    >
                      {business}
                    </Typography>

                    {/* "View All" link */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Products", {
                          businessId: business,
                        })
                      }
                    >
                      <Text
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        View All
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Horizontal ScrollView for displaying product cards */}
                  <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onContentSizeChange={(contentWidth) =>
                      handleContentSizeChange(contentWidth)
                    }
                    contentContainerStyle={{ alignItems: "center" }}
                  >
                    {/* Map through products and render ProductCard component for each */}
                    {oneCompany.map((product) => (
                      <ProductCard key={product.id} productId={product.id} />
                    ))}
                  </ScrollView>
                </View>
              </View>

              {currentBanner &&
              currentBanner.bannerImage &&
              currentBanner.bannerImage.length > 0 ? (
                <View
                  style={{
                    backgroundImage: `url(${currentBanner.bannerImage[currentIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "20vh",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={handlePrevClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    {/* Nested div container for text content */}
                    <View
                      style={{
                        textAlign: "left",
                        color: "white",
                        maxWidth: "400px", // Adjust as needed
                      }}
                    >
                      {/* Banner details - Other, Product Name, Price */}
                      <Typography variant="body2" style={{ marginBottom: 5 }}>
                        {currentBanner.other}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: 700, marginBottom: 5 }}
                      >
                        {currentBanner.productName}
                      </Typography>
                      {/* Price display */}
                      <View style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: "#c29920",
                            marginRight: 5,
                          }}
                        >
                          R{currentBanner.discountPrice}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{ color: "white" }}
                        >
                          R{currentBanner.originalPrice}
                        </Typography>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={handleNextClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
        </>
      ) : (
        <>
          {business.length >= 3 ? ( // a business will only be shown if there are more than three oreducts
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "85vh",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                {/* Left scroll button */}
                <TouchableOpacity onPress={scrollLeft}>
                  <ArrowBackIosIcon />
                </TouchableOpacity>

                {/* Right scroll button */}
                <TouchableOpacity onPress={scrollRight}>
                  <ArrowForwardIosIcon />
                </TouchableOpacity>

                {/* Container for the business name and product list */}
                <View
                  style={{
                    zIndex: -10,
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  {/* Business name and "View All" link */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Business name */}
                    <Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bolder",
                        marginTop: "10px",
                      }}
                    >
                      {business}
                    </Text>

                    {/* "View All" link */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Products", {
                          businessId: business,
                        })
                      }
                    >
                      <Text
                        style={{
                          marginTop: "25px",
                        }}
                      >
                        View All
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Horizontal ScrollView for displaying product cards */}
                  <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onContentSizeChange={(contentWidth) =>
                      handleContentSizeChange(contentWidth)
                    }
                    Style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "red",
                    }}
                  >
                    {/* Map through products and render ProductCard component for each */}
                    {oneCompany.map((product) => (
                      <ProductCard key={product.id} productId={product.id} />
                    ))}
                  </ScrollView>
                </View>
              </View>

              {currentBanner &&
              currentBanner.bannerImage &&
              currentBanner.bannerImage.length > 0 ? (
                // Card container for the banner
                <View
                  style={{
                    backgroundImage: `url(${currentBanner.bannerImage[currentIndex]})`,
                    width: "100%",
                    height: "30vh",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundSize: "cover",
                  }}
                >
                  <View style={{ flexDirection:'row',}}>
                    <TouchableOpacity
                      onPress={handlePrevClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight:40  
                      }}
                    >
                      <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Banner details */}
                    <View style={{ justifyContent:'center'}}>
                      {/* Banner details - Other, Product Name, Price */}
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: 600,
                          color: "white",
                          marginBottom: 5,
                        }}
                      >
                        {currentBanner.other}
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{
                          fontWeight: 700,
                          color: "white",
                          marginBottom: 5,
                        }}
                      >
                        {currentBanner.productName}
                      </Typography>
                      {/* Price display */}
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignSelf: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontWeight: 700,
                            color: "#c29920",
                            marginRight: 5,
                          }}
                        >
                          R{currentBanner.discountPrice}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{ color: "white" }}
                        >
                          R{currentBanner.originalPrice}
                        </Typography>
                      </View>
                    </View>
                  </View>
                  {/* Left arrow button */}

                  {/* Right arrow button */}
                  <TouchableOpacity
                    onPress={handleNextClick}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AntDesign name="right" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ) : null}
        </>
      )}
    </>
  );
}
