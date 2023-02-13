import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Icons from "react-native-heroicons/outline";
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { useDispatch } from 'react-redux';
import BasketCard from '../components/BasketCard';
import DishRow from '../components/DishRow';
import colors from '../constants/colors.constant';
import { setRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';

const RestuarantScreen = () => {
    const { params: {
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
    } } = useRoute();

    const navigate = useNavigation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setRestaurant({
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
        }));
    }, []);

    React.useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <>
            <BasketCard />
            <ScrollView>
                <View className={'relative'}>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        className={'h-56 w-full bg-gray-300 p-4'}
                    />

                    <TouchableOpacity
                        className={'absolute top-14 left-5 p-2 bg-gray-100 rounded-full'}
                        onPress={navigate.goBack}>
                        <ArrowLeftIcon size={24} color={'#00CCBB'} />
                    </TouchableOpacity>
                </View>

                <View className={'bg-white'}>
                    <View className={'px-4 pt-4'}>
                        <Text className={'text-3xl font-bold'}>
                            {title}
                        </Text>
                        <View className={'flex-row space-x-2 my-1'}>
                            <View className={'flex-row items-center space-x-1'}>
                                <StarIcon size={22} color={colors.green} opacity={0.5} />
                                <Text className={"text-xs text-gray-500"}>
                                    <Text className={"text-green-500"}>{rating}</Text> · {genre}
                                </Text>
                            </View>

                            <View className={'flex-row items-center space-x-1'}>
                                <Icons.MapPinIcon color={colors.gray} size={22} opacity={0.5} />
                                <Text numberOfLines={2} className={"text-xs w-64 text-gray-500"}>
                                    <Text>Nearby</Text> · {address}
                                </Text>
                            </View>
                        </View>

                        <Text className={'text-gray-500 mt-2 pb-4'}>{short_description}</Text>
                    </View>

                    <TouchableOpacity
                        className={'p-4 border-y border-gray-300 flex-row items-center'}
                        onPress={() => {

                        }}>
                        <>
                            <Icons.QuestionMarkCircleIcon color={colors.gray} size={20} opacity={0.6} />
                            <Text className={'pl-2 flex-1 text-md font-bold'}>Have a food allergy?</Text>
                            <Icons.ChevronRightIcon color={colors.gray} />
                        </>
                    </TouchableOpacity>
                </View>


                <View className={'pb-36'}>
                    <Text className={'px-4 pt-6 mb-3 font-bold text-xl'}>Menu</Text>


                    {
                        dishes?.map(dish => (
                            <DishRow
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.short_description}
                                price={dish.price}
                                image={dish.image}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}

export default RestuarantScreen