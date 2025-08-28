import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { seeAllAppointments } from "@/hooks/admin/appointments";

export default function TodaysAppointments() {
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    const getStats = async () => {
      const response = await seeAllAppointments();
      if (response) {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        // Filter appointments where appointmentDate matches today's date
        const todaysAppointments = response.filter((appointment: any) => appointment?.form?.appointmentDate && new Date(appointment.form.appointmentDate).toISOString().split("T")[0] === today);

        setAppointments(todaysAppointments);
      }
    };

    getStats();
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader className="bg-slate-900 text-white py-3 mb-3 rounded-t-md">
        <CardTitle>Today&apos;s Appointement</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Marketer</TableHead>
                  <TableHead>Appointment Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments?.map((appointment: any, i: any) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{`Dr-${appointment?.doctor?.id}`}</TableCell>
                    <TableCell>{`Mr-${appointment?.marketer?.id}`}</TableCell>
                    <TableCell>{appointment?.form?.appointmentTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
