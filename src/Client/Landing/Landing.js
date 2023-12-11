import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
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
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  onSnapshot,
  Timestamp,
  FieldPath,
} from "firebase/firestore";

const Landing = () => {
  const navigation = useNavigation();
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const scrollViewRef1 = useRef(null);
  const scrollViewRef2 = useRef(null);
  const scrollViewRef3 = useRef(null);

  const [collectionList, setCollectionList] = useState([]);
  const [firebaseCollection, setFirebaseCollection] = useState(null);

  const navigatebusinessproduct = () => {
    navigation.navigate("BusinessProducts");
  };

  // useEffect(() => {
  //   const fetchBusinesses = async () => {
  //     const businessesRef = firebase.firestore().collection("Business");

  //     try {
  //       const snapshot = await businessesRef.get();
  //       const businessesData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       // console.log(businessesData);
  //       setBusinesses(businessesData);
  //     } catch (error) {
  //       console.error("Error fetching businesses:", error);
  //     }
  //   };

  //   fetchBusinesses();
  // }, []);
  // console.log(businesses);
  // useEffect(() => {
  //   // const user = auth.currentUser;
  //   const businessesRef = firebase.firestore().collection("Products");
  //   // const colRef = collection(FIRESTORE_DB, "Products");

  //   const q = query(businessesRef, where("company", "==", "Coca-cola"));

  //   console.log("query ", q);
  //   onSnapshot(q, (querySnapshot) => {
  //     const collection = [];
  //     querySnapshot?.docs.forEach((doc) => {
  //       collection.push({ ...doc.data(), key: doc.id });
  //     });
  //     collection.map((item) =>
  //       collectionList.push({ value: item.company, key: item.key })
  //     );
  //     console.log("collectionList : ", collectionList);
  //     setFirebaseCollection(collection);
  //   });
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = firebase.firestore().collection("Products");

      try {
        const snapshot = await productsRef.get();
        const collection = [];
        const productsData = snapshot.docs.map((doc) => ({
          // id: doc.id,
          ...doc.data(),
        }));
        productsData.map((item) => collection.push(item.company));
        // setProducts(productsData);
        console.log("collection", new Set(collection));
        // alert('products fetched')
        setBusinesses([...new Set(collection)]);
        console.log("businesses : ", businesses);
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
      <View style={styles.container}>
        <FollowUs />
        <Navbar />
        <SearchBar />
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
            // lg={12}
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
        <View>
          {/* <FlatList
            data={businesses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BusinessCard business={item} key={item.id} />
            )}
          /> */}
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
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default Landing;
