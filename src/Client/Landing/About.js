import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
// Import your images and components here
// import logo from '../../Global/images/logo.svg'
import Plane from "../../Global/images/plane.svg";
import Lion from "../../Global/images/bigger-lion.png";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import { yellow } from "@mui/material/colors";
// import FollowUs from '../../Global/Header';
// import Navbar from '../../Global/Navbar';
// import Footer from '../../Global/Footer';
// import FollowUs from '../../Components/FollowUs/FollowUs';
// import Navbar from '../../Components/NavBar/NavBar';
import { COLORS } from "../../Global/Color";

export default function AboutUs() {
  const amsArr = [];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FollowUs />
      <Navbar />
      <View style={styles.aboutContainer}>
        <View style={styles.aboutHeaderContainer}>
          <View>
            <Image
              source={require("../../Global/images/logo.svg")}
              style={{ width: 120, height: 60, resizeMode: "contain" }}
            />
          </View>
          <View style={styles.aboutTextSection}>
            <Text
              style={{
                color: COLORS.darkBlue,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              ATTLEGILE MARKETING SOLUTIONS
            </Text>

            <Text style={{ textAlign: "center", paddingTop: 10 }}>
              Welcome to Atlegile Marketing Solutions (Pty) Ltd, where passion,
              purpose, and expertise collide to create exceptional Marketing
              strategies. Our Youth Woman-owned and led Business, based in South
              Africa, was founded in 2015, and we’ve been on an exciting journey
              with our Partners ever since. From ground level to the Digital
              space, we’re committed to building strong Brands, effectively
              Communicating products + service offerings, and transferring our
              Skills to help you engage with the Online Market Successfully.
            </Text>
            <Text style={{ textAlign: "center", paddingTop: 10 }}>
              AMS is dedicated to helping African businesses succeed by
              developing strong brands, marketing their products and services
              effectively, and connecting them with a global customer base. They
              aim to drive sales, increase revenue, and create a lasting impact.
            </Text>
          </View>
          {/* Add styles for your cards, plane, etc. */}
          {/* ... */}
          <View
            style={{ display: "flex", flexDirection: "row", paddingTop: 30 }}
          >
            <View
              style={{
                height: 200,
                width: 330,
                border: "1px solid grey",
                margin: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  paddingTop: 10,
                }}
              >
                WHAT WE OFFER
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
                Ams creates strong influential brands, by applying tailored
                market approaches + using compelling content, to effectively
                communicate, build and manage good relationships with online
                communities. We support ESD + marketing departments and
                agencies.
              </Text>
            </View>
            <View
              style={{
                height: 200,
                width: 330,
                border: "1px solid grey",
                margin: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  paddingTop: 10,
                }}
              >
                ABOUT AMS
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
                Atlegile Marketing Solutions (Pty) Ltd is a 360 creative brand
                marketing company that assists African businesses to reach their
                intended audience from online to offline. We are located in
                Pimville, Soweto, and service our partners online.
              </Text>
            </View>
            <View
              style={{
                height: 200,
                width: 330,
                border: "1px solid grey",
                margin: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  paddingTop: 10,
                }}
              >
                OUR USP
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
                We use a unique strategic brand approach that is coupled with
                creativity, while transferring 8 years of professional quality
                service.
              </Text>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "medium",
                  fontSize: "1rem",
                  padding: 10,
                  textAlign: "start",
                }}
              >
                #AGILE IS WHAT ATLEGILE IS ABOUT
              </Text>
            </View>
          </View>

          <View
            style={{
              Height: 590,
              Width: 1020,
              display: "flex",
              margin: 0,
              flexDirection: "column",
              // backgroundColor:"red"
              paddingTop:40
            }}
          >
            <Image
              source={require("../../Global/images/plane.svg")}
              style={{ minHeight: 520, minWidth: 1020, resizeMode: "contain" }}
            />
            <Text>Business Research and Youth Development Project</Text>
          </View>

          <View style={styles.amsContainer}>
            <Text
              style={{
                color: COLORS.darkBlue,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
                paddingTop: 10,
              }}
            >
              AMS IS GUIDED BY SEVERAL CORE VALURES
            </Text>
            <View
              style={{ display: "flex", flexDirection: "colunm", width: 1020 , paddingTop:10}}
            >
              <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <Text
                  style={{
                    color: "white",
                    alignItems: "cernter",
                    paddingTop: 5,
                    paddingHorizontal: 20,
                    paddingBottom:5,
                    margin: 5,
                    backgroundColor: COLORS.darkBlue,
                    fontSize: "1.2rem",
                  }}
                >
                  PASSION
                </Text>
                <Text
                  style={{
                    color: "white",
                    alignItems: "cernter",
                    paddingTop: 5,
                    paddingHorizontal: 20,
                    margin: 5,
                    paddingBottom:5,
                    backgroundColor: COLORS.darkBlue,
                    fontSize: "1.2rem",
                  }}
                >
                  INNOVTION
                </Text>
                <Text
                  style={{
                    color: "white",
                    alignItems: "cernter",
                    paddingTop: 5,
                    paddingHorizontal: 20,
                    margin: 5,
                    paddingBottom:5,
                    backgroundColor: COLORS.darkBlue,
                    fontSize: "1.2rem",
                  }}
                >
                  GLOBAL CONNECTION
                </Text>
                <Text
                  style={{
                    color: "white",
                    alignItems: "cernter",
                    paddingTop: 5,
                    paddingBottom:5,
                    paddingHorizontal: 20,
                    margin: 5,
                    backgroundColor: COLORS.darkBlue,
                    fontSize: "1.2rem",
                  }}
                >
                  SOCIAL IMPACT
                </Text>
              </View>

              <View style={{display:"flex", flexDirection:"row", justifyContent:"center",}} >
                <Text
                  style={{
                    color: "white",
                    alignItems: "cernter",
                    paddingTop: 5,
                    paddingBottom:5,
                    paddingHorizontal: 20,
                    margin: 5,
                    backgroundColor: COLORS.darkBlue,
                    fontSize: "1.2rem",
                  }}
                >
                  SKILLS DEVELOPMENT
                </Text>
                <Text
                  style={{
                    color: "white",
                    alignItems: "cernter",
                    paddingTop: 5,
                    paddingHorizontal: 20,
                    margin: 5,
                    paddingBottom:5,
                    backgroundColor: COLORS.darkBlue,
                    fontSize: "1.2rem",
                  }}
                >
                  CREATIVITY
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.amsText}>
            <Text
              style={{
                color: COLORS.darkBlue,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2rem",
                paddingTop: 20,
                paddingBottom: 30,
              }}
            >
              AMS AIMS TO NOT ONLY HELP BUSINESSES GROW BUT TO ALSO MAKE A
              POSITIVE IMPACT ON SOCIETY BY NUTURING LOCAL TALENT AND FOSTRING
              SUSTAINABLE BUSINESSES GROWTH.
            </Text>
          </View>

          <View
            style={{
              Height: 800,
              Width: 2000,
              display: "flex",
              margin: 0,
              flexDirection: "column",
            }}
          >
            <Image
              source={require("../../Global/images/big-lion.svg")}
              style={{ minHeight: 800, minWidth: 2000, resizeMode: "contain" }}
            />
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add any other styles for the main container
  },
  logo: {
    minWidth: 250,
    maxWidth: 400,

    // Add any other styles for the logo
  },
  aboutLogo: {
    marginTop: 100,
    // Add any other styles for the logo container
  },
  aboutContainer: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'yellow',
    display: "flex",
    //backgroundColor:"green"
    // Add any other styles for the container
  },
  aboutHeaderContainer: {
    width: "65%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'yellow',
    display: "flex",
    // Add any other styles for the header container
  },
  aboutTextSection: {
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    //  backgroundColor:"red",
    // Add any other styles for the text section
  },
  aboutPlane: {
    marginTop: 50,
    // Add any other styles for the plane container
  },
  plane: {
    // Add any styles for the plane image
  },
  amsContainer: {
    marginTop: 20,
    // Add any other styles for the AMS container
  },
  amsHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 30,
    fontSize: 30,
    // Add any other styles for the AMS header
  },
  amsLists: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // Add any other styles for the AMS lists
  },
  amsText: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    // Add any other styles for the AMS text
  },
  lionImagesContainer: {
    position: "relative",
    // Add any other styles for the lion images container
  },
  bigLion: {
    // Add any styles for the big lion container
  },
  lion: {
    width: "100%",
    // Add any other styles for the lion image
  },
});
