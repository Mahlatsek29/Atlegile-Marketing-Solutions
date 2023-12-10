import { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import background from "../../Global/images/Reed.jpg";
import logo from "../../Global/images/logo.svg";
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

  const navigatepaymentinfo = () => {
    navigation.navigate("AddProductsAndServices");
  };

  const emptyOption = [""];
  const [images, setImages] = useState([]);

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [selectedProductCategory, setProductCategory] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [brand, setBrand] = useState("");

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

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  const handleContinue = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      const productRef = firestore.collection("Products").doc();

      const productId = productRef.id;

      await productRef.set({
        name,
        company: companyName,
        businessName,
        price,
        quantity,
        description,
        selectedProductCategory,
        brand,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const uploadTasks = images.map((image, index) => {
        const imageRef = storage.ref(
          `product_images/${productId}/image${index}`
        );
        return imageRef.put(image.file);
      });

      await Promise.all(uploadTasks);
      const downloadURLs = await Promise.all(
        uploadTasks.map((task) => task.snapshot.ref.getDownloadURL())
      );

      await productRef.update({ images: downloadURLs });

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
      navigation.navigate("Landing");
    } catch (error) {
      console.error("Error storing data in Firestore:", error);
      setLoading(false);
    }
  };

  return (
    <View
      className="container"
      style={{
        width: "100vw",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>
      <Grid
        container
        style={{
          width: "100%",
          marginBottom: "-10vh",
          position: "absolute",
          top: 5,
          left: -10,
          // bottom: 10,
          right: 10,
          // backgroundColor: "purple",
        }}>
        <Grid
          item
          lg={8}
          md={8}
          sm={{ hidden: true }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <Grid
            Container
            lg={6}
            md={6}
            style={{
              width: "100vw",
            }}></Grid>
          <Grid
            Container
            lg={6}
            md={6}
            style={{
              width: "100vw",
              marginBottom: "-8px",
            }}>
            <img
              src={Banner}
              style={{
                height: "21vh",
                width: "65vw",
                paddingTop: "30vh",
                marginLeft: "10px",
                marginRight: "2px",
              }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          lg={4}
          md={4}
          style={{
            backgroundColor: "#fff",
            marginLeft: "-10px",
            width: "100%",
            height: "98vh",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <Grid style={{ alignSelf: "center" }}>
            <img
              src={logo}
              style={{ height: "9vh", width: "90%", paddingTop: "8vh" }}
            />
          </Grid>

          <View
            className="form-container"
            style={{
              justifyContent: "center",
              textAlign: "left",
              alignItems: "center",
              width: "75%",
              marginLeft: "80px",
              marginBottom: "30px",
              // backgroundColor: "red",
            }}>
            <Typography
              variant="h2"
              sx={{
                color: "#000",
                textAlign: "left",
                fontSize: "15px",
                width: "100%",
                // backgroundColor: "blue",
                // textAlign: "center",
                fontWeight: "bold",
                marginBottom: 1,
              }}>
              ADD PRODUCTS + SERVICES
            </Typography>
            <View
              className="uploadContainer"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "8vh",
              }}>
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

              <TouchableOpacity style={{ width: 60 }}>
                <label
                  htmlFor="imageInput"
                  className="add"
                  style={{
                    backgroundColor: "whitesmoke",
                    color: "#000",
                    padding: "25px",
                    width: "10%",
                    cursor: "pointer",
                    alignSelf: "center",
                  }}>
                  +
                </label>
              </TouchableOpacity>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                multiple
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              <form onSubmit={handleContinue}>
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
                  <TextField
                    fullWidth
                    id="outlined-number"
                    label="Business Name"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%", marginTop: "10px" }}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                  <TextField
                    id="outlined-number"
                    label="company name"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
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
                        marginTop: "10px",
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
                      style={{ width: "45%", marginTop: "10px" }}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </View>
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
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
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
                    required>
                    {productCategory.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

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
                      marginTop: "10px",
                    }}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </ScrollView>
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "10%",
                    marginTop: "5%",
                    background: "#072840",
                    borderRadius: "30px",
                  }}
                  type="submit">
                  {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress color="inherit" />
                    </Box>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </View>
          </View>
        </Grid>
      </Grid>
    </View>
  );
};

export default AddProductsAndServices;
