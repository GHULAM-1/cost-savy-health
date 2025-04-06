"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { insuranceOptions } from "@/data/landing-page/insurance";

const formSchema = z.object({
  insurance: z.string().min(1, "Please select an insurance option"),
});

type ProviderDropdownProps = {
  defaultValue?: string;
};

export default function ProviderDropdown({
  defaultValue,
}: ProviderDropdownProps) {
  //STATES
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insurance: defaultValue || "",
    },
  });
  //HANDLERS
  useEffect(() => {
    if (defaultValue) {
      const matchingOption = insuranceOptions.find(
        (option) => option.id === defaultValue
      );
      form.setValue("insurance", matchingOption?.id || "");
    }
  }, [defaultValue, form]);

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current]);

  const updateUrlWithInsurance = (insuranceId: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("insurance", insuranceId);
    router.replace(`?${searchParams.toString()}`);
  };

  const handleSelect = (optionId: string) => {
    form.setValue("insurance", optionId);
    updateUrlWithInsurance(optionId);
    setPopoverOpen(false);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto w-full  "
      >
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
                          )?.name
                        : "Select insurance"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  style={{ width: popoverWidth || "100%" }}
                  className="p-0 w-full max-w-md"
                >
                  <Command>
                    <CommandInput placeholder="Search insurance..." />
                    <CommandList>
                      <CommandEmpty>No insurance found.</CommandEmpty>
                      <CommandGroup>
                        {insuranceOptions.map((option) => (
                          <CommandItem
                            value={option.name}
                            key={option.id}
                            onSelect={() => handleSelect(option.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.name}
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
      </form>
    </Form>
  );
}
