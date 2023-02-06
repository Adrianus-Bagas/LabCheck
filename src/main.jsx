import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Keranjang from './Keranjang'
import Pesan from './Pesan'
import Riwayat from './Riwayat'
import { Provider } from 'react-redux'
import store from './store'
import LanjutPesanan, { lanjutPesananLoader } from './LanjutPesanan'
import Admin from './Admin'

const router = createBrowserRouter([
  {path: "/", element: <Header/>, children: [
    {path: "", element: <Home/>},
    {path: "pesan", element: <Pesan/>},
    {path: "keranjang", element: <Keranjang/>},
    {path: "riwayat", element: <Riwayat/>},
    {path: "detail-pesanan/:idLanjutPesanan", element: <LanjutPesanan/>, loader: lanjutPesananLoader},
  ]},
  {path: "/admin", element: <Admin/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
