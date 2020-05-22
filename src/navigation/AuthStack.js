import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from '../resources/appRoute';
import LoginScreen from '../component/screens/LoginScreen';
import SignupScreen from '../component/screens/SignupScreen';

const AppNavigator = createStackNavigator(
    {
        SignupScreen: { screen: SignupScreen },
        LoginScreen: { screen: LoginScreen }
    },
    {
        initialRouteName: AppRoute.Login,
        headerMode: 'none',
    },
);

export default createAppContainer(AppNavigator);
