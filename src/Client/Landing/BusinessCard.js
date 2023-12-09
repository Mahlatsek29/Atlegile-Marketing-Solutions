import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { Grid, Typography } from "@mui/material";
import { firebase } from "../../config"; // Adjust the path based on your project structure
import ProductCard from "../../Global/Card";
import { AntDesign } from "@expo/vector-icons";

export default function BusinessCard({ business }) {
  // const [business, setBusiness] = useState(null);
  console.log(business);
  const scrollViewRef1 = useRef(null);
  const scrollViewRef2 = useRef(null);
  const scrollViewRef3 = useRef(null);
  const [products, setProducts] = useState([]);

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

  let oneCompany = products.filter((item) => item.company === business);

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
      {business && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 50,
            height: "80%",
            // backgroundColor: "red",
          }}
        >
          <View>
            {/* <Text style={{ fontSize: "30px", fontWeight: "bolder" }}>
              {business.businessName}
            </Text> */}
          </View>
          <View
            style={{
              width: "80%",
              marginLeft: "10%",
              height: 500,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
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
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "blue",
                  marginTop: 20,
                  // marginVertical:20
                }}
              >
                <Text
                  style={{
                    fontSize: "3px",
                    fontWeight: "bolder",
                    // backgroundColor: "red",
                    marginTop: "10px",
                  }}
                >
                  {business}
                </Text>

                <TouchableOpacity>
                  <Text>View All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                ref={scrollViewRef3}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {oneCompany.map((product) => (
                  <ProductCard key={product.id} productId={product.id} />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
