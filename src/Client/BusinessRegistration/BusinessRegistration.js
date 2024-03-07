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
import { Password } from "@mui/icons-material";

// Define BusinessRegistration component
const BusinessRegistration = () => {
  const navigation = useNavigation();
  const [businessName, setBusinessName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [currentUserUID,setCurrentUserUID]=useState(null)
  const [cardHolder, setCardHolder] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const window = Dimensions.get("window");
  const user = firebase.auth().currentUser;
  const [sendToBackend, setSendToBackend] = useState(false);
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

  //   //talent
  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading state to true during the signup process

      // Create a user using email and password
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Check if user is created successfully
      if (userCredential.user) {
        // console.log("User signed up:", userCredential.user);

        // Save additional user information to Firestore
        await firestore.collection("Users").doc(userCredential.user.uid).set({
          business: true,
          company:businessName,
          businessName: businessName,
          subscribed:false,
          uid: user.uid,
        });

        // Navigate to the "TellUsAboutYourself" screen
        setSendToBackend(true);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up. Please try again.");
    } finally {
      setLoading(false); // Set loading back to false after the sign-up process completes
    }

  };

  // Function to handle form submission
  // Function to handle form submission and backend interaction
  useEffect(() => {
    const registerBusiness = async () => {
      try {
        setLoading(true);

        // Add form data to Firestore
        await firestore.collection("Business").add({
          businessName,
          company: businessName,
          selectedRole,
          regNumber,
          email,
          location,
          selectedBusinessType,
          selectedIndustry,
          password,
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

    if (sendToBackend) {
      registerBusiness();
    }
  }, [sendToBackend]);
  const emptyOption = [""];

  // Define options for role, business type, and industry dropdowns
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
            height: "auto",
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
            <form onSubmit={handleContinue} style={{ width: "100%" }}>
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
{/* email input */}
<TextField
                  id="outlined-number"
                  label="Email"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* password input */}
                <TextField
                  id="outlined-number"
                  label="Password"
                  type="password"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

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
                  style={{ width: "100%" }}
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  required
                />
                <br />

                {/* Location input */}
                <TextField
                  id="outlined-number"
                  label="Location"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
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
                    onChange={(e) => setSelectedBusinessType(e.target.value)}
                    style={{
                      width: "48%",

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

                {/* Bio input */}
                <TextField
                  id="outlined-number"
                  label="Bio"
                  type="text"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
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
