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
  getReportingEntities,
  getZipCodesByEntityName,
  getInsurersByBillingCode,
} from "@/api/search/api";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

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
    console.log("isSubmitting state changed:", isSubmitting);
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
  const [careOptions, setCareOptions] = useState<string[]>([]);

  const [openZip, setOpenZip] = useState(false);
  const [localZipQuery, setLocalZipQuery] = useState(initialZip);
  const [zipOptions, setZipOptions] = useState<string[]>([]);

  const [openIns, setOpenIns] = useState(false);
  const [localInsQuery, setLocalInsQuery] = useState(initialInsurance);
  const [insOptions, setInsOptions] = useState<string[]>([]);

  // Add refs and state for widths
  const careFieldRef = useRef<HTMLDivElement>(null);
  const zipFieldRef = useRef<HTMLDivElement>(null);
  const insFieldRef = useRef<HTMLDivElement>(null);
  const [careMenuWidth, setCareMenuWidth] = useState<number | undefined>(
    undefined
  );
  const [zipMenuWidth, setZipMenuWidth] = useState<number | undefined>(
    undefined
  );
  const [insMenuWidth, setInsMenuWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (careFieldRef.current)
      setCareMenuWidth(careFieldRef.current.offsetWidth);
  }, [careFieldRef.current]);
  useEffect(() => {
    if (zipFieldRef.current) setZipMenuWidth(zipFieldRef.current.offsetWidth);
  }, [zipFieldRef.current]);
  useEffect(() => {
    if (insFieldRef.current) setInsMenuWidth(insFieldRef.current.offsetWidth);
  }, [insFieldRef.current]);

  useEffect(() => {
    if (!openCare) return;
    let active = true;
    setLoadingCare(true);
    getReportingEntities("")
      .then((res) => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions([]))
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingCare(false);
            setCareLoaded(true);
          }, 1000);
        }
      });
    return () => {
      active = false;
    };
  }, [openCare]);

  useEffect(() => {
    if (!openZip) return;
    let active = true;
    const searchCare = form.getValues("searchCare");

    // Only fetch if searchCare is selected or a query is typed
    if (!searchCare && !localZipQuery) {
      console.log(
        "No Search Care selected or query typed, not fetching ZIP codes"
      );
      setZipOptions([]);
      setLoadingZip(false);
      setZipLoaded(true);
      return;
    }

    console.log("========== ZIP CODE DEBUG ==========");
    console.log("1. Search Care Value:", searchCare);
    console.log("2. Local ZIP Query:", localZipQuery);
    console.log("3. Form Values:", form.getValues());

    setLoadingZip(true);
    // Pass both searchCare and localZipQuery to the API call
    getZipCodesByEntityName({
      entity: searchCare,
      query: localZipQuery,
    })
      .then((res) => {
        console.log("4. ZIP Response:", res);
        active && setZipOptions(res.data);
      })
      .catch((err) => {
        console.error("5. ZIP Error:", err);
        active && setZipOptions([]);
      })
      .finally(() => {
        if (active) {
          setTimeout(() => {
            setLoadingZip(false);
            setZipLoaded(true);
          }, 3000);
        }
      });
    return () => {
      active = false;
    };
  }, [openZip, form.getValues("searchCare"), localZipQuery]); // Depend on openZip, searchCare, and localZipQuery

  useEffect(() => {
    if (!openIns) return;
    let active = true;
    setLoadingIns(true);
    const searchCare = form.getValues("searchCare");
    const zipCode = form.getValues("zipCode");
    getInsurersByBillingCode(
      searchCare && zipCode ? `${searchCare}|${zipCode}` : ""
    )
      .then((res) => active && setInsOptions(res.data))
      .catch(() => active && setInsOptions([]))
      .finally(() => {
        if (active) {
          setLoadingIns(false);
          setInsLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, [openIns, form.getValues("searchCare"), form.getValues("zipCode")]);

  useEffect(() => {
    if (!openCare) return;
    let active = true;
    setLoadingCare(true);
    getReportingEntities(localCareQuery)
      .then((res) => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions([]))
      .finally(() => {
        if (active) {
          setLoadingCare(false);
          setCareLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, [localCareQuery, openCare]);

  useEffect(() => {
    if (!openIns) return;
    let active = true;
    setLoadingIns(true);
    const searchCare = form.getValues("searchCare");
    const zipCode = form.getValues("zipCode");
    getInsurersByBillingCode(localInsQuery)
      .then((res) => active && setInsOptions(res.data))
      .catch(() => active && setInsOptions([]))
      .finally(() => {
        if (active) {
          setLoadingIns(false);
          setInsLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, [localInsQuery, openIns]);

  function onSubmit(vals: ProvidersSchemaType) {
    setIsSubmitting(true);
    const q = new URLSearchParams();
    if (vals.searchCare) q.set("searchCare", vals.searchCare);
    if (vals.zipCode) q.set("zipCode", vals.zipCode);
    if (vals.insurance) q.set("insurance", vals.insurance);
    router.push(`/providers?${q.toString()}`);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }

  const handleZipSelect = (value: string) => {
    form.setValue("zipCode", value);
    setLocalZipQuery(value);
    setOpenZip(false);
  };

  const handleInsuranceSelect = (value: string) => {
    form.setValue("insurance", value);
    setLocalInsQuery(value);
    setOpenIns(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-10">
        <div className="flex flex-col lg:flex-row w-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <div
            ref={careFieldRef}
            className="relative flex-1 min-w-0 border-r border-gray-200 overflow-hidden"
          >
            <FormField
              control={form.control}
              name="searchCare"
              render={({ field }) => (
                <FormItem className="text-[#03363d]">
                  <div
                    className={`px-2 py-3 flex items-center w-full overflow-hidden ${
                      loadingZip || loadingIns
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <DropdownMenu 
                      open={openCare} 
                      onOpenChange={(open) => {
                        setOpenCare(open);
                        if (open) {
                          form.reset({
                            searchCare: "",
                            zipCode: "",
                            insurance: ""
                          });
                          setLocalCareQuery("");
                          setLocalZipQuery("");
                          setLocalInsQuery("");
                          setZipOptions([]);
                          setInsOptions([]);
                          setZipLoaded(false);
                          setInsLoaded(false);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full no-focus-outline hover:cursor-pointer justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate focus:outline-none focus:ring-0"
                          disabled={loadingZip || loadingIns}
                          onClick={() => {
                            // Reset all fields
                            form.setValue("searchCare", "");
                            form.setValue("zipCode", "");
                            form.setValue("insurance", "");
                            setLocalCareQuery("");
                            setLocalZipQuery("");
                            setLocalInsQuery("");
                            setZipOptions([]);
                            setInsOptions([]);
                            setZipLoaded(false);
                            setInsLoaded(false);
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {loadingCare ? (
                              <Loader2
                                size={24}
                                className="animate-spin !w-6 !h-6 ml-2 mr-2 text-[#03363d] flex-shrink-0"
                              />
                            ) : (
                              <Search
                                className="ml-2 mr-2 !w-6 !h-6 text-[#03363d] flex-shrink-0"
                              />
                            )}
                            {form.getValues("searchCare")
                              ? form.getValues("searchCare")
                              : "Search for care..."}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-full p-0"
                        style={careMenuWidth ? { width: careMenuWidth } : {}}
                      >
                        <div className="px-2 py-2">
                          <Input
                            placeholder="Search care..."
                            value={localCareQuery}
                            onChange={(e) => {
                              setLocalCareQuery(e.target.value);
                              form.setValue("searchCare", e.target.value);
                            }}
                            className="mb-2"
                          />
                          <div className="max-h-48 w-full overflow-y-auto">
                            {loadingCare ? (
                              <div className="text-center py-4 text-gray-500">
                                Loading...
                              </div>
                            ) : careLoaded && careOptions.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">
                                No care found.
                              </div>
                            ) : (
                              !loadingCare &&
                              careOptions.map((name) => (
                                <DropdownMenuItem
                                  key={name}
                                  onSelect={() => {
                                    form.setValue("searchCare", name);
                                    setLocalCareQuery(name);
                                    setOpenCare(false);
                                  }}
                                >
                                  {name}
                                  {form.getValues("searchCare") === name && (
                                    <CheckIcon className="ml-auto h-4 w-4 opacity-100" />
                                  )}
                                </DropdownMenuItem>
                              ))
                            )}
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="hidden lg:flex items-center">
            <div className="w-px bg-gray-200" style={{ height: "70%" }} />
          </div>

          {/* Zip */}
          <div
            ref={zipFieldRef}
            className="relative flex-1 min-w-0 border-r border-gray-200 overflow-hidden"
          >
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="text-[#03363d] w-full">
                  <div
                    className={`px-2 py-3 flex items-center w-full overflow-hidden ${
                      !form.getValues("searchCare") || loadingCare || loadingIns
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <DropdownMenu open={openZip} onOpenChange={setOpenZip}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full no-focus-outline justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate`}
                          disabled={!form.getValues("searchCare") || loadingCare || loadingIns}
                        >
                          <span className="flex items-center gap-2">
                            {loadingZip ? (
                              <Loader2
                                size={24}
                                className="animate-spin !w-6 !h-6 ml-2 mr-2 text-[#03363d] flex-shrink-0"
                              />
                            ) : (
                              <MapPin
                                size={24}
                                className="!w-6 !h-6 ml-2 mr-2 text-[#03363d] flex-shrink-0"
                              />
                            )}
                            {field.value
                              ? field.value
                              : "Select Zip Code"}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-full p-0"
                        style={zipMenuWidth ? { width: zipMenuWidth } : {}}
                      >
                        <div className="px-2 py-2">
                          <Input
                            placeholder="Filter ZIPs..."
                            value={localZipQuery}
                            onChange={(e) => {
                              setLocalZipQuery(e.target.value);
                              field.onChange(e.target.value);
                            }}
                            className="mb-2"
                          />
                          <div className="max-h-48 w-full overflow-y-auto">
                            {zipLoaded && zipOptions.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">
                                No ZIPs found.
                              </div>
                            ) : (
                              !loadingZip &&
                              zipOptions.map((zip) => (
                                <DropdownMenuItem
                                  key={zip}
                                  onSelect={() => handleZipSelect(zip)}
                                >
                                  {zip}
                                  {field.value === zip && (
                                    <CheckIcon className="ml-auto h-4 w-4 opacity-100" />
                                  )}
                                </DropdownMenuItem>
                              ))
                            )}
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="hidden lg:flex items-center">
            <div className="w-px bg-gray-200" style={{ height: "70%" }} />
          </div>

          {/* Insurance */}
          <div
            ref={insFieldRef}
            className="relative flex-1 min-w-0 overflow-hidden"
          >
            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => (
                <FormItem className="text-[#03363d] w-full">
                  <div
                    className={`px-2 py-3 flex items-center w-full overflow-hidden ${
                      !form.getValues("zipCode") || loadingCare || loadingZip
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <DropdownMenu open={openIns} onOpenChange={setOpenIns}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full no-focus-outline outline-0 justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate`}
                          disabled={!form.getValues("zipCode") || loadingCare || loadingZip}
                        >
                          <span className="flex items-center gap-2">
                            {loadingIns ? (
                              <Loader2
                                size={24}
                                className="animate-spin !w-6 !h-6 ml-2 mr-2 text-[#03363d] flex-shrink-0"
                              />
                            ) : (
                              <ShieldPlus
                                size={24}
                                className="!w-6 !h-6 ml-2 mr-2 text-[#03363d] flex-shrink-0"
                              />
                            )}
                            {field.value || "Select Insurance"}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-full p-0"
                        style={insMenuWidth ? { width: insMenuWidth } : {}}
                      >
                        <div className="px-2 py-2">
                          <Input
                            placeholder="Filter insurers..."
                            value={localInsQuery}
                            onChange={(e) => {
                              setLocalInsQuery(e.target.value);
                              field.onChange(e.target.value);
                            }}
                            className="mb-2"
                          />
                          <div className="max-h-48 w-full overflow-y-auto">
                            {loadingIns ? (
                              <div className="text-center py-4 text-gray-500">
                                Loading...
                              </div>
                            ) : insLoaded && insOptions.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">
                                No insurers found.
                              </div>
                            ) : (
                              <>
                                <DropdownMenuItem
                                  key="self-insurance"
                                  className="opacity-100"
                                  onSelect={() =>
                                    handleInsuranceSelect("Self Insurance")
                                  }
                                >
                                  Self Insurance
                                </DropdownMenuItem>
                                {insOptions.map((ins) => (
                                  <DropdownMenuItem
                                    key={ins}
                                    onSelect={() => {
                                      setOpenIns(false);
                                      form.setValue("insurance", ins);
                                      setLocalInsQuery(ins);
                                    }}
                                  >
                                    {ins}
                                    {field.value === ins && (
                                      <CheckIcon className="ml-auto h-4 w-4 opacity-100" />
                                    )}
                                  </DropdownMenuItem>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="px-4 py-2 w-full lg:w-auto">
            <Button
              type="submit"
              className="flex items-center justify-center bg-[#8C2F5D] hover:bg-[#C85990] text-white px-5 py-4 rounded  transition-colors w-full lg:h-full lg:w-auto"
              disabled={
                isSubmitting ||
                !form.getValues("searchCare") ||
                !form.getValues("zipCode") ||
                !form.getValues("insurance") ||
                loadingCare ||
                loadingZip ||
                loadingIns
              }
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
