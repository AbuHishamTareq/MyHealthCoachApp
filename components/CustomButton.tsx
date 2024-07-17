import React from 'react';
import { StyleSheet, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import Animated, { SharedValue, interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
    handlePress: () => void;
    buttonVal: SharedValue<number>;
}

const CustomButton = ({handlePress, buttonVal}: Props) => {
    const {height: SCREEN_HEIGHT} = useWindowDimensions()

    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            buttonVal.value,
            [0, SCREEN_HEIGHT, 2 * SCREEN_HEIGHT],
            ['#F0CF69', '#95B6FF', '#FFFFFF']
        )

        return {
            backgroundColor: backgroundColor,
        }
    })

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
            width:
                buttonVal.value === 2 * SCREEN_HEIGHT
                ? withSpring(260)
                : withSpring(75),
            height:
                buttonVal.value === 2 * SCREEN_HEIGHT
                ? withSpring(50)
                : withSpring(75),
        }
    })
    
    const arrowAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                buttonVal.value === 2 * SCREEN_HEIGHT
                ? withTiming(0)
                : withTiming(1),
            transform: [
                {
                    translateX: 
                        buttonVal.value === 2 * SCREEN_HEIGHT
                        ? withTiming(100)
                        : withTiming(0)
                }
            ]
        }
    })

    const textAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                buttonVal.value === 2 * SCREEN_HEIGHT
                ? withTiming(1)
                : withTiming(0),
            transform: [
                {
                    translateX: 
                        buttonVal.value === 2* SCREEN_HEIGHT
                        ? withTiming(0)
                        : withTiming(-100)
                }
            ]
        }
    })

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
       <Animated.View style={[styles.container, animatedColor, buttonAnimationStyle]}>
        <Animated.Text style={ [styles.textButton, textAnimatedStyle] }>JOIN US</Animated.Text>
        <Animated.Image 
            style={[arrowAnimatedStyle, {width: wp(10), height: hp(5)}]}
            source={require('../assets/images/ArrowIcon.png')} />
       </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        bottom: 100,
        width: wp(30),
        height: hp(30),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(30) / 2,
    },

    textButton: {
        color: 'black',
        fontSize: hp(3),
        position: 'absolute',
        fontWeight: 'bold'
    }
})