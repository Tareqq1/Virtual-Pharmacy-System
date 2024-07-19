import { createContext, useReducer } from 'react'

export const MedicineContext = createContext()

export const medicineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICINE': 
      return {
        medicine: action.payload
      }
    case 'CREATE_MEDICINE':
      return {
        medicine: [action.payload, ...state.medicine]
      }
    case 'UPDATE_MEDICINE':
          return {
            medicine: state.medicine.map((m) => m._id === action.payload._id ? action.payload : m)
      }
    case 'DELETE_MEDICINE':
      return {
        medicine: state.medicine.filter((m) => m._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const MedicineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, {
    medicine: null
  })

  return (
    <MedicineContext.Provider value={{...state, dispatch}}>
      { children }
    </MedicineContext.Provider>
  )
}