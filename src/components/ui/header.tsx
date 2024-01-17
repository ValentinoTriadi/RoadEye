import React from "react";
import { Button } from "./button";
import { ModeToggle } from "./darkmode-toggle";
import Link from "next/link";
import { useLoginContext } from "@/utils/useLogin";

function Header() {
  const { login, loginStatus } = useLoginContext();

  return (
    <div className='h-[110px] w-full bg-[#1A1D4E] lg:px-[58px] lg:py-[31px] flex justify-between items-center'>
      <h1 className='text-white font-bold text-[36px]'>
        Road<p className='inline font-normal'>Eye</p>
      </h1>
      <div className='space-x-4'>
        <Button
          className='text-white text-[24px] bg-transparent hover:bg-transparent'
          onClick={() => {
            loginStatus();
          }}
        >
          {login ? (
            <Link href='/'>Logout</Link>
          ) : (
            <Link href='/admin'>Login</Link>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Header;
