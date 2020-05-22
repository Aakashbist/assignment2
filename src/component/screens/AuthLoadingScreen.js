import React, { Component } from 'react';
import { ActivityIndicator, Image, View, Alert } from 'react-native';
import { Firebase } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import styles from '../../resources/styles';

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.currentAuthState();
    }

    currentAuthState = () => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate(AppRoute.Note);

            }
            else {
                this.props.navigation.navigate(AppRoute.Auth)
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/Note-Icon.png')}
                    style={{ width: 400, height: 400 }}
                />
                <ActivityIndicator style={{ marginTop: 30 }} />
            </View>
        );
    }
}