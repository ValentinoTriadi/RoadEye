"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ChevronDown } from "lucide-react";
import CCTVView from "./cctv-view";
import { Input } from "./ui/input";
import dummyLocationData from "@/utils/data-location";
import { LocationData } from "@/utils/data-location";

function CCTVFilter() {
  const [selectedProvinsi, setSelectedProvinsi] = React.useState("");
  const [selectedKota, setSelectedKota] = React.useState("");
  const [selectedKecamatan, setSelectedKecamatan] = React.useState("");

  return (
    <>
      <div className='flex gap-[18px]'>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-[25%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedProvinsi === "" ? "Provinsi" : selectedProvinsi}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=''>
            {dummyLocationData.provinces.map((provinsi) => (
              <DropdownMenuItem
                onClick={() => setSelectedProvinsi(provinsi.name)}
              >
                {provinsi.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='w-[25%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedKota === "" ? "Kota" : selectedKota}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='w-[25%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedKecamatan === "" ? "Kecamatan" : selectedKecamatan}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          type='text'
          placeholder='Cari Daerah/Kota/Kecamatan'
          className='w-[25%] p-[12px]'
        ></Input>
      </div>

      <CCTVView />
    </>
  );
}

export default CCTVFilter;
