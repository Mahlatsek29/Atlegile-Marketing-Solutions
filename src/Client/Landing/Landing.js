import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Typography, Grid, Button } from "@mui/material";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import ProductCard from "../../Global/Card";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import shop from "../../Global/images/svg_landing.svg";
import shop2 from "../../Global/images/svg_landing.svg";
import { firebase, auth } from "../../config";
import { useNavigation } from "@react-navigation/native";
import BusinessCard from "./BusinessCard";
import { AntDesign } from "@expo/vector-icons";

const Landing = () => {
  const navigation = useNavigation();
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const scrollViewRef1 = useRef(null);
  const scrollViewRef2 = useRef(null);
  const scrollViewRef3 = useRef(null);

  const navigatebusinessproduct = () => {
    navigation.navigate("BusinessProducts");
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businessesRef = firebase.firestore().collection("Business");

      try {
        const snapshot = await businessesRef.get();
        const businessesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(businessesData);
        setBusinesses(businessesData);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);
  // console.log(businesses);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = firebase.firestore().collection("Products");

      try {
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = (scrollViewRef) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  const scrollRight = (scrollViewRef) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <>
      <FollowUs />
      <Navbar />
      <SearchBar />
      <View>
        <Container sx={{ width: "100vw", width: "100%" }}>
          <Grid></Grid>
          <Grid
            container
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}>
            <Grid
              item
              xl={12}
              style={{
                alignItems: "right",
                justifyContent: "right",
              }}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "30px 50px",
                  fontSize: "34px",
                }}>
                EXPLORE
              </Text>
            </Grid>
            <Grid item style={{ marginTop: "20px" }}>
              <button
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "150px",
                  textAlign: "center",
                  border: "3px solid gold",
                  margin: "5px",
                  backgroundColor: "black",
                  color: "#fff",
                }}>
                <Text style={{ color: "#FFF" }}>Buy</Text>
              </button>
              <button
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "150px",
                  textAlign: "center",
                  border: "3px solid gold",
                  margin: "5px",
                  backgroundColor: "black",
                  color: "#fff",
                }}>
                <Text style={{ color: "#FFF" }}>Sell</Text>
              </button>
              <button
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "150px",
                  textAlign: "center",
                  border: "3px solid gold",
                  margin: "5px",
                  backgroundColor: "black",
                  color: "#fff",
                }}>
                <Text style={{ color: "#FFF" }}>Support</Text>
              </button>
            </Grid>
          </Grid>

          <View style={{ padding: 30 }}>
            <Button
              sx={{
                fontWeight: "bold",
                color: "black",
                marginRight: "90%",
                fontSize: "150%",
              }}
              onClick={navigatebusinessproduct}>
              LearnZA
            </Button>
            <ScrollView
              ref={scrollViewRef1}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              {products.map((product) => (
                <ProductCard key={product.id} productId={product.id} />
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => scrollLeft(scrollViewRef1)}
              style={{ position: "absolute", left: 10, top: "43%" }}>
              <Text style={{ fontSize: 25 }}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => scrollRight(scrollViewRef1)}
              style={{ position: "absolute", right: 10, top: "43%" }}>
              <Text style={{ fontSize: 25 }}>{">"}</Text>
            </TouchableOpacity>
            <View style={{ color: "white", marginTop: 20 }}>
              <Grid container style={{ backgroundColor: "#072840" }}>
                <Grid
                  item
                  lg={1}
                  sm={1}
                  xs={1}
                  style={{
                    backgroundColor: "#072840",
                    color: "#fff",
                    textAlign: "left",
                    fontSize: "30px",
                    paddingTop: "5%",
                    paddingLeft: "10px",
                  }}></Grid>
                <Grid item lg={8} sm={8}>
                  <View
                    style={{
                      color: "white",
                      marginTop: 20,
                      width: "100%",
                      alignItems: "left",
                      justifyContent: "center",
                    }}>
                    <View
                      style={{
                        color: "white",
                        marginTop: 20,
                        width: "100%",
                        alignItems: "left",
                        justifyContent: "center",
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
                      <View>
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
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "#072840",
                        }}>
                        <Typography
                          variant="h6"
                          style={{
                            height: 50,
                            alignItems: "center",
                            backgroundColor: "#072840",
                            color: "gold",
                          }}>
                          R1699.99
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ fontSize: "16px", paddingLeft: "10px" }}>
                          R1899.99
                        </Typography>
                      </View>
                    </View>
                  </View>
                </Grid>

                <Grid
                  item
                  lg={3}
                  sm={4}
                  style={{
                    backgroundColor: "#072840",
                    color: "#fff",
                    textAlign: "right",
                    fontSize: "30px",
                    paddingTop: "5%",
                    paddingRight: "10px",
                  }}></Grid>
              </Grid>
            </View>
          </View>
          <View style={{ padding: 30 }}>
            <Button
              sx={{
                fontWeight: "bold",
                color: "black",
                marginRight: "90%",
                fontSize: "150%",
              }}
              onClick={navigatebusinessproduct}>
              TechWise Electronics
            </Button>

            <ScrollView
              ref={scrollViewRef2}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              {products.map((product) => (
                <ProductCard key={product.id} productId={product.id} />
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => scrollLeft(scrollViewRef2)}
              style={{ position: "absolute", left: 10, top: "43%" }}>
              <Text style={{ fontSize: 25 }}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => scrollRight(scrollViewRef2)}
              style={{ position: "absolute", right: 10, top: "43%" }}>
              <Text style={{ fontSize: 25 }}>{">"}</Text>
            </TouchableOpacity>
          </View>

          <Grid container style={{ backgroundColor: "#072840" }}>
            <Grid
              item
              lg={1}
              xs={1}
              style={{
                backgroundColor: "#072840",
                color: "#fff",
                textAlign: "left",
                fontSize: "30px",
                paddingTop: "5%",
                paddingLeft: "10px",
                justifySelf: "center",
                justifyContent: "center",
              }}></Grid>
            <Grid item lg={8} xs={8}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}>
                <View
                  style={{
                    color: "white",
                    marginTop: 20,
                    width: "100%",
                    alignItems: "left",
                    justifyContent: "center",
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
                  <View>
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
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#072840",
                    }}>
                    <Typography
                      variant="h6"
                      style={{
                        height: 50,
                        alignItems: "center",
                        backgroundColor: "#072840",
                        color: "gold",
                      }}>
                      R1699.99
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ fontSize: "16px", paddingLeft: "10px" }}>
                      R1899.99
                    </Typography>
                  </View>
                </View>
              </View>
            </Grid>

            <Grid
              item
              lg={3}
              xs={3}
              style={{
                backgroundColor: "#072840",
                color: "#fff",
                textAlign: "right",
                fontSize: "30px",
                paddingTop: "5%",
                paddingRight: "10px",
                justifySelf: "center",
                justifyContent: "center",
              }}></Grid>
          </Grid>

          <View style={{ padding: 30 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>SucureTech Solutions</Text>

              <TouchableOpacity onPress={navigatebusinessproduct}>
                <Text>View All</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}>
              <TouchableOpacity
                onPress={() => scrollLeft(scrollViewRef3)}
                style={{ marginHorizontal: 16 }}>
                <AntDesign name="leftcircle" size={40} color="black" />
              </TouchableOpacity>
              <ScrollView
                ref={scrollViewRef3}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                }}>
                {products.map((product) => (
                  <ProductCard key={product.id} productId={product.id} />
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={() => scrollRight(scrollViewRef3)}
                style={{ marginHorizontal: 16 }}>
                <AntDesign name="rightcircle" size={40} color="black" />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={() => scrollLeft(scrollViewRef3)}
              style={{ position: "absolute", left: 10, }}>
              <AntDesign name="leftcircle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => scrollRight(scrollViewRef3)}
              style={{ position: "absolute", right: 10, top: "43%" }}>
              <AntDesign name="rightcircle" size={24} color="black" />
            </TouchableOpacity> */}
          </View>
        </Container>
      </View>
      <View
        style={{
          width: "80%",
          marginLeft: "10%",
          height: 500,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="rightcircle" size={40} color="black" />
        </TouchableOpacity>

        <View
          style={{
            zIndex: -10,
            width: "100%",
            position: "absolute",
            marginVertical: 16,
          }}>
          <ScrollView
            ref={scrollViewRef3}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              display: "flex",
              flexDirection: "row",
            }}>
            {products.map((product) => (
              <ProductCard key={product.id} productId={product.id} />
            ))}
          </ScrollView>
        </View>
      </View>
      <Grid container style={{ width: "100%", height: "40vh" }}>
        <Grid item xl={2} lg={2} sm={2} xs={2}>
          <Image
            source={shop}
            style={{
              width: "5%",
              height: "34vh",
              paddingLeft: "50vw",
              position: "relative",
              top: "120px",
              right: "28vw",
            }}
          />
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          sm={8}
          xs={8}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View>
              <Typography
                variant="h4"
                style={{
                  fontWeight: "bolder",
                  justifySelf: "center",
                  paddingTop: "4vh",
                }}>
                AFRICA'S BUSINESS <br /> SUPPORT
              </Typography>
              <Typography
                variant="h6"
                style={{ fontSize: "15px", fontWeight: "bold" }}>
                High Impact Enterprises + Skills Development Solutions
              </Typography>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginVertical: "15px",
                }}>
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginHorizontal: "50px",
                }}>
                <View
                  style={{
                    border: "1px solid orange",
                    padding: "10px",
                    marginRight: "10px",
                  }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "12px", fontSize: "10px" }}>
                    soWhereTo <br /> Township Business
                    <br />
                  </Typography>
                  <Typography style={{ color: "orange" }}>
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
                    soWhereTo <br /> Youth Training
                    <br />
                  </Typography>
                  <Typography style={{ color: "orange" }}>
                    VIEW PROJECT
                  </Typography>
                </View>
                <View style={{ border: "1px solid orange", padding: "10px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "12px", fontSize: "10px" }}>
                    soWhereTo <br /> @HUB Support <br />
                  </Typography>
                  <Typography style={{ color: "orange" }}>
                    VIEW PROJECT
                  </Typography>
                </View>
              </View>
            </View>
          </View>
        </Grid>
        <Grid item xl={2} lg={2} sm={2} xs={2}>
          <Image
            source={shop2}
            style={{
              width: "2vw",
              height: "45vh",
              bottom: "-150px",
              position: "relative",
              left: "-9vw",
              paddingRight: "25vw",
            }}
          />
        </Grid>
      </Grid>
      {businesses.map((business) => {
        <BusinessCard business={business} key={business.id} />;
      })}
      <Footer />
    </>
  );
};

export default Landing;
