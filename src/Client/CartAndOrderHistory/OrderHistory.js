import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Container, Typography } from "@mui/material";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome";
import React from "react";
import Navbar from "../../Global/Navbar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";

const OrderHistory = () => {
  const data = [
    { date: "27 JUL, 2023", name: "SIBUSISO", status: "ONGOING" },
    {
      date: "27 JUL, 2023",
      name: "SIBUSISO",
      status: "DELIVERED",
    },
    {
      date: "27 JUL, 2023",
      name: "SIBUSISO",
      status: "DELIVERED",
    },
    {
      date: "27 JUL, 2023",
      name: "SIBUSISO",
      status: "DELIVERED",
    },
  ];

  return (
    <View>
      <FollowUs />
      <Navbar />
      <View>
        <Container fixed sx={{ bgcolor: "#cfe8fc", height: "85vh" }}>
          <View
            style={{
              marginTop: 50,
              padding: 10,
              // backgroundColor: "blue",
              height: "100px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              variant="h5"
              style={{
                // backgroundColor: "gray",
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
                  style={{ display: "flex", alignItems: "flex-end" }}
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

          {/* <View
            style={{
              height: "15%",
              width: "60%",
              border: "none",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                height: 50,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "20%",
                  height: "100%",
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingTop: 15,
                }}
              >
                <Text>ORDER HISTORY</Text>
              </View>
              <View
                style={{
                  width: "40%",
                  height: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                }}
              >
                <TextInput
                  style={{ marginTop: 25, color: "gray" }}
                  placeholder="Search"
                  placeholderTextColor="gray"
                />
              </View>
              <View
                style={{
                  width: "28%",
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <View style={{ width: "90%", height: "100%", color: "gray" }}>
                  <Text style={{ marginTop: 25 }}>Please Select</Text>
                </View>
                <View
                  style={{
                    width: "10%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ marginTop: 40 }}>
                    <Icon1 name="angle-down" size={20} />
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: "10%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 40 }}>
                  <Icon name="search" size={20} />
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View>
            {data.map((item, index) => (
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
                key={index}
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
            ))}
          </View>
        </Container>
      </View>
      <Footer />
    </View>
  );
};

export default OrderHistory;
