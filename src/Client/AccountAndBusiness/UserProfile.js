import { View, TouchableOpacity } from "react-native";
import { Typography, Button } from "@mui/material";
import Icon from "react-native-vector-icons/Fontisto";
import React from "react";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";

const UserProfile = () => {
  return (
    <View>
      <FollowUs />
      <Navbar />
      <View style={{ height: "890px", padding: "10px" }}>
        <View>
          <View
            style={{
              marginTop: 20,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{
                width: "180px",
                height: "180px",
                display: "flex",
                alignItems: "center",
                borderRadius: "50%",
                justifyContent: "center",
                backgroundColor: "lightgray",
              }}
            >
              S
            </Typography>
          </View>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography style={{ fontWeight: 700 }} variant="h4">
              SARAH
            </Typography>
            <Typography style={{ fontWeight: 700 }} variant="h7">
              0123456879
            </Typography>
            <Typography style={{ fontWeight: 700 }} variant="h7">
              example@mail.com
            </Typography>
          </View>
          <View
            style={{
              marginTop: 30,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              1235 Vilakazi Street, Orlando West, Soweto, 1804, South Africa
            </Typography>
          </View>
          <View
            style={{
              padding: 30,
              marginTop: 30,
              display: "flex",
              marginBottom: "5px",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{ color: "#072840", fontWeight: 600 }}
              variant="h6"
            >
              Julian Jameson
            </Typography>
            <Typography style={{ color: "gray", fontWeight: 600 }} variant="h7">
              Alternative Contact
            </Typography>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                border: "none",
                display: "flex",
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
              <TouchableOpacity
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                ORDER HISTORY
              </TouchableOpacity>
            </View>
            <View
              style={{
                border: "none",
                display: "flex",
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
              <TouchableOpacity
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                FAVOURITES
              </TouchableOpacity>
            </View>
            <View
              style={{
                border: "none",
                display: "flex",
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
              <TouchableOpacity
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                TERMS & CONDITIONS
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginBottom: "5px",
                border: "none",
                display: "flex",
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <Icon name="stopwatch" size={18} style={{ marginRight: "5px" }} />
              <TouchableOpacity
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                PRIVACY POLICY
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              
            }}
          >
          <Button style={{borderRadius: "20px", marginRight: "5px", color: "#072840"}} variant="outlined">REGISTER BUSINESS</Button>
          <Button style={{borderRadius: "20px", color: "#072840", outlineColor: "#072840"}} variant="outlined">REGISTER AS A FREELANCER</Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
