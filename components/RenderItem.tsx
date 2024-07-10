import { StyleSheet, View, Text} from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {OnboardingData} from '../data/data'

type Props = {
    item: OnboardingData;
}

const RenderItem = ({item}: Props) => {
    const animation = useRef(null);
    return (
      <View style={[styles.itemContainer, {width: wp(100), height: hp(100), backgroundColor: item.backgroundColor}]}>
        <Text style={[ styles.itemText, { color: item.textColor } ]}>{item.text}</Text>
        <LottieView
              autoPlay
              loop
              ref={animation}
              style={{ width: wp(100), height: hp(50) }}
              source={item.animation}
            />
      </View>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: hp(10)
    },

    itemText: {
      marginTop: hp(0.1),
      textAlign: 'center',
      fontSize: wp(9.5),
      fontWeight: 'bold',
      marginHorizontal: wp(5),
    }
})