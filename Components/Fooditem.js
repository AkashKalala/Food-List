import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const Fooditem = (props) => {
    return(
        <View style={styles.mainItemContainer}>
            <View style={styles.itemContainer}>
                <View style={styles.leftSide}>
                    <Text style={styles.foodItemName}>{props.food}</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text>Price: ₹ {props.cost}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',  
        marginVertical: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#F5F5F5',
        backgroundColor: '#ffff',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',  
    },

    foodItemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    rightSide: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // leftSide: {

    // },
});

export default Fooditem;