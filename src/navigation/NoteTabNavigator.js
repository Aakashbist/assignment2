import React from 'react';
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddNotesScreen from '../component/screens/AddNotesScreen';
import AppRoute from "../resources/appRoute";
import colors from "../resources/colors";
import NotesStackNavigator from './NoteStackNavigator';

const NoteTabNavigator = createBottomTabNavigator({
    NoteScreen: {
        screen: NotesStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Notes',
            tabBarIcon: ({ tintColor, size }) => (
                <Icon name='menu' type='entypo' size={size} color={tintColor} />
            ),
        }
    },
    AddNotesScreen: {
        screen: AddNotesScreen,
        navigationOptions: {
            tabBarLabel: 'ADD',
            tabBarIcon: ({ tintColor, size }) => (
                <Icon name='plus' type='entypo' size={size} color={tintColor} />

            ),
        }
    }
},
    {
        initialRouteName: AppRoute.AddNotes,
        tabBarOptions: {
            style: {
                height: 54,
                backgroundColor: colors.primaryDark,
                borderTopColor: colors.primaryDark,
                paddingBottom: 8
            },
            activeTintColor: colors.accent,
            inactiveTintColor: colors.white,
            labelStyle: {
                fontSize: 12
            }
        },
        headerMode: 'float'
    }
);

const appContainer = createAppContainer(NoteTabNavigator)


export default appContainer;
