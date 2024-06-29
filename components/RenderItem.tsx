import { StyleSheet, View, Text, useWindowDimensions} from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

import {OnboardingData} from '../data/data'

type Props = {
    item: OnboardingData;
}

const RenderItem = ({item}: Props) => {
    const animation = useRef(null);
    const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions()
    return (
      <View style={[styles.itemContainer, {width: SCREEN_WIDTH, height: SCREEN_WIDTH, backgroundColor: item.backgroundColor}]}>
        <Text style={[ styles.itemText, { color: item.textColor } ]}>{item.text}</Text>
        <LottieView
              autoPlay
              loop
              ref={animation}
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 2 }}
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
        paddingTop: 50
    },

    itemText: {
      marginTop: 10,
      textAlign: 'center',
      fontSize: 35,
      fontWeight: 'bold',
      marginHorizontal: 20,
    }
})