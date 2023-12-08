import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import advertiseReducer from '../store/features/advertiseSlice'
import clientReducer from '../store/features/clientSlice'
import countryReducer from '../store/features/countrySlice'
import stateReducer from '../store/features/stateSlice'
import cityReducer from '../store/features/citySlice'
import adminReducer from '../store/features/adminSlice'
import serviceDepartmentReducer from '../store/features/serviceDepartmentSlice'
import servicesReducer from '../store/features/servicesSlice'
import thunk from 'redux-thunk'

const rootReducer = {
  advertiseData: advertiseReducer,
  clientData: clientReducer,
  countryData: countryReducer,
  stateData: stateReducer,
  cityData: cityReducer,
  adminData: adminReducer,
  serviceDepartmentData: serviceDepartmentReducer,
  servicesData: servicesReducer
}

export const store = configureStore({
  reducer: rootReducer,

  middleware: [...getDefaultMiddleware(), thunk]
})
