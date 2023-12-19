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

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Skeleton from "@mui/material/Skeleton";
import { Text, TouchableOpacity, View } from "react-native";
import { firestore, auth } from "../config";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({ productId }) => {
  const navigation = useNavigation();
  const [isRed, setIsRed] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);

  const navigateProductDetails = () => {
    navigation.navigate("ProductDetails", { productId });
  };

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

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDoc = await firestore
          .collection("Products")
          .doc(productId)
          .get();
        const productData = productDoc.data();
        console.log("Fetched product data:", productData);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
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
    <Card
      className="card-container"
      style={{
        width: "21vw",
        // paddingRight: "1%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        // marginHorizontal:"5vw",
        // backgroundColor:'green',
        marginHorizontal: 16,
        // border:'10px solid black'
      }}>
      <View
        style={{
          // backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}>
        <Box
          style={{
            borderRadius: "16px",
            objectFit: "cover",
            position: "relative",
            backgroundColor: "whitesmoke",
            width: "270px",
            height: "270px",
            borderRadius: "50%",
            alignself: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifyContent: "center",
          }}>
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
              position: "relative",
              borderRadius: "100px",
              objectFit: "cover",
              width: 220,
              height: 220,
              alignSelf: "center",
            }}
          />
          <Box
            style={{
              backgroundColor: "#E74040",
              position: "absolute",
              bottom: 200,
              padding: 2,
              width: "22%",
              borderRadius: "8%",
              alignSelf: "center",
            }}>
            <Typography
              variant="h5"
              style={{ color: "#fff", textAlign: "center" }}>
              sale
            </Typography>
          </Box>
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
              sx={{ width: "100%" }}>
              Product added to favorites!
            </MuiAlert>
          </Snackbar>
          <Box
            style={{
              paddingHorizontal: 10,
              position: "absolute",
              bottom: 30,
              left: 80,
              width: "6vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}>
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
                  sx={{ width: "100%" }}>
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
            justifyContent: "center",
            marginTop: 16,
          }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: "15px",
                  color: "#4FC3F7",
                  fontWeight: "bold",
                }}>
                {product.selectedProductCategory}
              </Text>
              <View
                style={{
                  backgroundColor: "#072840",
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderRadius: 15,
                }}>
                <Text style={{}}>
                  ⭐ <Text style={{ color: "white" }}> 4.9</Text>
                </Text>
              </View>
            </View>

            <Typography variant="h5" component="h5">
              {product.name}
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              style={{ color: "gray" }}>
              {product.description && product.description.slice(0, 110)}
              {product.description && product.description.length < 110
                ? ""
                : "..."}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="space-between">
              <Typography
                variant="body2"
                component="p"
                style={{ color: "gray" }}>
                <Icon2 name="download" size={20} /> 15 Sales
              </Typography>
              <Box display="flex" flexDirection="row">
                <Typography
                  variant="subtitle2"
                  component="p"
                  style={{
                    color: "#BDBDBD",
                    fontSize: "18px",
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  R{product.price}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="p"
                  style={{
                    color: "rgb(97, 151, 97)",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}>
                  R{product.price}
                </Typography>
              </Box>
            </Box>
          </View>
        </View>
      </View>
      <CardContent>
        <Button
          variant="outlined"
          color="primary"
          style={{
            border: "2px solid black",
            color: "rgb(43, 40, 40)",
            textDecoration: "none",
            width: "7vw",
            backgroundColor: "white",
            padding: "5px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            marginBottom: "2vh",
          }}
          onClick={navigateProductDetails}>
          VIEW
          <Icon name="arrow-right" size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
