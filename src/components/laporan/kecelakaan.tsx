import { Dot, Eye, FileX2, MoreVertical, SquarePen } from "lucide-react";
import React from "react";
import Image from "next/image";
import TestImage from "@/assets/images/test-laporan.png";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { AccidentData } from "./laporan-view";
import DetailKecelakaan from "./detail-kecelakaan";
import { useLoginContext } from "@/utils/useLogin";
import EditInfo from "./form-edit-info";
import EditLaporan from "./edit-info";

function Kecelakaan({ AccidentData }: { AccidentData: AccidentData }) {
  const { type } = useLoginContext();

  const inputDate: string = AccidentData.date;
  const dateObject: Date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate: string = dateObject.toLocaleDateString("id-ID", options);
  const formattedTime: string = dateObject.toLocaleTimeString("id-ID");
  const JumlahKorban: number = AccidentData.luka + AccidentData.meninggal;

  return (
    <div className='w-full h-[124px] flex items-center px-[18px] py-[12px] rounded-xl border-1 border relative shadow-lg'>
      <div className='mr-[36px]'>
        <Image src={TestImage} width={96} height={96} alt='' />
      </div>

      <div className='flex flex-col w-[40%]'>
        <p className='font-bold'>{AccidentData.location}</p>

        <p className='font-bold'>{formattedDate}</p>

        <p>{formattedTime}</p>
      </div>

      {AccidentData.luka === -1 ? (
        <>
          <div className='flex flex-col w-[20%] text-center'>
            <p className='font-bold '>Belum ada laporan</p>
          </div>
        </>
      ) : AccidentData.luka === 0 ? (
        <>
          <div className='flex flex-col w-[20%]'>
            <p className='font-bold text-black text-center'>Tidak ada korban</p>
          </div>
        </>
      ) : (
        <>
          <div className='flex gap-2'>
            <div className='flex items-center'>
              <Dot
                className='w-[48px] h-[48px] fill-[#4362E9]'
                color='#4362E9'
              />
              <p>{JumlahKorban}</p>
            </div>

            <div className='flex items-center'>
              <Dot
                className='w-[48px] h-[48px] fill-[#F5CB69]'
                color='#F5CB69'
              />
              <p>{AccidentData.luka}</p>
            </div>

            <div className='flex items-center'>
              <Dot
                className='w-[48px] h-[48px] fill-[#EB7363]'
                color='#EB7363'
              />
              <p>{AccidentData.meninggal}</p>
            </div>
          </div>
        </>
      )}

      <div className='absolute right-0 mr-[18px]'>
        <Menubar className='bg-tranparent border-0'>
          <MenubarMenu>
            <MenubarTrigger className=''>
              <MoreVertical className='w-[24px] h-[24px]' />
            </MenubarTrigger>
            <MenubarContent className='w-[120px]'>
              <MenubarItem className='flex gap-2 h-[24px]' asChild>
                <DetailKecelakaan data={AccidentData} />
              </MenubarItem>

              {type === "admin" || type === "test" ? (
                <MenubarItem className='flex gap-2 h-[24px]' asChild>
                  <EditLaporan data={AccidentData} type='menu' />
                </MenubarItem>
              ) : null}

              {type === "admin" || type === "test" ? (
                <MenubarItem className='flex gap-2'>
                  <FileX2 className='w-[24px] h-[24px]' color='#EB7363' />
                  <p className='text-[#EB7363]'>Hapus Laporan</p>
                </MenubarItem>
              ) : null}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default Kecelakaan;
