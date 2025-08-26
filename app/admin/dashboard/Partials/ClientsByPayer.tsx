import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


export default function ClientsByPayer() {
  return (
    <Card>
      <CardHeader className='bg-slate-900 text-white py-3 mb-3 rounded-t-md'>
        <CardTitle>Clients by Payer</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[200px]'>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span>PRIVATE PAY</span>
              <span className='bg-blue-100 px-2 py-1 rounded'>0</span>
            </div>
            <div className='flex justify-between items-center'>
              <span>SUPERIOR HEALTH PLAN STAR</span>
              <span className='bg-blue-100 px-2 py-1 rounded'>0</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
