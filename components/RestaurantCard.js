import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import colors from "../constants/colors.constant";
import routes from "../constants/routes.constant";
import { urlFor } from "../sanity.js";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className={"mr-3"} onPress={() => {
      navigation.navigate(routes.RestuarantRoute, {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      });
    }}>
      <View style={{ width: 300 }} className={"shadow m-1 bg-white"}>
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          style={{
            width: '100%',
            resizeMode: 'cover'
          }}
          className={"rounded-sm h-36 w-64"}
        />
        <View className={"px-3 pb-4"}>
          <Text className={"font-bold text-lg pt-2"}>{title}</Text>
          <View className={"flex-row items-center space-x-1"}>
            <StarIcon color={colors.green} opacity={0.5} size={22} />
            <Text className={"text-xs text-gray-500"}>
              <Text className={"text-green-500"}>{rating}</Text> · {genre}
            </Text>
          </View>

          <View className={"flex-row items-center space-x-1"}>
            <Icons.MapPinIcon color={colors.gray} size={22} opacity={0.4} />
            <Text numberOfLines={2} style={{ flexShrink: 1, flexWrap: 'wrap' }} className={"text-xs text-gray-500"}>Nearby · {address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
