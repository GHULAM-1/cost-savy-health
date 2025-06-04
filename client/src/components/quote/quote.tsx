"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { sendQuoteRequest } from "@/api/auth/api";

// Zod schema
const contactSchema = z.object({
  insuranceType: z.string().nonempty("Please select an insurance type"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  zipCode: z.string().length(5, "Zip Code must be 5 digits"),
  email: z.string().email("Invalid email address"),
  refSource: z.string().nonempty("Please select how you found us"),
  phone: z.object({
    area: z.string().length(3, "###"),
    prefix: z.string().length(3, "###"),
    line: z.string().length(4, "####"),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      insuranceType: "",
      firstName: "",
      lastName: "",
      zipCode: "",
      email: "",
      refSource: "",
      phone: { area: "", prefix: "", line: "" },
    },
  });

  const [loading, setLoading] = useState(false);

  const insuranceOptions = [
    "Cancer / Heart Attack / Stroke",
    "Individual / Family Health",
    "Medicare Supplement",
    "Life Insurance",
    "Dental / Vision / Hearing",
    "Medicare Advantage",
    "Prescription Drug Plan",
    "Travel Health Insurance",
  ];

  const refOptions = ["Google Search", "Facebook", "Word of Mouth", "Other"];

  async function onSubmit(values: ContactFormValues) {
    setLoading(true);
    try {
      const response = await sendQuoteRequest(values);
      
      if (typeof response === 'object' && response !== null && 'success' in response && response.success) {
        toast('Quote request sent successfully!');
        form.reset();
      } else {
        console.error('Unexpected response format:', response);
        toast.error('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Get a Quote</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Insurance Type */}
          <FormField
            control={form.control}
            name="insuranceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your insurance type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    {insuranceOptions.map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={opt} />
                        <label htmlFor={opt} className="text-gray-700">
                          {opt}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Zip Code */}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* How did you find us? */}
          <FormField
            control={form.control}
            name="refSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you find us? *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-0">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-50">
                      {refOptions.map((opt) => (
                        <SelectItem key={opt} value={opt} className="cursor-pointer">
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <div>
            <FormLabel>Phone *</FormLabel>
            <div className="flex space-x-2 mt-2">
              {(["area", "prefix", "line"] as const).map((segment) => (
                <FormField
                  key={segment}
                  control={form.control}
                  name={`phone.${segment}` as const}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={segment === "line" ? 4 : 3}
                          placeholder={
                            segment === "area"
                              ? "###"
                              : segment === "prefix"
                                ? "###"
                                : "####"
                          }
                          className="text-center"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              className="w-full bg-[#8C2F5D] hover:bg-[#C85990]"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2.01-2.647z"
                  ></path>
                </svg>
              ) : (
                'Get Quotes Now >'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
