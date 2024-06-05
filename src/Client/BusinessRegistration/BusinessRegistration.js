import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Paper, Typography } from "@mui/material";
import { auth, firestore, firebase } from "../../config";
import logo from "../../Global/images/logo5.png";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const BusinessRegistration = () => {
  const navigation = useNavigation();
  const [businessName, setBusinessName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [currentUserUID, setCurrentUserUID] = useState(null);
  const [cardHolder, setCardHolder] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const window = Dimensions.get("window");
  const user = firebase.auth().currentUser;
  const [sendToBackend, setSendToBackend] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserUID(user.uid);
      } else {
        setCurrentUserUID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
 * Updates the bio state based on the input value.
 *
 * @param {Event} e - The event object containing the input value.
 * @return {void} This function does not return a value.
 */
  const handleBioChange = (e) => {
    if (e.target.value.length <= 300) {
      setBio(e.target.value);
    } else {
      setBio(e.target.value.slice(0, 300));
    }
  };
  /**
 * Updates the state of the checkbox based on the event triggered by the user.
 *
 * @param {Object} event - The event object containing information about the checkbox change.
 * @return {void} This function does not return a value.
 */ 
  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userCredential.user && checked === true && checked1 === true) {
        await firestore.collection("Users").doc(userCredential.user.uid).set({
          business: true,
          company: businessName,
          businessName: businessName,
          subscribed: false,
          uid: user.uid,
        });

        setSendToBackend(true);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
           alert("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

/**
 * Registers a business by adding its information to the Firestore "Business" collection.
 *
 * @return {Promise<void>} A promise that resolves when the business is successfully registered.
 * @throws {Error} If there is an error storing the data in Firestore.
 */
  useEffect(() => {
    const registerBusiness = async () => {
      try {
        setLoading(true);

        await firestore.collection("Business").add({
          businessName,
          company: businessName,
          selectedRole,
          approved: false,
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

  const roleOptions = [
    ...emptyOption,
    "Director",
    "Owner",
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

  const containerWidth = window.width > 400 ? 400 : window.width * 0.9;
  const containerHeight = window.height > 600 ? 600 : window.height * 0.9;

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
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
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          position: "fixed",
          minWidth: 280,
          height: "98%",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignSelf: "center",
          width: "90%",
          "@media (min-width: 600px)": {
            alignSelf: "flex-end",
            width: 400,
            margin: 1,
          },
        }}
      >
        <View style={{ flex: 1, display: "flex", alignSelf: "center", justifyContent: 'center' }}>
          <img src={logo}
            style={{
              height: "9vh", width: "90%"
            }} />
        </View>
        <View
          style={{
            marginBottom: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleContinue} style={{ display: 'flex', justifyContent: 'center' }}>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                display: "flex",
                width: "80%"
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
                // type="text"
                variant="standard"
                defaultValue="Small"
                size="small"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Email"
                // type="text"
                variant="standard"
                // defaultValue="Small"
                size="small"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Password"
                type="password"
                variant="standard"
                defaultValue="Small"
                size="small"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <TextField
                id="outlined"
                select
                label="Role"
                variant="standard"
                defaultValue="Small"
                size="small"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                  textAlign: "left",
                }}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-number"
                label="Location"
                type="text"
                variant="standard"
                size="small"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type of Business"
                  variant="standard"
                  size="small"
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
                  size="small"
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

              <TextField
                id="outlined-number"
                label="Bio(300 characters)"
                type="text"
                variant="standard"
                size="small"
                style={{ width: "100%" }}
                value={bio}
                onChange={handleBioChange}
                required
              />
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <FormControlLabel required control={<Checkbox />} label="I agree with" onClick={() => setChecked(true)}
                  />
                  <Typography component="a" style={{ textDecoration: 'none' }} href="https://atlegilemarketing.co.za/about-ams/terms-of-service/">
                    Terms and Conditions
                  </Typography>
                </View>
                <View style={{ marginLeft: "10px" }}>

                  <FormControlLabel required control={<Checkbox />} label="I agree with this" onClick={() => setChecked1(true)} />
                  <Typography component="a" style={{ textDecoration: 'none' }} href="https://atlegilemarketing.co.za/privacy-policy/">
                    Private Policy
                  </Typography>
                </View>

                {/* <FormControlLabel required control={<Checkbox />} label="Required" /> */}

              </View>

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
        </View>
      </Paper>

      {/* Display the success alert when showSuccessAlert is true */}
      {showSuccessAlert && (
        <Alert severity="success" sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 10000,
        }}>
          <AlertTitle>Success</AlertTitle>
          Your business has been Successfully Registered!
        </Alert>
      )}
    </View>
  );
};

export default BusinessRegistration;
