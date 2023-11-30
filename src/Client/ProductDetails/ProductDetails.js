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

export default function ProductDetails({ item }) {
  const navigation = useNavigation();
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const value = 3.5;

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    alert("Item added to cart!");
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
        <Container
          maxWidth="md"
          sx={{
            // display: "flex",
            // alignItems: "center",
            // flexDirection: "column",
            height: "100%",
            // width: "100%",
            border: "1px blue solid",
            //backgroundColor: "red",
          }}
        >
          {/*Breadcrumbs and Box container */}
          <Box sx={{ pl:2,pb: 2, backgroundColor: "white" }}>
            <Breadcrumbs>
              <Link color="inherit" href="/" sx={{fontSize:15,textDecoration:"none"}}>
                Home
              </Link>

              <Link color="inherit" href="/vaas" sx={{fontSize:15,textDecoration:"none"}}>
                VAAS
              </Link>

              <Typography color="textPrimary" sx={{fontSize:15,textDecoration:"none"}}>
                Digital Marketing Solutions Mbali
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/*START - Left side Panel*/}
            <Box
              sx={{
                height: "100%",
                width: "50%",
                border: "none",
                borderRight: "1px lightgray solid",
                backgroundColor: "lightblue",
              }}
            >
              <Typography>SGSG</Typography>
            </Box>
            {/* END - Left side Panel*/}

            {/*START - Right side Panel*/}
            <Box
              sx={{
                height: "100%",
                width: "50%",
                backgroundColor: "pink",
              }}
            >
              <Box
                sx={{
                  pt: 1,
                  pb: 1,
                  border: "1px red solid",display:"flex",alignItems:"center"
                }}
              >
                <Button
                  onClick={() => navigation.navigate("/main/dashboard")}
                  variant="filled"
                  sx={{
                    border: "1px #072840 solid",
                    borderRadius: 20,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "600", fontSize: 12, color: "white" }}
                  >
                    PHYSICAL
                  </Typography>
                </Button>
              </Box>
            </Box>
            {/*END - Right side Panel*/}
          </Box>
        </Container>
      </Box>
    </>
  );
}
