import React from "react";
import { Button } from "./button";
import { useLoginContext } from "@/utils/useLogin";

function LoginTypeBar() {
  const { type, loginType } = useLoginContext();
  return (
    <div className='w-full h-[52px] flex gap-4'>
      <div className='w-[15%] h-full rounded-lg bg-[#1A1D4E] flex justify-around items-center'>
        <Button
          onClick={() => {
            loginType();
          }}
          className={`${
            type === "public" ? "bg-white text-black" : ""
          } hover:bg-white hover:text-black `}
        >
          Public
        </Button>

        <Button
          onClick={() => {
            loginType();
          }}
          className={`${
            type === "admin" ? "bg-white text-black" : ""
          } hover:bg-white hover:text-black `}
        >
          Admin
        </Button>
      </div>

      <div className='flex-1 h-full rounded-lg bg-[#1A1D4E]'></div>
    </div>
  );
}

export default LoginTypeBar;
