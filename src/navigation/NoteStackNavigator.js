import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from "../resources/appRoute";
import NotesScreen from '../component/screens/NotesScreen';
import NoteDetailsScreen from '../component/screens/NoteDetailsScreen';
import AddNotesScreen from '../component/screens/AddNotesScreen';

const NoteStackNavigator = createStackNavigator(
    {
        NotesScreen: { screen: NotesScreen },
        NoteDetailsScreen: { screen: NoteDetailsScreen },
        AddNotesScreen: { screen: AddNotesScreen },
    },
    {
        initialRouteName: AppRoute.NotesList,
        headerMode: "float",
    },
);

export default NoteStackNavigator;