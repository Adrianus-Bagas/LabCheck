import { useLoaderData } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export async function lanjutPesananLoader(props){
    return props.params.idLanjutPesanan
}


export default function LanjutPesanan(){
    
    
    const [keranjang, setKeranjang] = useState([])
    const defaultInput = {
        namaTes: "",
        harga: "",
        tanggalTes: "",
        jamTes:"",
        status: "Belum Dibayar"
    }
    const [formInput, setFormInput] = useState({...defaultInput})
    const idLanjutPesanan = useLoaderData()
    const navigate = useNavigate()

    const getKeranjangById = async (id) =>{
        try{
            const res = await axios.get('http://localhost:3000/keranjang/'+id)
            setKeranjang(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const handleInput = (type, value)=>{
        const copyFormInput = {...formInput}
        copyFormInput[type] = value
        setFormInput(copyFormInput)
    }

    const finishPesanan = async (event)=>{
        event.preventDefault()
        try{
            const addRiwayat = {
                namaTes: keranjang.nama,
                harga: keranjang.harga,
                tanggalTes: formInput.tanggalTes,
                jamTes: formInput.jamTes,
                status: formInput.status
            }
            await axios.post('http://localhost:3000/riwayat',addRiwayat)
            await axios.delete('http://localhost:3000/keranjang/'+idLanjutPesanan)   
            setFormInput({...defaultInput})
            navigate("/riwayat")
        }catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{
        getKeranjangById(idLanjutPesanan)
    },[])

    return <>
    <h1 className="text-black text-5xl text-center pt-20">Detail Keranjang</h1>
    <div className="bg-white w-1/4 mx-auto mt-5">
        <form onSubmit={finishPesanan}>
            <div className="form-group mb-6">
                <label htmlFor="jenis-tes" className="form-label inline-block mb-2 text-gray-700">Jenis Tes</label>
                <input type="text" value={formInput.namaTes} className="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="jenis-tes"
                    placeholder={keranjang.nama} disabled/>
            </div>
            <div className="form-group mb-6">
                <input type="hidden" value={formInput.harga}/>
            </div>
            <div className="form-group mb-6">
                <label htmlFor="tanggal-tes" className="form-label inline-block mb-2 text-gray-700">Tanggal Tes</label>
                <input type="date" value={formInput.tanggalTes} onChange={(event)=>handleInput("tanggalTes", event.target.value)} className="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="tanggal-tes"
                    />
            </div>
            <div className="form-group mb-6">
                <label htmlFor="jam-tes" className="form-label inline-block mb-2 text-gray-700">Jam Tes (07.00-16.00)</label>
                <input type="time" value={formInput.jamTes} onChange={(event)=>handleInput("jamTes",event.target.value)} className="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="jam-tes"
                    />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="
                px-6
                py-2.5
                bg-yellow-400
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-yellow-300 hover:shadow-lg
                transition
                duration-150
                ease-in-out">Pesan</button>
            </div>
        </form>
    </div>
    </>
}