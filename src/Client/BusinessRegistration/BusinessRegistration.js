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
import {
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { auth, firestore, firebase } from "../../config";
import logo from "../../Global/images/logo5.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import TermsModal from "../../Global/TermsModal";
import PolicyModal from "../../Global/PolicyModal";

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
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);

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

  const handleBioChange = (e) => {
    if (e.target.value.length <= 300) {
      setBio(e.target.value);
    } else {
      setBio(e.target.value.slice(0, 300));
    }
  };

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
        <View
          style={{
            flex: 1,
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            style={{
              height: "9vh",
              width: "90%",
            }}
          />
        </View>
        <View
          style={{
            marginBottom: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleContinue}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                display: "flex",
                width: "80%",
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
                variant="standard"
                defaultValue="Small"
                size="small"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <TextField
                id="outlined-number"
                label="Email"
                variant="standard"
                size="small"
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="I agree with"
                    onClick={() => setChecked(true)}
                  />
                  {/* Replace the link with the button */}
                  <Button
                    variant="text"
                    onClick={() => setTermsModalOpen(true)}
                  >
                    {" "}
                    Terms & Conditions
                  </Button>
                </View>
                <View style={{ marginLeft: "10px" }}>
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="I agree with"
                    onClick={() => setChecked1(true)}
                  />
                  {/* Open policy modal on button click */}
                  <Button
                    variant="text"
                    onClick={() => setPolicyModalOpen(true)}
                  >
                   Policies
                  </Button>
                </View>
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

      {showSuccessAlert && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 10000,
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Your business has been Successfully Registered!
        </Alert>
      )}

      {/* Terms Modal */}
      <Dialog
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        sx={{
          "& .MuiDialogTitle-root": {
            backgroundColor: "#072840",
            color: "#fff",
          },
          "& .MuiDialogContent-root": {
            padding: "10",
            backgroundColor: "#fff",
            color: "#333",
          },
        }}
      >
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent sx={{ fontSize: "28px", fontWeight: "bold" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "2%",
              lineHeight: "3",
            }}
          >
          
          Businesses: Signing Up
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          >
          1. Introduction
         </Typography>
         <Typography variant="body2">
          These Terms and Conditions ("Agreement") govern the relationship
          between Atlegile Marketing Solutions (Pty) Ltd ("we," "us," "our") and
          the business entity or individual ("Seller," "you," "your") using our
          platform, SoWhereTo>Access, to sell products.
          </Typography>
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 2. Acceptance of Terms
          </Typography>
          <Typography variant="body2">
          By clicking "Agree" or using our platform, you agree to comply with
          and be bound by these Terms and Conditions. If you do not agree to
          these terms, do not use our platform.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          >3. Services Provided
          </Typography>
          <Typography variant="body2">
          We facilitate the sale of your products through our platform,
          including hosting your product listings, processing transactions, and
          providing customer service.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          4. Commission and Payment</Typography>
          <Typography variant="body2">
          We will retain a commission of 30% of the total transaction amount for
          each sale made through our platform. Payments will be processed and
          remitted to you on a [weekly/bi-weekly/monthly] basis, net of our
          commission and any applicable fees.
         </Typography>
         <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          5. Listing Products</Typography>
          <Typography variant="body2">
          You are responsible for providing accurate and complete descriptions
          of your products. We reserve the right to remove any listings that
          violate our policies or terms.
         </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 6. Order Fulfillment</Typography>
          <Typography variant="body2">
          You agree to fulfill orders promptly and ensure that products are
          delivered in good condition. Any disputes or returns will be handled
          in accordance with our return policy.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          7. Compliance with Laws</Typography>
          <Typography variant="body2">
          You agree to comply with all applicable laws and regulations related
          to your products and use of our platform.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          >  8. Intellectual Property</Typography>
          <Typography variant="body2">
          You grant us a non-exclusive, worldwide, royalty-free license to use
          your trademarks, logos, and product images for the purpose of
          promoting and selling your products.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          9. Limitation of Liability</Typography>
          <Typography variant="body2">
          We will not be liable for any indirect, incidental, or consequential
          damages arising out of or in connection with the use of our platform.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          10. Termination</Typography>
          <Typography variant="body2">
          Either party may terminate this Agreement at any time with written
          notice. Upon termination, any outstanding payments due to you will be
          processed in accordance with our standard payment schedule.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          11. Amendments
        </Typography>
          <Typography variant="body2">
          We reserve the right to amend these Terms and Conditions at any time.
          We will notify you of any significant changes. Your continued use of
          the platform after any such changes constitutes your acceptance of the
          new terms.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          12. Governing Law</Typography>
          <Typography variant="body2">
          This Agreement shall be governed by and construed in accordance with
          the laws of South Africa.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          13. Immediate Effect</Typography>
          <Typography variant="body2">
          These Terms and Conditions are effective immediately upon your
          acceptance and will remain in effect until terminated by either party
          as outlined in Section 10.
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          > 
          14. Alignment with Strategic Core Values</Typography>
          <Typography variant="body2">
          You agree that your brand and products will align with our strategic
          core values, which include:
          <br />
          <br />
          <ul>
          <Typography
            sx={{ fontsize: "10px", fontWeight: "bold" }}
          > Exclusivity</Typography>
          <Typography variant="body2">
         <li> Offering unique and innovative products.</li></Typography>
        
          </ul>
          <ul>
          <Typography
            sx={{ fontsize: "10px",fontWeight: "bold" }}
          > 
        Innovation</Typography>
         
         
          <Typography variant="body2">
            <li>
          Providing cutting-edge and creative products.</li></Typography>
         
          </ul>
          <ul>
          <Typography
            sx={{ fontsize: "10px", lineHeight: "2", fontWeight: "bold" }}
          > 
          
          Quality</Typography>

         
          <Typography variant="body2">
          <li>Ensuring high-caliber, durable, and aesthetically pleasing items.</li></Typography>
          </ul>
         <ul>
          <Typography
            sx={{ fontsize: "10px",fontWeight: "bold" }}
          > 
         <li> Cultural Richness</li></Typography>
          </ul>
          <ul>
          <Typography variant="body2">
          <li>Highlighting products with African cultural heritage and significance.</li></Typography>
          </ul>
          <ul>
          <Typography
            sx={{ fontsize: "10px",fontWeight: "bold" }}
          > 
          <li>Discovery</li></Typography>
          </ul>
          <ul>
          <Typography variant="body2">
          <li>Encouraging the thrill of finding new and unexpected items.</li></Typography>
          </ul>
          <ul>
          <Typography
            sx={{ fontsize: "10px",fontWeight: "bold" }}
          > 
          Exceptional Service Delivery</Typography>
          
          <Typography variant="body2">
         <li> Demonstrating capability through efficient service, experience, and
          operational capacity.</li> 
         <li> We reserve the right to remove any listings that do not meet these
          values.</li></Typography>
          </ul>
          </Typography>
          <br />
          <Typography
            sx={{ fontsize: "10px",fontWeight: "bold" }}
          > 
          15. Contact Information</Typography>
          <Typography variant="body2">
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at: +27 60 846 6708 or
          admin@sowheretoaccess.com.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}

      <Dialog
        open={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        sx={{
          "& .MuiDialogTitle-root": {
            backgroundColor: "#072840",
            color: "#fff",
          },
          "& .MuiDialogContent-root": {
            padding: "10",
            backgroundColor: "#fff",
            color: "#333",
          },
        }}
      >
        <DialogTitle>Shipping & Return Policies</DialogTitle>
        <DialogContent sx={{ fontSize: "28px", fontWeight: "bold" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "2%",
              lineHeight: "3",
            }}
          >
            Delivery: Shipping Policy
          </Typography>
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          >
            Shipping Methods and Estimated Delivery Times
            <br />
            <Typography variant="body2">
              We offer a variety of shipping options to meet your needs, both
              locally and internationally, through our trusted partner, The
              Courier Guy. <br />
              <br />
              Here are the available services and their estimated delivery
              times:
            </Typography>
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              1. Economy Delivery:
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>To a central area: 3-4 working days</li>
                <li>To a regional area: 3-5 working days</li>
              </ul>
            </Typography>
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              <br />
              2. International Shipment:
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>Estimated delivery time: 5-7 days (excluding the day of
                  collection, pending customs and flight delays)</li>
                  </ul>
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              3. Local Overnight Services:
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>Flyer/Parcel: 8-16 hours</li>
                <li>Same-day express: 1-7 hours</li>
              </ul>
              
              
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              4. Overnight Delivery:
            </Typography>
            <Typography variant="body2">
             <ul>
<li>To a central area: 1-2 days</li>
<li>To a regional area: 2-3 days</li>
             </ul>
              
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              5. Pudo:
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>Estimated delivery time: 3-4 days</li>
                </ul>
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              6. International Road:
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>Estimated delivery time: 5-7 days</li>
                </ul>
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              {" "}
              Shipping Costs
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>Shipping costs are calculated at checkout based on the selected
              shipping method and destination. </li>
              <li>Free shipping may be
              available on orders above a certain amount, as specified during
              promotions or at checkout.</li>
              </ul>
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              Handling Time
            </Typography>
            <Typography variant="body2">
              <ul>
              <li>Orders are typically processed within 1-2 business days.</li>
              <li>Orders placed on weekends or holidays will be processed on
              the next business day.</li>
              </ul>
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              International Shipping Details
            </Typography>
            Customs Charges
            <Typography variant="body2">
              Customs charges are billed by the receiving customs and are
              payable by the receiver. They are not included in our quotations.
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
            Tracking International Parcels
            </Typography>
            <Typography variant="body2">
              You can send your tracking request to delivery@sowheretoaccess.com
              to get the current status of your shipment.
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              {" "}
            Customs Clearance
            </Typography>
            <Typography variant="body2">
              Please note that each international shipment must go through a
              formal clearance process in the receiving country by customs
              before it can be released for delivery.
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              {" "}
              VAT and Duties for Document
            </Typography>
            <Typography variant="body2">
              Shipments consisting only of documents do not incur customs
              charges.
            </Typography>
            <br />
            <Typography
              sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
            >
              Prohibited Items
              <Typography variant="body2">
                {" "}
                Each country has different rules and regulations.
              </Typography>
            </Typography>
            <Typography variant="body2">
              Email delivery@sowheretoaccess.com to confirm if the goods you are
              sending are permitted in the receiving country.
              <br />
              <br /> Prohibited items include perfumes (all flammable items),
              meat products, batteries, tobacco, vape products, cannabis or
              cannabis products, currency (cash, bank cards, numismatic coins),
              and weapons.
            </Typography>
            <br />
            <Typography variant="body2">
              If you have any questions or need further assistance, please
              contact our customer service team at delivery@sowheretoaccess.com
              or +27 60 8466 708.
            </Typography>
            <br />
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "2%",
              lineHeight: "3",
            }}
          >
         
            Customers: Returns Policy
          </Typography>
          <Typography
            sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
          >
            Introduction
          </Typography>
         
          <Typography variant="body2">
      We strive to ensure that you are completely satisfied with your purchase from SoWhereTo>Access. If you are not satisfied with your order, you may return it to us in accordance with the terms outlined below.
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      Return Conditions
    </Typography>
    <ul>
    <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
  
    Time Frame:
 
</Typography>
<Typography variant="body2">
 
    <li>Items must be returned within 30 days of receipt.</li>
 
</Typography>
</ul>
<Typography variant="body2">
  <ul>
    <Typography sx={{ fontSize: "13px", lineHeight: "2", fontWeight: "bold" }}>
      Condition:
    </Typography>
    <li>Products must be in their original condition, unused, and with all original packaging and tags attached.</li>
  </ul>
</Typography>
<Typography variant="body2">
  <ul>
    <Typography sx={{ fontSize: "13px", lineHeight: "2", fontWeight: "bold" }}>
      Proof of Purchase:
    </Typography>
    <li>A valid proof of purchase (e.g., order confirmation, receipt) must be provided.</li>
  </ul>
</Typography>
<Typography variant="body2">
  <ul>
  <Typography sx={{ fontSize: "13px", lineHeight: "2", fontWeight: "bold" }}> Packaging:</Typography>
    <li>Items should be returned in the original packaging or packaging that provides an equivalent level of protection.</li>
  </ul>
</Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      Return Process
    </Typography>
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      1. Initiate a Return
    </Typography>
    <Typography variant="body2">
      Contact our customer service team at returns@sowheretoaccess.com or
      WhatsApp *request to return* +27 60 8466 708 to initiate a return. Please
      provide your order number and reason for the return.
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      2. Prepare Your Return
    </Typography>
    <Typography variant="body2">
      Securely pack the items in their original packaging, including all
      paperwork, parts, and accessories.
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      3. Shipping the Return
    </Typography>
    <Typography variant="body2">
      We will make direct contact to confirm arrangements for collection.
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      4. Inspection
    </Typography>
    <Typography variant="body2">
      Once we receive your return, we will inspect the items to ensure they meet the return conditions.
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      Refunds
    </Typography>
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      Processing Time:
    </Typography>
    <Typography variant="body2">
      Refunds will be processed within 15 days after we receive and inspect the returned items. Refund Method: Refunds will be made to your in-app wallet. Please note that it may take
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      Non-returnable Items
    </Typography>
    <Typography variant="body2">
      <ul>
        <li>Perishable goods</li>
        <li>Intimate or sanitary goods</li>
        <li>Hazardous materials or flammable liquids or gases</li>
        <li>Gift cards</li>
        <li>Downloadable / software products</li>
        <li>Some health and personal care items</li>
      </ul>
    </Typography>
    <br />
    <Typography
      sx={{ fontsize: "13px", lineHeight: "2", fontWeight: "bold" }}
    >
      Contacts
    </Typography>
    <Typography variant="body2">
      If you have any questions or need further assistance, please contact our customer service team at:
      <br />
      Email: returns@sowheretoaccess.com
      <br />
      WhatsApp: +27 60 8466 708
    </Typography>
  </DialogContent>
</Dialog>

    </View>
  );
};

export default BusinessRegistration;
