
import React, { Fragment, useEffect, useState } from 'react';
import { Firebase } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import styles from '../../resources/styles';
import colors from '../../resources/colors';
import { Icon } from 'react-native-elements';

import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
const Notes = (props) => {


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        >
            <View><Text>List</Text></View>

            <TouchableOpacity

                onPress={this.details}
            >
                <Text >details </Text>
            </TouchableOpacity >

        </ScrollView >
    );
}
Notes.navigationOptions = (props) => ({
    title: 'Notes',
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerRight: () => (
        <Icon
            name='plus'
            type='entypo'
            color={colors.white}
            onPress={() => props.navigation.navigate(AppRoute.AddNotes)} />
    ),
    headerLeftContainerStyle: {
        marginHorizontal: 16
    }
});
export default Notes