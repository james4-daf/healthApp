import React, { useState } from 'react'
import { createUser, logIn } from '../auth/user'
import { Button, TextInput, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function LogInScreen({navigation}) {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    // function signUpHandler() {
    //     console.log('Sign up button pressed');
    //     createUser(enteredEmail, enteredPassword).then((response) => {
    //         console.log('User created successfully:', response);
    //     }).catch((error) => {
    //         console.error('Error creating user:', error);
    //     });

    // }
    return (
        <View style={styles.container}>
            <Text>log in Screen</Text>
            <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" label="Email Address" onChangeText={value => setEnteredEmail(value)} />
            <TextInput secureTextEntry={true} placeholder="******" style={styles.input} label="Password" onChangeText={value => setEnteredPassword(value)} />
            <Button
                title="Log In"
                onPress={async () => logIn(enteredEmail, enteredPassword)}
            />
            <Button title="Sign Up instead" onPress={() => navigation.replace('SignUp')}/>
        </View>
    );
}


const styles = {
    input: {
        borderWidth: 1,
        borderRadius: 5
    }
}