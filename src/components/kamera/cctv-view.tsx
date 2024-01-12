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
          <video autoPlay key={idx} className='rounded-xl'>
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
