import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";

import { Modal, Typography } from "@mui/material";

const TermsModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <View style={styles.container}>
      <Button title="Open Terms & Conditions" onPress={handleOpenModal} />

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="terms-of-service-modal"
        aria-describedby="terms-of-service-description"
      >
        <View style={styles.modalContainer}>
          <View style={styles.titleContainer}>
            <Typography variant="h5" gutterBottom style={styles.title}>
              Terms & Conditions
            </Typography>
          </View>
          <ScrollView style={{ maxHeight: 400 }}>
            <Text style={styles.content}>
              Businesses: Signing Up
              {"\n\n"}
              1. Introduction
              {"\n\n"}
              These Terms and Conditions ("Agreement") govern the relationship
              between Atlegile Marketing Solutions (Pty) Ltd ("we," "us," "our")
              and the business entity or individual ("Seller," "you," "your")
              using our platform, SoWhereTo>Access, to sell products.
              {"\n\n"}
              2. Acceptance of Terms
              {"\n\n"}
              By clicking "Agree" or using our platform, you agree to comply
              with and be bound by these Terms and Conditions. If you do not
              agree to these terms, do not use our platform.
              {"\n\n"}
              3. Services Provided
              {"\n\n"}
              We facilitate the sale of your products through our platform,
              including hosting your product listings, processing transactions,
              and providing customer service.
              {"\n\n"}
              4. Commission and Payment
              {"\n\n"}
              We will retain a commission of 30% of the total transaction amount
              for each sale made through our platform. Payments will be
              processed and remitted to you on a [weekly/bi-weekly/monthly]
              basis, net of our commission and any applicable fees.
              {"\n\n"}
              5. Listing Products
              {"\n\n"}
              You are responsible for providing accurate and complete
              descriptions of your products. We reserve the right to remove any
              listings that violate our policies or terms.
              {"\n\n"}
              6. Order Fulfillment
              {"\n\n"}
              You agree to fulfill orders promptly and ensure that products are
              delivered in good condition. Any disputes or returns will be
              handled in accordance with our return policy.
              {"\n\n"}
              7. Compliance with Laws
              {"\n\n"}
              You agree to comply with all applicable laws and regulations
              related to your products and use of our platform.
              {"\n\n"}
              8. Intellectual Property
              {"\n\n"}
              You grant us a non-exclusive, worldwide, royalty-free license to
              use your trademarks, logos, and product images for the purpose of
              promoting and selling your products.
              {"\n\n"}
              9. Limitation of Liability
              {"\n\n"}
              We will not be liable for any indirect, incidental, or
              consequential damages arising out of or in connection with the use
              of our platform.
              {"\n\n"}
              10. Termination
              {"\n\n"}
              Either party may terminate this Agreement at any time with written
              notice. Upon termination, any outstanding payments due to you will
              be processed in accordance with our standard payment schedule.
              {"\n\n"}
              11. Amendments
              {"\n\n"}
              We reserve the right to amend these Terms and Conditions at any
              time. We will notify you of any significant changes. Your
              continued use of the platform after any such changes constitutes
              your acceptance of the new terms.
              {"\n\n"}
              12. Governing Law
              {"\n\n"}
              This Agreement shall be governed by and construed in accordance
              with the laws of South Africa.
              {"\n\n"}
              13. Immediate Effect
              {"\n\n"}
              These Terms and Conditions are effective immediately upon your
              acceptance and will remain in effect until terminated by either
              party as outlined in Section 10.
              {"\n\n"}
              14. Alignment with Strategic Core Values
              {"\n\n"}
              You agree that your brand and products will align with our
              strategic core values, which include: {"\n\n"}
              Exclusivity:
              <br />
              Offering unique and innovative products. {"\n\n"}
              Innovation:
              <br />
              Providing cutting-edge and creative products. {"\n\n"}
              Quality:
              <br />
              Ensuring high-caliber, durable, and aesthetically pleasing items.
              {"\n\n"}
              Cultural Richness:
              <br />
              Highlighting products with African cultural heritage and
              significance.{"\n\n"}
              Discovery:
              <br />
              Encouraging the thrill of finding new and unexpected items.
              {"\n\n"}
              Exceptional Service Delivery:
              <br />
              Demonstrating capability through efficient service, experience,
              and operational capacity {"\n\n"}
              We reserve the right to remove any listings that do not meet these
              values.
              {"\n\n"}
              15. Contact Information
              {"\n\n"}
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at +27 60 846 6708 or
              admin@sowheretoaccess.com.
            </Text>
          </ScrollView>
          <Button
            title="Close"
            onPress={handleCloseModal}
            style={styles.closeButton}
          />
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
    backgroundColor: "#ffffff",
    marginTop: 100,
    marginLeft: 75,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    width: "60%",
  },
  titleContainer: {
    backgroundColor: "#072840",
    padding: 10,
    marginTop: "75",
    // marginRight: "100",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    
  },
  title: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#ffffff",
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    marginLeft: 70,
  },
  closeButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#072840",
    borderRadius: 5,
  },
});

export default TermsModal;