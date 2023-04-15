import axios from "axios"

const LOCALHOST = process.env.REACT_LOCALHOST


export const login = (email, password) => {
    return axios
        .post(LOCALHOST + '/account/signin', {
            email,
            password
        })

}