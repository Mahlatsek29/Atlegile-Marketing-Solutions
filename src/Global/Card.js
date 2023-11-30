// ProductCard.js

import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { firestore } from "../config";

const ProductCard = ({ productId }) => {
  const [isRed, setIsRed] = useState(true);
  const [product, setProduct] = useState(null);

  const toggleHeart = () => {
    setIsRed((prevState) => !prevState);
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
      }
    };

    fetchProductData();
  }, [productId]);

  if (!product) {
    // Render a loading state or return null if data is still being fetched
    return null;
  }

  return (
    <Card className="card-container">
      <Box>
        <Box
          style={{
            borderRadius: "16px",
            objectFit: "cover",
            position: "relative",
            backgroundColor: "gold",
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
            alt={product.productName}
            style={{
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
            <TouchableOpacity>
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
        </Box>
        <CardContent sx={{ paddingInline: 2, paddingRight: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Typography
              variant="h6"
              component="h6"
              style={{ fontSize: "16px", color: "#0074cc" }}>
              {product.selectedCategory}{" "}
              {/* Assuming selectedCategory is a field in your product */}
            </Typography>
            <Typography
              style={{
                backgroundColor: "#072840",
                color: "#fff",
                borderRadius: "15px",
                padding: "4px",
              }}>
              ⭐ 4.9
            </Typography>
          </Box>
          <Typography variant="h5" component="h5">
            {product.productName}
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
            <Typography variant="body2" component="p" style={{ color: "gray" }}>
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
                R{product.price}700
              </Typography>
              <Typography
                variant="subtitle2"
                component="p"
                style={{
                  color: "rgb(97, 151, 97)",
                  fontSize: "18px",
                  fontWeight: "700",
                }}>
                R{product.price}500
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
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
          }}
          onClick={() => console.log("View Button Clicked!!!")}>
          VIEW
          <Icon name="arrow-right" size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
