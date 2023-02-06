import { useEffect } from "react";
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hitungJumlah } from "./keranjangSlice";

function Pesan() {

  const dispatch = useDispatch()

  const daftarTes = [
    {
      id: 1,
      namaTes: "Asam Urat",
      harga: 89000,
      deskripsi:
        "Cek asam urat bisa dilakukan dengan dua cara, yaitu tes asam urat dalam darah dan tes asam urat dalam urine. Tes darah dilakukan dengan mengambil sampel darah untuk kemudian diperiksa di laboratorium atau alat cek asam urat khusus. Sampel darah yang diambil nantinya akan menunjukkan angka yang merupakan kandungan atau kadar asam urat seseorang.",
    },
    {
      id: 2,
      namaTes: "Cholesterol",
      harga: 78000,
      deskripsi:
        "Tes kolesterol bermanfaat sebagai cara untuk menilai risiko penyakit kardiovaskular, termasuk serangan jantung dan stroke. Pemeriksaan ini memungkinkan dokter untuk mengukur dan menganalisa kadar lemak dalam darah.",
    },
    {
      id: 3,
      namaTes: "Zat Besi",
      harga: 272000,
      deskripsi:
        "Tes zat besi adalah pemeriksaan yang dilakukan untuk mendeteksi kadar zat besi dalam darah. Kadarnya yang tinggi dan tidak normal dapat menimbulkan komplikasi medis yang serius. Jenis-jenis tes zat besi yang dapat dilakukan adalah tes besi serum, feritinin serum, dan tes transferin atau total iron-binding capacity test (TIBC).",
    },
    {
      id: 4,
      namaTes: "Chlorida",
      harga: 89000,
      deskripsi:
        "Pemeriksaan yang berguna untuk mengukur konsentrasi klorida (Cl) di dalam tubuh. Klorida merupakan suatu elektrolit yang memiliki peranan penting dalam menjaga keseimbangan cairan di dalam dan di luar sel-sel tubuh, serta mempertahankan volume darah normal, tekanan darah, dan pH cairan tubuh. Nilai Cl harus diinterpretasikan dengan nilai elektrolit dan asam-basa yang lain seperti natrium (Na), kalium (K), dan bikarbonat (HCO3).",
    },
    {
      id: 5,
      namaTes: "Calcium",
      harga: 164000,
      deskripsi:
        "Kalsium merupakan mineral penting yang tubuh butuhkan untuk membangun serta memperbaiki gigi dan tulang. Sekitar 99% kalsium disimpan dalam tulang dan sisanya beredar dalam darah. Kadar kalsium yang terlalu tinggi atau rendah bisa memicu masalah kesehatan. Penting untuk mengeceknya, salah satunya dengan pemeriksaan kalsium dalam darah.",
    },
    {
      id: 6,
      namaTes: "Natrium",
      harga: 189000,
      deskripsi:
        "Pemeriksaan natrium (Na) berguna untuk mengetahui konsentrasi Na (elekrolit dan mineral) di dalam darah. Natrium berfungsi untuk menjaga keseimbangan air (sejumlah cairan di dalam maupun di luar sel tubuh) dan elektrolit di dalam tubuh, mengontrol tekanan darah, serta berperan penting dalam fungsi kerja saraf dan otot.",
    },
    {
      id: 7,
      namaTes: "Albumin",
      harga: 125000,
      deskripsi:
        "Kadar albumin yang terlalu rendah disebut dengan hipoalbuminemia. Jika hal ini terjadi, pengidapnya membutuhkan bantuan albumin dari luar. Tujuannya, untuk mengembalikan jumlah albumin ke nilai normal. Rendahnya kadar protein ini bisa terjadi karena ada gangguan pada organ ginjal atau hati.",
    },
    {
      id: 8,
      namaTes: "Urine",
      harga: 84000,
      deskripsi:
        "Tes urine sangat disarankan ketika seseorang merasakan sakit pada bagian saluran kemih. Misalnya, merasakan sakit perut, sulit buang air kecil, sakit ketika buang air kecil, ada darah pada urin, atau masalah ginjal.",
    },
    {
      id: 9,
      namaTes: "Kalium",
      harga: 189000,
      deskripsi:
        "Untuk mengukur kadar kalium dalam darah, dokter akan melakukan tes darah. Kadar kalium normal adalah 3,7-5,2 mmol/L. Jika kadar kalium lebih rendah dari angka tersebut, maka pasien didiagnosis menderita hipokalemia. Selain tes darah, tes urine juga dilakukan untuk mengukur jumlah kalium yang terbuang bersama urine.",
    },
    {
      id: 10,
      namaTes: "Kehamilan",
      harga: 181000,
      deskripsi:
        "Waktu yang tepat untuk tes kehamilan adalah ketika kamu telat menstruasi, setidaknya seminggu lebih. Selain itu kamu juga bisa melakukan tes saat mulai merasakan tanda-tanda fisik seperti pembengkakan pada payudara, kemunculan flek, kram, dan mual.",
    },
  ];

  const pesanTes = async (idTes) => {

    try{
      const jenisTes = daftarTes.find(i=>i.id===idTes)
      const inputTes = {
        nama: jenisTes.namaTes,
        harga: jenisTes.harga
      }
      await axios.post('http://localhost:3000/keranjang',inputTes)
      const res = await axios.get('http://localhost:3000/keranjang')
      dispatch(hitungJumlah(res.data.length))
      
    }catch(err) {
      console.log(err)
    };
  }

  return (
    <>
      <h1 className="text-black text-5xl text-center pt-20">
        Jenis Tes Laboratorium
      </h1>
      <div className="flex flex-wrap mt-5 justify-center">
        {daftarTes.map((tes) => (
          <div className="max-w-prose rounded overflow-hidden shadow-2xl m-4" key={tes.id}>
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2 text-center">
                {tes.namaTes}
              </div>
              <div className="font-bold text-xl mb-2 text-center">
                Rp {Number(tes.harga).toLocaleString().replace(",",".")}
              </div>
              <p className="text-gray-700 text-base text-justify mb-3">
                {tes.deskripsi}
              </p>
              <div className="flex justify-center">
                <button className="bg-yellow-400 p-3 rounded-xl hover:bg-yellow-300" onClick={()=>pesanTes(tes.id)}>Simpan Keranjang</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Pesan;
