import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Print from "expo-print"; // Importer expo-print

const initialOrders = [
  { id: "1", table: "Table 21", server: "Sam Thorpe", time: "10:32 AM", items: ["Cobb Salad", "Side Hush Puppies"], status: "pending" },
  { id: "2", table: "Togo 26", server: "Sam Thorpe", time: "10:28 AM", items: ["Cheeseburger", "Soup of the day", "Cobb Salad"], status: "ready" },
  { id: "3", table: "Table 5", server: "Sam Thorpe", time: "10:40 AM", items: ["Caesar Salad", "Chili", "Baked Beans", "Mac 'n Cheese"], status: "pending" },
];

const CommandeScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all");

  // Fonction pour imprimer uniquement les informations de la commande
  const handlePrint = async (orderId) => {
    const order = orders.find(order => order.id === orderId);
  
    const orderContent = `
      <html>
        <head>
          <style>
            body { 
              font-family: "Courier New", monospace; 
              font-size: 12px; 
              text-align: center; 
              margin: 0; 
              padding: 0;
            }
            .ticket {
              width: 58mm; 
              max-width: 58mm;
              margin: auto;
              padding: 5px;
              background-color: #fff;
            }
            .header {
              font-size: 16px; 
              font-weight: bold;
              margin-bottom: 5px;
            }
            .order-details, .items {
              font-size: 12px;
              text-align: left;
              margin-bottom: 5px;
              padding: 0 5px;
            }
            .items div {
              border-bottom: 1px dashed #000;
              padding: 2px 0;
            }
            .footer {
              font-size: 10px;
              margin-top: 10px;
              font-style: italic;
            }
            .separator {
              border-top: 1px dashed #000;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">🍽️ Restaurant EatOrder</div>
            <div class="separator"></div>
            <div class="order-details">
              <strong>Commande #${order.id}</strong><br/>
              <strong>Table :</strong> ${order.table}<br/>
              <strong>Serveur :</strong> ${order.server}<br/>
              <strong>Heure :</strong> ${order.time}
            </div>
            <div class="separator"></div>
            <div class="items">
              <strong>Articles :</strong>
              ${order.items.map(item => `<div>${item}</div>`).join("")}
            </div>
            <div class="separator"></div>
            <div class="footer">Merci pour votre commande ! 😊</div>
          </div>
        </body>
      </html>
    `;
  
    try {
      // 1. Générer un PDF depuis HTML
      const { uri } = await Print.printToFileAsync({ html: orderContent });
  
      // 2. Afficher le chemin du fichier généré (debug)
      console.log("PDF généré :", uri);
  
      // 3. Optionnel : Ouvrir le fichier PDF pour voir si l'impression fonctionne bien
      await shareAsync(uri, { mimeType: "application/pdf", dialogTitle: "Imprimer Ticket" });
  
      // 4. Envoyer à l'impression directement
      await Print.printAsync({ uri });
    } catch (error) {
      console.error("Erreur d'impression :", error);
    }
  };
  

  // Fonction pour mettre à jour le statut de la commande
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Filtrer les commandes en fonction du statut
  const filteredOrders = orders.filter(order =>
    filter === "all" ? true : order.status === filter
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>EatOrder</Text>
      <Text style={styles.orderCountText}>Nombre total de commandes : {filteredOrders.length}</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Icon name="list" size={20} color="#fff" />
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "in progress" && styles.activeFilter]}
          onPress={() => setFilter("in progress")}
        >
          <Icon name="clock-o" size={20} color="#fff" />
          <Text style={styles.filterText}>In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "ready" && styles.activeFilter]}
          onPress={() => setFilter("ready")}
        >
          <Icon name="check" size={20} color="#fff" />
          <Text style={styles.filterText}>Ready</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ordersContainer}>
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderId}>Commande #{order.id}</Text>
            <Text style={styles.tableName}>{order.table}</Text>
            <Text style={styles.server}>Serveur: {order.server}</Text>
            <Text style={styles.time}>Heure: {order.time}</Text>
            <Text style={styles.sectionTitle}>Commandes:</Text>
            {order.items.map((item, index) => (
              <Text key={index} style={styles.orderItem}>• {item}</Text>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.printButton]}
                onPress={() => handlePrint(order.id)}  
              >
                <Icon name="print" size={20} color="#fff" />
              </TouchableOpacity>

              {order.status === "pending" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.validateButton]}
                  onPress={() => updateOrderStatus(order.id, "in progress")}
                >
                  <Icon name="play" size={20} color="#fff" />
                </TouchableOpacity>
              )}

              {order.status === "in progress" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.validateButton]}
                  onPress={() => updateOrderStatus(order.id, "ready")}
                >
                  <Icon name="check" size={20} color="#fff" />
                </TouchableOpacity>
              )}

              {filter === "ready" && order.status === "ready" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.returnButton]}
                  onPress={() => updateOrderStatus(order.id, "in progress")}
                >
                  <Icon name="undo" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.statusText}>Status: {order.status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CommandeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#282c34", padding: 10 },
  headerText: { fontSize: 24, fontWeight: "bold", color: "red", marginVertical: 10, marginLeft: 10 },
  orderCountText: { fontSize: 18, fontWeight: "bold", color: "white", marginVertical: 10, marginLeft: 10 },
  filterContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 15 },
  filterButton: { backgroundColor: "#555", padding: 10, marginHorizontal: 5, borderRadius: 5, alignItems: "center" },
  filterText: { color: "#fff", fontSize: 12, marginTop: 5 },
  activeFilter: { backgroundColor: "#007bff" },
  ordersContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  orderCard: { backgroundColor: "#fff", borderRadius: 8, padding: 15, margin: 5, width: 250 },
  orderId: { fontSize: 16, fontWeight: "bold", color: "black" },
  tableName: { fontSize: 18, fontWeight: "bold", color: "red" },
  server: { fontSize: 14, color: "#555" },
  time: { fontSize: 14, color: "#555", marginBottom: 5 },
  sectionTitle: { fontWeight: "bold", marginTop: 10 },
  orderItem: { fontSize: 16, color: "#333" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  actionButton: { justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 5, width: 40, height: 40 },
  printButton: { backgroundColor: "blue" },
  validateButton: { backgroundColor: "green" },
  returnButton: { backgroundColor: "orange" },
  statusText: { marginTop: 10, fontWeight: "bold", textAlign: "center" },
});









