import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
   setTimeout(()=>{
    navigation.navigate('DeliveryScreen');
   }, 4000)
  }, [])
  

  return (
    <SafeAreaView className='bg-gray-50 flex-1 justify-center items-center'>
      <Animatable.Image
       source={require('./images/rider.gif')}
       animation='slideInLeft'
       iterationCount={10}
       className='h-40 w-40'
      />
      

      <Animatable.Text
       animation="slideInUp"
       iterationCount={1}
       className='text-lg my-10 test-white font-bold text-center'
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
       
      <Progress.Circle size={60} indeterminate={true} color='green' />
      {/* <Text className='text-2xl font-bold pt-5'>Preparing Your Order! </Text> */}
    </SafeAreaView>
  )
}

export default PreparingOrderScreen