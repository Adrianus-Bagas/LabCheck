import axios from "axios"
import { useEffect, useState } from "react"

export default function Admin(){

    const [riwayatBelumBayar, setRiwayatBelumBayar] = useState([])

    const getRiwayatBelumBayar = async ()=>{
        try{
            const res = await axios.get('http://localhost:3000/riwayat')
            setRiwayatBelumBayar(res.data.filter(i=>i.status==="Belum Dibayar"))
        }catch(err){
            console.log(err)
        }
    }

    const konfirmasiPembayaran = async(id)=>{
        try{
            const res1 = await axios.get('http://localhost:3000/riwayat/'+id)
            const newRiwayat = {
                namaTes: res1.data.namaTes,
                harga: res1.data.harga,
                tanggalTes: res1.data.tanggalTes,
                waktuTes: res1.data.waktuTes,
                status: "Sudah Dibayar"
            }
            await axios.put('http://localhost:3000/riwayat/'+id,newRiwayat)
            getRiwayatBelumBayar()
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getRiwayatBelumBayar()
    },[])

    return (
        <>
          <h1 className="text-black text-5xl text-center pt-20">
            Konfirmasi Pembayaran
          </h1>
          <div className="flex flex-wrap mt-5 justify-center">
            {riwayatBelumBayar.map((riwayatBelumBayar) => (
              <div className="max-w-prose rounded overflow-hidden shadow-2xl m-4" key={riwayatBelumBayar.id}>
                <div className="px-6 py-4">
                  <div className={"text-md "+(riwayatBelumBayar.status === "Belum Dibayar" ? "text-red-600" : "text-green-600")}>
                    {riwayatBelumBayar.status}
                  </div>
                  <div className="font-bold text-2xl mb-2 text-center">
                    {riwayatBelumBayar.namaTes}
                  </div>
                  <div className="font-bold text-xl mb-2 text-center">
                    Rp {Number(riwayatBelumBayar.harga).toLocaleString().replace(",",".")}
                  </div>
                  <div className="text-md mb-2 text-center">
                    Waktu Tes : {riwayatBelumBayar.tanggalTes} {riwayatBelumBayar.jamTes}
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-yellow-400 p-3 rounded-xl mx-2 hover:bg-yellow-300" onClick={()=>konfirmasiPembayaran(riwayatBelumBayar.id)}>Konfirmasi</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
}