import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TestImage from "@/assets/images/test-notifikasi.png";
import { useToast } from "../ui/use-toast";
import { AccidentData } from "../laporan/laporan-view";
import { useLoginContext } from "@/utils/useLogin";
import axios from "axios";

function ReviewDialog({ accidentData }: { accidentData: AccidentData }) {
  const { toast } = useToast();
  const { refecth, refecthSave } = useLoginContext();

  const inputDate: string | undefined = accidentData.date;
  const dateObject: Date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate: string = dateObject.toLocaleDateString("id-ID", options);
  const formattedTime: string = dateObject.toLocaleTimeString("id-ID");

  const confirmAccident = async () => {
    try {
      const form = `luka=0&meninggal=0&keterangan=Belum ada laporan`;
      const video_path = `video_path=${accidentData.video_path}`;
      const endpoint = `https://fnlgp1cr-8000.asse.devtunnels.ms/update-accident/?${video_path}&${form}`;

      const response = await axios.put(
        endpoint,
        {
          luka: -2,
          meninggal: -2,
          keterangan: "Belum ada laporan",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      refecthSave();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAccident = async () => {
    try {
      const video_path = `video_path=${accidentData.video_path}`;
      const endpoint = `https://fnlgp1cr-8000.asse.devtunnels.ms/delete-accident?${video_path}`;

      const response = await axios.put(
        endpoint,
        {
          video_path: accidentData.video_path,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      refecthSave();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className='absolute right-0'>
        <Button className=' mr-[18px] bg-red-500 hover:bg-red-700 '>
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[60%] max-w-[1080px]'>
        <div>
          <h2 className='text-[20px] font-bold'>{accidentData.location}</h2>
          <div className='flex gap-4'>
            <p>{formattedDate}</p>

            <p>{formattedTime}</p>
          </div>
        </div>

        <div>
          <Image
            src={TestImage}
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "auto" }}
            alt=''
          />
        </div>

        <DialogClose asChild>
          <Button
            className='bg-[#0F172A] hover:bg-[#070a13] h-[80px] w-full'
            onClick={() => {
              toast({
                title: "Laporan berhasil dibuat",
                description: "Silahkan lanjut isi laporan kecelakaan.",
              });
              confirmAccident();
            }}
          >
            Konfirmasi Kecelakaan
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            className='bg-red-500 hover:bg-red-700'
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Laporan dibatalkan",
                description: "Laporan kecelakaan dibatalkan.",
              });
              cancelAccident();
            }}
          >
            Batalkan Kecelakaan
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDialog;
