import React from "react";
import testImage from "@/assets/images/test-image.png";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function CCTVView() {
  return (
    <>
      <div className='grid grid-cols-3 w-full gap-8 place-content-between'>
        <Image src={testImage} alt='test' />
        <Image src={testImage} alt='test' />
        <Image src={testImage} alt='test' />
        <Image src={testImage} alt='test' />
        <Image src={testImage} alt='test' />
        <Image src={testImage} alt='test' />
      </div>

      <div>
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
    </>
  );
}

export default CCTVView;
