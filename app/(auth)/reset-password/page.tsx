'use client'

import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ArrowRight, Loader, Lock } from 'lucide-react'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { sendResetPassword } from '@/hooks/auth'
import { useRouter } from 'nextjs-toploader/app'


const resetPassFormSchema = z.object({
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type ResetPassFormValues = z.infer<typeof resetPassFormSchema>;

const ResetPassword = () => {
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const form = useForm<ResetPassFormValues>({
    resolver: zodResolver(resetPassFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPassFormValues) => {
    if (!token) {
      setError('Invalid token, start process again');
      return;
    };
    setError('');
    setSuccess('');
    const dataWithToken = { password: data.password, token }

    try {
      const { message } = await sendResetPassword(dataWithToken);
      setSuccess(message);
      router.push('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.error || 'Failed to reset password. Please try again.');
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
          <p className='font-bold text-lg inline-flex items-center'><Lock className='mr-1' />Create new password</p>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-800 font-semibold'>Enter New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
                        <Input type='password' className='mt-0 pl-10' placeholder="Enter new password" {...field} />
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
                    <FormLabel className='text-gray-800 font-semibold'>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
                        <Input type='password' className='mt-0 pl-10' placeholder="Confirm new password" {...field} />
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
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  <span className='font-bold'>Change Password <ArrowRight className='inline-block ml-1' /></span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  )
}