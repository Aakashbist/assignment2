import React, { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { Firebase } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import styles from '../../resources/styles';

const AuthLoading = (props) => {
    useEffect(() => {
        currentAuthState();
    })

    currentAuthState = () => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                props.navigation.navigate(AppRoute.Note);

            }
            else {
                props.navigation.navigate(AppRoute.Auth)
            }
        });
    };

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

export default AuthLoading