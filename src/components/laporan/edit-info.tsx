import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import TestImage from "@/assets/images/test-notifikasi.png";
import { CalendarDays, Clock1, Edit, Edit2, MapPin } from "lucide-react";
import EditInfo from "./form-edit-info";
import { AccidentData } from "./laporan-view";
import { Eye } from "lucide-react";

function EditLaporan({
  data,
  type = "notifikasi",
}: {
  data: AccidentData;
  type?: string;
}) {
  const inputDate: string | undefined = data.date;
  const dateObject: Date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate: string = dateObject.toLocaleDateString("id-ID", options);
  const formattedTime: string = dateObject.toLocaleTimeString("id-ID");

  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        {type === "menu" ? (
          <div className=' flex text-[16px] p-1 px-2 gap-2 hover:bg-slate-100 w-full'>
            <Edit2 className='w-[24px] h-[24px]' />
            <p>Edit Info</p>
          </div>
        ) : (
          <Button className=' mr-[18px] bg-yellow-500 hover:bg-yellow-700 '>
            Isi Laporan
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='w-[70%] max-w-[1080px]'>
        <DialogHeader>
          <DialogTitle>Isi Laporan Kecelakaan</DialogTitle>
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

          <EditInfo data={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditLaporan;
