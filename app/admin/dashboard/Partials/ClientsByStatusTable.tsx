import React from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export default function ClientsByStatusTable() {
  return (
    <Card className='col-span-2'>
      <CardHeader className='bg-slate-900 text-white py-3 mb-3 rounded-t-md'>
        <CardTitle>Clients by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[200px]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Appt Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(2)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {`Mr-${Math.floor(Math.random() * 1000)}`}
                  </TableCell>
                  <TableCell>
                    {`Mr-${Math.floor(Math.random() * 1000)}`}
                  </TableCell>
                  <TableCell>
                    {['9:00AM', '11:30AM'][Math.floor(Math.random() * 2)]}
                  </TableCell>
                  <TableCell className='text-right'>
                    {['Family', 'Personal'][Math.floor(Math.random() * 2)]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
