import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { SocialIcon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {

// } from "react-native-heroicons/outline";

const Login = ({ route }) => {
  const navigation = useNavigation();
  const { cellNumber } = route.params;

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isloading, setIsloading] = useState(false);

  const userData = {
    fullName: fullName,
    phone: cellNumber,
    email: email,
    address: address,
  };

  const goToHome = () => {
    setIsloading(true)
    axios
      .post("https://foodie-eqg5.onrender.com/userData", userData)
      .then((response) => {
        if (response.status == 200) {
          setIsloading(false)
          // to be store data in AsyncStorage
          AsyncStorage.setItem("phoneNumber", JSON.stringify(cellNumber));
          AsyncStorage.getItem("phoneNumber").then((value) => {
            if (value != null) {
              navigation.navigate("Home");
            }
          });
          //  navigation.navigate('Home')
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <SafeAreaView>
      <View className="pt-20">
        <Text className="text-center text-2xl font-bold">
          Please Enter Details!
        </Text>
        <View className="flex flex-col justify-center items-center pt-10">
          <Image
            source={{
              uri: "https://links.papareact.com/fls",
            }}
            className="h-20 w-20"
          />
        </View>
        <View className="flex-row items-center p-3 mx-5 rounded border-b-2 border-[#00CCBB] pt-7">
          <TextInput
            value={fullName}
            onChangeText={setfullName}
            className="text-lg"
            placeholder="Enter Fullname"
            keyboardType="default"
          />
        </View>
        <View className="flex-row items-center p-3 mx-5 rounded border-b-2 border-[#00CCBB] pt-7">
          <TextInput
            value={address}
            onChangeText={setAddress}
            className="text-lg"
            placeholder="Enter your full address"
            keyboardType="default"
          />
        </View>
        <View className="flex-row items-center p-3 mx-5 rounded border-b-2 border-[#00CCBB] pt-7">
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="text-lg"
            placeholder="Enter your email address"
            keyboardType="default"
          />
        </View>
        {isloading ? (
          <ActivityIndicator className="mt-6" size="large" color="#00CCBB" />
        ) : (
          <TouchableOpacity
            className="bg-[#00CCBB] mx-5 mt-7 rounded-md p-3"
            onPress={goToHome}
          >
            <Text className="text-white text-xl text-center">Go To Home</Text>
          </TouchableOpacity>
        )}

        {/* <View className="flex-row py-2 mx-4">
          <Text className="text-blue-600 text-lg underline flex-1">
            Forget password?
          </Text>
          <TouchableOpacity onPress={Signup}>
            <Text className="text-blue-600 text-lg underline">Signup?</Text>
          </TouchableOpacity>
        </View> */}

        {/* <i class="fa fa-facebook-official" aria-hidden="true"></i> */}
        <View className="mt-5 flex-row space-x-2 justify-center items-center">
          <SocialIcon type="facebook" iconSize={20} />
          <SocialIcon type="twitter" iconSize={20} />
          <SocialIcon type="instagram" iconSize={20} />
          <SocialIcon type="google" iconSize={20} />
          {/* <SocialIcon type="facebook" iconSize={20}  /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
