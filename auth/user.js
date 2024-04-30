import axios from 'axios'

const apiKey = 'AIzaSyCBXoRiDWC9su8DAedrgN5FXmd1cvqw-hY'

export const createUser = async (email, password) => {
    try {
        const user = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+apiKey,{email, password})
        console.log(user)
        return user
    }
    catch (error) {
            console.error(error)

    }
}

export const logIn = async (email, password) => {
    try {
        const user = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey, { email, password })
        console.log(user)
        return user
    }
    catch (error) {
        console.error(error)

    }
}
