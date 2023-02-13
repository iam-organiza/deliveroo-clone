import React from 'react';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import routes from '../constants/routes.constant';

const PreparingOrderScreen = () => {
    const navigation = useNavigation();


    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate(routes.DeliveryRoute);
        }, 4000);
    }, []);

    return (
        <SafeAreaView className={'bg-white flex-1 justify-center items-center'}>
            <Animatable.Image
                source={require('../assets/order_loading.gif')}
                animation={'slideInUp'}
                iterationCount={1}
                className={'h-96 w-96'}
            />

            <Animatable.Text
                animation={'slideInUp'}
                iterationCount={1}
                className={'text-lg text-[#00CCBB] my-10 font-bold text-center'}
            >
                Waiting for resturant to accept your order!
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color={'#00CCBB'} />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen