import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button, // Import Button from react-native
} from "react-native";

import { Modal, Typography } from "@mui/material";

const TermsModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <View style={styles.container}>
      {/* Use the Button component from react-native */}
      <Button title="Open Terms of Service" onPress={handleOpenModal} />

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="terms-of-service-modal"
        aria-describedby="terms-of-service-description"
      >
        <View style={styles.modalContainer}>
          <Typography variant="h5" gutterBottom>
            Terms of Service
          </Typography>
          <ScrollView style={{ maxHeight: 300 }}>
            <Text style={styles.content}>
              1. Introduction {"\n\n"}
              Welcome to Atlegile Marketing Solutions (Pty) Ltd. By accessing
              and using our website, you agree to comply with the following
              terms and conditions. Please read them carefully. {"\n\n"}
              2. Use of the Website {"\n\n"}
              – You may use our website for lawful purposes only. {"\n\n"}
              3. Intellectual Property {"\n\n"}
              – All content on this website, including text, images, logos, and
              graphics, is protected by intellectual property laws. {"\n\n"}
              4. Privacy Policy {"\n\n"}
              – Our privacy policy outlines how we collect, use, and protect
              your personal information. Please review it [here](#privacy-policy-link). {"\n\n"}
              5. Disclaimer {"\n\n"}
              – We strive to provide accurate information, but we do not
              guarantee the completeness or accuracy of the content on our
              website. {"\n\n"}
              – We are not liable for any unintended results from the use of
              our website. {"\n\n"}
              6. Links to Third-Party Websites {"\n\n"}
              – Our website may contain links to third-party websites. We are
              not responsible for the content or practices of these external
              sites. {"\n\n"}
              7. Governing Law {"\n\n"}
              – These terms and conditions are governed by the laws of South
              Africa. {"\n\n"}
              8. Changes to Terms and Conditions {"\n\n"}
              – We reserve the right to modify these terms and conditions at any
              time. Changes will be effective immediately upon posting. {"\n\n"}
              9. Contact Information {"\n\n"}
              – If you have any questions or concerns, please contact us at
              lpp@atlegilemarketing.co.za.
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

export default TermsModal;
