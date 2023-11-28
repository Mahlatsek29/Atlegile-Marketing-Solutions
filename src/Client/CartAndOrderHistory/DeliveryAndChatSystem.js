import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Typography } from "@mui/material";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Navbar from "../../Global/Navbar";
import FollowUs from "../../Global/Header";
import { Footer } from "../../Global/Footer";

const DeliveryAndChatSystem = () => {
  const navigation = useNavigation();

  const data = [
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
    { product: "HD TV", item: 1, amount: 4500.0 },
  ];

  const navigateToOrderHistory = () => {
    navigation.navigate('OrderHistory'); 
  };

  return (
    <View>
      <FollowUs />
      <Navbar />
      <View>
      <Container fixed sx={{ bgcolor: "#cfe8fc", height: "85vh" }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View
          style={{ height: '700px', width: '70%', marginTop: '20px', marginRight: '10px' }}
        >
          <View
            style={{display: 'flex', flexDirection: 'row'}}
          >
          <Typography
            style={{color: 'grey'}}
          >
            Acount /  
          </Typography>
          <Typography>
          <TouchableOpacity
            onPress={navigateToOrderHistory}
            style={{color: 'grey'}}
          >
             Order History / 
          </TouchableOpacity>
          </Typography>
          <Typography>
            #AABBCC
          </Typography>
          </View>
          <Typography
          variant='h6'
            style={{marginTop: '50px', fontWeight: 'bold'}}
          >
            ORDER #AABBCC
          </Typography>
          <Typography
            variant='h4'
            style={{fontWeight: 'bold'}}
          >
            PRODUCTS
          </Typography>
          <Typography
            style={{marginBottom: '10px', fontWeight: 'bold' }}
          >
            27 JUL, 2023
          </Typography>
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
                    Products
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.product}
                  </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    Item
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.item}
                  </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}
                  >
                    Amount
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                     
                    }}
                  >
                    {item.amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>
                <View
                  style={{marginTop: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}
                >
                  <Typography
                    style={{fontWeight: 'bold'}}
                  >Order Summary</Typography>
                  <Typography
                    style={{fontWeight: 'bold'}}
                  >R3000.00</Typography>
                </View>
                <View
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                >
                  <Typography
                    style={{fontWeight: 'bold'}}
                  >Delivery</Typography>
                  <Typography
                    style={{fontWeight: 'bold'}}
                  >R150.00</Typography>
                </View>
                <View
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                >
                  <Typography
                    style={{fontWeight: 'bold'}}
                  >Agent Referal</Typography>
                  <Typography
                    style={{fontWeight: 'bold'}}
                  >10%</Typography>
                </View>
                <View
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                >
                  <Typography
                    variant='h5'
                    style={{fontWeight: 'bold'}}
                  >Total</Typography>
                  <Typography
                    variant='h5'
                    style={{fontWeight: 'bold'}}
                  >R3170.00</Typography>
                </View>
        </View>
        <View
          style={{ backgroundColor: '#062338', height: '700px', width: '30%', marginTop: '20px' }}
        >
        </View>
        </View>
      </Container>
      </View>
      <Footer />
    </View>
  )
}

export default DeliveryAndChatSystem