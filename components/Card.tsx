import { Image, StyleSheet, View, Text } from "react-native";

export default function Card({data, index}: any) {
    const next = require('../assets/images/next.png');
 
    return (
        <View style={[styles.container, { height: index === 1 ? 180 : 150, backgroundColor: data.color }]}>
            <Image source={data.image} style={{height: 35, width: 35, marginTop: -5, marginLeft: -5}} resizeMode="center" />
            <View style={{alignSelf: 'center', margin: 5}}>
                <View style={[styles.circle, styles.progress, { borderColor: data.darkColor }]}>
                    <Text style={[styles.progressText, {color: data.darkColor}]}>{data.status + ' ' + data.unit}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ marginTop: 5, marginLeft: -5, fontWeight: 'bold' }}>{data.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    progress: {
        shadowColor: 'grey',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    progressText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    circle: {
        width: 150,
        height: 50,
        borderRadius: 80 / 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        borderWidth: 5
    }
})