
import React, { Fragment, useEffect, useState } from 'react';
import { Firebase } from '../../config/Firebase';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../resources/styles';
import colors from '../../resources/colors';

const NoteDetails = (props) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        >
            <View><Text>details </Text></View>
        </ScrollView>
    );
}
NoteDetails.navigationOptions = ({ navigation }) => ({
    title: "Details",
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerRight: () => (
        <TouchableOpacity
            onPress={() => Firebase.auth().signOut()}
        ><Text style={styles.buttonText}>LogOut </Text></TouchableOpacity>
    ),
    headerLeftContainerStyle: {
        marginHorizontal: 16
    }
});
export default NoteDetails