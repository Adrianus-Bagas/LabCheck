import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header(){

    const keranjang = useSelector(state=>state.keranjang)

    return <>
        <div className='text-center bg-yellow-300 w-full h-14 fixed'>
            <div className='container p-2'>
                <Link className='text-2xl mx-5 hover:text-gray-700' to="/">Beranda</Link>           
                <Link className='text-2xl mx-5 hover:text-gray-700' to="/pesan">Pesan Jenis Tes</Link>           
                <Link className='text-2xl mx-5 hover:text-gray-700' to="/keranjang">Keranjang</Link>           
                <Link className='text-2xl mx-5 hover:text-gray-700' to="/riwayat">Pesanan</Link>           
            </div>
        </div>
        <Outlet/>
    </>
}