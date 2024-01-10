"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import CCTVView from "./cctv-view";
import { Input } from "./ui/input";
import dummyLocationData, { Kota } from "@/utils/data-location";
import { LocationData } from "@/utils/data-location";

function CCTVFilter() {
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");
  const [selectedKota, setSelectedKota] = useState<string>("");
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");

  const getCitiesInProvince = () => {
    const selectedProvinceData = dummyLocationData.provinces.find(
      (province) => province.name === selectedProvinsi
    );

    if (!selectedProvinceData) {
      return [];
    }

    const cityNames = selectedProvinceData.cities.map((city) => city.name);

    return cityNames;
  };

  const getDistrictsInCity = () => {
    const selectedProvinceData = dummyLocationData.provinces.find(
      (province) => province.name === selectedProvinsi
    );

    if (!selectedProvinceData) {
      return ["Provinsi belum dipilih"];
    }

    const selectedCityData = selectedProvinceData.cities.find(
      (city) => city.name === selectedKota
    );

    if (!selectedCityData) {
      return ["Kota belum dipilih"];
    }

    const districtNames = selectedCityData.districts.map(
      (district) => district.name
    );

    return districtNames;
  };

  return (
    <>
      <div className='flex gap-[18px]'>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-[25%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedProvinsi === "" ? "Provinsi" : selectedProvinsi}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=''>
            {dummyLocationData.provinces.map((provinsi, idx) => (
              <DropdownMenuItem
                onClick={() => setSelectedProvinsi(provinsi.name)}
                key={idx}
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
            {getCitiesInProvince().map((kota, idx) => (
              <DropdownMenuItem onClick={() => setSelectedKota(kota)} key={idx}>
                {kota}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='w-[25%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedKecamatan === "" ? "Kecamatan" : selectedKecamatan}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {getDistrictsInCity().map((kecamatan, idx) => (
              <DropdownMenuItem
                onClick={() => setSelectedKecamatan(kecamatan)}
                key={idx}
              >
                {kecamatan}
              </DropdownMenuItem>
            ))}
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
