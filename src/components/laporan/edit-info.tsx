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
import { CalendarDays, Clock1, Edit, MapPin } from "lucide-react";
import EditInfo from "./form-edit-info";
import { AccidentData } from "./laporan-view";

function EditLaporan({ data }: { data: AccidentData }) {
  return (
    <Dialog>
      <DialogTrigger className='absolute right-0'>
        <Button className=' mr-[18px] bg-yellow-500 hover:bg-yellow-700 '>
          Isi Laporan
        </Button>
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
                    <span className='font-medium'>Jalan Raya Bogor</span>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <CalendarDays className='h-12 w-12' strokeWidth={1} />
                  <div className='flex flex-col'>
                    <span className='font-light'>Tanggal Kejadian</span>
                    <span className='font-medium'>Jalan Raya Bogor</span>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <Clock1 className='h-12 w-12' strokeWidth={1} />
                  <div className='flex flex-col'>
                    <span className='font-light'>Waktu Kejadian</span>
                    <span className='font-medium'>Jalan Raya Bogor</span>
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
