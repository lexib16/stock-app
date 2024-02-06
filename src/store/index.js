import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { uiReducer } from './ui'
import { categoriesReducer } from './categories'
import { brandsReducer } from './brands'
import { firmReducer } from './firms'
import { salesReducer } from './sales'
import { productsReducer } from './products'
import { purchasesReducer } from './purchases'

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    firms: firmReducer,
    sales: salesReducer,
    products: productsReducer,
    purchases: purchasesReducer,
  },
})

export default store