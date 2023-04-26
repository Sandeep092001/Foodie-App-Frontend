import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import SanityClient from "../sanity";

const Categories = () => {
 const [Category, setCategory] = useState([])
  useEffect(() => {
    SanityClient.fetch(
      `
      *[_type=="category" ]{
        ...,
      }

      `
    ).then((data)=>{
       setCategory(data);
    })
  }, [])
  
  // console.log(Category);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* categoryCard */}
      {Category?.map(cate => (
          <CategoryCard 
          key={cate._id}
          imgUrl={cate.image}
          title={cate.name}/>
      ))}
      {/* <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 2"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 3"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 2"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 3"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 2"/>
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 3"/> */}
    </ScrollView>
  );
};

export default Categories;
