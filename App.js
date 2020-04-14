import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";

let index = 0;

export default function App() {
  const [value, setValue] = useState("");
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    () => {
      setValue("");
    };
  });

  let [fontsLoaded] = useFonts({
    "Oswald-Bold": require("./assets/fonts/Oswald-Bold.ttf"),
  });

  const addTask = (x) => {
    setTask([...tasks, { value, priority: x, id: index++ }]);
  };

  const delTask = (id) => {
    setTask([...tasks.filter((task) => task.id !== id)]);
  };

  const choosePriority = () => {
    Keyboard.dismiss();
    Alert.alert(
      "Choose Task Priority",
      "",
      [
        {
          text: "HI",
          onPress: () => {
            addTask("rgba(234,130,155,.8)");
          },
          style: "cancel",
        },
        {
          text: "LOW",
          onPress: () => {
            addTask("rgba(110,230,155,.8)");
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri:
                "https://picua.org/images/2020/03/25/682a2a825690eabd1ab1b93317ed0647.jpg",
            }}
            style={styles.bgImage}
          />
          <View
            style={styles.inputForm}
          >
            <View style={{ flex: 0.8 }}>
              <TextInput
                autoCapitalize={"none"}
                autoCorrect={false}
                style={styles.input}
                onChangeText={setValue}
              />
            </View>
            <View style={{ flex: 0.2 }}>
              <Ionicons
                name="ios-add-circle"
                size={40}
                color="yellow"
                onPress={() => {
                  value ? choosePriority() : Alert.alert("empty");
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                "https://picua.org/images/2020/03/25/5a58e84e1c52070b88ab342ec2b3bc16.jpg",
            }}
            style={styles.bgImage}
          />
          <Text style={styles.title}>Tasks</Text>
          <FlatList
            keyExtractor={(item) => item.value}
            data={tasks}
            renderItem={({ item }) => (
              <View
                style={styles.taskText}
              >
                <View
                  style={{...styles.taskTitle,
                    backgroundColor: `${item.priority}`,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="md-remove-circle"
                      size={28}
                      color="yellow"
                      onPress={() => delTask(item.id)}
                    />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      padding: 8,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Oswald-Bold",
  },
  bgImage:{
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  inputForm:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "red",
    fontSize: 40,
    fontFamily: "Oswald-Bold",
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "transparent",
    borderColor: "white",
    height: 40,
    marginHorizontal: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Oswald-Bold",
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Oswald-Bold",
  },
  taskTitle:{
    width: "100%",
     marginHorizontal: 10,
    // marginBottom: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    fontFamily: "Oswald-Bold",
  },
  taskText:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    width: 300,
    fontFamily: "Oswald-Bold",
  },
});
