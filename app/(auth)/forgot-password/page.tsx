'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, Loader, Lock, Mail } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendForgotPassword } from '@/hooks/auth';

const forgotPassFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ForgotPassFormValues = z.infer<typeof forgotPassFormSchema>;

const ResetPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<ForgotPassFormValues>({
    resolver: zodResolver(forgotPassFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPassFormValues) => {
    setError('');
    setSuccess('');

    try {
      const { message } = await sendForgotPassword(data);
      setSuccess(message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('error: ', err);
      setError(err.response?.data?.error || 'Failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Link href="/">
        <Image
          className='mb-8'
          src="/images/logo.png"
          alt="Theralink logo"
          width={180}
          height={38}
          priority
        />
      </Link>
      <Card className="w-full max-w-md shadow-xl rounded-md border-none">
        <CardHeader>
          <p className='font-bold text-lg inline-flex items-center'><Lock className='mr-1' /> Reset your password</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-6">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-800 font-semibold'>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
                        <Input className='mt-0 pl-10' placeholder="Enter your email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="secondary" type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center font-bold">
                    <Loader className='spinner-border animate-spin' />
                    <span className="ml-2">Submitting...</span>
                  </div>
                ) : (
                  <span className='font-bold'>Submit <ArrowRight className='inline-block ml-1' /></span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword