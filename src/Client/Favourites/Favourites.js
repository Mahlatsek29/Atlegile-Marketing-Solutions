import { View, Text } from 'react-native'
import React from 'react';
import SideNav from "../../Global/SideNav"
import { Footer } from '../../Global/Footer';
import Navbar from "../../Global/Navbar"
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import FollowUs from '../../Global/Header';
// import SearchBar from '../Global/SearchBar';
import fixed from "../../Global/images/headphones.png"
import Icon2 from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
const Favourites = ({ item }) => {
  return (
    <View>
      <FollowUs />
      <Navbar />
      <SideNav />
      {/* <Box sx={{marginLeft: '400px', marginTop: '-400px'}}>
        <Typography>Favourites</Typography>
      </Box> */}
      <Container >
        <Box sx={{ marginLeft: '30%', marginTop: '-56%' }}>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />
          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074CC" }}>
            {item?.selectedCategory} English Department </Typography>
          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>:star: 4.9</Button>
          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>
          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container >
        <Box sx={{ marginLeft: '57%', marginTop: '-56%' }}>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />
          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074CC" }}>
            {item?.selectedCategory} English Department </Typography>
          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>:star: 4.9</Button>
          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>
          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container >
        <Box sx={{ marginLeft: '84%', marginTop: '-56%' }}>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />
          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074CC" }}>
            {item?.selectedCategory} English Department </Typography>
          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>:star: 4.9</Button>
          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>
          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
        </Box>
      </Container>
      {/* 2nd image */}
      <Container >
        <Box sx={{ marginLeft: '30%', marginTop: '-22%' }}>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />
          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074CC" }}>
            {item?.selectedCategory} English Department </Typography>
          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>:star: 4.9</Button>
          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>
          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container >
        <Box sx={{ marginLeft: '57%', marginTop: '-32%' }}>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />
          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074CC" }}>
            {item?.selectedCategory} English Department </Typography>
          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>:star: 4.9</Button>
          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>
          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container >
        <Box sx={{ marginLeft: '84%', marginTop: '-32%' }}>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />
          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074CC" }}>
            {item?.selectedCategory} English Department </Typography>
          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>:star: 4.9</Button>
          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>
          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </View>
  )
}
export default Favourites