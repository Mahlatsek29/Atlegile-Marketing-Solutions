import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import logo from "../../Global/images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import image from "../../Global/images/fixed-height.png";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import fixed from "../../Global/images/fixed-height.png";
import yellow from "../../Global/images/headphones.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

export default function ProductDetails({ item }) {
  let productImage = [
    "https://images.pexels.com/photos/19288075/pexels-photo-19288075/free-photo-of-aerial-view-of-a-church-in-the-middle-of-a-field.jpeg",
    "https://images.pexels.com/photos/19238352/pexels-photo-19238352/free-photo-of-a-man-is-sitting-at-a-desk-with-a-computer-monitor.jpeg",
    "https://images.pexels.com/photos/19328627/pexels-photo-19328627/free-photo-of-halong-bay.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % productImage.length);
  };

  const handlePrev = () => {
    setCurrentImage(
      (prev) => (prev - 1 + productImage.length) % productImage.length
    );
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <>
      {/* Navbar */}
      <Box
        sx={{
          bgcolor: "white",
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", marginLeft: "200px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Link to="/landingscreen">
            <Button
              sx={{ minWidth: "100px", mr: "20px", borderRadius: "40px" }}
              variant="contained"
              color="primary"
            >
              Shop
            </Button>
          </Link>

          <Button sx={{ minWidth: "150px", mr: "20px" }}>ABOUT US</Button>

          <IconButton aria-label="cart" sx={{ color: "black" }}>
            <ShoppingCartIcon />
          </IconButton>

          <Typography sx={{ mr: "20px" }}>Welcome Jane</Typography>
        </Box>
      </Box>
      {/* End of Navbar */}

      <Box sx={{ backgroundColor: "white", height: "100%", overflowY: "auto" }}>
        <Container maxWidth="md">
          <Box sx={{ pl: 2, pb: 2, backgroundColor: "white" }}>
            <Breadcrumbs>
              <Link
                color="inherit"
                href="/"
                sx={{ fontSize: 15, textDecoration: "none" }}
              >
                Home
              </Link>
              <Link
                color="inherit"
                href="/vaas"
                sx={{ fontSize: 15, textDecoration: "none" }}
              >
                VAAS
              </Link>
              <Typography
                color="textPrimary"
                sx={{ fontSize: 15, textDecoration: "none" }}
              >
                Digital Marketing Solutions Mbali
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/*START - Left side Panel */}
            <Box
              sx={{
                height: "100%",
                width: "50%",
                border: "1px lightgray solid",
                borderRadius: 2,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={handlePrev}
                  sx={{ position: "absolute", top: "50%", left: "5px" }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <img
                  src={productImage[currentImage]}
                  alt={`image-${currentImage}`}
                  style={{ width: "100%", borderRadius: 10 }}
                />
                <IconButton
                  onClick={handleNext}
                  sx={{ position: "absolute", top: "50%", right: "5px" }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", mt: 1 }}>
                {productImage.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`thumbnail-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: 10,
                      opacity: index === currentImage ? 1 : 0.5,
                    }}
                  />
                ))}
              </Box>
            </Box>
            {/*END - Left side Panel */}

            {/*START - Right side Panel*/}
            <Box
              sx={{
                height: "100%",
                width: "50%",
                pl: 2,
              }}
            >
              <Box
                sx={{
                  //border: "1px red solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => navigation.navigate("/main/dashboard")}
                  sx={{
                    border: "1px #072840 solid",
                    borderRadius: 20,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "600", fontSize: 10, color: "#072840" }}
                  >
                    PHYSICAL
                  </Typography>
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: 20 }}>
                    DIGITAL MARKETING COURSE
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography>
                    An in-depth online course covering digital marketing
                    strategies and techniques
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "600" }}>R15OO</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "600", color: "lightgray" }}>
                    Quantity
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid container sx={{ mt: 2, width: "50%", p: 1 }}>
                    <Grid
                      item
                      xs={2}
                      onClick={increaseQuantity}
                      sx={{
                        //border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AddIcon />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        //border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {quantity}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      onClick={decreaseQuantity}
                      sx={{
                        //border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RemoveIcon />
                    </Grid>
                  </Grid>
                  <Button
                    onClick={() => navigation.navigate("/main/dashboard")}
                    sx={{
                      backgroundColor: "#072840",
                      borderRadius: 20,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 15, color: "white", pl: 1, pr: 1 }}
                    >
                      ADD TO CART
                    </Typography>
                  </Button>
                </Box>
                <Box
                  sx={{
                    // display: "flex",
                    // flexDirection: "row",
                    // alignItems: "center",
                    // justifyContent: "space-between",
                    border: "10px red solid"
                  }}
                >
                  <Grid container sx={{height:"100%"}}>
                    <Grid
                      item
                      xs={4}
                      onClick={increaseQuantity}
                      sx={{
                        border: "1px #d32f2f solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor:"#d32f2f"
                      }}
                    >
                      <CreditCardOutlinedIcon sx={{color:"white"}} />
                    </Grid>

                    <Grid
                      item
                      xs={8}
                      onClick={decreaseQuantity}
                      sx={{
                        border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <RemoveIcon />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            {/*END - Right side Panel*/}
          </Box>
        </Container>
      </Box>
    </>
  );
}
