import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
import { useState, useEffect } from "react";
import { saveTasksToStorage, loadTasksFromStorage } from "./utils/storage";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks from AsyncStorage on app start
  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await loadTasksFromStorage();
      setTaskItems(savedTasks);
    };
    fetchTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    saveTasksToStorage(taskItems);
  }, [taskItems]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    console.log(task);
    setTask("");
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    if (selectedTask === index) setSelectedTask(null);
  };

  const handleSelectTask = (index) => {
    setSelectedTask(index === selectedTask ? null : index);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
        },
      ]}
    >
      {/* Transparent Status Bar */}
      <StatusBar
        transparent
        backgroundColor="transparent"
        style="light"
      ></StatusBar>

      {/* Today's task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView
          style={styles.items}
          contentContainerStyle={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* This is where the tasks will go! */}
          {taskItems.map((item, index) => {
            return (
              <View
                key={index}
                onPress={() => handleSelectTask(index)}
                onLongPress={() =>
                  console.log(`Task ${index} selected for text highlighting`)
                }
              >
                <Task text={item} index={index} completeTask={completeTask} />
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Write a task  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
          multiline={true}
          scrollEnabled={true}
          maxLength={500}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2efce",
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    flex: 1,
    marginTop: 15,
  },
  itemsContainer: {
    paddingBottom: 100,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f2efce",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#dce1e8",
    borderWidth: 1,
    width: 300,
    maxHeight: 80,
    overflow: "hidden",
  },
  addWrapper: {
    width: 46,
    height: 46,
    backgroundColor: "#f5b145",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 30,
    color: "#fff",
  },
});
