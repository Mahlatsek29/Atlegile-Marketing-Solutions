import React, { useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
// import { async } from "@firebase/util";

const CourierAPIKey = "20100d3a439b4d1399f527d08a303f7a";

const CourierGuy = () => {
  useEffect(() => {
    const gettingRate = async () => {
      const theRates = {
        collection_address: {
          type: "business",
          company: "uAfrica.com",
          street_address: "1188 Lois Avenue",
          local_area: "Menlyn",
          city: "Pretoria",
          zone: "Gauteng",
          country: "ZA",
          code: "0181",
          lat: -25.7863272,
          lng: 28.277583,
        },
        delivery_address: {
          type: "residential",
          company: "",
          street_address: "10 Midas Avenue",
          local_area: "Olympus AH",
          city: "Pretoria",
          zone: "Gauteng",
          country: "ZA",
          code: "0081",
          lat: -25.80665579999999,
          lng: 28.334732,
        },
        parcels: [
          {
            submitted_length_cm: 42.5,
            submitted_width_cm: 38.5,
            submitted_height_cm: 5.5,
            submitted_weight_kg: 3,
          },
        ],
        declared_value: 1500,
        collection_min_date: "2021-05-21",
        delivery_min_date: "2021-05-21",
      };

      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "https://api.shiplogic.com/v2/rates",
          theRates,
          config
        );
        console.log("Courier API rates response:", response.data);
      } catch (error) {
        console.error("Error getting rates", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      }
    };

    const gettingOpRates = async () => {
      const OpRates = {
        collection_address: {
          type: "business",
          company: "uAfrica.com",
          street_address: "116 Lois Avenue",
          local_area: "Menlyn",
          city: "Pretoria",
          zone: "Gauteng",
          country: "ZA",
          code: "0181",
          lat: -25.7863272,
          lng: 28.277583,
        },
        delivery_address: {
          type: "residential",
          company: "",
          street_address: "10 Midas Avenue",
          local_area: "Olympus AH",
          city: "Pretoria",
          zone: "Gauteng",
          country: "ZA",
          code: "0081",
          lat: -25.80665579999999,
          lng: 28.334732,
        },
      };
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "https://api.shiplogic.com/v2/rates/opt-in",
          OpRates,
          config
        );
        console.log("Courier API option rates response:", response.data);
      } catch (error) {
        console.error("Error gettin option rates", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      }
    };

    const creattingShipment = async () => {
      const shipment = {
        collection_address: {
          type: "business",
          company: "uAfrica.com",
          street_address: "116 Lois Avenue",
          local_area: "Menlyn",
          city: "Pretoria",
          code: "0181",
          zone: "Gauteng",
          country: "ZA",
          lat: -25.7863272,
          lng: 28.277583,
        },
        collection_contact: {
          name: "Cornel Rautenbach",
          mobile_number: "",
          email: "cornel+sandy@uafrica.com",
        },
        delivery_address: {
          type: "residential",
          company: "",
          street_address: "10 Midas Ave",
          local_area: "Olympus AH",
          city: "Pretoria",
          code: "0081",
          zone: "Gauteng",
          country: "ZA",
          lat: -25.80665579999999,
          lng: 28.334732,
        },
        delivery_contact: {
          name: "",
          mobile_number: "",
          email: "cornel+sandyreceiver@uafrica.com",
        },
        parcels: [
          {
            parcel_description: "Standard flyer",
            submitted_length_cm: 20,
            submitted_width_cm: 20,
            submitted_height_cm: 10,
            submitted_weight_kg: 2,
          },
        ],
        opt_in_rates: [],
        opt_in_time_based_rates: [76],
        special_instructions_collection:
          "This is a test shipment - DO NOT COLLECT",
        special_instructions_delivery:
          "This is a test shipment - DO NOT DELIVER",
        declared_value: 1100,
        collection_min_date: "2021-05-21T00:00:00.000Z",
        collection_after: "08:00",
        collection_before: "16:00",
        delivery_min_date: "2021-05-21T00:00:00.000Z",
        delivery_after: "10:00",
        delivery_before: "17:00",
        custom_tracking_reference: "",
        customer_reference: "ORDERNO123",
        service_level_code: "ECO",
        mute_notifications: false,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "https://api.shiplogic.com/v2/shipments",
          shipment,
          config
        );
        console.log("Courier API creating shpment response:", response.data);
        return response.data; 
      } catch (error) {
        console.error("Error getting shipment details", error);

        if (error.response) {
          console.log("Response status:", error.response.status);
          console.log("Response data:", error.response.data);
        } else if (error.request) {
          console.log("No response received. Request made but no response.");
        } else {
          console.log("Error in making the request:", error.message);
        }
      }
    };

    const getShipment = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          "https://api.shiplogic.com/v2/shipments?tracking_reference=XJXXLF",
          config
        );
        console.log("Courier API shipment No response:", response.data);
        return response.data.shipments;
      } catch (error) {
        console.error("Error getting shipments", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
        return [];
      }
    };

    const ShipLabel = async () => {
      const shipments = await getShipment();

      if (shipments.length > 0) {
        const ShipId = shipments[0].id; 
        //console.log(ShipId)
        const labelConfig = {
          headers: {
            Authorization: `Bearer ${CourierAPIKey}`,
            "Content-Type": "application/json",
          },
        };

        try {
          const labelResponse = await axios.get(
            `https://api.shiplogic.com/v2/shipments/label?id=${ShipId}`,
            labelConfig
          );
          console.log("Courier API label response:", labelResponse.data);
        } catch (labelError) {
          console.error("Error getting shipment label", labelError);
          if (labelError.response) {
            console.log("Response data:", labelError.response.data);
          }
        }
      } else {
        console.log("No shipments available.");
      }
    };

    const ShipSikerLabel = async () => {
      const shipments = await getShipment();
    
      if (shipments.length > 0) {
        const ShipId = shipments[0].id;
    
        const labelConfig = {
          headers: {
            Authorization: `Bearer ${CourierAPIKey}`,
            "Content-Type": "application/json",
          },
        };
    
        try {
          const labelResponse = await axios.get(
            `https://api.shiplogic.com/v2/shipments/label/stickers?id=${ShipId}`,
            labelConfig
          );
    
          if (labelResponse.data && labelResponse.data.filename) {
            console.log("Courier API Stker label response:", labelResponse.data);
            return labelResponse.data;
          } else {
            console.error("Label response is missing filename:", labelResponse.data);
            throw new Error("Label response is missing filename");
          }
        } catch (labelError) {
          console.error("Error getting shipment label", labelError);
          if (labelError.response) {
            console.log("Response data:", labelError.response.data);
          }
          throw labelError;
        }
      } else {
        console.log("No shipments available.");
        throw new Error("No shipments available");
      }
    };
    
    const cancelShipment = async () => {
      const trackingReference = "XJXXLF";

      const cancelConfig = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const cancelResponse = await axios.post(
          `https://api.shiplogic.com/v2/shipments/cancel`,
          { tracking_reference: trackingReference },
          cancelConfig
        );
        console.log("Courier API cancel response:", cancelResponse.data);
      } catch (cancelError) {
        console.error("Error cancelling shipment", cancelError);
        if (cancelError.response) {
          console.log("Response data:", cancelError.response.data);
        }
      }
    };

    const tackingShipment = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          "https://api.shiplogic.com/v2/tracking/shipments?tracking_reference=XJXXLF",
          config
        );
        console.log("Courier API traking shipment response:", response.data);
        return response.data.shipments; 
      } catch (error) {
        console.error("Error getting shipments", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
        return []; 
      }
    };

    const signedURL = async () => {
      const shipment = {
        collection_address: {
          type: "business",
          company: "uAfrica.com",
          street_address: "116 Lois Avenue",
          local_area: "Menlyn",
          city: "Pretoria",
          code: "0181",
          zone: "Gauteng",
          country: "ZA",
          lat: -25.7863272,
          lng: 28.277583,
        },
      
      
        delivery_address: {
          type: "residential",
          company: "",
          street_address: "10 Midas Ave",
          local_area: "Olympus AH",
          city: "Pretoria",
          code: "0081",
          zone: "Gauteng",
          country: "ZA",
          lat: -25.80665579999999,
          lng: 28.334732,
        },
        parcels: [
          {
         
            submitted_length_cm: 20,
            submitted_width_cm: 20,
            submitted_height_cm: 10,
            submitted_weight_kg: 2,
          },
        ],
        account_id: 309836,
        declared_value: 1100,
        opt_in_rates: [],
        opt_in_time_based_rates: [],
        collection_min_date: "2023-12-04",
        delivery_min_date: "2023-12-04",
      };
      const labelConfig = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };
    
      try {
        // Assuming ShipSikerLabel returns the filename in the response data
        // const labelResponse = await ShipSikerLabel();
        // const theFilename = labelResponse.filename;
        // console.log('filename is: ', theFilename);
    
        // Requesting the signed URL
        const signedURLResponse = await axios.get(
          `https://api.shiplogic.com/v2/s3-url/download?file_name=${theFilename}&folder=shipment-images`,
          shipment,
          labelConfig
        );
    
        // Get the signed URL from the response
        const signedURL = signedURLResponse.signed_url;
    
        // Now you can use this signed URL to download the file
        console.log("Signed URL:", signedURL);
      } catch (labelError) {
        console.error("Error getting signed URL", labelError);
        if (labelError.response) {
          console.log("Response data:", labelError.response.data);
        }
      }
    };
    
    const getPODimage = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };
    
      try {
        const response = await axios.get(
          "https://api.shiplogic.com/v2/shipments/pod/images?tracking_reference=XJXXLF",
          config
        );
    
        if (response.data && response.data.shipments) {
          console.log("Courier API POD image response:", response.data);
          return response.data.shipments; 
        } else {
          console.log("Courier API POD image response is null or missing shipments.");
          return [];
        }
      } catch (error) {
        console.error("Error getting shipments", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
        return []; 
      }
    };
    
    const getAllPODevents = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };
    
      try {
        const response = await axios.get(
          "https://api.shiplogic.com/v2/shipments/pod?tracking_reference=XJXXLF",
          config
        );
    
        console.log('response is: ', response)
        if (response.data && response.data.shipments) {
          console.log("Courier API POD events response:", response.data);
          return response.data.shipments;
        } else {
          console.log("Courier API POD events response is null or missing shipments.");
          return [];
        }
      } catch (error) {
        console.error("Error getting shipments", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
        return [];
            }
    };
    
    const getDigitalPOD = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${CourierAPIKey}`,
          "Content-Type": "application/json",
        },
      };
    
      try {
        const response = await axios.get(
          "https://api.shiplogic.com/v2/shipments/digital-pod?tracking_reference=XJXXLF",
          config
        );
    
        console.log('response is: ', response);
    
        if (response.data && response.data.shipments) {
          console.log("Courier API digital POD response:", response.data);
          return response.data.shipments;
        } else {
          console.log("Courier API digital POD response is null or missing shipments.");
          return [];
        }
      } catch (error) {
        console.error("Error getting digital POD shipments", error);
    
        if (error.response) {
          console.log("Response data:", error.response.data);
        } else if (error.request) {
          console.log("No response received. Request made but no response.");
        } else {
          console.log("Error message:", error.message);
        }
    
        return [];
      }
    };
    
    
   
  
    //tackingShipment()
   // getPODimage();
   //getAllPODevents();
   //getDigitalPOD();
   // signedURL();
    
    
  }, []);

  return (
    <View>
      <Text>CourierGuy</Text>
    </View>
  );
};

export default CourierGuy;
