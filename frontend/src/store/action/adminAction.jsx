import axios from '../../config/axios'

export const fetchLogin = (userInfo) => {
    return (dispatch) => {
        console.log(userInfo)
        axios.post(`/${userInfo.role}/login`, {
            email: userInfo.email,
            password: userInfo.password
        })
            .then(({ data }) => {
                var userData = data
                localStorage.setItem('access_token', userData.access_token)
                dispatch({ type: "USER_LOGIN", payload: userData })
            })
            .catch(err => {
                alert('Login Gagal')
            })
    }
}

export const registerUser = (payload) => {
    return (dispatch) => {
        
    }
}