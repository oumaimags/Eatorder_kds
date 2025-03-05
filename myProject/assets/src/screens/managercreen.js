import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// --------------------------
// User Management Component
// --------------------------
const UserManagement = () => {
  // State variables for user inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // State for the list of users
  const [users, setUsers] = useState([
    { id: 1, username: "user1", role: "staff" },
    { id: 2, username: "user2", role: "manager" },
  ]);

  // State variables to control modal visibility and deletion target
  const [registrationModalVisible, setRegistrationModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Function to register a new user
  const handleRegister = () => {
    const newUser = { id: Date.now(), username, role };
    setUsers([...users, newUser]);
    // Show the registration success modal
    setRegistrationModalVisible(true);
  };

  // Function to close the registration modal and reset inputs
  const closeRegistrationModal = () => {
    setRegistrationModalVisible(false);
    setUsername("");
    setRole("");
    setPassword("");
  };

  // Function to initiate the delete confirmation modal
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setDeleteModalVisible(true);
  };

  // Function to delete a user after confirmation
  const handleDeleteConfirmed = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((user) => user.id !== userToDelete));
    }
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  // Function to update a user by pre-filling the input fields and removing the user from the list
  const handleUpdate = (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    setUsername(userToUpdate.username);
    setRole(userToUpdate.role);
    // Remove user to allow updating on re-registration
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>User Management</Text>

      {/* Username input field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Role input field */}
      <TextInput
        style={styles.input}
        placeholder="Role (staff, manager, dispatcher)"
        value={role}
        onChangeText={setRole}
      />

      {/* Button to register a new user */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.userListTitle}>User List</Text>
      <ScrollView style={styles.userList}>
        {users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>
                {user.username} ({user.role})
              </Text>
            </View>
            <View style={styles.userActions}>
              {/* Button to update user */}
              <TouchableOpacity onPress={() => handleUpdate(user.id)}>
                <Icon name="edit" size={20} color="blue" />
              </TouchableOpacity>
              {/* Button to trigger delete confirmation modal */}
              <TouchableOpacity
                onPress={() => confirmDelete(user.id)}
                style={styles.deleteIcon}
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Registration Success Modal */}
      <Modal
        transparent
        visible={registrationModalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>User Registered</Text>
            <Text style={styles.modalText}>Username: {username}</Text>
            <Text style={styles.modalText}>Role: {role}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeRegistrationModal}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Confirmation</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this user?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={handleDeleteConfirmed}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// --------------------------
// Menu Management Component
// --------------------------
const MenuManagement = () => { 
  // State for menu items list
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Pizza", description: "Cheese Pizza", price: 10, ingredients: "Cheese, Dough, Tomato" },
    { id: 2, name: "Burger", description: "Classic Burger", price: 8, ingredients: "Bread, Beef, Lettuce, Tomato" },
  ]);

  // States for the add item modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // States for the delete confirmation modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // To track the item to be deleted

  // Function to add a new menu item
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: newName,
      description: newDescription,
      price: parseFloat(newPrice), // Ensure the price is a number
      ingredients: newIngredients,
    };
    setMenuItems([...menuItems, newItem]);
    setAddModalVisible(false); // Close modal after adding
  };

  // Function to delete a menu item
  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    setDeleteModalVisible(false); // Close confirmation modal
    setItemToDelete(null); // Clear the item to delete
  };

  // Function to update a menu item
  const handleUpdateItem = (id) => {
    const itemToUpdate = menuItems.find((item) => item.id === id);
    setNewName(itemToUpdate.name);
    setNewDescription(itemToUpdate.description);
    setNewPrice(itemToUpdate.price.toString()); // Convert number to string for input
    setNewIngredients(itemToUpdate.ingredients);
    setAddModalVisible(true); // Open modal for updating item
  };

  // Function to open the add item modal and reset the form fields
  const openAddModal = () => {
    setNewName(""); // Reset fields to be empty
    setNewPrice(""); 
    setNewIngredients(""); 
    setNewDescription(""); 
    setAddModalVisible(true); // Show the modal
  };

  // Function to show the delete confirmation modal
  const confirmDelete = (id) => {
    setItemToDelete(id);
    setDeleteModalVisible(true);
  };

  // Function to handle the confirmation of deletion
  const handleDeleteConfirmed = () => {
    if (itemToDelete !== null) {
      handleDeleteItem(itemToDelete);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Menu Management</Text>
      {menuItems.map((item) => (
        <View key={item.id} style={styles.menuItem}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{`$${item.price}`}</Text>
          <Text>{`Ingredients: ${item.ingredients}`}</Text>
          <View style={styles.menuItemActions}>
            {/* Button to update item */}
            <TouchableOpacity onPress={() => handleUpdateItem(item.id)}>
              <Icon name="edit" size={20} color="blue" />
            </TouchableOpacity>
            {/* Button to delete item */}
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={openAddModal}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Add Item Modal */}
      <Modal transparent visible={addModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Menu Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newPrice}
              onChangeText={setNewPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingredients"
              value={newIngredients}
              onChangeText={setNewIngredients}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalAddButton]}
                onPress={handleAddItem}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Confirmation</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={handleDeleteConfirmed}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



// --------------------------
// Station Management Component
// --------------------------
const StationManagement = () => {
  const [stations, setStations] = useState([
    { id: 1, name: "Grill", tablets: 1, paused: false },
    { id: 2, name: "Fryer", tablets: 1, paused: false },
  ]);
  const [newStationName, setNewStationName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [stationToDelete, setStationToDelete] = useState(null); // State to track the station to be deleted

  const handleAddStation = () => {
    if (newStationName.trim() !== "") {
      const newStation = {
        id: Date.now(),
        name: newStationName,
        tablets: 1,
        paused: false,
      };
      setStations([...stations, newStation]);
      setNewStationName("");
      setModalVisible(false);
    }
  };

  const handleDeleteStation = (id) => {
    setStations(stations.filter((station) => station.id !== id));
    setDeleteModalVisible(false);
    setStationToDelete(null);
  };

  const handlePauseStation = (id) => {
    setStations(
      stations.map((station) =>
        station.id === id ? { ...station, paused: !station.paused } : station
      )
    );
  };

  // Function to show the delete confirmation modal
  const confirmDelete = (id) => {
    setStationToDelete(id);
    setDeleteModalVisible(true);
  };

  // Function to handle the confirmation of deletion
  const handleDeleteConfirmed = () => {
    if (stationToDelete !== null) {
      handleDeleteStation(stationToDelete);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Station Management</Text>
      {stations.map((station) => (
        <View key={station.id} style={styles.stationItem}>
          <Text>{station.name}</Text>
          <TouchableOpacity onPress={() => confirmDelete(station.id)}>
            <Icon name="trash" size={20} color="red" style={styles.iconMargin} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePauseStation(station.id)}>
            <Icon
              name={station.paused ? "play" : "pause"}
              size={20}
              color={station.paused ? "green" : "orange"}
              style={styles.iconMargin}
            />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Station</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Station</Text>
            <TextInput
              style={styles.input}
              placeholder="Station Name"
              value={newStationName}
              onChangeText={setNewStationName}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalAddButton]}
                onPress={handleAddStation}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Confirmation</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this station?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={handleDeleteConfirmed}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

  
// --------------------------
// Manager Screen Component
// --------------------------
const ManagerScreen = () => {
  // State variable to control the active section
  const [selectedSection, setSelectedSection] = useState("users");

  // Function to render the selected management section
  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UserManagement />;
      case "menus":
        return <MenuManagement />;
      case "stations":
        return <StationManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Sidebar navigation */}
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => setSelectedSection("users")}>
          <Icon
            name="user"
            size={30}
            color={selectedSection === "users" ? "red" : "black"}
          />
          <Text style={styles.iconText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("menus")}>
          <Icon
            name="cutlery"
            size={30}
            color={selectedSection === "menus" ? "red" : "black"}
          />
          <Text style={styles.iconText}>Menus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("stations")}>
          <Icon
            name="building"
            size={30}
            color={selectedSection === "stations" ? "red" : "black"}
          />
          <Text style={styles.iconText}>Stations</Text>
        </TouchableOpacity>
      </View>
      {/* Content section */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>EatOrder</Text>
        {renderSection()}
      </View>
    </View>
  );
};

export default ManagerScreen;

// --------------------------
// Stylesheet for the application
// --------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F4F6F9",
  },
  sidebar: {
    width: 100,
    backgroundColor: "#222",
    alignItems: "center",
    paddingTop: 30,
    height: "100%",
  },
  iconText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  userListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  userList: {
    maxHeight: 200,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  userInfo: {
    flex: 1,
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
  userActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    marginLeft: 15,
  },
  menuItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  stationItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconMargin: {
    marginLeft: 15,
  },
  // --------------------------
  // Modal Styles with zIndex set to 999999
  // --------------------------
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999999,
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    zIndex: 999999,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    backgroundColor: "gray",
    flex: 1,
    marginRight: 10,
  },
  modalDeleteButton: {
    backgroundColor: "red",
    flex: 1,
    marginLeft: 10,
  },
});
