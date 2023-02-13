import React from "react";
import { ScrollView, Text, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import colors from "../constants/colors.constant";
import sanityCilent from "../sanity";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    sanityCilent.fetch(`
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        }
      }[0]
    `, { id }).then(data => {
      setRestaurants(data?.restaurants);
    }).catch(error => { });
  }, [id])

  // React.useEffect(() => {
  //   console.log('====================================');
  //   console.log(restaurants);
  //   console.log('====================================');
  // }, [restaurants]);

  return (
    <View>
      <View className={"mt-4 flex-row items-center justify-between"}>
        <Text className={"font-bold text-lg"}>{title}</Text>
        <Icons.ArrowRightIcon color={colors.primary} />
      </View>

      <Text className={"text-xs text-gray-500"}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={
          {
            //   paddingHorizontal: 15,
          }
        }
        showsHorizontalScrollIndicator={false}
        className={"pt-4"}
      >
        {
          restaurants?.map(restaurant => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.lng}
              lat={restaurant.lat}
            />
          ))
        }
        {/* <RestaurantCard
          id={1}
          imgUrl={"https://links.papareact.com/gn7"}
          title={"Yo! Sushi"}
          rating={"4.5"}
          genre={"Japanese"}
          address={"123 Main St"}
          short_description={"This is a test description"}
          dishes={[]}
          long={20}
          lat={0}
        />
        <RestaurantCard
          id={1}
          imgUrl={"https://links.papareact.com/gn7"}
          title={"Yo! Sushi"}
          rating={"4.5"}
          genre={"Japanese"}
          address={"123 Main St"}
          short_description={"This is a test description"}
          dishes={[]}
          long={20}
          lat={0}
        />
        <RestaurantCard
          id={1}
          imgUrl={"https://links.papareact.com/gn7"}
          title={"Yo! Sushi"}
          rating={"4.5"}
          genre={"Japanese"}
          address={"123 Main St"}
          short_description={"This is a test description"}
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
