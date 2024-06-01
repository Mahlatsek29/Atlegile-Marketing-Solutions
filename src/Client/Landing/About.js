import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Video } from "expo-av";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import { COLORS } from "../../Global/Color";
import { require } from "expo-asset";
import { yellow } from "@mui/material/colors";

export default function AboutUs() {
  // State to manage screen dimensions
  const [width, setWidth] = useState(Dimensions.get("window").width);
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setWidth(window.width);
    };

    Dimensions.addEventListener("change", handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener("change", handleDimensionsChange);
    };
  }, []);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // Define a breakpoint for smaller screens (e.g., mobile devices)
  const isSmallScreen = windowWidth < 600; // Adjust the value as needed

  // Ref for the video component
  const video = useRef(null);
  // State to manage video playback status
  const [status, setStatus] = useState({});

  useEffect(() => {
    // Function to handle changes in screen dimensions
    const handleDimensionChange = () => {
      setDimensions(Dimensions.get("window"));
    };

    // Subscribe to dimension changes
    Dimensions.addEventListener("change", handleDimensionChange);

    // Clean up the subscription when the component unmounts
    return () => {
      Dimensions.removeEventListener("change", handleDimensionChange);
    };
  }, []); // Empty dependency array to run the effect only once during component mount

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Included FollowUs component */}
      <FollowUs />
      {/* Included Navbar component */}
      <Navbar />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: width * 0.66 }}>
          {/* Logo section */}
          {/* <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../Global/images/logo3.png")}
              style={{ width: 120, height: 60, resizeMode: "contain" }}
            />
          </View> */}
          {/* About text section */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: COLORS.darkBlue,
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              About SoWhereTo &gt; Access<br />

          Unveil the Unseen: Access African Quality
            </Text>
            <Text style={{ textAlign: "center", paddingTop: 10 }}>
            Leading digital innovation as a platform for economic change in Africa. Supporting local brands to showcase exclusive high-quality creations for global appreciation of cultural richness. Curated in the spirit of crafting a new African narrative for generational wealth and success.

            </Text>
            {/* <Text style={{ textAlign: "center", paddingTop: 10 }}>
              AMS is dedicated to helping African businesses succeed by
              developing strong brands, marketing their products and services
              effectively, and connecting them with a global customer base. They
              aim to drive sales, increase revenue, and create a lasting impact.
            </Text> */}
          </View>

          {/* Three sections with information */}
          <View
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 5fr))",
              gap: "10px",
            }}
          >
            {/* Section 1: What We Offer */}
            <View
              style={{
                width: "55",
                borderWidth: 1,
                borderColor: "grey",
                margin: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingTop: 10,
                }}
              >
               Explore
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
              A world where visionary local brands showcase exclusive creations. Step into the realm of unparalleled finds that will thrust you to the forefront of innovation. Be part of reimagining a new African story!
              </Text>
            </View>
            {/* Section 2: About AMS */}
            <View
              style={{
                width: "55",
                borderWidth: 1,
                borderColor: "grey",
                margin: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingTop: 10,
                }}
              >
             Mission
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
              Our mission is to provide a marketplace that celebrates and advances African entrepreneurship, creativity and skills, ensuring our offerings are distinctive and forward-thinking, at international standards.
              </Text>
            </View>
            {/* Section 3: Our USP */}
            <View
              style={{
                width: "55",
                borderWidth: 1,
                borderColor: "grey",
                margin: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingTop: 10,
                }}
              >
             Vision
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
              We are dedicated to sourcing and offering products and solutions that reflect our values of quality, uniqueness and cultural richness.






              </Text>
              {/* <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "medium",
                  fontSize: 14,
                  padding: 10,
                }}
              >
                #AGILE IS WHAT ATLEGILE IS ABOUT
              </Text> */}
            </View>
          </View>

          {/* Video section */}
          <View
            style={{
              width: "100%",
              maxWidth: 800, // Adjust the max width as needed for your layout
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
          <iframe style={{ display: 'block', margin: '1em auto', width: '65vw', height: `${0.5625 * 65}vw`, alignSelf:'center' }} src="https://www.youtube.com/embed/cHC3nejpaNA?si=acyLRoAtfT-FYegx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <Text style={{ marginTop: 10, marginLeft: "11%"  }}>
              Business Research and Youth Development Project
            </Text>
          </View>

          {/* AMS core values section */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: COLORS.darkBlue,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                paddingTop: 10,
              }}
            >
              AMS IS GUIDED BY SEVERAL CORE VALUES
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* List of core values */}
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  margin: 5,
                  backgroundColor: COLORS.darkBlue,
                  fontSize: 16,
                }}
              >
                PASSION
              </Text>
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  margin: 5,
                  backgroundColor: COLORS.darkBlue,
                  fontSize: 16,
                }}
              >
                INNOVATION
              </Text>
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  margin: 5,
                  backgroundColor: COLORS.darkBlue,
                  fontSize: 16,
                }}
              >
                GLOBAL CONNECTION
              </Text>
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  margin: 5,
                  backgroundColor: COLORS.darkBlue,
                  fontSize: 16,
                }}
              >
                SOCIAL IMPACT
              </Text>
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  margin: 5,
                  backgroundColor: COLORS.darkBlue,
                  fontSize: 16,
                }}
              >
                SKILLS DEVELOPMENT
              </Text>
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  margin: 5,
                  backgroundColor: COLORS.darkBlue,
                  fontSize: 16,
                }}
              >
                CREATIVITY
              </Text>
            </View>
          </View>

          {/* Additional text about AMS */}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text
              style={{
                color: COLORS.darkBlue,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                paddingTop: 20,
                paddingBottom: 30,
              }}
            >
              AMS AIMS TO NOT ONLY HELP BUSINESSES GROW BUT TO ALSO MAKE A
              POSITIVE IMPACT ON SOCIETY BY NURTURING LOCAL TALENT AND FOSTERING
              SUSTAINABLE BUSINESS GROWTH.
            </Text>
          </View>
        </View>

        <Image
          source={require("../../Global/images/big-lion.svg")}
          style={{ width: "100%", height: `${0.5625 * 100}vw` ,display:'flex', alignItems:'flex-end'}}
        />

      </View>
      {/* Big lion image section */}
      

      {/* Included Footer component */}
      <Footer />
    </View>
  );
}
