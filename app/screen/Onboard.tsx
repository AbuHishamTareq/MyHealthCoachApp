import { Canvas, Circle, Group, Mask, SkImage, makeImageFromView, Image } from "@shopify/react-native-skia";
import React, { useRef, useState } from "react";
import { PixelRatio, StyleSheet, View, useWindowDimensions, Text } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";


import data from "../../data/data";
import RenderItem from "../../components/RenderItem";
import CustomButton from "../../components/CustomButton";
import Pagination from "../../components/Pagination";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoard = () => {
    const navigation:any = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const pd = PixelRatio.get();
    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions()
    const [active, setActive] = useState(false)

    const buttonVal = useSharedValue(0)

    const mask = useSharedValue(0)

    const ref = useRef(null)
    const [overlay, setOverlay] = useState<SkImage | null>(null)

    const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
    const handlePress = async () => {
      if(currentIndex === data.length - 1 && !active)
      {
        await AsyncStorage.setItem('ONBOARD', 'true');
        navigation.navigate('Login');

        return
      }

      if(!active) {
        setActive(true)
        const snapshot = await makeImageFromView(ref)
        setOverlay(snapshot)
        await wait(80)
        setCurrentIndex(prev => prev + 1)
        mask.value = withTiming(SCREEN_HEIGHT, {duration: 500})
        buttonVal.value = withTiming(buttonVal.value + SCREEN_HEIGHT)
        await wait(500)

        setOverlay(null)
        mask.value = 0
        setActive(false)
      }
    }

    return (
      <View style={styles.container}>
          <View ref={ref} collapsable={false}>
            {data.map((item, index) => {
                return (
                currentIndex === index && <RenderItem item={item} key={index} />
                )
            })}
          </View>
          {overlay && (
          <Canvas style={StyleSheet.absoluteFillObject} pointerEvents='none'>
              <Mask
              mode="luminance"
              mask= {
                  <Group>
                  <Circle cx={SCREEN_WIDTH / 2} cy={SCREEN_HEIGHT - 130} r={SCREEN_HEIGHT} color='white' />
                  <Circle cx={SCREEN_WIDTH / 2} cy={SCREEN_HEIGHT - 130} r={mask} color='black' />
                  </Group>
              }
              >
              <Image
                  image={overlay}
                  x={0}
                  y={0}
                  width={overlay.width() / pd }
                  height={overlay.height() / pd}
                  color={'lightblue'}
              />
              </Mask>
          </Canvas>
          )}
          <CustomButton handlePress={handlePress} buttonVal={buttonVal} />
          <Pagination data={data} buttonVal={buttonVal} />
          <Text style={ styles.credit }>Illsturation by Tareq A. Deeb</Text>
      </View>
    )
}

export default OnBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  credit: {
    position: 'absolute',
    bottom: 22,
    color: '#FFFFFF'
  }
})