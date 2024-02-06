import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://27211.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const brandsSlice = createSlice({
  name: 'brands',
  initialState: { data: [] },
  reducers: {
    getBrands(state, action) {
      state.data = action.payload
    },
    createBrand(state, action) {
      state.data.push(action.payload)
    },
    deleteBrand(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload)
    },
    editBrand(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const brandsReducer = brandsSlice.reducer

export const getBrands = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/brands/`, {
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 200) {
        dispatch(brandsSlice.actions.getBrands(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const createBrand = (brand) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/brands/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: brand,
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 201) {
        toast.success('Brand created successfully!')
        dispatch(brandsSlice.actions.createBrand(res.data))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const deleteBrand = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/brands/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 204) {
        toast.success('Brand successfully deleted')
        dispatch(brandsSlice.actions.deleteBrand(id))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const editBrand = (brand) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/brands/${brand.id}/`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: brand,
      })
      if (res.status === 200) {
        toast.success('Brand successfully updated!')
        dispatch(brandsSlice.actions.editBrand(brand))
      }
    } catch (err) {
      console.log(err)
    }
  }
}