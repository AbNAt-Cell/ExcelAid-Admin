"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/hooks/admin/users";

type UserStatus = "approved" | "pending" | "suspended" | "denied";

interface User {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  status: UserStatus;
}

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => user.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleRowClick = (user: User) => {
    setSelected(user);
    setOpen(true);
  };

  const handleApprove = () => {
    if (!selected) return;
    console.log("Approved user:", selected.id);
    setOpen(false);
  };

  const handleDeny = () => {
    if (!selected) return;
    console.log("denied user:", selected.id);
    setOpen(false);
  };

  const handleSuspend = () => {
    if (!selected) return;
    console.log("suspended user:", selected.id);
    setOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(); // replace with actual getUsers API
      if (response) {
        // Transform client data → user data if needed
        const mapped = response.map((c: any, idx: number) => ({
          id: c.id,
          name: c.name || c.clientName || `${c.firstname} ${c.lastname}`,
          email: c.email,
          createdAt: c.createdAt,
          status: (c.status as UserStatus) || "pending",
        }));
        setUsers(mapped);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-medium">User Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8 w-[240px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </span>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Creation</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      No User found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => (
                    <TableRow key={user.id} className="cursor-pointer hover:bg-accent" onClick={() => handleRowClick(user)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold 
                          ${user.status === "approved" ? "bg-green-100 text-green-800" : user.status === "pending" ? "bg-yellow-100 text-yellow-800" : user.status === "suspended" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>
                          {user.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>User Information</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <p>
                  <b>Name:</b> {selected.name}
                </p>
                <p>
                  <b>Email:</b> {selected.email ?? "—"}
                </p>
                <p>
                  <b>Date of Creation:</b> {new Date(selected.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <b>Status:</b> {selected.status}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                {selected.status === "pending" && (
                  <>
                    <Button onClick={handleApprove} className="bg-green-600 text-white">
                      Approve
                    </Button>
                    <Button onClick={handleDeny} variant="destructive">
                      Deny
                    </Button>
                  </>
                )}

                {selected.status === "approved" && (
                  <Button onClick={handleSuspend} variant="destructive">
                    Suspend
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
