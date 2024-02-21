import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Dimensions} from "react-native";
import { Video } from "expo-av";
import FollowUs from "../../Global/Header";
import Navbar from "../../Global/Navbar";
import { Footer } from "../../Global/Footer";
import { COLORS } from "../../Global/Color";

export default function AboutUs() {
  // State to manage screen dimensions
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { width, height } = dimensions;

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
    <View style={{ flex: 1,backgroundColor:'white' }}>
      {/* Included FollowUs component */}
      <FollowUs />
      {/* Included Navbar component */}
      <Navbar />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <View
          style={{
            width: width * 0.66,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* Logo section */}
          <View>
            <Image
              source={require("../../Global/images/logo.svg")}
              style={{ width: 120, height: 60, resizeMode: "contain" }}
            />
          </View>
          {/* About text section */}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: COLORS.darkBlue,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
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

          {/* Three sections with information */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 30,
              paddingBottom: 30,
            }}
          >
            {/* Section 1: What We Offer */}
            <View
              style={{
                height: "auto",
                width: "33%",
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
            {/* Section 2: About AMS */}
            <View
              style={{
                height: "auto",
                width: "33%",
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
                ABOUT AMS
              </Text>
              <Text style={{ padding: 10, textAlign: "start" }}>
                Atlegile Marketing Solutions (Pty) Ltd is a 360 creative brand
                marketing company that assists African businesses to reach their
                intended audience from online to offline. We are located in
                Pimville, Soweto, and service our partners online.
              </Text>
            </View>
            {/* Section 3: Our USP */}
            <View
              style={{
                height: "auto",
                width: "33.5%",
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
                  fontSize: 14,
                  padding: 10,
                  textAlign: "start",
                }}
              >
                #AGILE IS WHAT ATLEGILE IS ABOUT
              </Text>
            </View>
          </View>

          {/* Video section */}
          <View
            style={{
              height: "50vh",
              width: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Video
              ref={video}
              style={{
                height: "50vh",
                width: "100%",
                alignSelf: "center",
              }}
              source={{
                uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={setStatus}
            />
            <Text style={{ alignSelf: "flex-start" }}>
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
      </View>

      {/* Big lion image section */}
      <View style={{ width: "100%", height: "100vh" }}>
        <Image
          source={require("../../Global/images/big-lion.svg")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Included Footer component */}
      <Footer />
    </View>
  );
}
