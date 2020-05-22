import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from "../resources/appRoute";
import NotesScreen from '../component/screens/NotesScreen';
import NoteDetailsScreen from '../component/screens/NoteDetailsScreen'

const NoteStackNavigator = createStackNavigator(
    {
        NotesScreen: { screen: NotesScreen },
        NoteDetailsScreen: { screen: NoteDetailsScreen },
    },
    {
        initialRouteName: AppRoute.NotesList,
        headerMode: 'none',
    },
);

export default NoteStackNavigator;