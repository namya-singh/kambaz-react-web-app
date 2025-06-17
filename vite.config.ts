import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    host: 'localhost',
    port: 5173,
  },
})





// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

//
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import mkcert from 'vite-plugin-mkcert'
//
// export default defineConfig({
//   plugins: [react(), mkcert()],
//   server: {
//     https: true,
//     host: 'localhost',
//     port: 5173,
//   },
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: false, // ✅ disable HTTPS
//     host: 'localhost',
//     port: 5173,
//   },
// })
//
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: 'localhost',
//     port: 5173,
//     // https is NOT set or is false by default
//   },
// })
