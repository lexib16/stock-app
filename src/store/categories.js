import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://27211.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const categoriesSlices = createSlice({
  name: 'categories',
  initialState: { data: [] },
  reducers: {
    getCategories(state, action) {
      state.data = action.payload
    },
    createCategory(state, action) {
      state.data.push(action.payload)
    },
    deleteCategory(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload)
    },
    editCategory(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const categoriesReducer = categoriesSlices.reducer

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(categoriesSlices.actions.getCategories(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const createCategory = (category) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: category,
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 201) {
        toast.success('Category created successfully!')
        dispatch(categoriesSlices.actions.createCategory(res.data))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })
      if (res.status === 204) {
        toast.success('Category was successfully deleted')
        dispatch(categoriesSlices.actions.deleteCategory(id))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const editCategory = (category) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/${category.id}/`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: category,
      })
      if (res.status === 200) {
        toast.success('Category was successfully updated')
        dispatch(categoriesSlices.actions.editCategory(category))
      }
    } catch (err) {
      console.log(err)
    }
  }
}