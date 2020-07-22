import React from 'react';
import {View, StyleSheet} from 'react-native';

export const AppCard = props => (
<View style = {{...styles.default, ...props.style}}>{props.children}</View>              //{props.children} передаю контент //через спред оператор розгортаю і заміняю об'єкт з даними
)

const styles = StyleSheet.create({
    default: {
        borderWidth: 2,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2},
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10
    }
})