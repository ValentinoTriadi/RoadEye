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

function ReviewDialog() {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger className='absolute right-0'>
        <Button className=' mr-[18px] bg-red-500 hover:bg-red-700 '>
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[60%] max-w-[1080px]'>
        <div>
          <h2 className='text-[20px] font-bold'>Tempat Kejadian</h2>
          <div className='flex gap-4'>
            <p>Tanggal Kejadian</p>

            <p>Jam Kejadian</p>
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
