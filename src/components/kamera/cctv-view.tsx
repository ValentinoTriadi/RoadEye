"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import urls from "@/utils/data-url";

function CCTVView() {
  return (
    <>
      <div className='grid grid-cols-3 w-full gap-8 place-content-between'>
        {urls.slice(0, 6).map((url, idx) => (
          <video key={idx} className='rounded-xl' autoPlay>
            <source src={url} type='application/x-mpegURL' />
          </video>
        ))}
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
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default CCTVView;
