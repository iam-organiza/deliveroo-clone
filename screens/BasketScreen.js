import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Currency from 'react-currency-formatter';
import { Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../constants/routes.constant';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';

const BasketScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const total = useSelector(selectBasketTotal);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = React.useState([]);
    const [deleiverFee, setDeleiverFee] = React.useState(1000);

    React.useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    React.useEffect(() => {
        // console.log(groupedItemsInBasket);
    }, [groupedItemsInBasket]);



    return (
        <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }} className={'flex-1 bg-white'}>
            <View className={'flex-1 bg-gray-100'}>
                <View className={'p-4 shadow-sm bg-white border-b border-b-[#00CCBB]'}>
                    <View>
                        <Text className={'text-lg font-bold text-center'}>Basket</Text>
                        <Text className={'text-center text-gray-400'}>{restaurant.title}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className={'rounded-full bg-gray-100 absolute top-3 right-5'}
                    >
                        <XCircleIcon color={'#00CCBB'} size={50} />

                    </TouchableOpacity>
                </View>

                <View className={'flex-row items-center space-x-4 px-4 py-3 bg-white my-5 shadow-sm'}>
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru",
                        }}
                        className={"h-7 w-7 bg-gray-300 p-4 rounded-full"}
                    />
                    <Text className={'flex-1'}>
                        Deliever in 50-75 min
                    </Text>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Text className={'text-[#00CCBB]'}>Change</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className={'divide-y divide-gray-200'}>
                    {
                        Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <View key={key} className={'flex-row items-center space-x-3 bg-white py-2 px-5'}>
                                <Text className={'text-[#00CCBB]'}>{items.length} x</Text>
                                <Image
                                    source={{
                                        uri: urlFor(items[0]?.image).url()
                                    }}
                                    className={'h-12 w-12 rounded-full bg-gray-100'}
                                />
                                <Text className={'flex-1'}>{items[0]?.name}</Text>
                                <Text className={'text-gray-600'}>
                                    <Currency quantity={items[0]?.price} currency={'NGN'} />
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    dispatch(removeFromBasket(items[0]?.id))
                                }}>
                                    <Text className={'text-[#00CCBB]'}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>

                <View className={'p-5 pb-10 bg-white mt-5 space-y-4'}>
                    <View className={'flex-row justify-between'}>
                        <Text className={'text-gray-400'}>Subtotal</Text>
                        <Text className={'text-gray-400'}>
                            <Currency quantity={total} currency={'NGN'} />
                        </Text>
                    </View>

                    <View className={'flex-row justify-between'}>
                        <Text className={'text-gray-400'}>Delivery fee</Text>
                        <Text className={'text-gray-400'}>
                            <Currency quantity={deleiverFee} currency={'NGN'} />
                        </Text>
                    </View>

                    <View className={'flex-row justify-between'}>
                        <Text>Order Total</Text>
                        <Text className={'font-extrabold'}>
                            <Currency quantity={total + deleiverFee} currency={'NGN'} />
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate(routes.PreparingOrderRoute)} className={'bg-[#00CCBB] p-5 rounded-lg'}>
                        <Text className={'text-center text-white text-lg font-extrabold'}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BasketScreen