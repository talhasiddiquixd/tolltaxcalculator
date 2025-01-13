import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, hp, wp } from '../constants/styleGuide';

// List of interchanges with distances
const interchanges = [
    "Zero Point: 0KM",
    "NS Interchange: 5KM",
    "Ph4 Interchange: 10KM",
    "Ferozpur Interchange: 17KM",
    "Lake City Interchange: 24KM",
    "Raiwand Interchange: 29KM",
    "Bahria Interchange: 34KM",
];

export const Dropdown = ({ data, onSelect, visible }) => {
    if (!visible) return null;

    return (
        <View style={styles.dropdown}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelect(item)}>
                        <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: wp(1),
        backgroundColor: "#fff",
        maxHeight: hp(20),
        marginBottom: hp(2),
        overflow: "hidden",
    },
    dropdownItem: {
        padding: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.gray,
    },
    dropdownText: {
        fontSize: wp(4),
        color: COLOR.black,
    },
})