import AsyncStorage from "@react-native-async-storage/async-storage";

const TASK_STORAGE_KEY = "tasks";

// Save tasks to AsyncStorage
export const saveTasksToStorage = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASK_STORAGE_KEY, jsonValue);
  } catch (err) {
    console.error("Failed to save tasks:", err);
  }
};

// Load tasks from AsyncStorage
export const loadTasksFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASK_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.error("Failed to load tasks: ", err);
  }
};

// Clear all tasks from AsyncStorage (optional)
export const clearTasksFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(TASK_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear: ", err);
  }
};
