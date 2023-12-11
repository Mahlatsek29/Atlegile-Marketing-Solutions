import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import sara from "../Global/images/Sara.png";

const SideNav = () => {
  const handlePress = () => {
    Swal.fire({
      icon: "info",
      title: "Contact Information",
      html: "<b>Name:</b> Julian James<br/><b>Phone Number:</b> 0123456789",
      confirmButtonText: "Close",
    });
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/landing-page");
      }
    });
  };

  const handleorders = () => {
    {alert('button clicked')}
    navigate("/orderhistrory");
  };

  const handlefavorites = () => {
    navigate("/termsandconditions");
  };

  const handleterms = () => {
    navigate("/termsandconditions");
  };

  const handlepolicy = () => {
    navigate("/privacypolicy");
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
     // height="145vh"
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          height: "138%",
          width: "300px",
          margin: "auto",
        }}
      >
        <Box textAlign="center">
          <img
            src={sara}
            alt="User Image"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginTop: "80%",
            }}
          />
          <Box sx={{marginTop:'10%'}}>
            <Typography variant="h6">SARAH</Typography>
            <Typography variant="subtitle1">0123456789</Typography>
            <Typography variant="subtitle2">example@gmail.com</Typography>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ textAlign: "center" }}>
            123 Vilakazi Street, Orlando West Soweto, 1804, South Africa
          </Typography>
        </Box>

        <Box style={{ marginTop: '50%' }}>
          <Ionicons name="ios-timer-outline" size={15} color="gray" />
          <Button
            style={{ marginLeft: 5, color: "gray" }}
            onClick={handleorders}
          >
            Order History
          </Button>
        </Box>

        <Box>
          <Ionicons name="ios-timer-outline" size={15} color="gray" />
          <Button
            style={{ marginLeft: 5, color: "gray" }}
            onClick={handlefavorites}
          >
            Favorites
          </Button>
        </Box>

        <Box>
          <Ionicons name="ios-timer-outline" size={15} color="gray" />
          <Button
            style={{ marginLeft: 5, color: "gray" }}
            onClick={handleterms}
          >
            Terms and Conditions
          </Button>
        </Box>

        <Box sx={{}}>
          <Ionicons name="ios-timer-outline" size={15} color="gray" />
          <Button
            style={{ marginLeft: 5, color: "gray" }}
            onClick={handlepolicy}
          >
            Privacy Policy
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: "40px",
            backgroundColor: "rgba(266, 255, 255, 0.9)",
            textAlign: "center",
            padding: {
              xs: "10px",
              sm: "20px",
            },
          }}
        >
          <Button
            sx={{ fontWeight: "bolder", color: "black", marginTop: '10%' }}
            onClick={handlePress}
          >
            Julian James
          </Button>

          <Button sx={{ color: "gray", mt: 1, marginTop: '10%' }}>Alternative Contact</Button>
        </Box>

        <Box textAlign="center" marginTop="10%">
          <Button onClick={handleSignOut} style={{ color: "red" }}>
            SIGN OUT
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SideNav;
