import { View, } from 'react-native';
import { Container,Typography } from "@mui/material";
import React from 'react';
import Navbar from '../../Global/Navbar';
import FollowUs from '../../Global/Header';
import { Footer } from "../../Global/Footer";

const OrderHistory = () => {
  return (
    <View>
      <FollowUs />
      <Navbar />
      <View>
        <Container fixed sx={{ bgcolor: '#cfe8fc', height: '85vh' }}>
        <View style={{ marginTop: 50, padding: 10, backgroundColor: 'blue', height: '100px', display: 'flex', flexDirection: 'row' }}>
            <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 8 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 8 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 8 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 50, width: 50, marginTop: 15 }}
            >
              
              </Typography>
          </View>
          <View style={{ marginTop: 50, padding: 10, backgroundColor: 'blue', height: '400px',  }}>
            <View 
              style={{ borderBottom: '1px solid red', display: 'flex', flexDirection: 'row', height: '81px', }}
            >

            <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 100, marginRight: 10,  }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200}}
            >
              
              </Typography>
            </View>
            <View 
              style={{ borderBottom: '1px solid red', display: 'flex', flexDirection: 'row', height: '81px', marginTop: 8 }}
            >

            <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 100, marginRight: 10,  }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200}}
            >
              
              </Typography>
            </View>
            <View 
              style={{ borderBottom: '1px solid red', display: 'flex', flexDirection: 'row', height: '81px', marginTop: 8 }}
            >

            <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 100, marginRight: 10,  }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200}}
            >
              
              </Typography>
            </View>
            <View 
              style={{ borderBottom: '1px solid red', display: 'flex', flexDirection: 'row', height: '81px', marginTop: 8 }}
            >

            <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 100, marginRight: 10,  }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200, marginRight: 150 }}
            >
              
              </Typography>
              <Typography
              variant='h4'
              style={{ backgroundColor: 'gray', height: 80, width: 200}}
            >
              
              </Typography>
            </View>
          </View>
        </Container>
      </View>
      <Footer />
    </View>
  )
}

export default OrderHistory