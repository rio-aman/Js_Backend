import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api':'http://localhost:3000', //ye request me /api ke jagaha append hojayega 
    }  // proxy ke use karne ke vjaha se server ko lgaga ke same he server ya same he url se req aarah hai to vo use allow karlega mean origin he hai ye iska 
  },
  plugins: [react()],
})
