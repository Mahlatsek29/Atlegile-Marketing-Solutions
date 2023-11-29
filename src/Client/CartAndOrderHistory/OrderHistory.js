import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Container, Typography } from "@mui/material";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Navbar from "../../Global/Navbar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";

const OrderHistory = () => {
  const navigation = useNavigation();

  const data = [
    { date: "27 JUL, 2023", name: "SIBUSISO", status: "ONGOING" },
    { date: "27 JUL, 2023", name: "SIBUSISO", status: "DELIVERED" },
    { date: "27 JUL, 2023", name: "SIBUSISO", status: "DELIVERED" },
    { date: "27 JUL, 2023", name: "SIBUSISO", status: "DELIVERED" },
  ];

  const navigateToDeliveryAndChatSystem = (status) => {
    if (status === "DELIVERED") {
      navigation.navigate("DeliveryAndChatSystem");
    } else if (status === "ONGOING") {
      navigation.navigate("DeliveryOngoing");
    }
  };

  return (
    <View>
      <FollowUs />
      <Navbar />
      <Container fixed sx={{ height: "85vh" }}>
        <View
          style={{
            marginTop: 50,
            padding: 10,
            height: 100,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h5"
            style={{
              height: 80,
              width: 200,
              marginRight: 12,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            ORDER HISTORY
          </Typography>
          <Typography
            style={{
              height: 80,
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "lightgray",
                color: "gray",
              }}
              placeholder="Search"
              placeholderTextColor="gray"
            />
          </Typography>
          <Typography
            style={{
              height: 80,
              width: 200,
              marginRight: "10px",
            }}
          >
            <View
              style={{
                color: "gray",
                borderBottomWidth: 2,
                borderBottomColor: "lightgray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "gray", marginTop: 25 }}>
                Please Select
              </Text>
              <Icon1
                name="angle-down"
                size={20}
                style={{ marginTop: "28px" }}
              />
            </View>
          </Typography>
          <Typography
            style={{
              height: 50,
              width: 50,
              marginTop: 15,
            }}
          >
            <TouchableOpacity>
              <Icon name="search" size={20} />
            </TouchableOpacity>
          </Typography>
        </View>

        <View>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigateToDeliveryAndChatSystem(item.status)}
              key={index}
            >
              <View
                style={{
                  width: "100%",
                  height: 60,
                  borderBottomWidth: 2,
                  borderBottomColor: "#1D1D1D",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 2,
                }}
              >
                <View
                  style={{
                    width: "8%",
                    height: "100%",
                    backgroundColor: "#000026",
                  }}
                />
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    #aabbcc
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.date}
                  </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    Delivered by
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    Status
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color:
                        item.status === "DELIVERED"
                          ? "green"
                          : item.status === "ONGOING"
                          ? "orange"
                          : "black",
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
      <Footer />
    </View>
  );
};

export default OrderHistory;
