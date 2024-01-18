"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { urlData } from "@/utils/url-data";
import VideoDialog from "./dialog-video";

function CCTVView({ urls }: { urls: urlData[] | undefined }) {
  return (
    <>
      <div className='grid grid-cols-3 w-full gap-8 place-content-between'>
        {urls?.map((some, idx) => (
          <div className='relative'>
            <video key={idx} className='rounded-xl' autoPlay>
              <source src={some.url} type='application/x-mpegURL' />
              The browser does not support the video tag.
            </video>
            <VideoDialog url={some.url} name={some.name} />
          </div>
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
