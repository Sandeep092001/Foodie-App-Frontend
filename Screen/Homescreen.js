import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import FeaturedRows from "../components/FeaturedRows";
// import image from "./images/as.jpg";
import sanityClient from "../sanity";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import { tw } from 'tailwind-react-native-classnames';

const Homescreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type=="featured"]{
           ...,
         restaurants[]->{
           ...,
           dishes[]->
          }
        }
       `
        )
      .then((data) => {
        setfeaturedCategories(data);
      });
  }, []);

  // console.log(featuredCategories);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

// Logout code
 const logout = () => {
  AsyncStorage.removeItem('phonenumber')
  navigation.navigate('Signup')
 }


  return (
    <SafeAreaView className="bg-white pt-5">
      {/* <Text className='text-red-500'>Homescreen h </Text> */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/004/607/806/small/man-face-emotive-icon-smiling-bearded-male-character-in-yellow-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
          }}
          className="h-7 w-7 bg-gray-300 p-6 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-500 text-xs">Deliver Now !</Text>
          <Text className="text-xl font-bold">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <TouchableOpacity onPress={logout}>
            <UserIcon size={30} color="#00CCBB" />  
        </TouchableOpacity>
      </View>

      {/* Search */}

      <View className="flex-row space-x-2 items-center pb-4 px-4">
        <View className="flex-row space-x-2 bg-gray-200 p-3 items-center flex-1">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput placeholder="Restaurant name" keyboardType="default" />
        </View>

        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 170,
        }}
        onScrollAnimationEnd={true}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}

       {featuredCategories?.map(category =>(
        <FeaturedRows
          key={category._id}
          id={category._id}
          title={category.name}
          description={category.short_description}
        />
       ))}

       
        {/* Tasty Discounts */}

        {/* <FeaturedRows
          id="1234"
          title="Tasty Discounts"
          description="Paid placements From Our Partners"
        /> */}

        {/* offers near you */}

        {/* <FeaturedRows
          id="12345"
          title="Offers near you"
          description="Paid placements From Our Partners"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create({
//   text : {
//       color: '#258471',
//       textAlign: 'center'
//   }
// })
export default Homescreen;
