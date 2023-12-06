// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   Button,
// } from "@mui/material";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Icon2 from "react-native-vector-icons/Feather";
// import { Text, TouchableOpacity, View } from "react-native";
// import { firestore } from "../config";
// import { useNavigation } from "@react-navigation/native";

// const ProductCard2 = ({ productId }) => {
//   const navigation = useNavigation();
//   const [isRed, setIsRed] = useState(true);
//   const [product, setProduct] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const navigateproductdetails = () => {
//     navigation.navigate("ProductDetails");
//   };

//   const toggleHeart = () => {
//     setIsRed((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const productDoc = await firestore
//           .collection("Products")
//           .doc(productId)
//           .get();
//         const productData = productDoc.data();
//         console.log("Fetched product data:", productData);

//         setProduct(productData);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     fetchProductData();
//   }, [productId]);

//   useEffect(() => {
//     // Change the image every 3 seconds (adjust the interval as needed)
//     const intervalId = setInterval(() => {
//       setCurrentImageIndex(
//         (prevIndex) => (prevIndex + 1) % (product?.images?.length || 1)
//       );
//     }, 2000);

//     return () => {
//       // Clear the interval on component unmount to avoid memory leaks
//       clearInterval(intervalId);
//     };
//   }, [product?.images]);

//   if (!product) {
//     // Render a loading state or return null if data is still being fetched
//     return null;
//   }

//   return (
//     <Card
//       className="card-container"
//       style={{
//         width: "21vw",
//         // paddingRight: "1%",
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         // marginHorizontal:"5vw",
//         // backgroundColor:'purple'
//       }}>
//       <View
//         style={{
//           // backgroundColor: "purple",
//           justifyContent: "center",
//           alignItems: "center",
//           paddingHorizontal: 16,
//         }}>
//         <Box
//           style={{
//             borderRadius: "16px",
//             objectFit: "cover",
//             position: "relative",
//             backgroundColor: "gold",
//             width: "270px",
//             height: "270px",
//             borderRadius: "50%",
//             alignself: "center",
//             justifyContent: "center",
//             display: "flex",
//             flexDirection: "column",
//             alignSelf: "center",
//             justifyContent: "center",
//           }}>
//           <CardMedia
//             component="img"
//             height="140"
//             image={
//               product?.images?.length > 0
//                 ? product.images[currentImageIndex]
//                 : "../../assets/image/headsets.png"
//             }
//             alt={product.name}
//             style={{
//               position: "relative",
//               borderRadius: "100px",
//               objectFit: "cover",
//               width: 220,
//               height: 220,
//               alignSelf: "center",
//             }}
//           />
//           <Box
//             style={{
//               backgroundColor: "#E74040",
//               position: "absolute",
//               bottom: 200,
//               padding: 2,
//               width: "22%",
//               borderRadius: "8%",
//               alignSelf: "center",
//             }}>
//             <Typography
//               variant="h5"
//               style={{ color: "#fff", textAlign: "center" }}>
//               sale
//             </Typography>
//           </Box>
//           <Box
//             style={{
//               paddingHorizontal: 10,
//               position: "absolute",
//               bottom: 30,
//               width: "6vw",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignSelf: "center",
//             }}>
//             <TouchableOpacity>
//               <Icon
//                 name={isRed ? "heart" : "heart-o"}
//                 size={20}
//                 style={{
//                   padding: 10,
//                   backgroundColor: "white",
//                   borderRadius: "50%",
//                 }}
//                 onClick={toggleHeart}
//                 color={isRed ? "red" : "black"}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Icon
//                 name="shopping-cart"
//                 size={20}
//                 style={{
//                   padding: 10,
//                   backgroundColor: "white",
//                   borderRadius: "50%",
//                 }}
//                 color="black"
//               />
//             </TouchableOpacity>
//           </Box>
//         </Box>
//         <View
//           style={{
//             width: "100%",
//             justifyContent: "center",
//             marginTop: 16,
//           }}>
//           <View>
//             {/* <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center", // Center items vertically
//               backgroundColor: "red",
//               paddingBottom: "10%",
//               position: "relative",
//             }}> */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}>
//               <Text
//                 style={{
//                   flex: 1,
//                   fontSize: "15px",
//                   color: "#4FC3F7",
//                   fontWeight: "bold",
//                 }}>
//                 {product.selectedProductCategory}
//               </Text>
//               <View
//                 style={{
//                   backgroundColor: "#072840",
//                   paddingHorizontal: 5,
//                   paddingVertical: 3,
//                   borderRadius: 15,
//                 }}>
//                 <Text style={{}}>
//                   ⭐ <Text style={{ color: "white" }}> 4.9</Text>
//                 </Text>
//               </View>
//             </View>
//             {/* <Typography
//               variant="h6"
//               component="h6"
//               style={{
//                 fontSize: "16px",
//                 color: "#0074cc",
//                 marginRight: "auto", // Push the first Typography to the left
//                 backgroundColor:'#fff',
//                 wordWrap: "break-word", 
//                 // marginLeft:10
//               }}>
//               {product.selectedProductCategory}
//             </Typography>
//             <Typography
//               style={{
//                 backgroundColor: "blue",
//                 color: "#fff",
//                 borderRadius: "15px",
//                 padding: "4px",
//                 position: "absolute",
//                 right: 0, // Align the second Typography to the right
//                 wordWrap: "break-word"
//               }}>
//               ⭐ 4.9
//             </Typography> */}
//             {/* </Box> */}

//             <Typography variant="h5" component="h5">
//               {product.name}
//             </Typography>
//             <Typography
//               variant="subtitle2"
//               component="p"
//               style={{ color: "gray" }}>
//               {product.description && product.description.slice(0, 110)}
//               {product.description && product.description.length < 110
//                 ? ""
//                 : "..."}
//             </Typography>
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="flex-start"
//               justifyContent="space-between">
//               <Typography
//                 variant="body2"
//                 component="p"
//                 style={{ color: "gray" }}>
//                 <Icon2 name="download" size={20} /> 15 Sales
//               </Typography>
//               <Box display="flex" flexDirection="row">
//                 <Typography
//                   variant="subtitle2"
//                   component="p"
//                   style={{
//                     color: "#BDBDBD",
//                     fontSize: "18px",
//                     fontWeight: "700",
//                     marginRight: "10px",
//                   }}>
//                   R{product.price}
//                 </Typography>
//                 <Typography
//                   variant="subtitle2"
//                   component="p"
//                   style={{
//                     color: "rgb(97, 151, 97)",
//                     fontSize: "18px",
//                     fontWeight: "700",
//                   }}>
//                   R{product.price}
//                 </Typography>
//               </Box>
//             </Box>
//           </View>
//         </View>
//       </View>
//       <CardContent>
//         <Button
//           variant="outlined"
//           color="primary"
//           style={{
//             border: "2px solid black",
//             color: "rgb(43, 40, 40)",
//             textDecoration: "none",
//             width: "7vw",
//             backgroundColor: "white",
//             padding: "5px 20px",
//             borderRadius: "25px",
//             cursor: "pointer",
//             fontSize: "18px",
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "2vh",
//           }}
//           onClick={navigateproductdetails}>
//           VIEW
//           <Icon name="arrow-right" size={20} />
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;
