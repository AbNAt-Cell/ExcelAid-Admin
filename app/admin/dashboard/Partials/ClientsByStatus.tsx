import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientsByStatus() {
  return (
    <Card>
      <CardHeader className='bg-slate-900 text-white py-3 mb-3 rounded-t-md'>
        <CardTitle>Clients by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[200px]'>
          {/* Add logged in staff items here */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
