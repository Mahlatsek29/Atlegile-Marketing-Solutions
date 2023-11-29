import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./src/Client/Landing/Landing";
import AboutUs from "./src/Client/Landing/About";
import SignUp from "./src/Client/SignUp/Signup";
import TellUsAboutYourself from "./src/Client/SignUp/TellUsAboutYourself";
import AlternativeContact from "./src/Client/SignUp/AlternativeContact";
import SignIn from "./src/Client/SignIn/Signin";
import BusinessRegistration from "./src/Client/BusinessRegistration/BusinessRegistration";
import AddProductsAndServices from "./src/Client/BusinessRegistration/AddProduct";
import PaymentInfo from "./src/Client/BusinessRegistration/PaymentInfo";
import ProductDetails from "./src/Client/ProductDetails/ProductDetails";
import BusinessProducts from "./src/Client/ProductDetails/BusinessProducts";
import UserProfile from "./src/Client/AccountAndBusiness/UserProfile";
import AccountAndBusiness from "./src/Client/AccountAndBusiness/AccountBusiness";
import OrderHistory from "./src/Client/CartAndOrderHistory/OrderHistory";
import PayFast from "./src/Client/CartAndOrderHistory/PayFast";
import CourierGuy from "./src/Client/CartAndOrderHistory/CourierGuy";
import Reciept from "./src/Client/CartAndOrderHistory/Reciept";
import DeliveryOngoing from "./src/Client/CartAndOrderHistory/DeliveryOngoing";
import DeliveryAndChatSystem from "./src/Client/CartAndOrderHistory/DeliveryAndChatSystem";
import DateSelectionAndCheckout from "./src/Client/CartAndOrderHistory/DateSelectionAndCheckout";
import Favourites from "./src/Client/Favourites/Favourites";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Landing"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TellUsAboutYourself" component={TellUsAboutYourself} />
        <Stack.Screen name="AlternativeContact" component={AlternativeContact} /> 
        <Stack.Screen name="SignIn" component={SignIn} /> 
        <Stack.Screen
          name="BusinessRegistration"
          component={BusinessRegistration}
        />
        <Stack.Screen
          name="AddProductsAndServices"
          component={AddProductsAndServices}
        />
        <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="BusinessProducts" component={BusinessProducts} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="AccountAndBusiness" component={AccountAndBusiness} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="PayFast" component={PayFast} />
        <Stack.Screen name="CourierGuy" component={CourierGuy} />
        <Stack.Screen name="Reciept" component={Reciept} />
        <Stack.Screen name="DeliveryOngoing" component={DeliveryOngoing} />
        <Stack.Screen name="DeliveryAndChatSystem" component={DeliveryAndChatSystem} />
        <Stack.Screen name="DateSelectionAndCheckout" component={DateSelectionAndCheckout} /> */}
        <Stack.Screen name="Favourites" component={Favourites} /> 
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
