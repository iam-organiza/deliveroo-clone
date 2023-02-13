import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import colors from "../constants/colors.constant";
import sanityCilent from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityCilent.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `).then(data => {
      setFeaturedCategories(data);
    }).catch(error => { });
  }, [])

  return (
    <SafeAreaView className={"flex-1 bg-white"}>
      <View className={"flex-1 px-4"}>
        <View className={"flex-row items-center space-x-2 pb-3"}>
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className={"h-7 w-7 bg-gray-300 p-4 rounded-full"}
          />

          <View className={"flex-1"}>
            <Text className={"font-bold text-gray-400 text-xs"}>
              Deliever Now!
            </Text>
            <Text className={"font-bold text-xl space-x-2"}>
              Current Location
              <Icons.ChevronDownIcon size={20} color={colors.primary} />
            </Text>
          </View>

          <Icons.UserIcon size={35} color={colors.primary} />
        </View>

        <View className={"flex-row space-x-2 items-center mb-3"}>
          <View className={"flex-row bg-gray-200 flex-1 p-3 space-x-2"}>
            <Icons.MagnifyingGlassIcon size={20} color={colors.gray} />
            <TextInput placeholder="Resturants and cuisines" />
          </View>
          <Icons.AdjustmentsVerticalIcon color={colors.primary} />
        </View>

        <ScrollView>
          <View>
            <Categories />
          </View>

          <View>
            {
              featuredCategories?.map((feature) => (
                <FeaturedRow
                  key={feature._id}
                  id={feature._id}
                  title={feature.name}
                  description={feature.short_description}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
