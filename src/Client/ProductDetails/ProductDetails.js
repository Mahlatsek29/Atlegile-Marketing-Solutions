import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
  Container,
  Grid,
  TextField,
  Avatar,
  Skeleton,
} from "@mui/material";
import logo from "../../Global/images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import image from "../../Global/images/fixed-height.png";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import fixed from "../../Global/images/fixed-height.png";
import yellow from "../../Global/images/headphones.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ReviewsCard from "./ReviewsCard";
import Card from "../../Global/Card2";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import firebaseConfig from "../../config";

export default function ProductDetails({ navigation, route }) {
  const { productId } = route.params;
  const [myRatings, setMyRatings] = useState(2.5);
  const [product, setProduct] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const fetchReviews = async () => {
    try {
      const reviewsCollectionRef = doc(firestore, "Reviews", productId);
      const reviewsCollectionSnapshot = await getDoc(reviewsCollectionRef);

      if (reviewsCollectionSnapshot.exists()) {
        const reviewsData = reviewsCollectionSnapshot.data();
        console.log("Fetched reviews data:", reviewsData);
        setReviews(reviewsData.reviews || []);
      } else {
        console.log("Reviews collection not found for product:", productId);
        setReviews([]);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [firestore, productId]);

  // ... (your existing code)

  const handleReviewPost = async () => {
    try {
      // Get the reference to the Reviews document
      const reviewsCollectionRef = doc(firestore, "Reviews", productId);

      // Check if the document exists
      const reviewsCollectionSnapshot = await getDoc(reviewsCollectionRef);

      if (reviewsCollectionSnapshot.exists()) {
        // If the document exists, update it
        await updateDoc(reviewsCollectionRef, {
          reviews: [
            ...reviews,
            {
              myRatings,
              productId,
              review,
            },
          ],
        });
      } else {
        // If the document does not exist, create a new one
        await setDoc(reviewsCollectionRef, {
          reviews: [
            {
              myRatings,
              productId,
              review,
            },
          ],
        });
      }

      // Fetch the updated reviews
      fetchReviews();

      // Clear the review input
      setReview("");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  if (!productId) {
    // Handle the case where productId is not provided
    return <Typography>No Product ID provided</Typography>;
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDocRef = doc(firestore, "Products", productId);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          const productData = productDocSnapshot.data();
          console.log("Fetched product data:", productData);
          setProduct(productData);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchProductData();
  }, [firestore, productId]);

  if (loading) {
    // Render a loading state using Skeleton
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "50vh",
          minHeight: "100vh", // Set minimum height to occupy the full viewport height
        }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}>
          <Skeleton
            variant="rectangular"
            width="40%"
            animation="wave"
            height={540}
          />
          <Skeleton variant="text" width="50%" height={35} />
          {/* Add more Skeleton components as needed for your design */}
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            // backgroundColor: "red",
            position: "relative",
            alignSelf: "left",
            alignItems: "left",
            width: "30%",
            left: -90,
          }}>
          <Skeleton
            variant="text"
            width="70%"
            height={80}
            style={{ marginLeft: "2%" }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={80}
            style={{ marginLeft: "2%" }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={80}
            style={{ marginLeft: "2%" }}
          />
        </Container>
      </Box>
    );
  }

  if (!product) {
    // Render a message or handle the case where product is not available
    return <Typography>No Product Found</Typography>;
  }

  // // Assuming the images are stored in an array field named 'images'

  // const reviews = [
  //   {
  //     id: "XYZ123abc456def789",
  //     createdAt: "2023-01-01T12:00:00Z",
  //     comment: "This is a test comment for the product.",
  //     userName: "John",
  //     userSurname: "Doe",
  //     userID: "ghIJKL123mnoPQR456",
  //     productID: "78PQRstUvwXYZ90abc",
  //     role: "Photographer",
  //     ratings: 4.0,
  //   },
  //   {
  //     id: "PQrs56tuVW78xyZ90",
  //     createdAt: "2023-01-02T12:00:00Z",
  //     comment: "Another test comment for the product.",
  //     userName: "Jane",
  //     userSurname: "Smith",
  //     userID: "stuvwX789YZabc012D",
  //     productID: "78PQRstUvwXYZ90abc",
  //     role: "Designer",
  //     ratings: 3.5,
  //   },
  //   {
  //     id: "ABcde12FGhijk34LMno",
  //     createdAt: "2023-01-03T12:00:00Z",
  //     comment: "Yet another test comment for the product.",
  //     userName: "Bob",
  //     userSurname: "Johnson",
  //     userID: "EFGhi123JKLMno456",
  //     productID: "78PQRstUvwXYZ90abc",
  //     role: "Carpenter",
  //     ratings: 5.0,
  //   },
  // ];

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrev = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  // const handleReviewPost = () => {
  //   console.log("Posted review!");
  // };

  return (
    <>
      {/* Navbar */}
      <Box
        sx={{
          bgcolor: "white",
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", marginLeft: "200px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}>
          <Link to="/landingscreen">
            <Button
              sx={{ minWidth: "100px", mr: "20px", borderRadius: "40px" }}
              variant="contained"
              color="primary">
              Shop
            </Button>
          </Link>

          <Button sx={{ minWidth: "150px", mr: "20px" }}>ABOUT US</Button>

          <IconButton aria-label="cart" sx={{ color: "black" }}>
            <ShoppingCartIcon />
          </IconButton>

          <Typography sx={{ mr: "20px" }}>Welcome Jane</Typography>
        </Box>
      </Box>
      {/* End of Navbar */}

      <Box sx={{ backgroundColor: "white", height: "100%", overflowY: "auto" }}>
        <Container maxWidth="md">
          <Box sx={{ pl: 2, pb: 2, backgroundColor: "white" }}>
            <Breadcrumbs>
              <Link
                color="inherit"
                href="/"
                sx={{ fontSize: 15, textDecoration: "none" }}>
                Home
              </Link>
              <Link
                color="inherit"
                href="/vaas"
                sx={{ fontSize: 15, textDecoration: "none" }}>
                VAAS
              </Link>
              <Typography
                color="textPrimary"
                sx={{ fontSize: 15, textDecoration: "none" }}>
                Digital Marketing Solutions Mbali
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", mb: 10 }}>
            {/*START - Left side Panel */}
            <Box
              sx={{
                height: "100%",
                width: "50%",
                //border: "1px lightgray solid",
                borderRadius: 2,
              }}>
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={handlePrev}
                  sx={{ position: "absolute", top: "50%", left: "5px" }}>
                  <ArrowBackIosIcon />
                </IconButton>
                <img
                  src={product.images[currentImage]}
                  alt={`image-${currentImage}`}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: "blue",
                  }}
                />
                <IconButton
                  onClick={handleNext}
                  sx={{ position: "absolute", top: "50%", right: "5px" }}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", mt: 1 }}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`thumbnail-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: 10,
                      border: "1px solid red",
                      opacity: index === currentImage ? 1 : 0.5,
                    }}
                  />
                ))}
              </Box>
            </Box>
            {/*END - Left side Panel */}

            {/*START - Right side Panel*/}
            <Box
              sx={{
                height: "100%",
                width: "50%",
                pl: 2,
              }}>
              <Box
                sx={{
                  //border: "1px red solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}>
                <Button
                  // onClick={() => navigation.navigate("/main/dashboard")}
                  sx={{
                    border: "1px #072840 solid",
                    borderRadius: 20,
                  }}>
                  <Typography
                    sx={{ fontWeight: "600", fontSize: 10, color: "#072840" }}>
                    PHYSICAL
                  </Typography>
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: 20 }}>
                    {product.name}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography>{product.description}</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "600" }}>
                    R{product.price}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "600", color: "lightgray" }}>
                    Quantity
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Grid container sx={{ mt: 2, width: "50%", p: 1 }}>
                    <Grid
                      item
                      xs={2}
                      onClick={decreaseQuantity}
                      sx={{
                        //border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <RemoveIcon />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        //border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {quantity}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      onClick={increaseQuantity}
                      sx={{
                        //border: "1px red solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <AddIcon />
                    </Grid>
                  </Grid>
                  <Button
                    onClick={() => navigation.navigate("DeliveryOngoing")}
                    sx={{
                      backgroundColor: "#072840",
                      borderRadius: 20,
                    }}>
                    <Typography
                      sx={{ fontSize: 15, color: "white", pl: 1, pr: 1 }}>
                      ADD TO CART
                    </Typography>
                  </Button>
                </Box>
                <Box
                  sx={{
                    borderLeft: "10px red solid",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                    }}>
                    <Box
                      onClick={increaseQuantity}
                      sx={{
                        //border: "1px #d32f2f solid",
                        pr: 2,
                      }}>
                      <Avatar sx={{ backgroundColor: "#d32f2f", p: 1 }}>
                        <CreditCardOutlinedIcon sx={{ color: "white" }} />
                      </Avatar>
                    </Box>

                    <Box
                      onClick={decreaseQuantity}
                      sx={
                        {
                          //border: "1px red solid",
                        }
                      }>
                      <Typography sx={{ fontWeight: "600" }}>
                        Digital Product
                      </Typography>
                      <Typography sx={{ mt: "1" }}>
                        Please note that you will receive this product in your
                        email
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "600", fontSize: 15, mt: 3, mb: 4 }}>
                  REVIEWS
                </Typography>
                <Box>
                  {reviews.map((review) => (
                    <ReviewsCard key={review.id} review={review} />
                  ))}
                </Box>
                <Box sx={{}}>
                  <Rating
                    name="hover-feedback"
                    value={myRatings}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setMyRatings(newValue);
                    }}
                  />
                  <TextField
                    fullWidth
                    id="review"
                    label="Write a review"
                    variant="standard"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    fullWidth
                    sx={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "#072840",
                      fontWeight: "500",
                      color: "white",
                      width: "100%",
                      borderRadius: 20,
                      fontSize: 15,
                      p: 1,
                    }}
                    onClick={handleReviewPost}
                    variant="filled">
                    REVIEW
                  </Button>
                </Box>
              </Box>
            </Box>
            {/*END - Right side Panel*/}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "600", fontSize: 20, mt: 3, mb: 4 }}>
              RELATED PRODUCTS
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography sx={{ fontWeight: "600", fontSize: 15, mb: 2 }}>
                MindMatters Publication
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  overflowX: "auto",
                }}>
                <Card />
                <Card />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
