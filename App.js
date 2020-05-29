import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import AppSwitchNavigator from "./src/navigation/AppSwitchNavigator";
import { ThemeProvider, colors } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons'


const theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary
  }
};

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends Component {
  render() {
    Icon.loadFont();
    console.disableYellowBox = true;
    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
