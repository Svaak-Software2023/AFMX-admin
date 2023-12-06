import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import advertiseReducer from '../store/features/advertiseSlice'
import clientReducer from '../store/features/clientSlice'
import countryReducer from '../store/features/countrySlice'
import stateReducer from '../store/features/stateSlice'
import cityReducer from '../store/features/citySlice'
import adminReducer from '../store/features/adminSlice'
import serviceReducer from '../store/features/serviceDepartmentSlice'
import thunk from 'redux-thunk'

const rootReducer = {
  advertiseData: advertiseReducer,
  clientData: clientReducer,
  countryData: countryReducer,
  stateData: stateReducer,
  cityData: cityReducer,
  adminData: adminReducer,
  serviceDepartmentData: serviceReducer
}

export const store = configureStore({
  reducer: rootReducer,

  middleware: [...getDefaultMiddleware(), thunk]
})
