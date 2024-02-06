import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://27211.fullstack.clarusway.com'

console.log(url)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: sessionStorage.getItem('username') || false,
    token:
      sessionStorage.getItem('token') && atob(sessionStorage.getItem('token')),
    first_name: '',
    last_name: '',
    email: '',
  },
  reducers: {
    auth(state, action) {
      state.currentUser = action.payload.username
      state.token = action.payload.token
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
    },
  },
})

// Async Actions
export const register = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${url}/account/register/`, userInfo)
      if (!res.data.token) throw new Error('Something went wrong!')
      // Update auth state
      const payload = {
        token: res.data.token,
        currentUser: res.data.username,
        last_name: res.data.user.last_name,
        email: res.data.user.email,
        first_name: res.data.user.first_name,
      }

      dispatch(authSlice.actions.auth(payload))
      // Store the token, username
      sessionStorage.setItem('username', res.data.username)
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('first_name', res.data.first_name)
      sessionStorage.setItem('last_name', res.data.last_name)
      sessionStorage.setItem('email', res.data.email)
      toast.success('User registered successfully')
      navigate('/stock/profile')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
}

export const login = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${url}/account/auth/login/`, userInfo)
      if (!res.data.key) throw new Error('Something went wrong!')
      // Update auth state
      const payload = {
        token: res.data.key,
        currentUser: res.data.user.username,
      }

      dispatch(authSlice.actions.auth(payload))
      // Store the token, username
      sessionStorage.setItem('username', res.data.user.username)
      sessionStorage.setItem('token', res.data.key)
      sessionStorage.setItem('admin', res.data.user.is_superuser)
      sessionStorage.setItem('first_name', res.data.user.first_name)
      sessionStorage.setItem('last_name', res.data.user.last_name)
      sessionStorage.setItem('email', res.data.user.email)
      toast.success('User logged in successfully')
      navigate('/stock/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.non_field_errors[0])
    }
  }
}

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      const token = atob(sessionStorage.getItem('token'))
      const res = await axios.post(`${url}/account/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(authSlice.actions.auth({ token: false, currentUser: false }))
        sessionStorage.clear()
        toast.success('User successfully logged out!')
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export const changePassword = (newPass) => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem('token')
      const res = await axios(`${url}/account/auth/password/change`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        data: newPass,
      })

      if (res.status === 200) {
        toast.success('Password successfully changed')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export default authSlice.reducer