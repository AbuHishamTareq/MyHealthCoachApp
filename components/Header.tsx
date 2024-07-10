import { StyleSheet, Text, View} from 'react-native'
import React, { useContext} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Header = ({user, age}: any) => {
    return (
        <LinearGradient
            locations={[ 0, 1 ]}
            colors={[ "#1D8ED1", "#BAECF9" ]}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.nameText}>{user.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
                            <View style={{ flexDirection: 'column', marginRight: wp(5)}}>
                                <Text style={ styles.titleText }>File ID</Text>
                                <Text style={ styles.paramText }>{user.uid}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginRight: wp(5) }}>
                                <Text style={ styles.titleText }>Gender</Text>
                                <Text style={ styles.paramText }>{user.gender}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginRight: wp(5) }}>
                                <Text style={ styles.titleText }>Age</Text>
                                <Text style={ styles.paramText }>{age}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={ styles.titleText }>Your Height</Text>
                                <Text style={ styles.paramText }>{user.height}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={ styles.titleText }>Blood Group</Text>
                                <Text style={ styles.paramText }>{user.blood_group}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(28)
    },
    headerContainer: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(1)
    },
    welcomeText: {
        fontSize: hp(3),
        fontWeight: 'bold',
        color: '#fff'
    },
    nameText: {
        fontSize: hp(3),
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: wp(3)
    },
    titleText: {
        fontSize: hp(2.3),
        fontWeight: 'bold'
    },
    paramText: {
        fontSize: hp(2),
    }
})