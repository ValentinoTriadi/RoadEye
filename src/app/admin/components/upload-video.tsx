"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function VideoUpload() {
  const [file, setFile] = React.useState<File | null>(null);
  const { toast } = useToast();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file_upload", file as File);

    try {
      const endPoint = "http://localhost:8000/uploadfile/"; //isi sesuai endpoint back end
      const res = await fetch(endPoint, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast({
          title: "File Submitted Successfully!",
          description: "Please continue to submit the data set.",
        });
      } else {
        toast({
          title: "Something Went Wrong!",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something Went Wrong!",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <div className='space-y-10 flex flex-col items-center justify-center'>
      <form className='flex w-full' onSubmit={handleSubmit}>
        <Input
          type='file'
          onChange={handleChange}
          className='z-10'
          accept='video/*'
        />
        <Button type='submit' className=' transition-colors duration-500'>
          Submit
        </Button>
      </form>

      {file && (
        <video autoPlay className='w-[60%]' controls>
          <source src={URL.createObjectURL(file)} type='video/mp4' />
        </video>
      )}
    </div>
  );
}

export default VideoUpload;
