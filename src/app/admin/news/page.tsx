import { createClient } from "@/lib/supabase/server";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
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
import { format } from "date-fns";

export const metadata = {
  title: "Manage News | ANCA Admin",
};

export default async function AdminNewsPage() {
  const supabase = await createClient();

  // Fetch news from Supabase
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .order("published_date", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News & Events</h1>
          <p className="text-muted-foreground mt-1">
            Publish articles, circulars, and announcements.
          </p>
        </div>
        <Button className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search news..."
            className="pl-8 bg-white dark:bg-neutral-950"
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-white dark:bg-neutral-950 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-border">
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news && news.length > 0 ? (
              news.map((item) => (
                  <TableRow key={item.id} className="border-border">
                    <TableCell className="font-medium max-w-[300px] truncate">{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell className="whitespace-nowrap">
                       {format(new Date(item.published_date), "MMM d, yyyy")}
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
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Post
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  {error ? (
                    <span className="text-destructive font-medium">Error loading news connecting to database.</span>
                  ) : (
                    "No news articles found. Publish your first post."
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
