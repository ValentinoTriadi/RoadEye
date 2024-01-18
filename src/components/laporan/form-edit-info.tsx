"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { AccidentData } from "./laporan-view";
import axios from "axios";
import { useLoginContext } from "@/utils/useLogin";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  luka: z.coerce
    .number()
    .min(0, { message: "Jumlah luka tidak boleh kurang dari 0" }),
  meninggal: z.coerce
    .number()
    .min(0, { message: "Jumlah meninggal tidak boleh kurang dari 0" }),
  keterangan: z.string().min(1, { message: "Keterangan tidak boleh kosong" }),
});

function EditInfo({ data }: { data: AccidentData }) {
  const { toast } = useToast();
  const { refecthSave } = useLoginContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      luka: data.luka,
      meninggal: data.meninggal,
      keterangan: data.keterangan,
    },
  });

  function onSubmit(datas: z.infer<typeof formSchema>) {
    const updateAccident = async () => {
      try {
        const form = `luka=${datas.luka}&meninggal=${datas.meninggal}&keterangan=${datas.keterangan}`;
        const video_path = `video_path=${data.video_path}`;
        const endpoint = `https://fnlgp1cr-8000.asse.devtunnels.ms/update-accident/?${video_path}&${form}`;

        const response = await axios.put(
          endpoint,
          {
            luka: datas.luka,
            meninggal: datas.meninggal,
            keterangan: datas.keterangan,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        refecthSave();
        toast({
          title: "Berhasil",
          description: "Berhasil mengubah data kecelakaan",
        });
      } catch (error) {
        console.log(error);
      }
    };

    updateAccident();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-8'
      >
        <div className='grid grid-cols-2 gap-8'>
          <div className='flex flex-col p-4 bg-[#F7F7F7] w-full'>
            <FormField
              control={form.control}
              name='luka'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Korban Luka-Luka</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.luka?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='meninggal'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Korban Meninggal</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.meninggal?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className='w-full h-full'>
            <FormField
              control={form.control}
              name='keterangan'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Tuliskan keterangan disini.'
                      className='w-full h-full resize-none'
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.keterangan?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default EditInfo;
