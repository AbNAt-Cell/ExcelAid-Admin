"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ClientStatus = "Confirmed" | "Pending" | "Review";

interface Diagnosis {
  id: string;
  date: string;
  name: string;
  status: ClientStatus;
  sex?: "male" | "female";
  time?: string;
  address?: string;
  signature?: string;
  assessment?: string;
  doctorName?: string;
  marketerName?: string;
}

export default function ClientDiagnosis() {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startDate, setStartDate] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endDate, setEndDate] = useState("");

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const filteredDiagnoses = diagnoses.filter((diagnosis) => {
    const matchesSearch = diagnosis.name.toLowerCase().includes(searchTerm.toLowerCase()) || diagnosis.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = (!startDate || diagnosis.date >= startDate) && (!endDate || diagnosis.date <= endDate);
    return matchesSearch && matchesDateRange;
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Diagnosis | null>(null);

  const handleRowClick = (d: Diagnosis) => {
    setSelected(d);
    setOpen(true);
  };

  return (
    <div className="container max-w-[1350px] mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-medium">Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search clients..." className="pl-8 w-[240px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              {/* <DatePickerWithRange /> */}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredDiagnoses.length} of {diagnoses.length} clients
              </span>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiagnoses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No Client found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDiagnoses.map((diagnosis) => (
                    <TableRow key={diagnosis.id} className="cursor-pointer hover:bg-accent" onClick={() => handleRowClick(diagnosis)}>
                      <TableCell>{new Date(diagnosis.date).toLocaleDateString()}</TableCell>
                      <TableCell>{diagnosis.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${diagnosis.status === "Confirmed" ? "bg-green-100 text-green-800" : diagnosis.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>{diagnosis.status}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                <p>
                  <b>Client:</b> {selected.name}
                </p>
                <p>
                  <b>Sex:</b> {selected.sex ?? "—"}
                </p>
                <p>
                  <b>Date:</b> {selected.date}
                </p>
                <p>
                  <b>Time:</b> {selected.time ?? "—"}
                </p>
                <p>
                  <b>Address:</b> {selected.address ?? "—"}
                </p>
                <p>
                  <b>Status:</b> {selected.status}
                </p>
                {/* Only show doctor name if status is not Pending */}
                {selected.status !== "Pending" && (
                  <p>
                    <b>Doctor:</b> {selected.doctorName ?? "—"}
                  </p>
                )}

                <p>
                  <b>Marketer:</b> {selected.marketerName ?? "—"}
                </p>
                <p>
                  <b>Assessment Summary:</b> {selected.assessment ?? "—"}
                </p>

                {selected.signature ? (
                  <div>
                    <b>Client Signature:</b>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selected.signature} alt="Client Signature" className="mt-2 border rounded-md w-40" />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    <b>Client Signature:</b> None
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
