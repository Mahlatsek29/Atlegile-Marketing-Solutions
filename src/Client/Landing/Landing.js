import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Container, Typography, Grid } from "@mui/material";
import Navbar from "../../Global/Navbar";
import SearchBar from "../../Global/SearchBar";
import ProductCard from "../../Global/Card";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import shop from "../../Global/images/svg_landing.svg";
import shop2 from "../../Global/images/svg_landing.svg";
import { firebase } from "../../config";

const Landing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = firebase.firestore().collection("Products");

      try {
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <FollowUs />
      <Navbar />
      <SearchBar />
      <View>
        <Container fixed sx={{backgroundColor:'blue'}}>
          <Grid
            container 
            style={{
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
            <Grid style={{ marginTop: "20px" }}>
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
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: 10 }}>
              LearnZA
            </Typography>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              <>
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </>
            </ScrollView>
            <View style={{ color: "white", marginTop: 20 }}>
              <Grid container style={{ backgroundColor: "#072840" }}>
                <Grid
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
                  }}>
                  {`<`}
                </Grid>
                <Grid lg={8} sm={8}>
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
                  lg={3}
                  sm={4}
                  style={{
                    backgroundColor: "#072840",
                    color: "#fff",
                    textAlign: "right",
                    fontSize: "30px",
                    paddingTop: "5%",
                    paddingRight: "10px",
                  }}>
                  {`>`}
                </Grid>
              </Grid>
            </View>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
              <>
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </>
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
              <>
                <ProductCard />
                <ProductCard />
                <ProductCard />
    
              </>
            </ScrollView>
          </View>

          <Grid container style={{ backgroundColor: "#072840" }}>
            <Grid
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
              }}>
              {`<`}
            </Grid>
            <Grid lg={8} xs={8}>
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
              }}>
              {`>`}
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            style={{ fontWeight: "600", marginBottom: 10, marginTop: 10 }}>
            TechWise Electronics
          </Typography>
          <ScrollView
            horizontal={true}
            style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
            <>
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </>
          </ScrollView>
        </Container>
      </View>
      <Grid container style={{ width: "100%", height: "40vh" }}>
        <Grid xl={2} lg={2} sm={2} xs={2}>
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
                    soWhereTo  <br /> Township Business
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
                    soWhereTo  <br /> Youth Training
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
        <Grid xl={2} lg={2} sm={2} xs={2}>
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
      <Footer />
    </>
  );
};

export default Landing;
