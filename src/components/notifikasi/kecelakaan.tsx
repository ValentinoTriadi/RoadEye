import React from "react";
import Image from "next/image";
import TestImage from "@/assets/images/test-notifikasi.png";
import ReviewDialog from "./review-dialog";
import IsiLaporan from "./isi-laporan";

function KecelakaanNotif() {
  return (
    <div className='w-full h-[124px] flex items-center px-[18px] py-[12px] rounded-xl border-1 border relative shadow-lg bg-white'>
      <div className='mr-[36px]'>
        <Image src={TestImage} width={96} height={96} alt='' />
      </div>

      <div className='flex flex-col w-[40%]'>
        <p className='font-bold'>Tempat Kejadian</p>

        <p className='font-bold'>Tanggal Kejadian</p>

        <p>Jam Kejadian</p>
      </div>

      <IsiLaporan />
    </div>
  );
}

export default KecelakaanNotif;
