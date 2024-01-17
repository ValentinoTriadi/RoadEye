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

const formSchema = z.object({
  luka: z.coerce
    .number()
    .min(0, { message: "Jumlah luka tidak boleh kurang dari 0" }),
  meninggal: z.coerce
    .number()
    .min(0, { message: "Jumlah meninggal tidak boleh kurang dari 0" }),
  keterangan: z.string().min(1, { message: "Keterangan tidak boleh kosong" }),
});

function FormLaporan() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      luka: 0,
      meninggal: 0,
      keterangan: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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

export default FormLaporan;
