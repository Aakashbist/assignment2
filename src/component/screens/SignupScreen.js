import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, ProgressBarAndroid, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Firebase } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import parseFirebaseError from '../errorParser/firebaseErrorParser';

const SignupSteps = {
    SIGNUP: 0,
    SIGNUP_SUCCESS: 1
}



const Signup = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [step, setStep] = useState(SignupSteps.SIGNUP);
    const [canSignUp, setCanSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        let _canSignUp = email.trim().length > 0 && password.trim().length > 0 &&
            name.trim().length > 0 && !isLoading;
        if (canSignUp !== _canSignUp) {
            setCanSignUp(_canSignUp);
        }
    }, [name, email, password, isLoading]);

    handleSignUp = () => {
        setIsLoading(true);
        Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userInfo) => {
                clearFields();
                setStep(SignupSteps.SIGNUP_SUCCESS);
            })
            .catch((error) => {
                let errorMessage = parseFirebaseError(error);
                if (errorMessage) {
                    setError(errorMessage);
                }
            })
            .finally(() => setIsLoading(false));
    }

    navigateToLogin = () => {
        props.navigation.navigate(AppRoute.Login);
    }



    clearFields = () => {
        setEmail('');
        setPassword('');
        setName('');
    }

    let errorView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

    let view = isLoading ? <ProgressBarAndroid color={colors.primaryDark} style={{ height: 440 }} /> : step === SignupSteps.SIGNUP ? <React.Fragment>
        <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder='Name'
            autoCapitalize='words'

        />
        <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder='Email'
            autoCapitalize='none'
        />
        <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder='Password'
            secureTextEntry={true}
        />


        {errorView}

        <TouchableOpacity
            style={canSignUp ? styles.button : styles.buttonDisabled}
            onPress={this.handleSignUp}
            disabled={!canSignUp}
        >
            <Text style={canSignUp ? styles.buttonText : styles.buttonTextDisabled}>SignUp </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 20 }}>
            <Text> Already have an account?
        <Text onPress={() => props.navigation.navigate(AppRoute.Login)} style={styles.primaryText}> Login </Text>
            </Text>
        </View>
    </React.Fragment> :
        <React.Fragment>
            <Container style={styles.containerFull}>
                <Text style={styles.primaryTextHeading}>Account Created</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 50 }}>Your Account is created please verify your account.</Text>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={navigateToLogin}>
                    <Text style={styles.primaryText}>Go Back to Login</Text>
                </TouchableOpacity>

            </Container>
        </React.Fragment>;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/Note-Icon.png')}
                    style={{ width: 200, height: 200, marginBottom: 30 }}
                />
                {view}
            </View>
        </ScrollView>
    )
}

export default Signup
