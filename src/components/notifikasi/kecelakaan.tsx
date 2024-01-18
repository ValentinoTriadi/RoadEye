import React from "react";
import Image from "next/image";
import TestImage from "@/assets/images/test-notifikasi.png";
import ReviewDialog from "./review-dialog";
import IsiLaporan from "./isi-laporan";
import { AccidentData } from "../laporan/laporan-view";

function KecelakaanNotif({ accidentData }: { accidentData: AccidentData }) {
  const inputDate: string = accidentData.date;
  const dateObject: Date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate: string = dateObject.toLocaleDateString("id-ID", options);
  const formattedTime: string = dateObject.toLocaleTimeString("id-ID");

  return (
    <div className='w-full h-[124px] flex items-center px-[18px] py-[12px] rounded-xl border-1 border relative shadow-lg bg-white'>
      <div className='mr-[36px]'>
        <Image src={TestImage} width={96} height={96} alt='' />
      </div>

      <div className='flex flex-col w-[40%]'>
        <p className='font-bold'>{accidentData.location}</p>

        <p className='font-bold'>{formattedDate}</p>

        <p>{formattedTime}</p>
      </div>

      {accidentData.luka === -1 ? (
        <ReviewDialog accidentData={accidentData} />
      ) : (
        <IsiLaporan accidentData={accidentData} />
      )}
    </div>
  );
}

export default KecelakaanNotif;
