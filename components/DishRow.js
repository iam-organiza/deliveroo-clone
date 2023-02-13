import React from 'react';
import Currency from 'react-currency-formatter';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as Icons from "react-native-heroicons/solid";
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemWithId } from '../features/basketSlice';
import { urlFor } from '../sanity';

const DishRow = ({
    id,
    name,
    description,
    price,
    image,
}) => {
    const [isPressed, setPressed] = React.useState(true);

    const dispatch = useDispatch();
    const items = useSelector(state => selectBasketItemWithId(state, id));

    return (
        <>
            <TouchableOpacity className={`bg-white border p-4 border-gray-100 ${isPressed && 'border-b-0'}`} onPress={() => {
                setPressed(prev => !prev);
            }}>
                <View className={'flex-row'}>
                    <View className={'flex-1 pr-2'}>
                        <Text className={'text-lg mb-1'}>{name}</Text>
                        <Text className={'text-gray-400'}>{description}</Text>
                        <Text className={'text-gray-400 mt-1'}>
                            <Currency quantity={price} currency={'NGN'} />
                        </Text>
                    </View>
                    <View>
                        <Image style={{
                            borderWidth: 1,
                            borderColor: "#F3F3F4"
                        }} className={'p-4 h-20 w-20 bg-gray-300'} source={{ uri: urlFor(image).url() }} />
                    </View>
                </View>
            </TouchableOpacity>

            {
                isPressed && (
                    <View className={'flex-row bg-white space-x-2 items-center p-4'}>
                        <TouchableOpacity
                            disabled={!items.length}
                            onPress={() => {
                                if (!items.length > 0) return;
                                dispatch(removeFromBasket(id));
                            }}>
                            <Icons.MinusCircleIcon size={40} color={items.length > 0 ? '#00CCBB' : 'gray'} />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={() => {
                            // setQuantity(prev => prev += 1);
                            dispatch(addToBasket({
                                id,
                                name,
                                description,
                                price,
                                image,
                            }))
                        }} >
                            <Icons.PlusCircleIcon size={40} color='#00CCBB' />
                        </TouchableOpacity>
                    </View>
                )
            }
        </>
    )
}

export default DishRow