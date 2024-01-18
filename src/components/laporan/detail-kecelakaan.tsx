import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TestImage from "@/assets/images/test-notifikasi.png";
import { CalendarDays, Clock1, MapPin, Dot, Eye } from "lucide-react";
import { AccidentData } from "./laporan-view";

function DetailKecelakaan({ data }: { data: AccidentData }) {
  const inputDate: string = data.date;
  const dateObject: Date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate: string = dateObject.toLocaleDateString("id-ID", options);
  const formattedTime: string = dateObject.toLocaleTimeString("id-ID");
  const JumlahKorban: number = data.luka + data.meninggal;

  return (
    <Dialog>
      <DialogTrigger className='flex text-[16px] p-1 px-2 gap-2 hover:bg-slate-100 w-full'>
        <Eye className='w-[24px] h-[24px]' />
        <p>Lihat Info</p>
      </DialogTrigger>
      <DialogContent className='w-[70%] max-w-[1080px]'>
        <DialogHeader>
          <DialogTitle>Detail Kecelakaan</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-8'>
            <Image src={TestImage} width={473} height={266} alt='' />

            <div className='flex flex-col gap-4'>
              <div className='w-full p-2 text-center font-bold text-[20px] text-white bg-darkblue rounded-lg'>
                INFORMASI KECELAKAAN
              </div>

              <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                  <MapPin className='h-12 w-12' strokeWidth={1} />
                  <div className='flex flex-col'>
                    <span className='font-light'>Tempat Kejadian</span>
                    <span className='font-medium'>{data.location}</span>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <CalendarDays className='h-12 w-12' strokeWidth={1} />
                  <div className='flex flex-col'>
                    <span className='font-light'>Tanggal Kejadian</span>
                    <span className='font-medium'>{formattedDate}</span>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <Clock1 className='h-12 w-12' strokeWidth={1} />
                  <div className='flex flex-col'>
                    <span className='font-light'>Waktu Kejadian</span>
                    <span className='font-medium'>{formattedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full p-2 text-center font-bold text-[20px] text-white bg-darkblue rounded-lg'>
            KETERANGAN LEBIH LANJUT
          </div>

          <div className='grid grid-cols-2 h-[200px]'>
            <div className='w-full h-full rounded-lg'>
              <div className='flex items-center'>
                <Dot
                  className='w-[48px] h-[48px] fill-[#4362E9]'
                  color='#4362E9'
                />
                <p className='w-[200px]'>Jumlah Korban</p>
                <p>
                  {JumlahKorban > 0 ? (
                    <span className='font-bold text-[#EB7376]'>
                      {JumlahKorban}
                    </span>
                  ) : (
                    <span className='font-bold text-[#EB7363]'>0</span>
                  )}
                </p>
              </div>

              <div className='flex items-center'>
                <Dot
                  className='w-[48px] h-[48px] fill-[#F5CB69]'
                  color='#F5CB69'
                />
                <p className='w-[200px]'>Jumlah Luka-luka</p>
                {JumlahKorban > 0 ? (
                  <span className='font-bold text-[#EB7376]'>{data.luka}</span>
                ) : (
                  <span className='font-bold text-[#EB7363]'>0</span>
                )}
              </div>

              <div className='flex items-center'>
                <Dot
                  className='w-[48px] h-[48px] fill-[#EB7363]'
                  color='#EB7363'
                />
                <p className='w-[200px]'>Jumlah Meninggal</p>
                {data.meninggal > 0 ? (
                  <span className='font-bold text-[#EB7376]'>
                    {data.meninggal}
                  </span>
                ) : (
                  <span className='font-bold text-[#EB7363]'>0</span>
                )}
              </div>
            </div>

            <div className='w-full h-full'>
              <p>
                {data.keterangan === ""
                  ? "Belum ada keterangan"
                  : data.keterangan}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DetailKecelakaan;
