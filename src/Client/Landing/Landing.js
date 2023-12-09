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
        <View>
          <FlatList
            data={businesses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BusinessCard business={item} key={item.id} />
            )}
          />
        </View>

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
