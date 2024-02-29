// Import necessary modules from React and Material-UI
import React, { useState, useEffect } from "react";
import { Box, Typography, Rating } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebase, auth } from "../../config";

// Import Firebase configuration
import firebaseConfig from "../../config";

// Define a functional component ReviewsCard that takes a 'review' prop
const ReviewsCard = ({ review }) => {
  // State to store user data retrieved from Firebase
  const [userData, setUserData] = useState(null);

  // useEffect hook to fetch user data when the component mounts or when 'review.userID' changes
  useEffect(() => {
    // Asynchronously fetch user data
    const fetchUserData = async () => {
      // Initialize Firebase app with the provided configuration
      const app = firebase.initializeApp(firebaseConfig);

      // Access Firestore from the initialized app
      const firestore = getFirestore(app);

      try {
        // Reference to the user document in Firestore
        const userDocRef = doc(firestore, "Users", review.userID);

        // Get a snapshot of the user document
        const userDocSnapshot = await getDoc(userDocRef);

        // Check if the user document exists
        if (userDocSnapshot.exists()) {
          // Extract user data from the snapshot and update the state
          const userData = userDocSnapshot.data();
          setUserData(userData);
        } else {
          // Log a message if the user document is not found
          console.log("User not found");
        }
      } catch (error) {
        // Log an error message if there's an issue fetching user data
        console.error("Error fetching user data:", error);
      }
    };

    // Invoke the fetchUserData function
    fetchUserData();
  }, [review.userID]);

  // JSX to render the ReviewsCard component
  return (
    <Box sx={{ pl: 3, mb: 6 }}>
      {/* Display a Rating component based on the 'review.myRatings' value */}
      <Rating
        name="half-rating-read"
        defaultValue={review.myRatings}
        precision={0.5}
        readOnly
      />

      {/* Display the review text */}
      <Box>
        <Typography>{review.review}</Typography>
      </Box>

      {/* Conditionally render user data if available */}
      {userData && (
        <>
          <Box>
            {/* Display user's full name */}
            <Typography sx={{ fontWeight: 600, fontSize: 22 }}>
              {userData.firstName} {userData.lastName}
            </Typography>
          </Box>
          <Box>
            {/* Display user's role with a specified color */}
            <Typography sx={{ color: "#5abcf4", fontSize: 15 }}>
              {userData.role}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

// Export the ReviewsCard component as the default export
export default ReviewsCard;
