import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Réseaux sociaux */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Connectez-vous avec nous sur les réseaux sociaux:</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
            <Icon name="facebook" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
            <Icon name="twitter" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://google.com")}>
            <Icon name="google" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
            <Icon name="instagram" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Description et Contact */}
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Text style={styles.logo}>EatOrder</Text>
          <Text style={styles.description}>
            Envie de quelque chose de délicieux ? Commandez vos plats préférés sur notre plateforme et profitez d'une livraison rapide, facile et fiable. Découvrez une grande variété de cuisines, des offres exclusives et une commande sans tracas. Satisfaction garantie à chaque bouchée.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.contactTitle}>CONTACT</Text>
          <Text style={styles.contactItem}>
            <Icon name="home" size={16} /> 11 arrondissement Paris, 75011, France
          </Text>
          <Text style={styles.contactItem}>
            <Icon name="envelope" size={16} /> contact@eatorder.fr
          </Text>
          <Text style={styles.contactItem}>
            <Icon name="phone" size={16} /> +01 234 567 88
          </Text>
          <Text style={styles.contactItem}>
            <Icon name="fax" size={16} /> +01 234 567 89
          </Text>
        </View>
      </View>

      {/* Crédits */}
      <Text style={styles.credits}>© 2024 Makseb Solutions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#2c2f33",
    padding: 20,
  },
  socialContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 10,
    marginBottom: 10,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flex: 1,
    marginRight: 15,
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#ccc",
    fontSize: 14,
  },
  contactTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactItem: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 5,
  },
  credits: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Footer;
