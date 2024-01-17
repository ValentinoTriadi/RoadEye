import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import TestImage from "@/assets/images/test-laporan.png";
import ReviewDialog from "./review-dialog";
import KecelakaanNotif from "./kecelakaan";

function NotifikasiKecelakaan() {
  return (
    <div className='w-full h-full bg-[#FFE071] drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
      <div className='flex gap-4'>
        <h2 className='text-[20px] font-bold'> NOTIFIKASI KECELAKAAN</h2>
        <span className='bg-red-500 text-white font-bold px-4 rounded-full flex items-center'>
          2
        </span>
      </div>

      <KecelakaanNotif />
    </div>
  );
}

export default NotifikasiKecelakaan;
