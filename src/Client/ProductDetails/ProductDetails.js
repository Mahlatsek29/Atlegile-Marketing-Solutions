
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Paper, Breadcrumbs, Link, Container, Grid, TextField } from '@mui/material';
import logo from '../../Global/images/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import image from '../../Global/images/fixed-height.png';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import fixed from '../../Global/images/fixed-height.png'
import yellow from '../../Global/images/headphones.png';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";





const Header = ({ item }) => {

  const labels = { 0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+', 2.5: 'Ok', 3: 'Ok+', 3.5: '', 4: 'Good+', 4.5: 'Excellent', 5: 'Excellent+', };

  const value = 3.5;

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    alert('Item added to cart!');
  };

  return (
    <Box>

      {/* Navbar */}
      <Box sx={{ bgcolor: 'white', py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '100px', marginLeft: '200px' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Link to="/landingscreen">
            <Button sx={{ minWidth: '100px', mr: '20px', borderRadius: '40px' }} variant="contained" color="primary" > Shop </Button>
          </Link>

          <Button sx={{ minWidth: '150px', mr: '20px' }}>ABOUT US</Button>

          <IconButton aria-label="cart" sx={{ color: 'black' }}> <ShoppingCartIcon /> </IconButton>

          <Typography sx={{ mr: '20px' }}>Welcome Jane</Typography>
        </Box>
      </Box>
      {/* End of Navbar */}


      {/*Breadcrumbs and Box container */}
      <Box sx={{ mt: 3, px: 2, backgroundColor: 'white' }}>
        {/* <Paper elevation={3} sx={{ p: 2 }}> */}
        <Breadcrumbs>

          <Link color="inherit" href="/"> Home </Link>

          <Link color="inherit" href="/vaas"> VAAS </Link>

          <Typography color="textPrimary">Digital Marketing Solutions Mbali</Typography>
        </Breadcrumbs>

        {/* Container box beneath Breadcrumbs */}
        <Box sx={{ mt: 3 }}>

          <Container fixed>

            <img src={image} alt="Image" style={{ height: '70vh', width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-80px' }} />

          </Container>
        </Box>

        {/* Physical Button */}
        <Grid container spacing={2} justifyContent="flex-end" mt={3}>
          <Box item>
            <Button style={{ borderRadius: '70px', marginTop: '-900px', marginRight: '80px', color: 'black', border: '2px solid blue', borderColor: 'gray', backgroundColor: 'transparent' }}>PHYSICAL</Button>
          </Box>
        </Grid>

        <Grid>
          <Typography align="center" style={{ marginTop: '-490px', marginLeft: '-320px', fontWeight: 'bold' }}>DIGITAL MARKETING SOLUTIONS</Typography>
        </Grid>

        <Grid>
          <Typography align="center" style={{ marginLeft: '-20px', marginTop: '20px' }} >An in-depth online course covering digital marketing strategies and techniques </Typography>

        </Grid>

        <Grid>
          <Typography align="center" style={{ fontWeight: 'bolder', marginLeft: '-530px', marginTop: '20px' }}>R15OO</Typography>
        </Grid>

        <Grid>
          <Typography align="center" style={{ color: 'gray', marginLeft: '-530px', marginTop: '10px' }}>Quantity</Typography>
        </Grid>


        <Grid container alignItems="flex-end" justifyContent="center" style={{ marginLeft: '-230px' }} spacing={2}>
          <Grid item>
            <Button onClick={handleDecrement} style={{ color: 'black' }}>-</Button>
          </Grid>

          <Grid item>
            <Typography>{count}</Typography>
          </Grid>

          <Grid item>
            <Button onClick={handleIncrement} style={{ color: 'gray' }}>+</Button>
          </Grid>

        </Grid>
        <Grid item>
          <Button variant="contained" style={{ color: 'white', backgroundColor: '#072840', borderRadius: '40px', marginLeft: '1170px', marginTop: '-50px' }} onClick={handleAddToCart} >ADD TO CART</Button>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Container fixed>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px' }}>
              <Box sx={{ bgcolor: 'red', height: '20vh', width: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '280px' }}>
              </Box>

              <Box sx={{ bgcolor: 'red', borderRadius: '50%', padding: '8px' }}>
                <CreditCardIcon sx={{ color: 'white', fontSize: '2rem', }} />
              </Box>
              <Typography>Digital Product</Typography>
            </Box>

            <Typography style={{ marginTop: '-50px', marginLeft: '355px' }}>Please note that you will recieve this product on your email</Typography>
          </Container>
        </Box>

        <Box>
          <Typography style={{ marginLeft: '375px', marginTop: '60px', fontWeight: 'bold' }}>REVIEWS</Typography>


          <Box style={{ marginLeft: '370px', marginTop: '10px' }}>
            <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} sx={{ justifyContent: 'flex-end' }} />
            <Box sx={{ ml: 2 }}>{labels[value]}
              <Typography sx={{ color: 'gray', marginLeft: '-8px' }}>We Focus on ergonomics and meeting you where you work. It's<br />only a keystroke away.We focus on ergonomics and meeting <br />
                you where you work. It's only a keystroke away
              </Typography>
              <Typography sx={{ fontWeight: 'bolder', fontSize: '20px', marginLeft: '-10px' }}>REGINA MILES</Typography>
              < Link sx={{ marginLeft: '-10px', textDecoration: 'none' }} >Designer</Link>
            </Box>
          </Box>


          <Box style={{ marginLeft: '370px', marginTop: '50px' }}>
            <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} sx={{ justifyContent: 'flex-end' }} />
            <Box sx={{ ml: 2 }}>{labels[value]}
              <Typography sx={{ color: 'gray', marginLeft: '-8px' }}>We Focus on ergonomics and meeting you where you work. It's<br />only a keystroke away.We focus on ergonomics and meeting <br />
                you where you work. It's only a keystroke away
              </Typography>
              <Typography sx={{ fontWeight: 'bolder', fontSize: '20px', marginLeft: '-10px' }}>REGINA MILES</Typography>
              < Link sx={{ marginLeft: '-10px', textDecoration: 'none' }} >Designer</Link>
            </Box>
          </Box>


          <Box sx={{ marginLeft: '1000px' }}>
            <Button sx={{ color: 'black', justifyContent: "space-between" }}> <ChevronLeftIcon />  1      2   <ChevronRightIcon />  </Button>
          </Box>
        </Box>

        <Box style={{ marginLeft: '1000px', marginTop: '50px' }}>
          <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} sx={{ justifyContent: 'flex-end' }} />
          <TextField id="standard-basic" label="Write a review" variant="standard" />
          <Button sx={{
            marginBottom: '-30px', marginLeft: '-30px', backgroundColor: '#072840', borderRadius: '40px', width: '300px', color: 'white', '&:hover': {
              backgroundColor: '#072840',
            }
          }
          } > REVIEW</Button>

        </Box>

        <Box>
          <Typography sx={{ fontWeight: 'bolder', fontSize: '30px' }}>RELATED PRODUCTS</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 'bolder', fontSize: '20px', marginTop: '30px' }}>MindMatters Publications</Typography>
        </Box>


        {/* Images 1 */}
        <Container>
          <img src={fixed} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />

          <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074cc" }}>
            {item?.selectedCategory} English Department </Typography>

          <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>⭐ 4.9</Button>

          <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>


          <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
            where you work. <br /> It's only a keystroke away. </Typography>

          <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
            <Typography>
            </Typography>
          </Box>

          <Typography variant="body2" component="p" style={{ color: "gray" }}>
            <Icon2 name="download" size={20} /> 15 Sales
          </Typography>

          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>

            <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
            </Typography>
          </Box>
          <Button variant="outlined" color="primary" style={{
            border: "2px solid black", color: "rgb(43, 40, 40)", textDecoration: "none", width: "7vw", backgroundColor: "white",
            padding: "5px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center",
          }}
            onClick={() => console.log("View Button Clicked!!!")}>
            VIEW
            <Icon name="arrow-right" size={20} />
          </Button>
        </Container>


        {/* Image 2 */}
        <Grid sx={{ marginTop: '-420px' }}>
          <Container sx={{ marginRight: '-250px' }}>
            <img src={yellow} alt="yellow" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />

            <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074cc" }}>
              {item?.selectedCategory} English Department </Typography>
            <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>⭐ 4.9</Button>
            <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
              where you work. <br /> It's only a keystroke away. </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
              <Typography>
              </Typography>
            </Box>
            <Typography variant="body2" component="p" style={{ color: "gray" }}>
              <Icon2 name="download" size={20} /> 15 Sales
            </Typography>
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
              <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
              </Typography>
            </Box>
            <Button variant="outlined" color="primary" style={{
              border: "2px solid black", color: "rgb(43, 40, 40)", textDecoration: "none", width: "7vw", backgroundColor: "white",
              padding: "5px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center",
            }}
              onClick={() => console.log("View Button Clicked!!!")}>
              VIEW
              <Icon name="arrow-right" size={20} />
            </Button>
          </Container>
        </Grid>

        {/* Image 3 */}

        <Grid sx={{ marginTop: '-420px' }}>
          <Container sx={{ marginRight: '-550px' }}>
            <img src={yellow} alt="yellow" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />

            <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074cc" }}>
              {item?.selectedCategory} English Department </Typography>
            <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>⭐ 4.9</Button>
            <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
              where you work. <br /> It's only a keystroke away. </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
              <Typography>
              </Typography>
            </Box>
            <Typography variant="body2" component="p" style={{ color: "gray" }}>
              <Icon2 name="download" size={20} /> 15 Sales
            </Typography>
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
              <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
              </Typography>
            </Box>
            <Button variant="outlined" color="primary" style={{
              border: "2px solid black", color: "rgb(43, 40, 40)", textDecoration: "none", width: "7vw", backgroundColor: "white",
              padding: "5px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center",
            }}
              onClick={() => console.log("View Button Clicked!!!")}>
              VIEW
              <Icon name="arrow-right" size={20} />
            </Button>
          </Container>
        </Grid>

        {/* Text */}
        <Typography sx={{ fontWeight: 'bolder', fontSize: '20px', marginTop: '60px' }}>MindMatters Publications</Typography>



        {/* bottom images */}
        <Grid>
          <Container>
            <img src={yellow} alt="banner" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />

            <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074cc" }}>
              {item?.selectedCategory} English Department </Typography>

            <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>⭐ 4.9</Button>

            <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>


            <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
              where you work. <br /> It's only a keystroke away. </Typography>

            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
              <Typography>
              </Typography>
            </Box>

            <Typography variant="body2" component="p" style={{ color: "gray" }}>
              <Icon2 name="download" size={20} /> 15 Sales
            </Typography>

            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>

              <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
              </Typography>
            </Box>
            <Button variant="outlined" color="primary" style={{
              border: "2px solid black", color: "rgb(43, 40, 40)", textDecoration: "none", width: "7vw", backgroundColor: "white",
              padding: "5px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center",
            }}
              onClick={() => console.log("View Button Clicked!!!")}>
              VIEW
              <Icon name="arrow-right" size={20} />
            </Button>
          </Container>
        </Grid>

        {/* second image */}
        <Grid sx={{ marginTop: '-420px' }}>
          <Container sx={{ marginRight: '-250px' }}>
            <img src={yellow} alt="yellow" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />

            <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074cc" }}>
              {item?.selectedCategory} English Department </Typography>
            <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>⭐ 4.9</Button>
            <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
            <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
              where you work. <br /> It's only a keystroke away. </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
              <Typography>
              </Typography>
            </Box>
            <Typography variant="body2" component="p" style={{ color: "gray" }}>
              <Icon2 name="download" size={20} /> 15 Sales
            </Typography>
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
              <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
              </Typography>
            </Box>
            <Button variant="outlined" color="primary" style={{
              border: "2px solid black", color: "rgb(43, 40, 40)", textDecoration: "none", width: "7vw", backgroundColor: "white",
              padding: "5px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center",
            }}
              onClick={() => console.log("View Button Clicked!!!")}>
              VIEW
              <Icon name="arrow-right" size={20} />
            </Button>
          </Container>
        </Grid>


        {/* third bottom image */}
        <Grid>
          <Grid sx={{ marginTop: '-420px' }}>
            <Container sx={{ marginRight: '-550px' }}>
              <img src={yellow} alt="yellow" style={{ width: '150px', marginLeft: '20px', marginTop: '20px' }} />

              <Typography variant="h6" component="h6" style={{ fontSize: "16px", color: "#0074cc" }}>
                {item?.selectedCategory} English Department </Typography>
              <Button sx={{ backgroundColor: '#072840', color: 'white', borderRadius: '40px', marginLeft: '160px', marginTop: '-50px', '&:hover': { backgroundColor: '#072840', }, }}>⭐ 4.9</Button>
              <Typography sx={{ fontWeight: 'bolder' }} variant="h5" component="h5"> {item?.productName}  Graphic Design </Typography>
              <Typography variant="subtitle2" component="p" style={{ color: "gray" }}>  We focus on ergonomics and meeting you <br />
                where you work. <br /> It's only a keystroke away. </Typography>
              <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
                <Typography>
                </Typography>
              </Box>
              <Typography variant="body2" component="p" style={{ color: "gray" }}>
                <Icon2 name="download" size={20} /> 15 Sales
              </Typography>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2" component="p" style={{ color: "#BDBDBD", fontSize: "18px", fontWeight: "700", marginRight: "10px", }}>  R{item?.price}700  </Typography>
                <Typography variant="subtitle2" component="p" style={{ color: "rgb(97, 151, 97)", fontSize: "18px", fontWeight: "700", }}> R{item?.price}500
                </Typography>
              </Box>
              <Button variant="outlined" color="primary" style={{
                border: "2px solid black", color: "rgb(43, 40, 40)", textDecoration: "none", width: "7vw", backgroundColor: "white",
                padding: "5px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center",
              }}
                onClick={() => console.log("View Button Clicked!!!")}>
                VIEW
                <Icon name="arrow-right" size={20} />
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
};

export default Header;