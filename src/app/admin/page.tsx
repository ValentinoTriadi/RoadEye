"use client";

import CCTVFilter from "@/components/kamera/cctv-filter";
import LaporanFilter from "@/components/laporan/laporan-filter";
import NotifikasiKecelakaan from "@/components/notifikasi/notifikasi-kecelakaan";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { useLoginContext } from "@/utils/useLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginTypeBar from "@/components/ui/login-type";
import React from "react";
import VideoUpload from "./components/upload-video";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Redirect to the unsupported page
      router.push("/unsupported");
    }
  }, [router]);

  const { login, type } = useLoginContext();

  return (
    <>
      <Header />
      <main className='flex min-h-screen flex-col items-center justify-between px-[52px] py-[31px] gap-10'>
        {login ? <LoginTypeBar /> : null}
        {(type === "admin" || type === "test") && <NotifikasiKecelakaan />}

        {type === "test" && (
          <div className='w-full h-full bg-white drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
            <h2 className='text-[20px] font-bold'> TEST VIDEO</h2>
            <VideoUpload />
          </div>
        )}

        <div className='w-full h-full bg-white drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
          <h2 className='text-[20px] font-bold'> CCTV VIEW</h2>
          <CCTVFilter />
        </div>

        <div className='w-full h-full bg-white drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
          <h2 className='text-[20px] font-bold'> LAPORAN KECELAKAAN</h2>
          <LaporanFilter />
        </div>
      </main>
      <Footer />
    </>
  );
}
