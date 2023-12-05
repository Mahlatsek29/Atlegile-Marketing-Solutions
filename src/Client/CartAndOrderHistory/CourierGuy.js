import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { async } from '@firebase/util';

const CourierAPIKey = '20100d3a439b4d1399f527d08a303f7a';
const rates = 'https://api.shiplogic.com/v2/rates';
const OptionRates = 'https://api.shiplogic.com/v2/rates/opt-in'
const createShipment = 'https://api.shiplogic.com/v2/shipments'  
const CourierGuy = () => {
  useEffect(() => {
    const gettingRate = async () => {
      const theRates = {
        "collection_address": {
          "type": "business",
          "company": "uAfrica.com",
          "street_address": "1188 Lois Avenue",
          "local_area": "Menlyn",
          "city": "Pretoria",
          "zone": "Gauteng",
          "country": "ZA",
          "code": "0181",
          "lat": -25.7863272,
          "lng": 28.277583
        },
        "delivery_address": {
          "type": "residential",
          "company": "",
          "street_address": "10 Midas Avenue",
          "local_area": "Olympus AH",
          "city": "Pretoria",
          "zone": "Gauteng",
          "country": "ZA",
          "code": "0081",
          "lat": -25.80665579999999,
          "lng": 28.334732
        },
        "parcels": [
          {
            "submitted_length_cm": 42.5,
            "submitted_width_cm": 38.5,
            "submitted_height_cm": 5.5,
            "submitted_weight_kg": 3
          }
        ],
        "declared_value": 1500,
        "collection_min_date": "2021-05-21",
        "delivery_min_date": "2021-05-21"
      };

      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post(rates, theRates, config);
        console.log('Courier API rates response:', response.data);
      } catch (error) {
        console.error('Error getting rates', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
        }
      }
    };
      
    const gettingOpRates = async()=>{

      const OpRates={
        "collection_address": {
           "type": "business",
           "company": "uAfrica.com",
           "street_address": "116 Lois Avenue",
           "local_area": "Menlyn",
           "city": "Pretoria",
           "zone": "Gauteng",
           "country": "ZA",
           "code": "0181",
           "lat": -25.7863272,
           "lng": 28.277583
       },
       "delivery_address": {
           "type": "residential",
           "company": "",
           "street_address": "10 Midas Avenue",
           "local_area": "Olympus AH",
           "city": "Pretoria",
           "zone": "Gauteng",
           "country": "ZA",
           "code": "0081",
           "lat": -25.80665579999999,
           "lng": 28.334732
       }
   }
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post(OptionRates, OpRates, config);
        console.log('Courier API option rates response:', response.data);
      } catch (error) {
        console.error('Error gettin option rates', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
        }
      }
    }

    const creattingShipment = async()=>{

        const shipment = {
          "collection_address": {
              "type": "business",
              "company": "uAfrica.com",
              "street_address": "116 Lois Avenue",
              "local_area": "Menlyn",
              "city": "Pretoria",
              "code": "0181",
              "zone": "Gauteng",
              "country": "ZA",
              "lat": -25.7863272,
              "lng": 28.277583
          },
          "collection_contact": {
              "name": "Cornel Rautenbach",
              "mobile_number": "",
              "email": "cornel+sandy@uafrica.com"
          },
          "delivery_address": {
              "type": "residential",
              "company": "",
              "street_address": "10 Midas Ave",
              "local_area": "Olympus AH",
              "city": "Pretoria",
              "code": "0081",
              "zone": "Gauteng",
              "country": "ZA",
              "lat": -25.80665579999999,
              "lng": 28.334732
          },
          "delivery_contact": {
              "name": "",
              "mobile_number": "",
              "email": "cornel+sandyreceiver@uafrica.com"
          },
          "parcels": [
              {
                  "parcel_description": "Standard flyer",
                  "submitted_length_cm": 20,
                  "submitted_width_cm": 20,
                  "submitted_height_cm": 10,
                  "submitted_weight_kg": 2
              }
          ],
          "opt_in_rates": [],
          "opt_in_time_based_rates": [
              76
          ],
          "special_instructions_collection": "This is a test shipment - DO NOT COLLECT",
          "special_instructions_delivery": "This is a test shipment - DO NOT DELIVER",
          "declared_value": 1100,
          "collection_min_date": "2021-05-21T00:00:00.000Z",
          "collection_after": "08:00",
          "collection_before": "16:00",
          "delivery_min_date": "2021-05-21T00:00:00.000Z",
          "delivery_after": "10:00",
          "delivery_before": "17:00",
          "custom_tracking_reference": "",
          "customer_reference": "ORDERNO123",
          "service_level_code": "ECO",
          "mute_notifications": false
      } 
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post(createShipment, shipment, config);
        console.log('Courier API creating shpment response:', response.data);
      } catch (error) {
        console.error('Error gettin option rates', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
        }
      }
    }


    gettingRate();
    gettingOpRates();
    creattingShipment();
  }, []);



  return (
    <View>
      <Text>CourierGuy</Text>
    </View>
  );
};

export default CourierGuy;
