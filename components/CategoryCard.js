import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const CategoryCard = ({ imgURL, title }) => {
  return (
    <TouchableOpacity className={"relative mr-2"}>
      <Image
        className={"h-20 w-20 rounded"}
        source={{
          uri: imgURL,
        }}
        resizeMode={'cover'}
      />
      <Text className={"absolute left-1 bottom-1 text-white font-bold"}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
