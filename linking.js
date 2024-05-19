import * as Linking from "expo-linking";

const linking = {
  prefixes: ['https://sowheretoaccess.com', Linking.createURL('/')], // Add your domain as a prefix
  config: {
    screens: {
      Landing: "",
      Products: "Products",
      BusinessCard: "BusinessCard",
      AboutUs: "AboutUs",
      SignUp: "SignUp",
      TellUsAboutYourself: "TellUsAboutYourself",
      SignIn: "SignIn",
      BusinessRegistration: "BusinessRegistration",
      AddProductsAndServices: "AddProductsAndServices",
      ProductDetails: "ProductDetails/:productId", // Add the parameter here
      BusinessProducts: "BusinessProducts",
      UserProfile: "UserProfile",
      AccountAndBusiness: "AccountAndBusiness",
      OrderHistory: "OrderHistory",
      DateSelectionAndCheckout: "DateSelectionAndCheckout",
      Reciept: "Reciept",
      DeliveryOngoing: "DeliveryOngoing",
      DeliveryAndChatSystem: "DeliveryAndChatSystem",
      Favourites: "Favourites"
    },
  },
};

export default linking;
