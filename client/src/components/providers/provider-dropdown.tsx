"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
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
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { insuranceOptions } from "@/data/landing-page/insurance";
import { cn } from "@/lib/utils";
import { getInsurersByBillingCode } from "@/api/search/api";

const formSchema = z.object({
  insurance: z.string().min(1, "Please select an insurance option"),
});

type InsuranceDropdownProps = {
  defaultValue?: string;
  onSelect?: (insuranceId: string) => void;
  openOnMount?: boolean;
  externalRef?: React.RefObject<HTMLDivElement>;
};

export default function InsuranceDropdown({ defaultValue, onSelect, openOnMount, externalRef }: InsuranceDropdownProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [insuranceOptionsState, setInsuranceOptionsState] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insurance: defaultValue || "",
    },
  });

  useEffect(() => {
    if (defaultValue) {
      form.setValue("insurance", defaultValue);
    }
  }, [defaultValue, form]);

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current]);

  useEffect(() => {
    if (!popoverOpen) return;
    setLoading(true);
    getInsurersByBillingCode(query)
      .then((res) => setInsuranceOptionsState(res.data))
      .catch(() => setInsuranceOptionsState([]))
      .finally(() => setLoading(false));
  }, [query, popoverOpen]);

  useEffect(() => {
    if (openOnMount) {
      setPopoverOpen(true);
      if (externalRef && externalRef.current) {
        externalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [openOnMount, externalRef]);

  const handleSelect = (optionId: string) => {
    form.setValue("insurance", optionId);
    setPopoverOpen(false);
    if (onSelect) {
      onSelect(optionId);
    }
  };

  return (
    <div ref={externalRef}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="insurance"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      ref={triggerRef}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full h-12 md:h-14 justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      onClick={() => setPopoverOpen(!popoverOpen)}
                    >
                      {field.value
                        ? insuranceOptions.find(
                            (option) => option.id === field.value
                          )?.name || field.value
                        : "Select insurance"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  style={{ width: popoverWidth || "100%" }}
                  className="p-0 w-full"
                >
                  <Command>
                    <CommandInput
                      placeholder="Search insurance..."
                      value={query}
                      onValueChange={setQuery}
                    />
                    <CommandList>
                      {loading ? (
                        <div className="text-center py-4 text-gray-500">Loading...</div>
                      ) : insuranceOptionsState.length === 0 ? (
                        <CommandEmpty>No insurance found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {insuranceOptionsState.map((option) => (
                            <CommandItem
                              value={option}
                              key={option}
                              onSelect={() => handleSelect(option)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === option ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {option}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
