import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./src/Client/Landing/Landing";
import AboutUs from "./src/Client/Landing/About";
import SignUp from "./src/Client/SignUp/Signup";
import TellUsAboutYourself from "./src/Client/SignUp/TellUsAboutYourself";
import AlternativeContact from "./src/Client/SignUp/AlternativeContact";
import SignIn from "./src/Client/SignIn/Signin";
import BusinessRegistration from "./src/Client/BusinessRegistration/BusinessRegistration";
import TalentRegistration from "./src/Client/BusinessRegistration/TalentRegistration";
import AddProductsAndServices from "./src/Client/BusinessRegistration/AddProduct";
import ProductDetails from "./src/Client/ProductDetails/ProductDetails";
import UserProfile from "./src/Client/AccountAndBusiness/UserProfile";
import AccountAndBusiness from "./src/Client/AccountAndBusiness/AccountBusiness";
import OrderHistory from "./src/Client/CartAndOrderHistory/OrderHistory";
import Reciept from "./src/Client/CartAndOrderHistory/Reciept";
import DeliveryOngoing from "./src/Client/CartAndOrderHistory/DeliveryOngoing";
import DeliveryAndChatSystem from "./src/Client/CartAndOrderHistory/DeliveryAndChatSystem";
import DateSelectionAndCheckout from "./src/Client/CartAndOrderHistory/DateSelectionAndCheckout";
import Favourites from "./src/Client/Favourites/Favourites";
import BusinessCard from "./src/Client/Landing/BusinessCard";
import Products from "./src/Client/Products/Products";

const Stack = createStackNavigator();



const Routes = () => {
  return (
    <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Products" component={Products} />        
        <Stack.Screen name="BusinessCard" component={BusinessCard} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="TellUsAboutYourself"
          component={TellUsAboutYourself}
        />
        <Stack.Screen
          name="AlternativeContact"
          component={AlternativeContact}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen
          name="BusinessRegistration"
          component={BusinessRegistration}
        />
         <Stack.Screen
          name="TalentRegistration"
          component={TalentRegistration}
        />
        <Stack.Screen
          name="AddProductsAndServices"
          component={AddProductsAndServices}
        />
       
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="AccountAndBusiness"
          component={AccountAndBusiness}
        />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
       
        <Stack.Screen
          name="DateSelectionAndCheckout"
          component={DateSelectionAndCheckout}
        />
        <Stack.Screen name="Reciept" component={Reciept} />
        <Stack.Screen name="DeliveryOngoing" component={DeliveryOngoing} />
        <Stack.Screen
          name="DeliveryAndChatSystem"
          component={DeliveryAndChatSystem}
        />
        <Stack.Screen name="Favourites" component={Favourites} />
      </Stack.Navigator>
  );
};

export default Routes;
