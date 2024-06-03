import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
  Octicons,
  Feather,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
const More = () => {
  
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#F2E8DE]">
      <ScrollView>
        <View style={tw`items-center mb-3`}>
          <Image
            source={require("../../assets/Images/logo-removebg.png")}
            style={tw`w-32 h-32`}
          />
        </View>

        <View className="flex py-3 ">
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center "
            onPress={() => {
              navigation.navigate("EditUserProfile");
            }}
          >
            <Entypo name="shop" size={22} color="black" />
            <Text className="ml-2">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center "
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <FontAwesome name="user-circle-o" size={22} color="black" />
            <Text className="ml-2">Personal Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              navigation.navigate("BusinessPage");
            }}
          >
            <AntDesign name="setting" size={22} color="black" />
            <Text className="ml-2">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Octicons name="report" size={21} color="black" />
            <Text className="ml-2">Report a problem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Entypo name="share" size={22} color="black" />
            <Text className="ml-2">Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <FontAwesome name="user-circle-o" size={22} color="black" />
            <Text className="ml-2">About Berso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <AntDesign name="filetext1" size={22} color="black" />
            <Text className="ml-2">Terms of service and privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Feather name="log-in" size={22} color="black" />
            <Text className="ml-2">Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center"
            onPress={() => {
              AsyncStorage.removeItem("userToken");
              logout();
              navigation.navigate("Home");
            }}
          >
            <Feather name="log-out" size={22} color="black" />
            <Text className="ml-2">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default More;
