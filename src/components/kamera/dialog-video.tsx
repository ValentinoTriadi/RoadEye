import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import TestImage from "@/assets/images/test-notifikasi.png";
import { CalendarDays, Clock1, Edit, MapPin } from "lucide-react";

function VideoDialog({ name, url }: { name: string; url: string }) {
  return (
    <Dialog>
      <DialogTrigger className='w-full h-full z-20 absolute top-0'></DialogTrigger>
      <DialogContent className='w-[70%] max-w-[1080px]'>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>

        <div className='w-full h-full'>
          <video className='rounded-xl' autoPlay>
            <source src={url} type='application/x-mpegURL' />
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoDialog;
