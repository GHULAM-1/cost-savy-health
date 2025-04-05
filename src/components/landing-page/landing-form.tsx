"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { insuranceOptions } from "@/data/landing-page/insurance";
import { searchCare } from "@/data/landing-page/search-care";
import { Search, MapPin, ShieldPlus, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import {
  providersSchema,
  ProvidersSchemaType,
} from "@/schema/providers-schema";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  //HOOKS
  const searchParams = useSearchParams();
  const router = useRouter();

  //CONSTANTS
  const initialSearchCare = searchParams.get("searchCare") || "";
  const initialZipCode = searchParams.get("zipCode") || "";
  const initialInsurance = searchParams.get("insurance") || "";

  //FORM
  const form = useForm<ProvidersSchemaType>({
    resolver: zodResolver(providersSchema),
    defaultValues: {
      searchCare: initialSearchCare,
      zipCode: initialZipCode,
      insurance: initialInsurance,
    },
  });
  
  //FUNCTIONS
  function onSubmit(values: ProvidersSchemaType) {
    const params = new URLSearchParams();
    if (values.searchCare) params.set("searchCare", values.searchCare);
    if (values.zipCode) params.set("zipCode", values.zipCode);
    if (values.insurance) params.set("insurance", values.insurance);

    router.push(`/providers?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-10">
        <div className="flex flex-col lg:flex-row w-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="relative flex-1">
            <FormField
              control={form.control}
              name="searchCare"
              render={({ field }) => {
                const [open, setOpen] = useState(false);
                const [searchQuery, setSearchQuery] = useState("");
                const [popoverWidth, setPopoverWidth] = useState(0);
                const containerRef = useRef<HTMLDivElement>(null);

                return (
                  <FormItem className="text-[#03363d]">
                    <div
                      className="px-2 py-3 flex items-center cursor-pointer"
                      ref={containerRef}
                    >
                      <Search className="ml-2 text-[#03363d] mr-2" size={24} />
                      <Popover
                        open={open}
                        onOpenChange={(isOpen) => {
                          setOpen(isOpen);
                          if (isOpen && containerRef.current) {
                            setPopoverWidth(
                              containerRef.current.offsetWidth + 5
                            );
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[90%] justify-between focus-visible:ring-0 text-lg font-normal px-0 border-none shadow-none hover:bg-transparent cursor-pointer"
                            >
                              {field.value || "Search for care..."}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 absolute -left-12"
                          style={{ width: popoverWidth }}
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Search care..."
                              value={searchQuery}
                              onValueChange={setSearchQuery}
                            />
                            <CommandEmpty>No care found.</CommandEmpty>
                            <CommandGroup>
                              <div className="max-h-48 w-full overflow-y-auto">
                                {searchCare
                                  .filter((option) =>
                                    option.name
                                      .toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                                  )
                                  .slice(0, 15)
                                  .map((option) => (
                                    <CommandItem
                                      key={option.name}
                                      value={option.name}
                                      onSelect={() => {
                                        field.onChange(option.name);
                                        setOpen(false);
                                        setSearchQuery("");
                                      }}
                                    >
                                      {}
                                      {option.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === option.name
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                              </div>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="hidden lg:flex items-center">
            <div className="w-px bg-gray-200" style={{ height: "70%" }} />
          </div>

          <div className="relative flex-1">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <div className="px-2 py-3 flex items-center cursor-pointer">
                    <MapPin className="ml-2 mr-2 text-[#03363d]" size={24} />
                    <FormControl>
                      <Input
                        placeholder="Enter Zip Code"
                        type="number"
                        className="border-none focus-visible:ring-0 shadow-none text-lg pl-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="hidden lg:flex items-center">
            <div className="w-px bg-gray-200" style={{ height: "70%" }} />
          </div>

          <div className="relative flex-1">
            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => {
                const [openInsurance, setOpenInsurance] = useState(false);
                const [searchInsuranceQuery, setSearchInsuranceQuery] =
                  useState("");
                const [popoverWidth, setPopoverWidth] = useState(0);
                const containerRef = useRef<HTMLDivElement>(null);

                return (
                  <FormItem className="text-[#03363d]">
                    <div
                      className="px-2 py-3 flex items-center cursor-pointer"
                      ref={containerRef}
                    >
                      <ShieldPlus
                        className="ml-2 text-[#03363d] mr-2"
                        size={24}
                      />
                      <Popover
                        open={openInsurance}
                        onOpenChange={(isOpen) => {
                          setOpenInsurance(isOpen);
                          if (isOpen && containerRef.current) {
                            setPopoverWidth(
                              containerRef.current.offsetWidth + 14
                            );
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[90%] justify-between focus-visible:ring-0 text-lg font-normal px-0 border-none shadow-none hover:bg-transparent cursor-pointer"
                            >
                              {field.value || "I'm not using insurance"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 absolute -left-11"
                          style={{ width: popoverWidth }}
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Search insurance..."
                              value={searchInsuranceQuery}
                              onValueChange={setSearchInsuranceQuery}
                            />
                            <CommandEmpty>No insurance found.</CommandEmpty>
                            <CommandGroup>
                              <div className="max-h-48 w-full overflow-y-auto">
                                {insuranceOptions
                                  .filter((option) =>
                                    option.name
                                      .toLowerCase()
                                      .includes(
                                        searchInsuranceQuery.toLowerCase()
                                      )
                                  )
                                  .map((option) => (
                                    <CommandItem
                                      key={option.id}
                                      value={option.id}
                                      onSelect={() => {
                                        field.onChange(option.name);
                                        setOpenInsurance(false);
                                        setSearchInsuranceQuery("");
                                      }}
                                    >
                                      {option.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === option.name
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                              </div>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="px-4 py-2 w-full lg:w-auto">
            <Button
              type="submit"
              className="flex items-center justify-center bg-[#03363D] text-white px-5 py-4 rounded hover:bg-[#044955] transition-colors w-full lg:h-full lg:w-auto cursor-pointer"
            >
              <span className="lg:hidden">Search Care</span>
              <Search size={24} className="hidden lg:block" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
