import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { SocialIcon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    try {
      AsyncStorage.getItem("phoneNumber").then((value) => {
        if (value != null) {
          navigation.navigate("Home");
        }
      });
    } catch (error) {
      console.log("error is: ", error);
    }
  }, []);

  const [code, setCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const [isloading, setIsloading] = useState(false);
  // Handle the button press

  const number = { phone: phoneNumber, otp: otp };
  const signInWithPhoneNumber = () => {
    setIsloading(true);

    axios
      .post("https://foodie-eqg5.onrender.com/sendOtp", number)
      .then((response) => {
        if (response.status == 200) {
          setIsloading(false);
          console.log("sent data");
          if (response.data.status == "pending") {
            // setOtp(response.data.Otp);
            setCode(true);
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
    // console.log(phoneNumber);
  };

  function VerifyOtp() {
    setIsloading(true);
    axios
      .post("https://foodie-eqg5.onrender.com/verifyOtp", number)
      .then((response) => {
        if (response.status == 200) {
          setIsloading(false);
          //  console.log('sent data')
          if (response.data.status == "approved") {
            navigation.navigate("Login", {
              cellNumber: phoneNumber,
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  const Login = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <View className="pt-20">
        <Text className="text-center text-3xl font-bold">Signup</Text>
        <View className="flex flex-col justify-center items-center pt-10">
          <Image
            source={{
              uri: "https://links.papareact.com/fls",
            }}
            className="h-20 w-20"
          />
        </View>

        {code ? (
          <View>
            <View className="flex-row items-center p-3 mx-5 rounded border-b-2 border-[#00CCBB] pt-32">
              <TextInput
                className="text-lg"
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                // keyboardType="phone-pad"
                autoFocus={true}
                autoCapitalize="none"
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
            {isloading ? (
              <ActivityIndicator className="mt-6" size="large" color="#00CCBB" />
            ) : (
              <TouchableOpacity
                className="bg-[#00CCBB] mx-5 mt-7 rounded-md p-3"
                // title="Phone Number Sign In"
                onPress={() => VerifyOtp()}
              >
                <Text className="text-white text-xl text-center">Verify</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>
            <View className="flex-row items-center p-3 mx-5 rounded border-b-2 border-[#00CCBB] pt-32">
              <TextInput
                className="text-lg"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter Phone Number"
                // keyboardType="phone-pad"
                autoFocus={true}
                autoCapitalize="none"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            {isloading ? (
              <ActivityIndicator className="mt-6" size="large" color="#00CCBB" />
            ) : (
              <TouchableOpacity
                className="bg-[#00CCBB] mx-5 mt-7 rounded-md p-3"
                // title="Phone Number Sign In"
                onPress={() => signInWithPhoneNumber()}
              >
                <Text className="text-white text-xl text-center">Get OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* <View className="flex-row py-2 mx-4">
           <Text className="text-blue-600 text-lg underline flex-1">
            Forget password?
          </Text>
          <TouchableOpacity onPress={Login}>
            <Text className="text-blue-600 text-lg text-center underline">
              Login?
            </Text>
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

export default Signup;
