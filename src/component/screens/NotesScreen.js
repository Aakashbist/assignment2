
import React, { Fragment, useEffect, useState } from 'react';
import { Firebase } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';


import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
const Notes = (props) => {

    logOut = () => {
        Firebase.auth().signOut();
    }

    details = () => {
        props.navigation.navigate(AppRoute.NoteDetails);
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        >
            <View><Text>List</Text></View>
            <TouchableOpacity

                onPress={this.logOut}
            >
                <Text >signOut </Text>
            </TouchableOpacity >
            <TouchableOpacity

                onPress={this.details}
            >
                <Text >details </Text>
            </TouchableOpacity >
        </ScrollView >
    );
}
export default Notes