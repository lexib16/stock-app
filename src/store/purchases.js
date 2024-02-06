import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://27211.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: { data: [] },
  reducers: {
    getPurchases(state, action) {
      state.data = action.payload
    },
    createPurchase(state, action) {
      state.data.push(action.payload)
    },
    deletePurchase(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload)
    },
    editPurchase(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const purchasesReducer = purchasesSlice.reducer

export const getPurchases = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(purchasesSlice.action.getPurchases(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const createPurchase = (purchase) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: purchase,
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 201) {
        toast.success('Purchase created successfully!')
        dispatch(purchasesSlice.actions.createPurchase(res.data))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const deletePurchase = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/${id}/`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 204) {
        toast.success('Purchase was successfully deleted')
        dispatch(purchasesSlice.actions.deletePurchase(id))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const editPurchase = (purchase) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/${purchase.id}/`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: purchase,
      })

      if (res.status === 200) {
        toast.success('Purchase successfully updated')
        dispatch(purchasesSlice.actions.editPurchase(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}