import React from "react";
import { Button } from "./button";
import { ModeToggle } from "./darkmode-toggle";
import Link from "next/link";

function Header() {
  return (
    <div className='h-[110px] w-full bg-[#1A1D4E] lg:px-[58px] lg:py-[31px] flex justify-between items-center'>
      <h1 className='text-white font-bold text-[36px]'>RoadEye</h1>
      <div className='space-x-4'>
        <Button className='text-white text-[24px]'>
          <Link href='/login'>Login</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
