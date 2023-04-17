import { configureStore } from '@reduxjs/toolkit'
import colorPalettesReducer from './colorPalettes/colorPalettesSlice'

export default configureStore({
  reducer: {
    colorPalettes: colorPalettesReducer
  }
})