import { StyleSheet, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import Animated, { SharedValue, interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

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
            style={[arrowAnimatedStyle, {width: 35, height: 38}]}
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
        width: 120,
        height: 120,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

    textButton: {
        color: 'black',
        fontSize: 20,
        position: 'absolute',
        fontWeight: 'bold'
    }
})