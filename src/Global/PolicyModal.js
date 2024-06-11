import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button, // Import Button from react-native
} from "react-native";

import { Modal, Typography } from "@mui/material";

const PolicyModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <View style={styles.container}>
      {/* Use the Button component from react-native */}
      <Button title="Open Privacy Policy" onPress={handleOpenModal} />

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="privacy-policy-modal"
        aria-describedby="privacy-policy-description"
      >
        <View style={styles.modalContainer}>
          <Typography variant="h5" gutterBottom>
            Privacy Policy
          </Typography>
          <ScrollView style={{ maxHeight: 300 }}>
            <Text style={styles.content}>
              At Atlegile Marketing Solutions (AMS), we are committed to safeguarding your privacy and protecting your personal information. This Privacy Policy is designed to explain how we collect, use, disclose, and secure your information when you register for our services or events.
              {"\n\n"}
              1. Information We Collect:
              {"\n\n"}
              When you register for our services or events, AMS may collect the following information:
              {"\n\n"}
              - Name
              - Profile information
              - Email address
              - Contact information
              - Job title
              - Company name
              - Any additional information you choose to provide
              {"\n\n"}
              2. Use of Information:
              {"\n\n"}
              We collect and use the information obtained during registrations for the following purposes:
              {"\n\n"}
              - To provide you with access to our services or events.
              - To communicate with you, including sending event updates, confirmations, and reminders.
              - To enhance our services and the user experience.
              - To fulfill legal requirements and obligations.
              {"\n\n"}
              3. Data Security:
              {"\n\n"}
              AMS employs reasonable security measures to protect your personal information from unauthorized access, disclosure, or modification. Nevertheless, please be aware that no internet data transmission or storage method is entirely secure. While we strive to protect your information, we cannot guarantee the security of data transmitted to us.
              {"\n\n"}
              4. Sharing of Information:
              {"\n\n"}
              AMS may share your information with third-party service providers who assist us in managing our events or providing services related to registrations. We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              {"\n\n"}
              5. Your Choices:
              {"\n\n"}
              You have the option to opt out of receiving promotional emails or updates from AMS by following the instructions provided in those emails. If you wish to access, correct, or delete your personal information, please contact us via the information provided below.
              {"\n\n"}
              6. Cookies and Tracking Technologies:
              {"\n\n"}
              AMS may employ cookies and similar tracking technologies to gather information about your interactions with our website. You can manage your cookie preferences by adjusting your browser settings.
              {"\n\n"}
              7. Contact Us:
              {"\n\n"}
              If you have any questions or concerns about this Privacy Policy or your personal information, please contact us using the following information:
              {"\n\n"}
              Email: trn@atlegilemarketing.co.za
              Phone: +2760 4866 708
              {"\n\n"}
              8. Changes to this Privacy Policy:
              {"\n\n"}
              AMS reserves the right to update this Privacy Policy to reflect modifications in our practices or for other operational, legal, or regulatory reasons. The most recent version of the Privacy Policy will be posted on our website with the “Last updated” date.
              {"\n\n"}
              9. Data Retention and Deletion:
              {"\n\n"}
              AMS retains your personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. You have the right to request the deletion of your personal information from our records. If you wish to have your information removed from our database, please contact us using the information provided in Section 7 (Contact Us). We will make reasonable efforts to respond to your request in accordance with applicable data protection laws.
              {"\n\n"}
              By registering for AMS’s services or events, you agree to the terms and conditions outlined in this Privacy Policy.
            </Text>
          </ScrollView>
          {/* Use the Button component from react-native */}
          <Button title="Close" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  content: {
    fontSize: 16,
  },
});

export default PolicyModal;