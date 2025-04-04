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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insuranceOptions } from "@/data/landing-page/insurance";
import { searchCare } from "@/data/landing-page/search-care";
import {
  Search,
  MapPin,
  ShieldPlus,
  CheckIcon,
  SearchCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  providersSchema,
  ProvidersSchemaType,
} from "@/schema/providers-schema";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearchCare = searchParams.get("searchCare") || "";
  const initialZipCode = searchParams.get("zipCode") || "1099";
  const initialInsurance = searchParams.get("insurance") || "";

  const form = useForm<ProvidersSchemaType>({
    resolver: zodResolver(providersSchema),
    defaultValues: {
      searchCare: initialSearchCare,
      zipCode: initialZipCode,
      insurance: initialInsurance,
    },
  });
  function onSubmit(values: ProvidersSchemaType) {
    console.log(values);
    const params = new URLSearchParams();
    if (values.searchCare) params.set("searchCare", values.searchCare);
    if (values.zipCode) params.set("zipCode", values.zipCode);
    if (values.insurance) params.set("insurance", values.insurance);

    router.push(`/providers?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-auto mx-auto py-10"
      >
        <div className="flex flex-col lg:flex-row w-full border-2 border-gray-200 rounded-lg overflow-hidden divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-200">
          <FormField
            control={form.control}
            name="searchCare"
            render={({ field }) => {
              const [open, setOpen] = useState(false);
              const [searchQuery, setSearchQuery] = useState("");

              return (
                <FormItem className="flex-1 text-gray-400">
                  <div className="px-2 py-3 flex items-center">
                    <div>
                      <Search className=" ml-2 mr-2" size={24} />
                    </div>
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
                      <PopoverContent className="w-[100%] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search care..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                          />
                          <CommandEmpty>No care found.</CommandEmpty>
                          <CommandGroup>
                            <div className="max-h-48 w-[100%] overflow-y-auto">
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

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="px-2 py-3 flex items-center">
                  <MapPin className="text-gray-400 ml-2 mr-2" size={24} />
                  <FormControl>
                    <Input
                      placeholder="Enter Zip Code"
                      type="number"
                      className="border-none focus-visible:ring-0 shadow-none text-lg pl-0"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="px-2 py-3 flex items-center">
                  <ShieldPlus className="text-[#4CD7C6] mr-2" size={24} />
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-none p-0 h-auto w-full focus:ring-0 text-lg">
                        <SelectValue placeholder="I'm not using insurance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="">
                      {insuranceOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="px-4 py-3 w-full lg:w-auto">
            <Button
              type="submit"
              className="flex items-center justify-center bg-[#03363D] text-white px-4 py-2 rounded hover:bg-[#044955] transition-colors w-full lg:h-full lg:w-auto"
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
