import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône

const AuthScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe

  const navigation = useNavigation();
  const route = useRoute();

  const { restaurantName } = route.params || {};

  const validateInputs = () => {
    let valid = true;
    let newErrors = { username: "", password: "" };

    // Vérifier si le nom d'utilisateur est parmi les valeurs autorisées (insensible à la casse)
    const allowedUsernames = ["staff", "manager", "expediteur"];
    if (!allowedUsernames.includes(username.trim().toLowerCase())) {
      newErrors.username = "Nom d'utilisateur invalide. Utilisez 'staff', 'manager' ou 'expediteur'.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      navigation.navigate("Commande");
    } else {
      Alert.alert("Erreur", "Veuillez corriger les champs invalides.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EatOrder</Text>

      <Text style={styles.welcomeText}>Bienvenue à {restaurantName || "notre restaurant"}</Text>

      <Text style={styles.subtitle}>Connexion</Text>

      <TextInput
        style={[styles.input, errors.username ? styles.inputError : null]}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    position: "absolute",
    top: 30,
    left: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});


