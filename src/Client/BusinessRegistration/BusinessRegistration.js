import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TextInput, Picker } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import background from "../../Global/images/Reed.jpg";
import logo from "../../Global/images/logo.svg";
import Banner from "../../Global/images/media bg-cover.png";
import { auth, firestore, firebase } from "../../config";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Typography } from "@mui/material";
import ReactDOM from "react-dom";
import App from "../../../App";
import PlaceAutocomplete from "../../Global/PlaceAutocomplete";
//import { Head } from 'react-native-web';

const AppDiscreiption = "Atlegile Markwting Solutions"; // Add your actual description here

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
  const [address, setAddress] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [locationDetails, setLocationDetails] = useState({});
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

    return () => unsubscribe(); // Cleanup on component unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateaddproduct = () => {
    navigation.navigate("AddProductsAndServices");
  };

  const handlechange = async (event) => {
    event.preventDefault();

    let streetAddress;

    if (address.address_components.length === 8) {
      streetAddress = `${address.address_components[0].long_name} ${address.address_components[1].long_name}`;
      
    } else if (address.address_components.length === 9) {
      streetAddress = ` ${address.address_components[1].long_name} ${address.address_components[2].long_name} `;
      
    }

  let localArea;

  if (address.address_components.length === 8) {
    localArea = `${address.address_components[2].long_name} `;
   
  } else if (address.address_components.length === 9) {
    localArea = `${address.address_components[3].long_name} ${address.address_components[0].long_name}`;
    
  }
  let localCity;

  if (address.address_components.length === 8) {
    localCity = `${address.address_components[4].long_name}`;
   
  } else if (address.address_components.length === 9) {
    localCity = `${address.address_components[5].long_name} `;
   
  }

  let zoneCity;

  if (address.address_components.length === 8) {
    zoneCity = `${address.address_components[5].long_name}`;
   
  } else if (address.address_components.length === 9) {
    zoneCity = `${address.address_components[6].long_name} `;
    
  }

  let countryOfCity;

  if (address.address_components.length === 8) {
    countryOfCity = `${address.address_components[6].long_name}`;
    
  } else if (address.address_components.length === 9) {
    countryOfCity = `${address.address_components[7].short_name} `;
    
  }

  let postalCode;

  if (address.address_components.length === 8) {
    postalCode = `${address.address_components[7].long_name}`;
    
  } else if (address.address_components.length === 9) {
    postalCode = `${address.address_components[8].long_name} `;
   
  }

    try {
      setLoading(true);

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
        locationDetails: {
          type: "business",
          company: website,
          street_address: streetAddress,
          local_area: localArea,
          city: localCity,
          zone: zoneCity,
          country: countryOfCity,
          code: postalCode,
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        // userID: currentUserUID,
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

  const roleOptions = [
    ...emptyOption,
    "Graphic Designer",
    "Data Entry Specialist",
    "Project Manager",
    "Software Engineer",
    "Marketing Specialist",
    "Sales Manager",
    "Accountant",
    "HR Manager",
    "Content Writer",
    "Customer Support Specialist",
    "Product Manager",
    "Financial Analyst",
    "UI/UX Designer",
    "Network Administrator",
    "Legal Counsel",
    "Business Analyst",
    "Quality Assurance Engineer",
    "Data Scientist",
    "Operations Manager",
    "Research Scientist",
  ];

  const businessTypeOptions = [
    ...emptyOption,
    "Sole Proprietorship",
    "Partnership",
    "Online Business",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Cooperative",
    "Franchise",
    "Nonprofit Organization",
    "Joint Venture",
    "S Corporation",
    "Trust",
    "Limited Partnership (LP)",
    "General Partnership",
    "Limited Liability Partnership (LLP)",
    "B Corporation",
    "Sole Proprietorship",
    "Freelancer or Independent Contractor",
    "Home-Based Business",
    "Retail Business",
    "E-commerce Business",
  ];

  const industryOptions = [
    ...emptyOption,
    "Technology",
    "Energy",
    "Telecommunications",
    "Healthcare",
    "Finance",
    "Education",
    "Entertainment",
    "Manufacturing",
    "Retail",
    "Transportation",
    "Agriculture",
    "Real Estate",
    "Hospitality",
    "Construction",
    "Automotive",
    "Media",
    "Aerospace",
    "Biotechnology",
    "Pharmaceutical",
    "Fashion",
  ];

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs&libraries=places";
  //   script.defer = true;

  //   const handleScriptLoad = () => {
  //     const root = ReactDOM.createRoot(document.getElementById("root"));
  //     root.render(<App />);
  //   };

  //   script.onload = handleScriptLoad;

  //   // Check if the script is already present to avoid re-adding it
  //   if (!document.querySelector(`script[src="${script.src}"]`)) {
  //     document.head.appendChild(script);
  //   }

  //   return () => {
  //     // Clean up if needed
  //     document.head.removeChild(script);
  //   };
  // }, []);
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs&libraries=places";
  script.defer = true;

  const handleScriptLoad = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  };

  script.onload = handleScriptLoad;

  // Check if the script is already present to avoid re-adding it
  if (!document.querySelector(`script[src="${script.src}"]`)) {
    document.head.appendChild(script);
  }
  const handlePlaceSelect = ({ place, latLng }) => {
    // Do something with the selected place details and latitude/longitude
    console.log("Selected place:", place.address_components);
    console.log("Latitude and Longitude:", latLng);
    setAddress(place);
    setCoordinates(latLng);
  };

  useEffect(() => {
    setLocation(address.formatted_address);
  }, [address]);
  return (
    <>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          source={require("../../Global/images/Reed.jpg")}
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        />
        <View
          style={{
            backgroundColor: "white",
            width: 500,
            position: "absolute",
            right: 16,
            top: 16,
            bottom: 16,
          }}
        >
          <div
            style={{
              // backgroundColor: "red",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img src={logo} style={{ height: "9vh", width: "90%" }} />
            </div>
            <div
              style={{
                // backgroundColor: "yellow",
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
                    // backgroundColor: "purple",
                    alignSelf: "center",

                    // marginBottom: "30px",
                  }}
                >
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

                  <TextField
                    id="outlined-number"
                    label="Reg Number"
                    type="text"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    required
                  />
                  <br />

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
                  <PlaceAutocomplete
                    style={{ width: "25vw" }}
                    onPlaceSelect={handlePlaceSelect}
                  />

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
                      onChange={(e) => setSelectedBusinessType(e.target.value)}
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
                  <Button
                    // onClick={navigateaddproduct}
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
            </div>
          </div>
        </View>
      </View>

      <head>
        <meta
          name="description"
          content={`Business registration for ${AppDiscreiption}`}
        />
        <title>Your App Title</title>
      </head>
    </>
  );
};

export default BusinessRegistration;
