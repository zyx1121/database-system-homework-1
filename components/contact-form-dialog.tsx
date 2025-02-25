"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Contact } from "@/lib/contact";

const contactFormSchema = z.object({
  name: z.string().min(1, "姓名為必填").max(10, "姓名最多10個字"),
  phone: z.string().min(1, "電話為必填").max(15, "電話最多15個字"),
  email: z.string().email("請輸入有效的電子郵件").max(20, "電子郵件最多20個字"),
  address: z.string().min(1, "地址為必填").max(50, "地址最多50個字"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  defaultValues?: Contact;
  onSubmit: (data: ContactFormValues) => Promise<void>;
}

export function ContactFormDialog({
  open,
  onOpenChange,
  mode,
  defaultValues,
  onSubmit,
}: ContactFormDialogProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [defaultValues, form]);

  const handleSubmit = async (data: ContactFormValues) => {
    await onSubmit(data);
    form.reset();
  };

  const title = mode === "create" ? "新增聯絡人" : "編輯聯絡人";
  const submitText = mode === "create" ? "新增" : "更新";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            請填寫以下聯絡人資訊。完成後點擊{submitText}。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">姓名</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">電話</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">電子郵件</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" type="email" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">地址</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button type="submit">{submitText}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
