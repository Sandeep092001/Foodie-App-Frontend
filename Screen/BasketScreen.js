import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { SafeAreaView } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { removeFromBasket } from "../features/basketSlice";
import { urlFor } from "../sanity";
import RazorpayCheckout from 'react-native-razorpay';


const BasketScreen = () => {
  const navigation = useNavigation();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   })
  // }, [])
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const BasketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);


//   console.log(groupedItemsInBasket);



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center pt-5">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5 pt-4"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1"> Deliver in 15-20 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={BasketTotal} currency="INR" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="INR" />
            </Text>
          </View>


          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="text-gray-400">
              <Currency quantity={BasketTotal + 5.99} currency="INR" />
            </Text>
          </View>
         
         <TouchableOpacity
           onPress={() => {
            var options = {
              description: 'Food Delivery App',
              image: '../assets/icon.png',
              currency: 'INR',
              key: 'rzp_test_MMms4eYt4lWxXo',
              amount: '5000',
              name: 'Foodie',
              // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
              prefill: {
                email: 'sandeep.singh.tech11@gmail.com',
                contact: '6261884243',
                name: 'Sandeep Singh',
              },
              theme: {color: '#00CCBB'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
  
                // eslint-disable-next-line no-alert
                // alert(`Success: ${data.razorpay_payment_id}`);
                navigation.navigate('PreparingOrderScreen')

              })
              .catch(error => {
                // handle failure
                console.log(error);
                // eslint-disable-next-line no-alert
                alert(`Error: ${error} | ${error.description}`);
              });
          }}
          className='rounded-lg bg-[#00CCBB] p-4'>
            <Text className='text-center text-white text-lg font-bold'>
                Place Order
            </Text>
         </TouchableOpacity>

        </View>
      </View>
      {/* <Text>BasketScreen</Text> */}
    </SafeAreaView>
  );
};

export default BasketScreen;
