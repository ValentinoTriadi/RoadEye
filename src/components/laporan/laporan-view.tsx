import React from "react";
import Kecelakaan from "./kecelakaan";
import { Pagination } from "../ui/pagination";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { set } from "react-hook-form";

export interface AccidentData {
  location: string;
  video_path: string;
  date: string;
  province: string;
  city: string;
  district: string;
}

function LaporanView({ count }: { count: number }) {
  const [accidentData, setAccidentData] = React.useState<AccidentData[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const dataPerPage: number = 3;
  const totalPage: number = Math.ceil(count / dataPerPage);

  let pageNumbers: number[] = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i <= 0) continue;
    if (i > totalPage) break;
    pageNumbers.push(i);
  }

  const getAccidentData = async () => {
    try {
      const pages = `pages=${currentPage - 1}`;

      const response = await fetch(
        `https://fnlgp1cr-8000.asse.devtunnels.ms/get-accident/?${pages}`
      );
      const data = await response.json();
      setAccidentData(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAccidentData();
  }, [currentPage]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 mb-[36px]'>
        {accidentData.map((accident) => (
          <Kecelakaan AccidentData={accident} />
        ))}
      </div>

      <div className='flex justify-center'>
        <Pagination>
          <PaginationContent>
            {currentPage >= 2 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    } else {
                      setCurrentPage(currentPage);
                    }
                  }}
                />
              </PaginationItem>
            )}
            {pageNumbers.map((number, idx) => (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(number)}>
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPage && currentPage != 0 && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPage) {
                      setCurrentPage(currentPage + 1);
                    } else {
                      setCurrentPage(currentPage);
                    }
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default LaporanView;
