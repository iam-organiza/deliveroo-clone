import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'

import Currency from 'react-currency-formatter'
import routes from '../constants/routes.constant'

const BasketCard = () => {
    const navigation = useNavigation();
    const items = useSelector(selectBasketItems);
    const total = useSelector(selectBasketTotal);

    if (!items.length) return null;

    return (
        <View className={'absolute bottom-10 w-full z-50 p-4'}>
            <TouchableOpacity onPress={() => navigation.navigate(routes.BasketRoute)} className={'flex-1 flex-row items-center justify-between p-4 rounded-lg bg-[#00CCBB]'}>
                <Text className={'text-lg text-white font-extrabold bg-[#01A296] py-1 px-2'}>{items.length}</Text>
                <Text className={'text-lg text-white font-extrabold text-center'}>View Basket</Text>
                <Text className={'text-lg text-white font-extrabold'}>
                    <Currency quantity={total} currency={'NGN'} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketCard