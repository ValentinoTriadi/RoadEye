import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

function KonfirmasiKecelakaan() {
  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <Button className='bg-[#0F172A] hover:bg-[#070a13] h-[80px] w-full'>
          Konfirmasi Kecelakaan
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[40%] max-w-[1080px] flex flex-col items-center'>
        <div>
          <CheckCircle2
            strokeWidth={1.75}
            className='w-[275px] h-[275px]'
            color='#04B000'
          />
        </div>

        <div className='flex flex-col gap-4 text-center'>
          <h1 className='text-[32px] font-bold'>Laporan berhasil dibuat</h1>

          <p className='text-[24px]'>Silahkan lanjut isi laporan kecelakaan.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default KonfirmasiKecelakaan;
