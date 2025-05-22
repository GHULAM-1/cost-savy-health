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
  defaultCareOptions,
  defaultInsOptions,
  defaultZipOptions,
} from "@/data/default-search-options";
import {
  getReportingEntities,
  getZipCodesByEntityName,
  getInsurersByBillingCode,
} from "@/api/search/api";

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

  const careRef = useRef<HTMLDivElement>(null);
  const zipRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLDivElement>(null);
  const [careWidth, setCareWidth] = useState(0);
  const [zipWidth, setZipWidth] = useState(0);
  const [insWidth, setInsWidth] = useState(0);

  useEffect(() => {
    if (careRef.current) setCareWidth(careRef.current.offsetWidth + 5);
  }, [careRef]);
  useEffect(() => {
    if (zipRef.current) setZipWidth(zipRef.current.offsetWidth + 14);
  }, [zipRef]);
  useEffect(() => {
    if (insRef.current) setInsWidth(insRef.current.offsetWidth + 14);
  }, [insRef]);

  const [openCare, setOpenCare] = useState(false);
  const [localCareQuery, setLocalCareQuery] = useState(initialCare);
  const [careOptions, setCareOptions] = useState<string[]>(defaultCareOptions);

  const [openZip, setOpenZip] = useState(false);
  const [localZipQuery, setLocalZipQuery] = useState(initialZip);
  const [zipOptions, setZipOptions] = useState<string[]>(defaultZipOptions);

  const [openIns, setOpenIns] = useState(false);
  const [localInsQuery, setLocalInsQuery] = useState(initialInsurance);
  const [insOptions, setInsOptions] = useState<string[]>(defaultInsOptions);

  useEffect(() => {
    if (!openCare) return;
    let active = true;
    getReportingEntities("")
      .then(res => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions(defaultCareOptions));
    return () => { active = false; };
  }, [openCare]);

  useEffect(() => {
    if (!openZip) return;
    let active = true;
    getZipCodesByEntityName("")
      .then(res => active && setZipOptions(res.data))
      .catch(() => active && setZipOptions(defaultZipOptions));
    return () => { active = false; };
  }, [openZip]);

  useEffect(() => {
    if (!openIns) return;
    let active = true;
    getInsurersByBillingCode("")
      .then(res => active && setInsOptions(res.data))
      .catch(() => active && setInsOptions(defaultInsOptions));
    return () => { active = false; };
  }, [openIns]);

  useEffect(() => {
    if (!openCare) return;
    let active = true;
    getReportingEntities(localCareQuery)
      .then(res => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions(defaultCareOptions));
    return () => { active = false; };
  }, [localCareQuery, openCare]);

  useEffect(() => {
    if (!openZip) return;
    let active = true;
    getZipCodesByEntityName(localZipQuery)
      .then(res => active && setZipOptions(res.data))
      .catch(() => active && setZipOptions(defaultZipOptions));
    return () => { active = false; };
  }, [localZipQuery, openZip]);

  useEffect(() => {
    if (!openIns) return;
    let active = true;
    getInsurersByBillingCode(localInsQuery)
      .then(res => active && setInsOptions(res.data))
      .catch(() => active && setInsOptions(defaultInsOptions));
    return () => { active = false; };
  }, [localInsQuery, openIns]);

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

          {/* Care */}
          <div className="relative flex-1" ref={careRef}>
            <FormField control={form.control} name="searchCare" render={({ field }) => (
              <FormItem className="text-[#03363d]">
                <div className="px-2 py-3 flex items-center cursor-pointer" onClick={() => setOpenCare(true)}>
                  <Search size={24} className="ml-2 mr-2 text-[#03363d]" />
                  <Popover open={openCare} onOpenChange={setOpenCare}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox"
                          className="w-[90%] justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent">
                          {field.value || "Search for care..."}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 absolute -left-12 mt-1" style={{ width: careWidth }} align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search care..."
                          value={localCareQuery}
                          onValueChange={v => {
                            setLocalCareQuery(v);
                            field.onChange(v);
                          }}
                        />
                        <CommandEmpty>No care found.</CommandEmpty>
                        <CommandGroup>
                          <div className="max-h-48 w-full overflow-y-auto">
                            {careOptions.map(name => (
                              <CommandItem key={name} value={name}
                                onSelect={() => {
                                  field.onChange(name);
                                  setLocalCareQuery(name);
                                  setOpenCare(false);
                                }}>
                                {name}
                                <CheckIcon
                                  className={cn("ml-auto h-4 w-4", field.value === name ? "opacity-100" : "opacity-0")}
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
            )}/>
          </div>

          <div className="hidden lg:flex items-center">
            <div className="w-px bg-gray-200" style={{ height: "70%" }} />
          </div>

          {/* Zip */}
          <div className="relative flex-1" ref={zipRef}>
            <FormField control={form.control} name="zipCode" render={({ field }) => (
              <FormItem className="text-[#03363d]">
                <div className="px-2 py-3 flex items-center cursor-pointer" onClick={() => setOpenZip(true)}>
                  <MapPin size={24} className="ml-2 mr-2 text-[#03363d]" />
                  <Popover open={openZip} onOpenChange={setOpenZip}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox"
                          className="w-[90%] justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent">
                          {field.value || "Select Zip Code"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 absolute -left-12 mt-1" style={{ width: zipWidth }} align="start">
                      <Command>
                        <CommandInput
                          placeholder="Filter ZIPs..."
                          value={localZipQuery}
                          onValueChange={v => {
                            setLocalZipQuery(v);
                            field.onChange(v);
                          }}
                        />
                        <CommandEmpty>No ZIPs found.</CommandEmpty>
                        <CommandGroup>
                          <div className="max-h-48 w-full overflow-y-auto">
                            {zipOptions.map(zip => (
                              <CommandItem key={zip} value={zip}
                                onSelect={() => {
                                  field.onChange(zip);
                                  setOpenZip(false);
                                }}>
                                {zip}
                                <CheckIcon
                                  className={cn("ml-auto h-4 w-4", field.value === zip ? "opacity-100" : "opacity-0")}
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
            )}/>
          </div>

          <div className="hidden lg:flex items-center">
            <div className="w-px bg-gray-200" style={{ height: "70%" }} />
          </div>

          {/* Insurance */}
          <div className="relative flex-1" ref={insRef}>
            <FormField control={form.control} name="insurance" render={({ field }) => (
              <FormItem className="text-[#03363d]">
                <div className="px-2 py-3 flex items-center cursor-pointer" onClick={() => setOpenIns(true)}>
                  <ShieldPlus size={24} className="ml-2 mr-2 text-[#03363d]" />
                  <Popover open={openIns} onOpenChange={setOpenIns}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox"
                          className="w-[90%] justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent">
                          {field.value || "Select Insurance"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 absolute -left-12 mt-1" style={{ width: insWidth }} align="start">
                      <Command>
                        <CommandInput
                          placeholder="Filter insurers..."
                          value={localInsQuery}
                          onValueChange={v => {
                            setLocalInsQuery(v);
                            field.onChange(v);
                          }}
                        />
                        <CommandEmpty>No insurers found.</CommandEmpty>
                        <CommandGroup>
                          <div className="max-h-48 w-full overflow-y-auto">
                            {insOptions.map(ins => (
                              <CommandItem key={ins} value={ins}
                                onSelect={() => {
                                  field.onChange(ins);
                                  setOpenIns(false);
                                }}>
                                {ins}
                                <CheckIcon
                                  className={cn("ml-auto h-4 w-4", field.value === ins ? "opacity-100" : "opacity-0")}
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
            )}/>
          </div>

          {/* Submit */}
          <div className="px-4 py-2 w-full lg:w-auto">
            <Button type="submit"
              className="flex items-center justify-center bg-[#8C2F5D] text-white px-5 py-4 rounded hover:bg-[#035153] transition-colors w-full lg:h-full lg:w-auto">
              <span className="lg:hidden">Search Care</span>
              <Search size={24} className="hidden lg:block" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
