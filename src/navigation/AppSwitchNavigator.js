import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../component/screens/AuthLoadingScreen';
import AuthStack from './AuthStack';
import AppRoute from '../resources/appRoute';
import NoteTabNavigator from './NoteTabNavigator'

const switchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        Note: NoteTabNavigator
    },
    {
        initialRouteName: AppRoute.AuthLoading,
    },
);

export default createAppContainer(switchNavigator);
