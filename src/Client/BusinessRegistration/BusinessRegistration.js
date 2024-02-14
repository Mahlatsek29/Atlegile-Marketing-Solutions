import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TextInput,
  Picker,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native"; 
import CircularProgress from "@mui/material/CircularProgress"; 
import TextField from "@mui/material/TextField"; 
import MenuItem from "@mui/material/MenuItem"; 
import Button from "@mui/material/Button"; 
import Box from "@mui/material/Box"; 
import background from "../../Global/images/Reed.jpg"; 
import logo from "../../Global/images/logo.svg";
import Banner from "../../Global/images/media bg-cover.png";
import { auth, firestore, firebase } from "../../config"; 
import Alert from "@mui/material/Alert"; 
import AlertTitle from "@mui/material/AlertTitle"; 
import { Typography } from "@mui/material";

// Define BusinessRegistration component
const BusinessRegistration = () => {
  const navigation = useNavigation(); 
  const [businessName, setBusinessName] = useState(""); 
  const [selectedRole, setSelectedRole] = useState(""); 
  const [regNumber, setRegNumber] = useState(""); 
  const [website, setWebsite] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [selectedBusinessType, setSelectedBusinessType] = useState(""); 
  const [selectedIndustry, setSelectedIndustry] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [bio, setBio] = useState(""); 
  const [cardHolder, setCardHolder] = useState(null); 
  const [cardNumber, setCardNumber] = useState(null); 
  const [cvv, setCvv] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const window = Dimensions.get("window"); 

  // useEffect hook to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, get the UID
        setCurrentUserUID(user.uid);
      } else {
        // User is signed out
        setCurrentUserUID(null);
      }
    });

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to navigate to add product screen
  const navigateaddproduct = () => {
    navigation.navigate("AddProductsAndServices");
  };

  // Function to handle form submission
  const handlechange = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      // Add form data to Firestore
      await firestore.collection("Business").add({
        businessName,
        selectedRole,
        regNumber,
        website,
        location,
        selectedBusinessType,
        selectedIndustry,
        phoneNumber,
        bio,
        cardHolder,
        cardNumber,
        cvv,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setShowSuccessAlert(true);

      setTimeout(() => {
        setLoading(false);
        navigation.navigate("AddProductsAndServices");
      }, 2000);
    } catch (error) {
      console.error("Error storing data in Firestore:", error);
      setLoading(false);
    }
  };

  const emptyOption = [""]; 

  // Define options for role, business type, and industry dropdowns
  const roleOptions = [
    ...emptyOption,
    "Graphic Designer",
    // Add other roles here 
  ];

  const businessTypeOptions = [
    ...emptyOption,
    "Sole Proprietorship",
    // Add other business types here
  ];

  const industryOptions = [
    ...emptyOption,
    "Technology",
    // Add other industries here
  ];

  // Calculate container width and height dynamically
  const containerWidth = window.width > 400 ? 400 : window.width * 0.9;
  const containerHeight = window.height > 600 ? 600 : window.height * 0.9;

  // Return the component JSX
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      {/* Background image */}
      <Image
        source={require("../../Global/images/Reed.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {/* Form container */}
      <View
        style={{
          backgroundColor: "white",
          width: containerWidth,
          position: "absolute",
          right: 16,
          top: 16,
          bottom: 16,
        }}
      >
        {/* Main content container */}
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {/* Logo */}
          <View>
            <img src={logo} style={{ height: "9vh", width: "90%" }} />
          </View>
          {/* Form */}
          <View
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "left",
            }}
          >
            <form onSubmit={handlechange} style={{ width: "100%" }}>
              <View
                className="form-container"
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                {/* Form title */}
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  BUSINESS REGISTRATION
                </Typography>

                {/* Business Name input */}
                <TextField
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
                />
                <br />

                {/* Role select */}
                <TextField
                  id="outlined"
                  select
                  label="Role"
                  variant="standard"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                >
                  {roleOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <br />

                {/* Registration Number input */}
                <TextField
                  id="outlined-number"
                  label="Reg Number"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  required
                />
                <br />

                {/* Website input */}
                <TextField
                  id="outlined-number"
                  label="Website"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />

                {/* Location input */}
                <TextField
                  id="outlined-number"
                  label="Location"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />

                {/* Type of Business and Industry selects */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Type of business"
                    variant="standard"
                    value={selectedBusinessType}
                    onChange={(e) =>
                      setSelectedBusinessType(e.target.value)
                    }
                    style={{
                      width: "48%",
                      marginTop: "5px",
                      marginRight: "10px",
                      textAlign: "left",
                    }}
                    required
                  >
                    {businessTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Industry"
                    variant="standard"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    style={{
                      width: "48%",
                      marginTop: "5px",
                      textAlign: "left",
                    }}
                    required
                  >
                    {industryOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </View>

                {/* Phone Number input */}
                <TextField
                  id="outlined-number"
                  label="Phone Number"
                  type="number"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />

                {/* Bio input */}
                <TextField
                  id="outlined-number"
                  label="Bio"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />

                {/* Continue Button */}
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
                  {loading ? (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </View>
            </form>
            {/* Display the success alert when showSuccessAlert is true */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default BusinessRegistration;  
