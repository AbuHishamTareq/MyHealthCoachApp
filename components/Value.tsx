import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { ImageProps } from 'react-native';

type ValueProps = {
  value: number;
  backgroundColor: string;
  image: ImageProps;
  unit: string
};

export default function Value({ value, image, backgroundColor, unit }: ValueProps) {
  return (
    <View style={ styles.container }>
        <Image source={ image } style= {[{ backgroundColor: backgroundColor }, styles.icon]} resizeMode='center'/>
        <Text style={ styles.valueText }>{ (value !== 0) ? '--' : value}</Text>
        <Text style={ styles.unitText }>{ unit }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection:
        'column', alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    icon: {
        borderRadius: 20,
        width: 40,
        height: 40
    },
    valueText: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 15
    },
    unitText: {
        marginTop: 10,
        fontSize: 10
    }
});