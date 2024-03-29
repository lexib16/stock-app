import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://27211.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const firmSlice = createSlice({
  name: 'firms',
  initialState: { data: [] },
  reducers: {
    getFirms(state, action) {
      state.data = action.payload
    },
    createFirms(state, action) {
      state.data.push(action.payload)
    },
    deleteFirms(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload)
    },
    editFirms(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const firmReducer = firmSlice.reducer

export const getFirms = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/`, {
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 200) {
        dispatch(firmSlice.actions.getFirms(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const createFirms = (firms) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: firms,
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 201) {
        toast.success('Firm created successfully!')
        dispatch(firmSlice.actions.createFirms(res.data))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const deleteFirms = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 204) {
        toast.success('Firm successfully deleted')
        dispatch(firmSlice.actions.deleteFirms(id))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const editFirm = (firms) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/${firms.id}/`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: findRenderedDOMComponentWithClass,
      })
      if (res.status === 200) {
        toast.success('Firm successfully updated!')
        dispatch(firmSlice.actions.editFirms(firms))
      }
    } catch (err) {
      console.log(err)
    }
  }
}