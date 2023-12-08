import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TextInput, Picker } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
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

  const navigateaddproduct = () => {
    navigation.navigate("AddProductsAndServices");
  };

  const UID = "SvicFdSJJ3T5FIcSkDI3XRwx0fl1";

  const handlechange = async (event) => {
    event.preventDefault();
    try {
      setLoading(true); // Set loading state to true while submitting

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
        userID: UID,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setShowSuccessAlert(true);

      {
        alert("success");
      }

      setTimeout(() => {
        setLoading(false); // Reset loading state
        navigation.navigate("AddProductsAndServices");
      }, 2000);
    } catch (error) {
      console.error("Error storing data in Firestore:", error);
      setLoading(false); // Reset loading state in case of an error
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

  return (
    <>
      <View>
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
            }}>
            <Grid
              item
              lg={8}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <Grid
                container
                lg={6}
                style={{
                  width: "100vw",
                }}></Grid>
              <Grid
                container
                lg={6}
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
              style={{
                backgroundColor: "#fff",
                marginLeft: "-10px",
                marginRight: "-15px",
                width: "100%",
                height: "98vh",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Grid style={{ alignSelf: "center", justifySelf: "center" }}>
                <img
                  src={logo}
                  style={{ height: "9vh", width: "90%", marginTop: "8vh" }}
                />
              </Grid>

              <form onSubmit={handlechange}>
                <View
                  className="form-container"
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignSelf: "center",
                    width: "100%",
                    marginBottom: "30px",
                  }}>
                  <h2
                    style={{
                      color: "#000",
                      textAlign: "left",
                      fontSize: "20px",
                      marginTop: "20px",
                    }}>
                    BUSINESS REGISTRATION
                  </h2>

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
                    }}>
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
                    type="number"
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

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}>
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
                      required>
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
                      required>
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
                    type="text"
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
                      width: "80%",
                      height: "10%",
                      marginTop: "5%",
                      background: "#072840",
                      borderRadius: "30px",
                    }}
                    type="submit">
                    {loading ? "Submitting..." : "Continue"}
                  </Button>
                </View>
              </form>
              {/* Display the success alert when showSuccessAlert is true */}
              {showSuccessAlert && (
                <Alert
                  sx={{ position: "relative", top: "10vh" }}
                  severity="success"
                  onClose={() => setShowSuccessAlert(false)}>
                  <AlertTitle>Success</AlertTitle>
                  This is a success alert — <strong>check it out!</strong>
                </Alert>
              )}
            </Grid>
          </Grid>
        </View>
      </View>
    </>
  );
};

export default BusinessRegistration;
