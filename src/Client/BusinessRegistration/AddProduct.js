import { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import background from "../../Global/images/Reed.jpg";
import logo from "../../Global/images/logo5.png";
import Banner from "../../Global/images/media bg-cover.png";
import placeholder from "../../Global/images/login.jpg";
import { useNavigation } from "@react-navigation/native";
import {
  Linking,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, firestore, storage } from "../../config";
import firebase from "firebase/compat/app";
import ImageCompressor from "image-compressor";

const AddProductsAndServices = () => {
  const navigation = useNavigation();

  const emptyOption = [""];
  const [images, setImages] = useState([]);

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProductCategory, setProductCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [length, setLength] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const productCategory = [
    ...emptyOption,
    "Electronics",
    "Clothing and Apparel",
    "Home and Furniture",
    "Beauty and Personal Care",
    "Sports and Outdoors",
    "Toys and Games",
    "Books and Stationery",
    "Health and Wellness",
    "Automotive",
    "Grocery and Gourmet",
    "Jewelry and Watches",
    "Home Improvement",
    "Pet Supplies",
    "Office Supplies",
    "Music and Instruments",
    "Garden and Outdoor Living",
    "Art and Craft Supplies",
    "Travel and Luggage",
    "Baby and Maternity",
    "Electrical and Lighting",
  ];

  const url = "https://atlegile-marketing-solutions--client-x35upb5j.web.app";

  // Function to handle image change when files are selected
  const handleImageChange = (e) => {
    // Get the selected files from the event
    const files = e.target.files;

    // Check if files are selected
    if (files.length > 0) {
      // Create an array of objects with URLs and files and update the state
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  // Function to handle form submission
  const handleContinue = async (e) => {
    e.preventDefault();
  
    // Check if at least one image is selected
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Create a reference to the Firestore collection and generate a unique product ID
      const productRef = firestore.collection("Products").doc();
      const productId = productRef.id;
  
      // Set product data in Firestore
      await productRef.set({
        name,
        company: businessName,
        businessName,
        price,
        quantity,
        description,
        selectedProductCategory,
        brand,
        height: parseFloat(height), // Parse input as a float
        length: parseFloat(length), // Parse input as a float
        width: parseFloat(width), // Parse input as a float
        weight: parseFloat(weight), // Parse input as a float
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      // Upload images to Firebase Storage
      const uploadTasks = images.map((image, index) => {
        const imageRef = storage.ref(
          `product_images/${productId}/image${index}`
        );
        return imageRef.put(image.file);
      });
  
      // Wait for all image uploads to complete
      await Promise.all(uploadTasks);
  
      // Get download URLs for the uploaded images
      const downloadURLs = await Promise.all(
        uploadTasks.map((task) => task.snapshot.ref.getDownloadURL())
      );
  
      // Update product document with image URLs
      await productRef.update({ images: downloadURLs });
  
      // Set a timeout for demonstration purposes (loading state)
      setTimeout(() => {
        setLoading(true);
      }, 3000);
  
      // Show success alert
      alert("Product has been Successfully Added");
  
      // Navigate to the landing page after processing
      navigation.navigate("Landing");
    } catch (error) {
      console.error("Error storing data in Firestore:", error);
      setLoading(false);
    }
  };
  
  return (
    // Styling for the main container with background image
    <View
      style={{
        width: "100vw",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
    <Paper
        elevation={0}
        variant="outlined"
        sx={{
          position: "fixed",
          minWidth: 280,
          height: "98%",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column", // Make the container a column
          justifyContent: "space-between", // Push the content to the end
          alignSelf: "center",
          width: "90%",
          "@media (min-width: 600px)": {
            alignSelf: "flex-end",
            width: 400,
            margin: 1,
          },
        }}
      >
        

       
          {/* Logo section */}
          <Grid style={{flex:1, display: "flex", alignSelf: "center",justifyContent:'center', marginTop: "6%", marginBottom:"3%" }}>
  <img
    src={logo}
    style={{ 
      height: "9vh", width: "90%" }} />
</Grid>

          {/* Form container */}
          <View
          style={{
            marginBottom:60,
            display: "flex",
            justifyContent: "center",
           width:"80%",
           alignSelf:'center'
          }}
        >
            {/* Title for adding products and services */}
            <Typography
              variant="h2"
              style={{
                color: "#000",
                textAlign: "left",
                fontSize: "15px",
                width: "100%",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              ADD PRODUCTS + SERVICES
            </Typography>

            {/* Image upload and display section */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "8vh",
              }}
            >
              {/* Display selected images or a placeholder */}
              {images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      padding: "15px",
                      marginRight: "10px",
                      width: "16%",
                      height: "8vh",
                    }}
                  />
                ))
              ) : (
                <img
                  src={placeholder}
                  alt="Placeholder"
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    width: "16%",
                    height: "8vh",
                  }}
                />
              )}

              {/* Label and input for adding images */}
              <label
                htmlFor="imageInput"
                className="add"
                style={{
                  backgroundColor: "whitesmoke",
                  color: "#000",
                  padding: "20px",
                  width: "5%",
                  cursor: "pointer",
                  alignSelf: "center",
                }}
              >
                +
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                multiple // Allow selecting multiple files
              />
            </View>

            {/* Form for entering product details */}
            <View>
              <form onSubmit={handleContinue} >
                {/* Name input field */}
                <TextField
                  fullWidth
                  id="outlined-number"
                  label="Name"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <ScrollView>
                  {/* Business name input field */}
                  <TextField
                    fullWidth
                    id="outlined-number"
                    label="Business Name"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />

                  {/* Price and Quantity input fields */}
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Price"
                      type="number"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: "45%",
                        marginRight: "10px",
                      }}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Quantity"
                      type="number"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: "45%" }}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </View>

                  {/* Dimensions input fields */}
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    {/* Length, width, height, and weight input fields */}
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Length_cm"
                      type="number"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: "45%",
                        marginRight: "10px",
                      }}
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Width_cm"
                      type="number"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: "45%",
                        marginRight: "10px",
                      }}
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Height_cm"
                      type="number"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{
                        width: "45%",
                        marginRight: "10px",
                      }}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Weight_kg"
                      type="number"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: "45%" }}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </View>

                  {/* Description input field */}
                  <br />
                  <TextField
                    fullWidth
                    id="outlined-number"
                    label="Description"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{
                      width: "100%",
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  {/* Product category selection */}
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="product Category"
                    variant="standard"
                    value={selectedProductCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    style={{
                      width: "100%",
                      marginRight: "10px",
                      textAlign: "left",
                    }}
                    required
                  >
                    {/* Map through product categories and create options */}
                    {productCategory.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* Brand input field */}
                  <TextField
                    fullWidth
                    id="outlined-number"
                    label="Brand"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{
                      width: "100%",
                      marginLeft: "5px",
                    }}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </ScrollView>

                {/* Submit button */}
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "10%",
                    marginTop: "5%",
                    background: "#072840",
                    borderRadius: "30px",
                  }}
                  type="submit"
                >
                  {/* Conditional rendering of loading or 'Continue' text */}
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress color="inherit" size={25} />
                    </Box>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </View>
          </View>
        
      </Paper>
    </View>
  );
};

export default AddProductsAndServices;
