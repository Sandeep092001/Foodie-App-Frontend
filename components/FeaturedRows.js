import { View, Text } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import RestaurantCards from "./RestaurantCards";
import { useEffect, useState } from "react";
import sanityClient from "../sanity";

const FeaturedRows = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    0;
    sanityClient
      .fetch(
        `*[_type=="featured" && _id== $id]{
        ...,
        restaurants[]->{
          ...,
         dishes[]->,
         type->{
          name
         }
        },
      }[0]
  `,
   { id }
      )
      .then(data => {
        setRestaurants(data?.restaurants);
      });
  }, []);
  // console.log(id);
  // console.log(restaurants);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        onScrollAnimationEnd={true}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={true}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        
        {restaurants?.map(res =>(
          <RestaurantCards
          key={res._id}
          id={res._id}
          imgUrl={res.image}
          title={res.name}
          rating={res.rating}
          genre={res.type?.name}
          address={res.address}
          short_description={res.short_description}
          dishes={res.dishes}
          long={res.long}
          lat={res.lat}
          />
        ))}

        {/* <RestaurantCards
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Rasmalai"
          rating="4.5"
          genre="Bengali"
          address="123 Main Street"
          short_description="This is a short Description"
          dishes={[]}
          long={20}
          lat={0}
        /> */}

        </ScrollView>
    </View>
  );
};

export default FeaturedRows;
