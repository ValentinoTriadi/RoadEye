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

function LaporanView() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 mb-[36px]'>
        <Kecelakaan />
        <Kecelakaan />
        <Kecelakaan />
      </div>

      <div className='flex justify-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default LaporanView;
