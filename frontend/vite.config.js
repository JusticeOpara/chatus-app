import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
       include: ['esm-dep > cjs-dep'],
        },
    
//  Node.js global to browser globalThis
  define: {   global: {},
   },


});