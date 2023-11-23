import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHeart as faHeartRed,
//   faHeart,
// } from "@fortawesome/free-solid-svg-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
// import downloadIcon from "../../icons/download.svg";
// import RightIcon from "../../icons/icon-right.svg";

import { TouchableOpacity } from "react-native";
// import faCart from "../../icons/shopping-cart.png";

const ProductCard = ({ item }) => {
  const [isRed, setIsRed] = React.useState(true);

  const toggleHeart = () => {
    console.log("toggleHeart Clicked");
    setIsRed((prevState) => !prevState);
  };

  return (
    <Card
      className="card-container"
      sx={{
        margin: "10px",
        height: "35rem",
        width: "20rem",
        border: "none",
        boxShadow: "none",
        // backgroundColor: "red",
      }}
    >
      <Box>
        <Box
          style={{
            borderRadius: "16px",
            objectFit: "cover",
            position: "relative",
            backgroundColor: "gold",
            // height: "5rem",
            width: "270px",
            height: "270px",
            // width: "5rem",
            borderRadius: "50%",
            // borderRadius: "14rem",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            //   image={item?.imageUrls[0]}
            image={require("../../assets/image/headsets.png")}
            alt="shop 2"
            style={{
              borderRadius: "100px",
              objectFit: "cover",
              width: 220,
              height: 220,
            }}
          />
          <Box
            style={{
              paddingHorizontal: 10,
              position: "absolute",
              bottom: 30,
              width: "6vw",
              display: "flex",
              flexDirection: "row",
              //   backgroundColor: "red",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity>
              <Icon
                name={isRed ? "heart" : "heart-o"}
                size={20}
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                onClick={toggleHeart}
                color={isRed ? "red" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="shopping-cart"
                size={20}
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                color="black"
              />
            </TouchableOpacity>
          </Box>
        </Box>
        <CardContent sx={{ paddingInline: 2, paddingRight: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              style={{ fontSize: "16px", color: "#0074cc" }}
            >
              {item?.selectedCategory}
              English Department
            </Typography>
            <Typography>⭐ 0.0</Typography>
          </Box>
          <Typography variant="h5" component="h5">
            {item?.productName}
            Graphic Design
          </Typography>
          <Typography
            variant="subtitle2"
            component="p"
            style={{ color: "gray" }}
          >
            {item?.description.slice(0, 110)}
            {item?.description.length < 110 ? "" : "..."}
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away.
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography variant="body2" component="p" style={{ color: "gray" }}>
              <Icon2 name="download" size={20} /> 0 Sales
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              style={{
                color: "rgb(97, 151, 97)",
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              R{item?.price}500
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardContent>
        {/* <IconButton
          aria-label="add to favorites"
          onClick={toggleHeart}
          style={{ marginRight: "10px" }}
        >
          <FontAwesomeIcon
            icon={isRed ? faHeartRed : faHeart}
            style={{ color: isRed ? "red" : "black" }}
          />
        </IconButton> */}
        {/* <TouchableOpacity>
          <Icon
            name="shopping-cart"
            size={20}
            color="black"
            style={{ paddingHorizontal: 10, position: "absolute", top: 0 }}
          />
        </TouchableOpacity> */}
        <Button
          variant="outlined"
          color="primary"
          style={{
            border: "2px solid black",
            color: "rgb(43, 40, 40)",
            textDecoration: "none",
            width: "7vw",
            backgroundColor: "white",

            padding: "10px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "18px",

            display: "flex",
            /* justify-content: center, */

            alignItems: "center",
          }}
          onClick={() => console.log("View Button Clicked!!!")}
        >
          VIEW
          {/* <img
            src={RightIcon}
            className="right-icon"
            alt="right icon"
            style={{ marginLeft: "10px" }}
          /> */}
          <Icon name="arrow-right" size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
