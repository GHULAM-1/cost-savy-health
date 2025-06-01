"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formSchema, FormSchemaType } from "@/schema/contact-form-schema";
import { organization } from "@/data/contact-us/organization"; // Now using correct content for Organization Type
import { hearAboutUs } from "@/data/contact-us/hear-about-us"; // Correct data for Hear About Us
import { sendContactMessage } from "@/api/auth/api";
import { useState } from "react";

export default function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      emailaddress: "",
      phonenumber: "",
      hear: "",
      problemsolve: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    setIsSubmitting(true);
    try {
      const safeValues = { ...values, phonenumber: values.phonenumber || "" };
      const res = await sendContactMessage(safeValues);
      if (typeof res === "object" && res.success) {
        toast("Your message has been sent! We'll get back to you soon.");
        form.reset();
      } else {
        console.log("failed");
        toast("Failed to send your message. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-7 bg-white shadow-xl"
      >
        <div className="text-center text-[#02363D] text-3xl lg:text-4xl font-bold">
          Connect with Cost Savvy
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 uppercase flex">
                    First Name
                    <span className="ml-1" style={{ color: "#098481" }}>
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      type="text"
                      {...field}
                      className="w-full rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-0 focus:ring-[#3ac4bb]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="lg:col-span-6">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 uppercase flex">
                    Last Name
                    <span className="ml-1" style={{ color: "#098481" }}>
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      type="text"
                      {...field}
                      className="w-full rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#098481]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <FormField
              control={form.control}
              name="emailaddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 uppercase flex">
                    Email
                    <span className="ml-1" style={{ color: "#098481" }}>
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      type="text"
                      {...field}
                      className="w-full rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#098481]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="lg:col-span-6">
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 uppercase flex">
                    Phone Number
                    <span className="ml-1" style={{ color: "#098481" }}>
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XXX-XXX-XXXX"
                      type="number"
                      {...field}
                      className="w-full rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#098481]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="hear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 uppercase flex">
                How Did You Hear About Us?
                <span className="ml-1" style={{ color: "#098481" }}>
                  *
                </span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full rounded-full border border-gray-300 px-4 py-3 justify-between text-left focus:outline-none focus:ring-0",
                        !field.value && "text-gray-400"
                      )}
                    >
                      {field.value
                        ? hearAboutUs.find((item) => item.value === field.value)
                            ?.label
                        : "------"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[200px] p-0 rounded-lg border border-gray-200"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No option found.</CommandEmpty>
                      <CommandGroup>
                        {hearAboutUs.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={() => form.setValue("hear", item.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                item.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problemsolve"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 uppercase flex">
                What Problem Can We Help You Solve?
                <span className="ml-1" style={{ color: "#098481" }}>
                  *
                </span>
              </FormLabel>
              <FormControl className="w-full">
                <Textarea
                  placeholder="Tell us how we can help or if there's a product you'd like to learn more about."
                  className="block w-full resize-none rounded-2xl border border-gray-300 px-4 py-4 h-23 focus:outline-none focus:ring-2 focus:ring-[#3ac4bb]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-[#6B1548] hover:bg-[#C85990] text-white px-16 py-6 mx-auto flex items-center justify-center rounded-4xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-1">
              <span>Submitting</span>
              <span>
                <Loader2 className="animate-spin mr-2" />
              </span>
            </div>
          ) : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
