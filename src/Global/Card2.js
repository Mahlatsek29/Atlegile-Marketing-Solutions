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
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";

const ProductCard = ({ item }) => {
  const [isRed, setIsRed] = React.useState(true);

  console.log("item images: ");
  const imgSrc = item?.images?.find((item, index) => index === 0);
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
        paddingTop: "1.2rem",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Box>
        <Box
          style={{
            borderRadius: "16px",
            objectFit: "cover",
            position: "relative",
            backgroundColor: "gold",
            width: "270px",
            height: "270px",
            borderRadius: "50%",
            alignself: "center",
            justifyContent: "center",
            marginLeft: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            // image={require("../../assets/image/headsets.png")}
            src={imgSrc}
            alt="shop 2"
            style={{
              borderRadius: "100px",
              objectFit: "cover",
              width: 220,
              height: 220,
              alignSelf: "center",
            }}
            // style={{
            //   borderRadius: "100px",
            //   objectFit: "cover",
            //   width: 220,
            //   height: 220,
            //   alignSelf: "center",
            // }}
          />
          <Box
            style={{
              backgroundColor: "#E74040",
              position: "absolute",
              bottom: 200,
              padding: 2,
              width: "22%",
              borderRadius: "8%",
              alignSelf: "center",
            }}
          >
            <Typography
              variant="h5"
              style={{ color: "#fff", textAlign: "center" }}
            >
              {" "}
              sale
            </Typography>
          </Box>
          <Box
            style={{
              paddingHorizontal: 10,
              position: "absolute",
              bottom: 30,
              width: "6vw",
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "red",
              justifyContent: "space-between",
              alignSelf: "center",
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
              {item?.selectedProductCategory}

              {/* English Department */}
            </Typography>
            <Typography
              style={{
                backgroundColor: "#072840",
                color: "#fff",
                borderRadius: "15px",
                padding: "4px",
              }}
            >
              ⭐ 4.9
            </Typography>
          </Box>
          <Typography variant="h5" component="h5">
            {item?.name}
            {/* Graphic Design */}
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
              <Icon2 name="download" size={20} /> 15 Sales
            </Typography>
            <Box display="flex" flexDirection="row">
              <Typography
                variant="subtitle2"
                component="p"
                style={{
                  color: "#BDBDBD",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginRight: "10px",
                }}
              >
                R{item?.price}700
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
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard;
