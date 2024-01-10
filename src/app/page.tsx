"use client";

import CCTVFilter from "@/components/cctv-filter";
import Header from "@/components/ui/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Redirect to the unsupported page
      router.push("/unsupported");
    }
  }, []);

  return (
    <>
      <Header />
      <main className='flex min-h-screen flex-col items-center justify-between px-[52px] py-[31px]'>
        <div className='w-full h-full bg-white drop-shadow-xl py-[32px] px-[40px] space-y-[32px]'>
          <h2 className='text-[20px] font-bold'> CCTV VIEW</h2>
          <CCTVFilter />
        </div>
      </main>
    </>
  );
}
