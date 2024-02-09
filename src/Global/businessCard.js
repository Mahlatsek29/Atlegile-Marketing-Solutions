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
const BusinessProductCard = ({ productData }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);

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

  useEffect(() => {
    console.log("Product Data:", productData);
    setLoading(false);  // Add this line to set loading to false
  }, [productData]);
  

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
    <View style={{ marginHorizontal: 10 }}>
      <Card
        className="card-container"
        style={{
          width: "21vw",
          display: "flex",
          flexDirection: "column",
          height: "82vh",
        }}
      >
        <View
          style={{
            // backgroundColor: "purple",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
            height: "70vh",
          }}
        >
          <Box
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              position: "relative",
              backgroundColor: "whitesmoke",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              alignself: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                productData.images && productData.images.length > 0
                  ? productData.images[0]
                  : "../../assets/image/headsets.png"
              }
              alt={productData.name}
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
                paddingHorizontal: 10,
                position: "absolute",
                bottom: 30,
                left: 80,
                width: "6vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            ></Box>
            {/* </Container> */}
          </Box>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: 16,
              //  backgroundColor:'red',
              height: "25vh",
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
                  {productData.selectedProductCategory}
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
                    ⭐ <Text style={{ color: "white" }}> 4.9</Text>
                  </Text>
                </View>
              </View>

              <Typography variant="h5" component="h5">
                {productData.name && productData.name.slice(0, 20)}
                {productData.name && productData.name.length < 50 ? "" : "..."}
              </Typography>
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: "gray" }}
              >
                {productData.description &&
                  productData.description.slice(0, 50)}
                {productData.description && productData.description.length < 50
                  ? ""
                  : "..."}
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
                  <Icon2 name="download" size={20} /> 15 Sales
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
                    R{productData.price}
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
                    R{productData.price}
                  </Typography>
                </View>
              </Box>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default BusinessProductCard;
