import { Box, TextField, IconButton } from "@mui/material";
import { Dimensions, Image, View,Text } from "react-native";

import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const handleFilterIconClick = () => {
    console.log("Filter Button Clicked!!!");
  };

  const handleSearchIconClick = () => {
    console.log("Search Button Clicked!!!");
  };

  
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setWidth(window.width);
    };

    Dimensions.addEventListener("change", handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener("change", handleDimensionsChange);
    };
  }, []);

  
  return (
    <>
      {width < 600 ? ( <Box
      className="search-bar-container"
      size="100%"
      sx={{
        width: " 100%",
        height: "13rem",
        backgroundColor: "#070f18",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
     
      <Box
        className="search-bar-body"
        // padding={0}
        sx={{
          // backgroundColor: "red",
          width: "80vw",
          height: "13rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          alt="AMS COMPANY"
          style={{
            // marginTop: "1px",
            height: "auto",
            color: "white",
            width: 150,
            height: 120,
            zIndex:900
          }}
        />
        <Box
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            height: "40px",
            zIndex:900
          }}
        >
          <TextField
            fullWidth
            id="search"
            label="search..."
            variant="standard"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{}}
          />
          <Box
            className="icons-container"
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <IconButton onClick={handleFilterIconClick}>
              <Image
                source={require("../../assets/icons/filter.svg")}
                alt="Image filter"
                style={{ width: 25, height: 25 }}
              />
            </IconButton>
            <IconButton onClick={handleSearchIconClick}>
              <Image
                source={require("../../assets/icons/search-status.svg")}
                alt="Image search"
                style={{ width: 25, height: 25 }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Image
        source={require("../../assets/image/right_lion.png")}
        alt="Shop 2"
        width={250}
        height={205}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 300,
          height: 200,
        }}
      />
    </Box>) : (
        <Box
      className="search-bar-container"
      size="100%"
      sx={{
        width: " 100%",
        height: "13rem",
        backgroundColor: "#070f18",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/image/left_lion.png")}
        alt="Shop 1"
        width={250}
        height={205}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 300,
          height: 200,
        }}
      />
      <Box
        className="search-bar-body"
        // padding={0}
        sx={{
          // backgroundColor: "red",
          width: "40vw",
          height: "13rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          alt="AMS COMPANY"
          style={{
            // marginTop: "1px",
            // marginTop: 5,
            height: "auto",
            color: "white",
            width: 150,
            height: 120,
            zIndex:900
          }}
        />
        <Box
          style={{
            padding: "10px",
            width: "80%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            height: "40px",
            zIndex:900
          }}
        >
          <TextField
            fullWidth
            id="search"
            label="search..."
            variant="standard"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{}}
          />
          <Box
            className="icons-container"
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <IconButton onClick={handleFilterIconClick}>
              <Image
                source={require("../../assets/icons/filter.svg")}
                alt="Image filter"
                style={{ width: 25, height: 25 }}
              />
            </IconButton>
            <IconButton onClick={handleSearchIconClick}>
              <Image
                source={require("../../assets/icons/search-status.svg")}
                alt="Image search"
                style={{ width: 25, height: 25 }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Image
        source={require("../../assets/image/right_lion.png")}
        alt="Shop 2"
        width={250}
        height={205}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 300,
          height: 200,
        }}
      />
    </Box>)}
      
    </>
    
  );
}
