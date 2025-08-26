import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DaysSinceClientsLastSeen() {
  return (
    <Card>
      <CardHeader className='bg-slate-900 text-white py-3 mb-3 rounded-t-md'>
        <CardTitle>Days Since Clients Last Seen</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[200px]'>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span>14 or more days</span>
              <span className='bg-slate-50 py-0.5 px-1 rounded-md'>0</span>
            </div>
            <div className='flex justify-between'>
              <span>30 or more days</span>
              <span className='bg-slate-50 py-0.5 px-1 rounded-md'>0</span>
            </div>
            <div className='flex justify-between'>
              <span>Clients Never Seen</span>
              <span className='bg-slate-50 py-0.5 px-1 rounded-md'>0</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
