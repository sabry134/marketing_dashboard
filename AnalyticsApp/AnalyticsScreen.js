import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AnalyticsScreen = () => {
  const [analyticsKey, setAnalyticsKey] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [soldItemsInput, setSoldItemsInput] = useState("");
  const [dateError, setDateError] = useState("");
  const [soldItemsError, setSoldItemsError] = useState("");

  useEffect(() => {
    loadAnalyticsKey();
  }, []);

  const loadAnalyticsKey = async () => {
    try {
      const savedKey = await AsyncStorage.getItem("analyticsKey");
      if (savedKey !== null) {
        setAnalyticsKey(savedKey);
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error loading analytics key:", error);
    }
  };

  const saveAnalyticsKey = async () => {
    try {
      const response = await fetch(
        `https://ballistic-half-jumper.glitch.me/${analyticsKey}`
      );
      const result = await response.json();

      if ("error" in result && result.error === "Invalid key") {
        alert("Invalid key! Please enter a valid key.");
      } else {
        await AsyncStorage.setItem("analyticsKey", analyticsKey);
        setIsEditable(false);
        alert("Analytics key saved successfully!");
      }
    } catch (error) {
      console.error("Error during GET request:", error);
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDateInput("");
    setSoldItemsInput("");
    setDateError("");
    setSoldItemsError("");
  };

  const submitData = async () => {
    if (!isValidDate(dateInput)) {
      setDateError("Please enter a valid date (DD/MM/YYYY).");
      return;
    }
    if (!isValidNumber(soldItemsInput)) {
      setSoldItemsError("Please enter a valid number (positive or equal to 0, decimals allowed).");
      return;
    }

    try {
      const response = await fetch(`https://ballistic-half-jumper.glitch.me/${analyticsKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateInput,
          Sold: parseFloat(soldItemsInput),
        }),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data. Your analytics key may be expired. Please generate a new one and try again.");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }

    setDateInput("");
    setSoldItemsInput("");
    setDateError("");
    setSoldItemsError("");
    setModalVisible(false);
  };

  const isValidDate = (date) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dateRegex.test(date)) {
      return false;
    }

    const year = parseInt(date.split("/")[2], 10);

    const currentYear = new Date().getFullYear();

    return year <= currentYear;
  };

  const isValidNumber = (number) => {
    const numberRegex = /^[+]?\d*\.?\d+$/;
    return numberRegex.test(number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Analytics Screen</Text>
      <TextInput
        style={styles.input}
        value={analyticsKey}
        onChangeText={(text) => setAnalyticsKey(text)}
        placeholder="Enter Analytics key"
        editable={isEditable}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={saveAnalyticsKey}
          disabled={!isEditable}
        />
        <Button
          title={isEditable ? "Cancel Edit" : "Edit"}
          onPress={handleEdit}
        />
        <Button title="Add Data" onPress={openModal} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date (DD/MM/YYYY)"
              value={dateInput}
              onChangeText={(text) => {
                setDateInput(text);
                setDateError("");
              }}
            />
            {dateError !== "" && (
              <Text style={styles.errorText}>
                {dateError}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Sold items"
              keyboardType="numeric"
              value={soldItemsInput}
              onChangeText={(text) => {
                setSoldItemsInput(text);
                setSoldItemsError("");
              }}
            />
            {soldItemsError !== "" && (
              <Text style={styles.errorText}>
                {soldItemsError}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
              <Pressable style={styles.submitButton} onPress={submitData}>
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
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
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginLeft: "50%",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default AnalyticsScreen;
