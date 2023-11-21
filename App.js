import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './src/Client/Landing/Landing';
import AboutUs from './src/Client/Landing/AboutUs';
import SignUp from './src/Client/SignUp/SignUp';
import TellUsAboutYourself from './src/Client/SignUp/TellUsAboutYourself';
import AlternativeContact from './src/Client/SignUp/AlternativeContact';
import SignIn from "./src/Client/SignIn/Signin";
import BusinessRegistration from './src/Client/BusinessRegistration/BusinessRegistration';
import AddProductsAndServices from './src/Client/BusinessRegistration/AddProductsAndServices';
import PaymentInfo from './src/Client/BusinessRegistration/AddProductsAndServices';
import ProductDetails from './src/Client/ProductDetails/ProductDetails';
import BusinessProducts from './src/Client/ProductDetails/BusinessProducts';
import UserProfile from './src/Client/AccountAndBusinessPage/UserProfile';
import AccountAndBusinessPage from './src/Client/AccountAndBusinessPage/AccountBusinessPage';
import OrderHistory from './src/Client/CartAndOrderHistory/OrderHistory';
import PayFast from './src/Client/CartAndOrderHistory/PayFast';
import CourierGuy from './src/Client/CartAndOrderHistory/CourierGuy';
import Reciept from './src/Client/CartAndOrderHistory/Reciept';
import DeliveryOngoing from './src/Client/CartAndOrderHistory/DeliveryOngoing';
import DeliveryAndChatSystem from './src/Client/CartAndOrderHistory/DeliveryAndChatSystem';
import DateSelectionAndCheckout  from './src/Client/CartAndOrderHistory/DateSelectionAndCheckout';
import Favourites from './src/Client/Favourites/Favourites';
import CMSSignIn from './src/CMS/SignIn';
import WelcomeToAMS from './src/CMS/WelcomeToAMS';
import ManageUsers from './src/CMS/ManageUsers';
import ManageBusoinesses from './src/CMS/ManageBusiness';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/tellus' element={<TellUsAboutYourself/>}/>
        <Route path='/altnative-contact' element={<AlternativeContact/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path='/business-reg' element={<BusinessRegistration/>}/>
        <Route path='/add-products-and-services' element={<AddProductsAndServices/>}/>
        <Route path='/payment-info' element={<PaymentInfo/>}/>
        <Route path='/product-details' element={<ProductDetails/>}/>
        <Route path='/business-products' element={<BusinessProducts/>}/>
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='/account-bussiness-page' element={<AccountAndBusinessPage/>}/>
        <Route path='/order' element={<OrderHistory/>}/>
        <Route path='/pay' element={<PayFast/>}/>
        <Route path='/courier' element={<CourierGuy/>}/>
        <Route path='/reciept' element={<Reciept/>}/>
        <Route path='/delivery' element={<DeliveryOngoing/>}/>
        <Route path='/chat' element={<DeliveryAndChatSystem/>}/>
        <Route path='/date' element={<DateSelectionAndCheckout/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/cms-signin' element={<CMSSignIn/>}/>
        <Route path='/welcome' element={<WelcomeToAMS/>}/>
        <Route path='/manage-users' element={<ManageUsers/>}/>
        <Route path='/manage-businesses' element={<ManageBusoinesses/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;