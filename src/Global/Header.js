import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faYoutube,
//   faTwitter,
//   faInstagram,
//   faFacebook,
// } from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/EvilIcons";
import { useNavigation } from '@react-navigation/native';



const FollowUs = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const cartCollectionRef = firestore
          .collection("Cart")
          .where("uid", "==", user.uid);

        const unsubscribeCartSnapshot = cartCollectionRef.onSnapshot(
          (snapshot) => {
            const itemCount = snapshot.docs.length;
            setCartCount(itemCount);
          }
        );

        const userDocRef = firestore.collection("Users").doc(user.uid);
        const unsubscribeSnapshot = userDocRef.onSnapshot((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.error("User data not found");
          }
        });

        return () => {
          unsubscribeCartSnapshot();
          unsubscribeSnapshot();
        };
      } else {
        setUserData(null);
        setCartCount(0); // Reset cart count when user is not authenticated
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const openYouTube = () => {
    navigate.navigation("https://www.youtube.com/");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#252b42",
        // width: "100%",
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        paddingInline: 20,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Icon2 name="phone" size={16} color="white" />

        <Typography variant="subtitle2">(225) 555-0118</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Icon3 name="envelope" size={20} color="white" />
        <Typography variant="subtitle2">michelle.rivera@example.com</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Follow us and get a chance to win 80% off
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Follow Us : </Typography>
        <Icon
          name="instagram"
          size={16}
          color="white"
          style={{ paddingHorizontal: 10 }}
        />
        <Icon onPress={openYouTube}
          name="youtube"
          size={16}
          color="white"
          style={{ paddingHorizontal: 10 }}
        />

        <Icon
          name="facebook"
          size={16}
          color="white"
          style={{ paddingHorizontal: 10 }}
        />

        <Icon
          name="twitter"
          size={16}
          color="white"
          style={{ paddingHorizontal: 10 }}
        />
      </Box>
    </Box>
  );
};

export default FollowUs;