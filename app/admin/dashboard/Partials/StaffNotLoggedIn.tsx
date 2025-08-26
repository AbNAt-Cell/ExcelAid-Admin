import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function StaffNotLoggedIn() {
  return (
    <Card>
      <CardHeader className='bg-slate-900 text-white py-3 mb-3 rounded-t-md'>
        <CardTitle>Staff Not Logged In</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add logged in staff items here */}
        <ScrollArea className='h-[200px]'></ScrollArea>
        {/* Footer */}
        <footer className='mt-8 text-center text-sm text-gray-600'>
          <p>Therasoft Community Service LLC</p>
          <p>2617 E 7th St, Austin TX</p>
          <p>Suite 100</p>
          <p>(512) 779-7141</p>
        </footer>
      </CardContent>
    </Card>
  );
}
