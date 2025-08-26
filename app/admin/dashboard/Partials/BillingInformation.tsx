import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BillingInformation() {
  return (
    <Card>
      <CardHeader className='bg-slate-900 text-white py-3 mb-3 rounded-t-md'>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className='space-y-2'>
          <div className='flex justify-between'>
            <span>Total Amount Collected:</span>
            <span className='bg-slate-50 py-0.5 px-1 rounded-md'>$0.00</span>
          </div>
          <div className='flex justify-between'>
            <span># of Billing Submissions:</span>
            <span className='bg-slate-50 py-0.5 px-1 rounded-md'>0</span>
          </div>
          <div className='flex justify-between'>
            <span># of Claims Created:</span>
            <span className='bg-slate-50 py-0.5 px-1 rounded-md'>0</span>
          </div>
          <div className='flex justify-between'>
            <span># of Documents Billed:</span>
            <span className='bg-slate-50 py-0.5 px-1 rounded-md'>0</span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
