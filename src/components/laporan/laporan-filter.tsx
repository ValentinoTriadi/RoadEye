"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import LaporanView from "./laporan-view";
import { Input } from "../ui/input";
import dummyLocationData, { Kota } from "@/utils/data-location";
import { Button } from "../ui/button";

interface AccidentData {
  id: string;
  location: string;
  video_path: string;
  date: string;
  province: string;
  city: string;
  district: string;
  luka: number;
  meninggal: number;
  keterangan: string;
}

function LaporanFilter() {
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");
  const [selectedKota, setSelectedKota] = useState<string>("");
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");
  const [accidentCount, setAccidentCount] = useState<number>(0);

  const getAccidentData = async () => {
    try {
      const province =
        selectedProvinsi === "" ? "" : `province=${selectedProvinsi}`;
      const city = selectedKota === "" ? "" : `city=${selectedKota}`;
      const district =
        selectedKecamatan === "" ? "" : `district=${selectedKecamatan}`;

      const response = await fetch(
        `https://fnlgp1cr-8000.asse.devtunnels.ms/count-accident/?${province}&${city}&${district}`
      );
      const data = await response.json();

      setAccidentCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAccidentData();
  }, [selectedProvinsi, selectedKota, selectedKecamatan]);

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
      <div className='flex gap-[18px] h-fit'>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-[20%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedProvinsi === "" ? "Provinsi" : selectedProvinsi}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=''>
            {dummyLocationData.provinces.map((provinsi, idx) => (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedProvinsi(provinsi.name);
                  setSelectedKota("");
                  setSelectedKecamatan("");
                }}
                key={idx}
              >
                {provinsi.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='w-[20%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>
              {selectedKota === "" || selectedKota === "Provinsi belum dipilih"
                ? "Kota"
                : selectedKota}
            </p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {getCitiesInProvince().map((kota, idx) => (
              <DropdownMenuItem
                onClick={() => {
                  if (kota === "Provinsi belum dipilih") {
                    setSelectedKota("");
                  } else {
                    setSelectedKota(kota);
                    setSelectedKecamatan("");
                  }
                }}
                key={idx}
              >
                {kota}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='w-[20%] rounded-md border border-sm justify-between flex p-[12px]'>
            <p>{selectedKecamatan === "" ? "Kecamatan" : selectedKecamatan}</p>
            <ChevronDown className='w-[24px] h-[24px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {getDistrictsInCity().map((kecamatan, idx) => (
              <DropdownMenuItem
                onClick={() => {
                  if (kecamatan === "") {
                    setSelectedKecamatan("");
                  } else {
                    setSelectedKecamatan(kecamatan);
                  }
                }}
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
          className='w-[20%] p-[12px] h-full'
        ></Input>

        <Button className='w-[20%] bg-[#4362E9]'>Filter Tanggal</Button>
      </div>

      <LaporanView count={accidentCount} />
    </>
  );
}

export default LaporanFilter;
