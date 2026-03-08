"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Globe, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) {
        setError(error);
      } else {
        setTournaments(data);
      }
      setLoading(false);
    };

    fetchTournaments();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage chess events across the islands.
          </p>
        </div>
        <Button className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Tournament
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tournaments..."
            className="pl-8 bg-white dark:bg-neutral-950"
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-white dark:bg-neutral-950 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-border">
              <TableHead>Event Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Loading tournaments...
                </TableCell>
              </TableRow>
            ) : tournaments && tournaments.length > 0 ? (
              tournaments.map((tournament) => {
                 const isUpcoming = new Date(tournament.start_date) > new Date();
                 const isOngoing = new Date(tournament.start_date) <= new Date() && new Date(tournament.end_date) >= new Date();
                 
                 let statusBadge = <Badge variant="secondary">Completed</Badge>;
                 if (isUpcoming) statusBadge = <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">Upcoming</Badge>;
                 if (isOngoing) statusBadge = <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 animate-pulse">Live</Badge>;

                 return (
                  <TableRow key={tournament.id} className="border-border">
                    <TableCell className="font-medium">{tournament.name}</TableCell>
                    <TableCell>{tournament.location}</TableCell>
                    <TableCell className="whitespace-nowrap">
                       {format(new Date(tournament.start_date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{tournament.category}</TableCell>
                    <TableCell>{statusBadge}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          {tournament.registration_link && (
                             <DropdownMenuItem className="cursor-pointer">
                               <Globe className="mr-2 h-4 w-4" />
                               Registration Link
                             </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <FileCheck className="mr-2 h-4 w-4" />
                            Upload Results
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                 )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  {error ? (
                    <span className="text-destructive font-medium">Error loading tournaments connecting to database.</span>
                  ) : (
                    "No tournaments found. Create your first event."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
