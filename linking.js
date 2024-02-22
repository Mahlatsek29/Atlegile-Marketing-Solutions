
import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/")], // this is the prefix for our app. Could be anything eg https://myapp.com
  config: {
    screens: {
      Landing: "",
      Products:"Products",
      BusinessCard:"BusinessCard",
      AboutUs:"AboutUs",
      SignUp:"SignUp",
      TellUsAboutYourself:"TellUsAboutYourself",
      SignIn:"SignIn",
      BusinessRegistration:"BusinessRegistration",
      AddProductsAndServices:"AddProductsAndServices",
      ProductDetails:"ProductDetails",
      BusinessProducts:"BusinessProducts",
      UserProfile:"UserProfile",
      AccountAndBusiness:"AccountAndBusiness",
      OrderHistory:"OrderHistory",
      DateSelectionAndCheckout:"DateSelectionAndCheckout",
      Reciept:"Reciept",
      DeliveryOngoing:"DeliveryOngoing",
      DeliveryAndChatSystem:"DeliveryAndChatSystem",
      Favourites:"Favourites"
    },
  },
};

export default linking;

        