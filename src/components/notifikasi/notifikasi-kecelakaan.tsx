import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import TestImage from "@/assets/images/test-laporan.png";

function NotifikasiKecelakaan() {
  return (
    <div className='w-full h-full bg-[#FFE071] drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
      <div className='flex gap-4'>
        <h2 className='text-[20px] font-bold'> NOTIFIKASI KECELAKAAN</h2>
        <span className='bg-red-500 text-white font-bold px-4 rounded-full flex items-center'>
          2
        </span>
      </div>

      <div className='w-full h-[124px] flex items-center px-[18px] py-[12px] rounded-xl border-1 border relative shadow-lg bg-white'>
        <div className='mr-[36px]'>
          <Image src={TestImage} width={96} height={96} alt='' />
        </div>

        <div className='flex flex-col w-[40%]'>
          <p className='font-bold'>Tempat Kejadian</p>

          <p className='font-bold'>Tanggal Kejadian</p>

          <p>Jam Kejadian</p>
        </div>

        <Button className='absolute right-0 mr-[18px] bg-red-500 hover:bg-red-700'>
          Review
        </Button>
      </div>
    </div>
  );
}

export default NotifikasiKecelakaan;
