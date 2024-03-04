import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
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
              width: "80%",
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
                    navigation.navigate("Products", { businessId: business })
                  }
                >
                  <Text>View All</Text>
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
            <Card
              style={{
                backgroundColor: "gray",
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* Left arrow button */}
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

              {/* Grid container for banner content */}
              <Grid
                container
                spacing={2}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid>
                  {/* Nested Grid container for text content */}
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    m={2}
                  >
                    {/* Banner details - Other, Product Name, Price */}
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontWeight: 600,
                        color: "white",
                        marginBottom: 5,
                        alignSelf: "flex-start",
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
                        alignSelf: "flex-start",
                      }}
                    >
                      {currentBanner.productName}
                    </Typography>
                    {/* Price display */}
                    <Grid
                      sx={{
                        display: "flex",
                        alignSelf: "flex-start",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: 700,
                          color: "#c29920",
                          marginRight: 5, // Add margin or padding as needed
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
                    </Grid>
                  </Grid>
                </Grid>
                {/* Image container */}
                <Grid height={230} wodth="100%">
                  {/* CardMedia component for displaying the banner image */}
                  <CardMedia
                    component="img"
                    height="100%"
                    image={currentBanner.bannerImage[currentIndex]}
                    style={{
                      objectFit: "cover",
                      width: "40vw",
                      height: "40vh",
                    }}
                  />
                </Grid>
              </Grid>

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
            </Card>
          ) : null}
        </View>
      ) : null}
    </>
  );
}
