import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

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
        height: 5,
        width: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        top: -13
    }
})