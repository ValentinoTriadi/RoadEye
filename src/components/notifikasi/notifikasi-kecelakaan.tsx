"use client";

import React from "react";
import KecelakaanNotif from "./kecelakaan";
import { AccidentData } from "../laporan/laporan-view";
import { useLoginContext } from "@/utils/useLogin";

function NotifikasiKecelakaan() {
  const [accidentData, setAccidentData] = React.useState<AccidentData[]>([]);
  const { refecth, refecthSave } = useLoginContext();

  const getAccidentData = async () => {
    try {
      const response = await fetch(
        "https://fnlgp1cr-8000.asse.devtunnels.ms/get-unconfirmed-accident/"
      );
      const data = await response.json();

      setAccidentData(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAccidentData();

    if (refecth) {
      refecthSave();
    }
  }, [refecth]);

  return (
    <div className='w-full h-full bg-[#FFE071] drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
      <div className='flex gap-4'>
        <h2 className='text-[20px] font-bold'> NOTIFIKASI KECELAKAAN</h2>
        {accidentData.length > 0 ? (
          <span className='bg-red-500 text-white font-bold px-4 rounded-full flex items-center'>
            {accidentData.length}
          </span>
        ) : null}
      </div>

      {accidentData.length > 0 ? (
        accidentData.map((accident) => (
          <KecelakaanNotif accidentData={accident} />
        ))
      ) : (
        <div className='flex items-center justify-center'>
          <p className='text-xl font-medium h-[72px]'>Tidak ada notifikasi</p>
        </div>
      )}
    </div>
  );
}

export default NotifikasiKecelakaan;
