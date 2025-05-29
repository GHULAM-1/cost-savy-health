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
import { Search, MapPin, ShieldPlus, CheckIcon, Loader2 } from "lucide-react";
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

  const [loadingCare, setLoadingCare] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);
  const [loadingIns, setLoadingIns] = useState(false);

  const [careLoaded, setCareLoaded] = useState(false);
  const [zipLoaded, setZipLoaded] = useState(false);
  const [insLoaded, setInsLoaded] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Log isSubmitting state changes
  useEffect(() => {
    console.log('isSubmitting state changed:', isSubmitting);
  }, [isSubmitting]);

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
    setLoadingCare(true);
    getReportingEntities("")
      .then(res => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions(defaultCareOptions))
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingCare(false);
            setCareLoaded(true);
          }, 1000);
        }
      });
    return () => { active = false; };
  }, [openCare]);

  useEffect(() => {
    if (!openZip) return;
    let active = true;
    const searchCare = form.getValues("searchCare");
    
    // Only fetch if searchCare is selected or a query is typed
    if (!searchCare && !localZipQuery) {
      console.log('No Search Care selected or query typed, not fetching ZIP codes');
      setZipOptions(defaultZipOptions);
      setLoadingZip(false);
      setZipLoaded(true);
      return;
    }

    console.log('========== ZIP CODE DEBUG ==========');
    console.log('1. Search Care Value:', searchCare);
    console.log('2. Local ZIP Query:', localZipQuery);
    console.log('3. Form Values:', form.getValues());
    
    setLoadingZip(true);
    // Pass both searchCare and localZipQuery to the API call
    getZipCodesByEntityName({
      entity: searchCare,
      query: localZipQuery
    })
      .then(res => {
        console.log('4. ZIP Response:', res);
        active && setZipOptions(res.data);
      })
      .catch(err => {
        console.error('5. ZIP Error:', err);
        active && setZipOptions(defaultZipOptions);
      })
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingZip(false);
            setZipLoaded(true);
          }, 3000);
        }
      });
    return () => { active = false; };
  }, [openZip, form.getValues("searchCare"), localZipQuery]); // Depend on openZip, searchCare, and localZipQuery

  useEffect(() => {
    if (!openIns) return;
    let active = true;
    setLoadingIns(true);
    const searchCare = form.getValues("searchCare");
    const zipCode = form.getValues("zipCode");
    getInsurersByBillingCode(searchCare && zipCode ? `${searchCare}|${zipCode}` : "")
      .then(res => active && setInsOptions(res.data))
      .catch(() => active && setInsOptions(defaultInsOptions))
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingIns(false);
            setInsLoaded(true);
          }, 3000);
        }
      });
    return () => { active = false; };
  }, [openIns, form.getValues("searchCare"), form.getValues("zipCode")]);

  useEffect(() => {
    if (!openCare) return;
    let active = true;
    setLoadingCare(true);
    getReportingEntities(localCareQuery)
      .then(res => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions(defaultCareOptions))
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingCare(false);
            setCareLoaded(true);
          }, 3000);
        }
      });
    return () => { active = false; };
  }, [localCareQuery, openCare]);

  useEffect(() => {
    if (!openIns) return;
    let active = true;
    setLoadingIns(true);
    const searchCare = form.getValues("searchCare");
    const zipCode = form.getValues("zipCode");
    getInsurersByBillingCode(localInsQuery)
      .then(res => active && setInsOptions(res.data))
      .catch(() => active && setInsOptions(defaultInsOptions))
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingIns(false);
            setInsLoaded(true);
          }, 1000);
        }
      });
    return () => { active = false; };
  }, [localInsQuery, openIns]);

  function onSubmit(vals: ProvidersSchemaType) {
    setIsSubmitting(true);
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
          <div className="relative flex-1 min-w-0 border-r border-gray-200 overflow-hidden" ref={careRef}>
            <FormField control={form.control} name="searchCare" render={({ field }) => (
              <FormItem className="text-[#03363d] w-full">
                <div className="px-2 py-3 flex items-center cursor-pointer w-full overflow-hidden" onClick={() => setOpenCare(true)}>
                  {/* Show loader or Search icon based on loadingCare */}
                  {loadingCare ? (
                    <Loader2 size={24} className="animate-spin mr-2 text-[#03363d] flex-shrink-0" />
                  ) : (
                    <Search size={24} className="ml-2 mr-2 text-[#03363d] flex-shrink-0" />
                  )}
                  <Popover open={openCare} onOpenChange={setOpenCare}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox"
                          className="w-full justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate">
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
                        <CommandGroup>
                          <div className="max-h-48 w-full overflow-y-auto">
                            {careLoaded && careOptions.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">No care found.</div>
                            ) : (
                              !loadingCare && careOptions.map(name => (
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
                              ))
                            )}
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
          <div className="relative flex-1 min-w-0 border-r border-gray-200 overflow-hidden" ref={zipRef}>
            <FormField control={form.control} name="zipCode" render={({ field }) => (
              <FormItem className="text-[#03363d] w-full">
                <div className="px-2 py-3 flex items-center cursor-pointer w-full overflow-hidden" onClick={() => setOpenZip(true)}>
                  {/* Show loader or MapPin icon based on loadingZip */}
                  {loadingZip ? (
                    <Loader2 size={24} className="animate-spin mr-2 text-[#03363d] flex-shrink-0" />
                  ) : (
                    <MapPin size={24} className="ml-2 mr-2 text-[#03363d] flex-shrink-0" />
                  )}
                  <Popover open={openZip} onOpenChange={setOpenZip}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox"
                          className="w-full justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate">
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
                        <CommandGroup>
                          <div className="max-h-48 w-full overflow-y-auto">
                            {zipLoaded && zipOptions.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">No ZIPs found.</div>
                            ) : (
                              !loadingZip && zipOptions.map(zip => (
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
                              ))
                            )}
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
          <div className="relative flex-1 min-w-0 overflow-hidden" ref={insRef}>
            <FormField control={form.control} name="insurance" render={({ field }) => (
              <FormItem className="text-[#03363d] w-full">
                <div className="px-2 py-3 flex items-center cursor-pointer w-full overflow-hidden" onClick={() => setOpenIns(true)}>
                  {/* Show loader or ShieldPlus icon based on loadingIns */}
                  {loadingIns ? (
                    <Loader2 size={24} className="animate-spin mr-2 text-[#03363d] flex-shrink-0" />
                  ) : (
                    <ShieldPlus size={24} className="ml-2 mr-2 text-[#03363d] flex-shrink-0" />
                  )}
                  <Popover open={openIns} onOpenChange={setOpenIns}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox"
                          className="w-full justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate">
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
                        <CommandGroup>
                          <div className="max-h-48 w-full overflow-y-auto">
                            {loadingIns ? (
                              // Show a temporary text indicator if loading inside the dropdown
                              <div className="text-center py-4 text-gray-500">Loading...</div>
                            ) : insLoaded && insOptions.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">No insurers found.</div>
                            ) : (
                              <>
                                <CommandItem
                                  value="self-insurance"
                                  className="opacity-100 cursor-not-allowed"
                                  onSelect={() => {}}
                                >
                                  Self Insurance
                                </CommandItem>
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
                              </>
                            )}
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
              className="flex items-center justify-center bg-[#8C2F5D] text-white px-5 py-4 rounded hover:bg-[#C85990] transition-colors w-full lg:h-full lg:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 size={24} className="animate-spin text-white" />
              ) : (
                <>
                  <span className="lg:hidden">Search Care</span>
                  <Search size={24} className="hidden lg:block" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
