import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône

const RestaurantAuth = ({ navigation }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ restaurantName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // Etat pour afficher/masquer le mot de passe

  const validateInputs = () => {
    let valid = true;
    let newErrors = { restaurantName: "", password: "" };

    if (restaurantName.trim().length < 3) {
      newErrors.restaurantName = "Le nom doit avoir au moins 3 caractères.";
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAuthenticate = () => {
    if (validateInputs()) {
      navigation.navigate("Auth", { restaurantName });
    } else {
      Alert.alert("Erreur", "Veuillez corriger les champs invalides.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EatOrder</Text>

      <Text style={styles.subtitle}>Authentification du Restaurant</Text>

      <TextInput
        style={[styles.input, errors.restaurantName ? styles.inputError : null]}
        placeholder="Entrez le nom du restaurant"
        value={restaurantName}
        onChangeText={setRestaurantName}
      />
      {errors.restaurantName ? <Text style={styles.errorText}>{errors.restaurantName}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Entrez le mot de passe du restaurant"
          secureTextEntry={!showPassword} // Change la visibilité du mot de passe
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)} // Inverse l'état pour afficher/masquer
        >
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAuthenticate}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    position: "absolute",
    top: 20,
    left: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  passwordContainer: {
    width: "80%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});

export default RestaurantAuth;


