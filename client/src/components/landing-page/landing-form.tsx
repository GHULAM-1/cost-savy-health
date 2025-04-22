"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { Search, MapPin, ShieldPlus, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  providersSchema,
  ProvidersSchemaType,
} from "@/schema/providers-schema";

import {
  searchReportingEntities,
  getZipCodesByEntityName,
  getInsurersByBillingCode,
} from "@/api/sanity/queries";
import {
  defaultCareOptions,
  defaultInsOptions,
  defaultZipOptions,
} from "@/data/default-search-options";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCare = searchParams.get("searchCare") || "";
  const initialZip = searchParams.get("zipCode") || "";
  const initialInsurance = searchParams.get("insurance") || "";

  const form = useForm<ProvidersSchemaType>({
    resolver: zodResolver(providersSchema),
    defaultValues: {
      searchCare: initialCare,
      zipCode: initialZip,
      insurance: initialInsurance,
    },
  });

  //STATES
  const [careOptions, setCareOptions] = useState<string[]>(defaultCareOptions);
  const [careQuery, setCareQuery] = useState(initialCare);
  const careRef = useRef<HTMLDivElement>(null);
  const [careWidth, setCareWidth] = useState(0);
  const [zipOptions, setZipOptions] = useState<string[]>(defaultZipOptions);
  const [zipQuery, setZipQuery] = useState("");
  const [zipWidth, setZipWidth] = useState(0);
  const [insOptions, setInsOptions] = useState<string[]>(defaultInsOptions);
  const [insQuery, setInsQuery] = useState("");
  const insRef = useRef<HTMLDivElement>(null);
  const [insWidth, setInsWidth] = useState(0);
  //HANDLERS
  useEffect(() => {
    if (careRef.current) setCareWidth(careRef.current.offsetWidth + 5);
  }, [careRef]);

  useEffect(() => {
    if (!careQuery) return setCareOptions(defaultCareOptions);
    let active = true;
    searchReportingEntities(careQuery, 15)
      .then((list) => active && setCareOptions(list))
      .catch(() => active && setCareOptions(defaultCareOptions));
    return () => {
      active = false;
    };
  }, [careQuery]);

  const zipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (zipRef.current) setZipWidth(zipRef.current.offsetWidth + 14);
  }, [zipRef]);

  useEffect(() => {
    const care = form.watch("searchCare") || "";
    if (!care) return setZipOptions(defaultZipOptions);
    let active = true;
    getZipCodesByEntityName(care)
      .then((list) => active && setZipOptions(list))
      .catch(() => active && setZipOptions(defaultZipOptions));
    return () => {
      active = false;
    };
  }, [form.watch("searchCare")]);

  useEffect(() => {
    if (insRef.current) setInsWidth(insRef.current.offsetWidth + 14);
  }, [insRef]);

  useEffect(() => {
    const care = form.watch("searchCare") || "";
    if (!care) return setInsOptions(defaultInsOptions);
    let active = true;
    getInsurersByBillingCode(care)
      .then((list) => active && setInsOptions(list))
      .catch(() => active && setInsOptions(defaultInsOptions));
    return () => {
      active = false;
    };
  }, [form.watch("searchCare")]);
  //FUNCTIONS
  function onSubmit(vals: ProvidersSchemaType) {
    const q = new URLSearchParams();
    if (vals.searchCare) q.set("searchCare", vals.searchCare);
    if (vals.zipCode) q.set("zipCode", vals.zipCode);
    if (vals.insurance) q.set("insurance", vals.insurance);
    router.push(`/providers?${q.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-10">
        <div className="flex flex-col lg:flex-row w-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="relative flex-1" ref={careRef}>
            <FormField
              control={form.control}
              name="searchCare"
              render={({ field }) => {
                const [open, setOpen] = useState(false);
                return (
                  <FormItem className="text-[#03363d]">
                    <div
                      className="px-2 py-3 flex items-center cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <Search size={24} className="ml-2 mr-2 text-[#03363d]" />
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[90%] justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent"
                            >
                              {field.value || "Search for care..."}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 absolute -left-12 mt-1"
                          style={{ width: careWidth }}
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Search care..."
                              value={careQuery}
                              onValueChange={(v) => {
                                setCareQuery(v);
                                field.onChange(v);
                              }}
                            />
                            <CommandEmpty>No care found.</CommandEmpty>
                            <CommandGroup>
                              <div className="max-h-48 w-full overflow-y-auto">
                                {careOptions.map((name) => (
                                  <CommandItem
                                    key={name}
                                    value={name}
                                    onSelect={() => {
                                      field.onChange(name);
                                      setCareQuery("");
                                      setOpen(false);
                                    }}
                                  >
                                    {name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === name
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

          <div className="relative flex-1" ref={zipRef}>
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => {
                const [open, setOpen] = useState(false);
                return (
                  <FormItem className="text-[#03363d]">
                    <div
                      className="px-2 py-3 flex items-center cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <MapPin size={24} className="ml-2 mr-2 text-[#03363d]" />
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[90%] justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent"
                            >
                              {field.value || "Select Zip Code"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 absolute -left-12 mt-1"
                          style={{ width: zipWidth }}
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Filter ZIPs..."
                              value={zipQuery}
                              onValueChange={setZipQuery}
                            />
                            <CommandEmpty>No ZIPs found.</CommandEmpty>
                            <CommandGroup>
                              <div className="max-h-48 w-full overflow-y-auto">
                                {zipOptions
                                  .filter((z) => z.includes(zipQuery))
                                  .slice(0, 10)
                                  .map((zip) => (
                                    <CommandItem
                                      key={zip}
                                      value={zip}
                                      onSelect={() => {
                                        field.onChange(zip);
                                        setOpen(false);
                                      }}
                                    >
                                      {zip}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === zip
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

          <div className="relative flex-1" ref={insRef}>
            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => {
                const [open, setOpen] = useState(false);
                return (
                  <FormItem className="text-[#03363d]">
                    <div
                      className="px-2 py-3 flex items-center cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <ShieldPlus
                        size={24}
                        className="ml-2 mr-2 text-[#03363d]"
                      />
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[90%] justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent"
                            >
                              {field.value || "Select Insurance"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 absolute -left-12 mt-1"
                          style={{ width: insWidth }}
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Filter insurers..."
                              value={insQuery}
                              onValueChange={setInsQuery}
                            />
                            <CommandEmpty>No insurers found.</CommandEmpty>
                            <CommandGroup>
                              <div className="max-h-48 w-full overflow-y-auto">
                                {insOptions
                                  .filter((i) =>
                                    i
                                      .toLowerCase()
                                      .includes(insQuery.toLowerCase())
                                  )
                                  .slice(0, 10)
                                  .map((i) => (
                                    <CommandItem
                                      key={i}
                                      value={i}
                                      onSelect={() => {
                                        field.onChange(i);
                                        setOpen(false);
                                      }}
                                    >
                                      {i}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === i
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
              className="flex items-center justify-center bg-[#098481] text-white px-5 py-4 rounded hover:bg-[#035153] transition-colors w-full lg:h-full lg:w-auto"
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
