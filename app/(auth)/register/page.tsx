"use client";

import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, FileText, CreditCard, Shield } from "lucide-react";
import countries from "world-countries";
import { Eye, EyeOff } from "lucide-react";
import { registerClinic } from "@/hooks/auth";

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((val) => /^(\+234|0)\d{10}$/.test(val.replace(/\s+/g, "")) || /^(\+?\d{6,14})$/.test(val.replace(/\s+/g, "")), "Invalid phone number format");

const countryOptions = countries
  .map((country: any) => ({
    label: country.name.common,
    value: country.cca2, // ISO 2-letter code
  }))
  .sort((a: any, b: any) => a.label.localeCompare(b.label));

const registerFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    clientName: z.string().min(1, "Client name is required"),
    phoneNumber: phoneSchema,
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    address: z.object({
      street: z.string().min(1, "Street is required"),
      streetLine2: z.string().optional(),
      city: z.string().min(1, "City is required"),
      region: z.string().min(1, "Region is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      country: z.string().min(1, "Country is required"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // error will show under confirmPassword
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof registerFormSchema>;

export default function ClinicRegister() {
  // const [activeTab, setActiveTab] = useState<'marketer' | 'doctor'>('marketer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      clientName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: {
        street: "",
        streetLine2: "",
        city: "",
        region: "",
        postalCode: "",
        country: "",
      },
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    try {
      // Handle form submission here
      await registerClinic(data);
      // Redirect after successful registration
      router.push("/admin/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Register as a Clinic Admin</h1>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-none">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Clinic Registration</h2>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">First name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Enter first name" type="text" {...field} />
                            </div>
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
                          <FormLabel className="text-gray-700 font-medium">Last name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Enter last name" type="text" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Clinic name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Enter clinic name" type="text" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Enter Phone number" type="tel" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Enter email" type="email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            <span className="font-medium">Password</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password" // ✅ Better UX
                                {...field}
                              />
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            <span className="font-medium">Confirm Password</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Confirm your password" type={showPassword ? "text" : "password"} autoComplete="current-password" {...field} />
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address - Full Width */}
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Street Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Street Address" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.streetLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Street Address Line 2" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.region"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Region" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Postal / Zip Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <select {...field} className="border border-gray-300 rounded-md p-2 w-full">
                          <option value="">Select Country</option>
                          {countryOptions.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  {/* Document Upload Sections */}

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button type="submit" variant="secondary" className="w-full py-3 text-lg font-semibold cursor-pointer" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link href="/marketer/login" className="text-secondary hover:text-secondary/80 font-medium">
                        Login here
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
