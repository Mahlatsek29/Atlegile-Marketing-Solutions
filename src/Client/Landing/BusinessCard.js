import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { Grid, Typography } from "@mui/material";
import { firebase } from "../../config"; // Adjust the path based on your project structure
import ProductCard from "../../Global/Card";

export default function BusinessCard({business}) {
  return <>
  <View><Text>{business}</Text> </View>
  </>;
}
