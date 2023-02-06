import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hitungJumlah } from "./keranjangSlice";
import { useNavigate } from "react-router-dom";

export default function Keranjang(){

    const [keranjang, setKeranjang] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAllKeranjang = async ()=>{
        try{
            const res = await axios.get('http://localhost:3000/keranjang')
            setKeranjang(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const deleteKeranjang = async (id)=>{
        try{
            await axios.delete('http://localhost:3000/keranjang/'+id)
            const res = await axios.get('http://localhost:3000/keranjang')
            dispatch(hitungJumlah(res.data.length))
            getAllKeranjang()
        }
        catch(err){
            console.log(err)
        }
    }

    const lanjutPesanan = async (id)=>{
        navigate("/detail-pesanan/"+id)
    }
    

    useEffect(()=>{
        getAllKeranjang()
    },[])


    return (
        <>
          <h1 className="text-black text-5xl text-center pt-20">
            Keranjang
          </h1>
          <div className="flex flex-wrap mt-5 justify-center">
            {keranjang.map((keranjang) => (
              <div className="max-w-prose rounded overflow-hidden shadow-2xl m-4" key={keranjang.id}>
                <div className="px-6 py-4">
                  <div className="font-bold text-2xl mb-2 text-center">
                    {keranjang.nama}
                  </div>
                  <div className="font-bold text-xl mb-2 text-center">
                    Rp {Number(keranjang.harga).toLocaleString().replace(",",".")}
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-yellow-400 p-3 rounded-xl mx-2 hover:bg-yellow-300" onClick={()=>lanjutPesanan(keranjang.id)}>Lanjut</button>
                    <button className="bg-yellow-400 p-3 rounded-xl mx-2 hover:bg-yellow-300" onClick={()=>deleteKeranjang(keranjang.id)}>Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
}