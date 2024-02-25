import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { firebase, firestore, auth } from "../../config"; // Adjust the path based on your project structure
import ProductCard from "../../Global/Card";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardMedia } from "@mui/material";

export default function BusinessCard({ business }) {
  const scrollViewRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
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
        // Log the fetched banner data and set it to the state
        console.log("bannerData is: ", bannerData);
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
    const matchingBanner = banners.find((banner) => banner.company === business);
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
      {business.length >= 3 ? (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 50,
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <View
            style={{
              width: "80%",
              height: "100vh",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={scrollLeft}>
              <ArrowBackIosIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={scrollRight}>
              <ArrowForwardIosIcon />
            </TouchableOpacity>

            <View
              style={{
                zIndex: -10,
                width: "100%",
                position: "absolute",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: "30px",
                    fontWeight: "bolder",
                    marginTop: "10px",
                  }}
                >
                  {business}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Products", { businessId: business })
                  }
                >
                  <Text>View All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(contentWidth) =>
                  handleContentSizeChange(contentWidth)
                }
              >
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
                backgroundColor: "gray",
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                padding:5,
                transition: "0.5s ease-in-out",
                height: "20vh",
                width: "80%",
              }}
            >
              <TouchableOpacity
                onPress={handlePrevClick}
                style={{ marginRight: 20 }}
              >
                <AntDesign name="left" size={24} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "white",
                    alignSelf: "flex-start",
                  }}
                >
                  {currentBanner.other}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 700,
                    color: "white",
                    alignSelf: "flex-start",
                  }}
                >
                  {currentBanner.productName}
                </Text>
                <Text style={{ alignSelf: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#c29920",
                      alignSelf: "flex-start",
                    }}
                  >
                    R{currentBanner.discountPrice}
                  </Text>{" "}
                  <Text
                    style={{ fontSize: 15, fontWeight: 400, color: "white" }}
                  >
                    R{currentBanner.originalPrice}
                  </Text>
                </Text>
              </View>
              <CardMedia
                component="img"
                height="140"
                image={currentBanner.bannerImage[currentIndex]}
                style={{
                  position: "relative",
                  objectFit: "cover",
                  width: 220,
                  height: 220,
                  alignSelf: "center",
                }}
              />

              <TouchableOpacity onPress={handleNextClick}>
                <AntDesign name="right" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );
}
