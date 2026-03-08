"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, DownloadCloud } from "lucide-react";
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

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("downloads")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) {
        setError(error);
      } else {
        setDownloads(data);
      }
      setLoading(false);
    };

    fetchDownloads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Downloads Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage official forms, rules, and public documents.
          </p>
        </div>
        <Button className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8 bg-white dark:bg-neutral-950"
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-white dark:bg-neutral-950 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-border">
              <TableHead>File Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Uploaded Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Loading downloads...
                </TableCell>
              </TableRow>
            ) : downloads && downloads.length > 0 ? (
              downloads.map((doc) => (
                  <TableRow key={doc.id} className="border-border">
                    <TableCell className="font-medium max-w-[300px] truncate flex items-center gap-2">
                       <DownloadCloud className="w-4 h-4 text-muted-foreground" />
                       {doc.title}
                    </TableCell>
                    <TableCell>
                       <Badge variant="outline">{doc.category}</Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                       {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
                    </TableCell>
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
                            Rename File
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Document
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  {error ? (
                    <span className="text-destructive font-medium">Error loading downloads connecting to database.</span>
                  ) : (
                    "No documents found. Upload your first document."
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
