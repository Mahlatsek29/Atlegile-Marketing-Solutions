import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { serverTimestamp } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Skeleton from "@mui/material/Skeleton";
import { Text, TouchableOpacity, View } from "react-native";
import { firestore, auth, firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({ productId }) => {
  const navigation = useNavigation();
  const [isRed, setIsRed] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [review, setReview] = useState(0);
  const navigateProductDetails = () => {
    navigation.navigate("ProductDetails", { productId });
  };

  // Function to toggle the heart icon for adding/removing from favorites
  const toggleHeart = async () => {
    try {
      // Reference to the 'Favourites' collection in Firestore
      const favCollectionRef = firestore.collection("Favourites");

      // Reference to the specific document in the 'Favourites' collection based on the 'productId'
      const favDocRef = favCollectionRef.doc(productId);

      // Retrieve the document from Firestore
      const favDoc = await favDocRef.get();

      if (favDoc.exists) {
        // Document exists, remove from Favourites
        await favDocRef.delete();
        setIsRed(false); // Set the heart icon to not red
      } else {
        // Document does not exist, add to Favourites
        await favDocRef.set({
          productId: productId,
          uid: uid,
          productName: product.name,
          description: product.description,
          price: product.price,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          businessName: product.businessName,
          company: product.company,
          brand: product.brand,
          image: product.images[0],
        });
        setIsRed(true); // Set the heart icon to red
        setShowSnackbar(true); // Show a snackbar indicating the item was added to favorites
      }
    } catch (error) {
      // Log an error message if there's an issue toggling the heart icon
      console.error("Error toggling heart:", error);
    }
  };

  // Function to add the product to the shopping cart
  const addToCart = async () => {
    try {
      // Reference to the 'Cart' collection in Firestore
      const cartCollectionRef = firestore.collection("Cart");

      // Add the product details to the 'Cart' collection
      await cartCollectionRef.add({
        uid: uid,
        productId: productId,
        description: product.description,
        price: product.price,
        name: product.name,
        quantity: 1,
        image:
          product.images && product.images.length > 0 ? product.images[0] : "",
        timestamp: serverTimestamp(),
      });

      setShowSnackbar1(true); // Show a snackbar indicating the item was added to the cart
    } catch (error) {
      // Log an error message if there's an issue adding to the cart
      console.error("Error adding to cart:", error);
    }
  };

  // Function to handle closing the snackbar indicating successful addition to the cart
  const handleSnackbarClose1 = () => {
    setShowSnackbar1(false);
  };

  // Function to handle closing the snackbar indicating successful addition to favorites
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // useEffect hook to fetch product data from Firestore based on the 'productId'
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Retrieve the product document from Firestore
        const productDoc = await firestore
          .collection("Products")
          .doc(productId)
          .get();

        // Extract product data from the document and set it in the component's state
        const productData = productDoc.data();
        setProduct(productData);
      } catch (error) {
        // Log an error message if there's an issue fetching product data
        console.error("Error fetching product data:", error);
      } finally {
        // Set loading state to false, indicating that the product data has been fetched or an error occurred
        setLoading(false);
      }
    };

    // Call the 'fetchProductData' function when the component mounts or when 'productId' changes
    fetchProductData();
  }, [productId]);

  // This useEffect hook is triggered whenever the 'productId' dependency changes
  useEffect(() => {
    // Define an asynchronous function 'fetchReviews' to retrieve and process reviews
    const fetchReviews = async () => {
      try {
        // Attempt to fetch the document related to reviews for the given 'productId' from Firestore
        const ReviewsDoc = await firestore
          .collection("Reviews")
          .doc(productId)
          .get();

        // Extract the data from the Firestore document
        const ReviewsData = ReviewsDoc.data();

        // Extract the 'reviews' array from the data, or default to an empty array
        const reviewsArray = ReviewsData?.reviews || [];

        // Filter out reviews with missing or zero 'myRatings'
        const validReviews = reviewsArray.filter(
          (review) => review.myRatings > 0
        );

        // Calculate the total sum of 'myRatings' from valid reviews
        const totalRatings = validReviews.reduce(
          (sum, review) => sum + review.myRatings,
          0
        );

        // Calculate the average rating by dividing the total ratings by the number of valid reviews
        const averageRating =
          validReviews.length > 0 ? totalRatings / validReviews.length : 0;

        // Set the calculated average rating in the component's state using the 'setReview' function
        setReview(averageRating);
      } catch (error) {
        // Log an error message if there's an issue fetching or processing the reviews
        console.error("Error fetching product data:", error);
      } finally {
        // Set loading state to false, indicating that the reviews have been fetched or an error occurred
        setLoading(false);
      }
    };

    // Call the 'fetchReviews' function when the component mounts or when 'productId' changes
    fetchReviews();
  }, [productId]);

  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    return () => {
      // Unsubscribe from the auth state observer when the component unmounts
      authObserver();
    };
  }, []);

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
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: 1,
          height: 450,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
            margin: 20,
          }}
        >
          <Box
            style={{
              objectFit: "cover",
              position: "relative",
              backgroundColor: "gold",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              alignself: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ alignSelf: "center", width: 180, height: 180 }}>
              <CardMedia
                component="img"
                height="140"
                image={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "../../assets/image/headsets.png"
                }
                alt={product.name}
                style={{
                  borderRadius: "100px",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
              <Box
                style={{
                  backgroundColor: "#E74040",
                  position: "absolute",
                  top: 0,

                  padding: 2,
                  width: "30%",
                  borderRadius: "8%",
                  alignSelf: "center",
                }}
              >
                <Typography
                  variant="h5"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Sale
                </Typography>
              </Box>
            </View>

            {/* <Container> */}
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000} // Adjust as needed
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set position to top center
            >
              <MuiAlert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Product added to favorites!
              </MuiAlert>
            </Snackbar>
            <Box
              style={{
                paddingHorizontal: 10,
                position: "absolute",
                bottom: 30,
                width: "6vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
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
              <TouchableOpacity onPress={addToCart}>
                <Snackbar
                  open={showSnackbar1}
                  autoHideDuration={3000} // Adjust as needed
                  onClose={handleSnackbarClose1}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set position to top center
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
            {/* </Container> */}
          </Box>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: "5%", // Adjust as needed
              // height: "25vh",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  //     backgroundColor:'green',
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
                    ⭐ <Text style={{ color: "white" }}> {review}</Text>
                  </Text>
                </View>
              </View>

              <Typography variant="h5" component="h5">
                {product.name && product.name.slice(0, 15)}
                {product.name && product.name.length < 50 ? "" : "..."}
              </Typography>
              <Typography
                variant="subtitle2"
                component="p"
                style={{
                  color: "gray",
                  wordWrap: "break-word",
                  display: "inline",
                }}
              >
                {product.description && product.description.length > 25
                  ? `${product.description.slice(0, 25)}...`
                  : product.description}
              </Typography>
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
                  <Icon2 name="download" size={20} /> {product.quantity} Sales
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

            <Button
              style={{
                border: "2px black solid",
                alignSelf: "flex-start",
                paddingHorizontal: "5px",
                borderRadius: "50px",
                marginBottom: 15,
                color: "black",
                cursor: "pointer",
              }}
              onClick={navigateProductDetails}
            >
              <Text>VIEW </Text>
              <Icon name="arrow-right" size={20} />
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
