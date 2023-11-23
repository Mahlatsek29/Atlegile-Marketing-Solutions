import { View, Text, ScrollView, Image } from "react-native";
import { Container, Typography, Grid } from "@mui/material";
import React from "react";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import ProductCard from "../../Global/Card";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import shop from "../../Global/images/Group.png";
import shop2 from "../../Global/images/clipArtBusinesses.png";
const Landing = () => {
  return (
    <View>
      <Navbar />
      <FollowUs />
      <SearchBar />
      <View>
        <Container fixed>
          <Grid
            container
            style={{
              // backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}>
            <Grid
              xl={12}
              style={{
                alignItems: "right",
                justifyContent: "right",
                // backgroundColor: "green",
              }}>
              <Text
                style={{
                  // fontFamily: "poppins",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "30px 50px",
                  fontSize: "34px",
                }}>
                EXPLORE
              </Text>
            </Grid>
            <Grid style={{ marginTop: "20px" }}>
              <button
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "150px",
                  textAlign: "center",
                  border: "3px solid gold",
                  margin: "5px",
                  // borderImage: " linear-gradient(to right, #F1B53F, #6A46OF) ",
                  // backgroundOrigin: "border-box",
                  backgroundColor: "black",
                  color: "#fff",
                }}>
                <Text
                  style={{
                    color: "#FFF", // Text color
                  }}>
                  Buy
                </Text>
              </button>
              <button
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "150px",
                  textAlign: "center",
                  border: "3px solid gold",
                  margin: "5px",
                  // borderImage: " linear-gradient(to right, #F1B53F, #6A46OF) ",
                  // backgroundOrigin: "border-box",
                  backgroundColor: "black",
                  color: "#fff",
                }}>
                <Text
                  style={{
                    color: "#FFF", // Text color
                  }}>
                  Sell
                </Text>
              </button>
              <button
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "150px",
                  textAlign: "center",
                  border: "3px solid gold",
                  margin: "5px",
                  // borderImage: " linear-gradient(to right, #F1B53F, #6A46OF) ",
                  // backgroundOrigin: "border-box",
                  backgroundColor: "black",
                  color: "#fff",
                }}>
                <Text
                  style={{
                    color: "#FFF", // Text color
                  }}>
                  Support
                </Text>
              </button>
            </Grid>
          </Grid>

          {/* <View style={{ marginTop: 20 }}>
            <Typography>Home / VAAS /</Typography>
          </View> */}

          <View style={{ padding: 30 }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: 10 }}>
              LearnZA
            </Typography>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
            <View style={{ color: "white", marginTop: 20 }}>
              <Typography
                variant="h4"
                style={{
                  height: 140,
                  display: "flex",
                  fontWeight: "600",
                  alignItems: "center",
                  backgroundColor: "#072840",
                }}>
                PRODUCTS
              </Typography>
            </View>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </View>
          <View style={{ padding: 30 }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: 10 }}>
              TechWise Electronics
            </Typography>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              // backgroundColor: "blue",
            }}>
            <View
              style={{
                color: "white",
                marginTop: 20,
                width: "100%",
                alignItems: "left",
                justifyContent: "center",
                backgroundColor: "green",
              }}>
              <Typography
                variant="h5"
                style={{
                  height: 50,
                  display: "flex",
                  fontWeight: "600",
                  alignItems: "center",
                  backgroundColor: "#072840",
                }}>
                EXCLUSIVE OFFER: SAVE BIG TODAY!
              </Typography>
              <Typography
                variant="h4"
                style={{
                  height: 50,
                  display: "flex",
                  fontWeight: "600",
                  alignItems: "center",
                  backgroundColor: "#072840",
                }}>
                ULTRA HD SMART TV
              </Typography>
              <Typography
                variant="h6"
                style={{
                  height: 50,
                  display: "flex",
                  // fontWeight: "600",
                  alignItems: "center",
                  backgroundColor: "#072840",
                }}>
                R1699.99
              </Typography>
            </View>
          </View>
          <Typography
            variant="h5"
            style={{ fontWeight: "600", marginBottom: 10, marginTop: 10 }}>
            TechWise Electronics
          </Typography>
          <ScrollView
            horizontal={true}
            style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </ScrollView>
        </Container>
      </View>
      <Grid container>
        <Grid lg={2}>
          <Image source={shop} style={{ width: "60%", height: "25vh" }} />
        </Grid>
        <Grid lg={8}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View>
              <Typography variant="h4" style={{ fontWeight: "bolder" }}>
                AFRICA'S BUSINESS <br /> SUPPORT
              </Typography>
              <Typography variant="h6">AFRICA'S BUSINESS SUPPORT</Typography>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <button
                  style={{
                    width: "20%",
                    borderRadius: "15px",
                    color: "#fff",
                    backgroundColor: "#000",
                    marginRight: "5px",
                    padding: "5px",
                  }}>
                  SHOP
                </button>
                <button style={{ width: "30%", borderRadius: "15px" }}>
                  ABOUT US
                </button>
              </View>
            </View>
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    border: "1px solid orange",
                    padding: "20px",
                    marginLeft: "10vw",
                    marginRight: "10px",
                  }}>
                  <Typography variant="h6" style={{ fontSize: "10px" }}>
                    soWhereTo > <br /> Township Businesses
                  </Typography>
                  <br />
                  <Typography style={{ color: "orange", fontSize: "10px" }}>
                    VIEW PROJECT
                  </Typography>
                </View>
                <View
                  style={{
                    border: "1px solid orange",
                    padding: "10px",
                    marginRight: "10px",
                  }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "12px", fontSize: "10px" }}>
                    soWhereTo > <br /> Township Businesses <br />
                  </Typography>
                  <Typography style={{ color: "orange" }}>
                    VIEW PROJECT
                  </Typography>
                </View>
                <View style={{ border: "1px solid orange", padding: "10px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "12px", fontSize: "10px" }}>
                    soWhereTo > <br /> Township Businesses <br />
                  </Typography>
                  <Typography style={{ color: "orange" }}>
                    VIEW PROJECT
                  </Typography>
                </View>
              </View>
            </View>
          </View>
        </Grid>
        <Grid lg={2}>
          <Image source={shop2} style={{ width: "60%", height: "25vh" }} />
        </Grid>
      </Grid>
      <Footer />
    </View>
  );
};
export default Landing;
