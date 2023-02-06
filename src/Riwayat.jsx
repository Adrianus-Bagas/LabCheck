import axios from "axios";
import { useEffect, useState } from "react";

export default function Riwayat(){

    const [riwayat, setRiwayat] = useState([])

    const getAllRiwayat = async()=>{
        
        try{
            const res = await axios.get('http://localhost:3000/riwayat')
            setRiwayat(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getAllRiwayat()
    },[])

    return (
        <>
          <h1 className="text-black text-5xl text-center pt-20">
            Pesanan
          </h1>
          <div className="flex flex-wrap mt-5 justify-center">
            {riwayat.map((riwayat) => (
              <div className="max-w-prose rounded overflow-hidden shadow-2xl m-4" key={riwayat.id}>
                <div className="px-6 py-4">
                  <div className={"text-md "+(riwayat.status === "Belum Dibayar" ? "text-red-600" : "text-green-600")}>
                    {riwayat.status}
                  </div>
                  <div className="font-bold text-2xl mb-2 text-center">
                    {riwayat.namaTes}
                  </div>
                  <div className="font-bold text-xl mb-2 text-center">
                    Rp {Number(riwayat.harga).toLocaleString().replace(",",".")}
                  </div>
                  <div className="text-lg mb-2 text-center">
                    Waktu Tes : {riwayat.tanggalTes} {riwayat.jamTes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
}