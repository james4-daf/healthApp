import React, { useState } from 'react'
import { createUser } from '../auth/user'
import { Button, TextInput, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';


export default function SignUpScreen({navigation}) {

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
            <Text>Sign Up Screen</Text>
            <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" label="Email Address" onChangeText={value => setEnteredEmail(value)} />
            <TextInput secureTextEntry={true} placeholder="******" style={styles.input} label="Password" onChangeText={value => setEnteredPassword(value)} />
            <Button
                title="Sign Up"
                onPress={async () => createUser(enteredEmail, enteredPassword)}
            />
            <Button title="Log in instead" onPress={() => navigation.replace('LogIn')}/>
        </View>
    );
}


const styles = {
    input: {
        borderWidth: 1,
        borderRadius: 5
    }
}