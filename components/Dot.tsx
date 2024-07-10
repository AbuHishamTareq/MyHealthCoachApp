import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
    index: number;
    buttonVal: SharedValue<number>
}

const Dot = ({index, buttonVal}: Props) => {
    const {height: SCREEN_HEIGHT} = useWindowDimensions()

    const animatedDotStyle = useAnimatedStyle(() => {
        const widthAnimation = interpolate(
            buttonVal.value,
            [
                (index - 1) * SCREEN_HEIGHT,
                index * SCREEN_HEIGHT,
                (index + 1) * SCREEN_HEIGHT
            ],
            [5,15,5],
            Extrapolation.CLAMP
        )

        const opacityAnimation = interpolate(
            buttonVal.value,
            [
                (index - 1) * SCREEN_HEIGHT,
                index * SCREEN_HEIGHT,
                (index + 1) * SCREEN_HEIGHT
            ],
            [0.5,1,0.5],
            Extrapolation.CLAMP
        )

        return {
            width: widthAnimation,
            opacity: opacityAnimation
        }
    })

    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            buttonVal.value,
            [0, SCREEN_HEIGHT, 2*SCREEN_HEIGHT],
            ['#F0CF69', '#95B6FF', '#FFFFFF']
        )

        return {
            backgroundColor: backgroundColor,
        }
    })

  return (
    <Animated.View style={ [styles.dot, animatedColor, animatedDotStyle] }>
    </Animated.View>
  )
}

export default Dot

const styles = StyleSheet.create({
    dot: {
        height: hp(0.6),
        width: wp(0.6),
        marginHorizontal: wp(0.6),
        borderRadius: wp(0.6),
        top: hp(-2)
    }
})