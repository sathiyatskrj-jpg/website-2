"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Plus, Search, MoreHorizontal, Trash2, Camera } from "lucide-react";
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
import Image from "next/image";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        setError(error);
      } else {
        setGallery(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photo Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Manage images and albums shown on the public site.
          </p>
        </div>
        <Button className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Upload Image
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search albums..."
            className="pl-8 bg-white dark:bg-neutral-950"
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-white dark:bg-neutral-950 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-border">
              <TableHead>Preview</TableHead>
              <TableHead>Album Name</TableHead>
              <TableHead>Date Taken</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Loading gallery...
                </TableCell>
              </TableRow>
            ) : gallery && gallery.length > 0 ? (
              gallery.map((img) => (
                  <TableRow key={img.id} className="border-border">
                    <TableCell>
                       <div className="w-16 h-12 relative rounded-md overflow-hidden bg-neutral-100 flex items-center justify-center">
                          {img.image_url ? (
                             <Image src={img.image_url} alt="Gallery item preview" fill className="object-cover" />
                          ) : (
                             <Camera className="w-4 h-4 text-muted-foreground" />
                          )}
                       </div>
                    </TableCell>
                    <TableCell className="font-medium">
                       <Badge variant="outline">{img.album}</Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                       {format(new Date(img.date), "MMM d, yyyy")}
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
                          <DropdownMenuItem className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Image
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
                    <span className="text-destructive font-medium">Error loading gallery connecting to database.</span>
                  ) : (
                    "No images found. Upload your first photo."
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
