"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact, defaultContacts } from "@/lib/contact";
import { indexedDB } from "@/lib/indexed-db";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactFormDialog, ContactFormValues } from "./contact-form-dialog";

export function IndexedDBAddressBook() {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const contacts = useLiveQuery(() => indexedDB.contacts.toArray()) ?? [];

  useEffect(() => {
    const initializeDB = async () => {
      const count = await indexedDB.contacts.count();
      if (count === 0) {
        await indexedDB.contacts.bulkAdd(defaultContacts);
      }
    };
    initializeDB();
  }, []);

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            姓名
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "電話",
    },
    {
      accessorKey: "email",
      header: "電子郵件",
    },
    {
      accessorKey: "address",
      header: "地址",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const contact = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">打開選單</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingContact(contact)}>
                編輯
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  if (contact.id) indexedDB.contacts.delete(contact.id);
                }}
              >
                刪除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: contacts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleCreate = async (data: ContactFormValues) => {
    await indexedDB.contacts.add(data);
    setIsCreateOpen(false);
  };

  const handleEdit = async (data: ContactFormValues) => {
    if (editingContact?.id) {
      await indexedDB.contacts.update(editingContact.id, data);
      setEditingContact(null);
    }
  };

  return (
    <div className="max-w-screen-lg w-full">
      <div className="flex items-center justify-between py-4 space-x-4">
        <Input
          placeholder="搜尋姓名..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 新增聯絡人
        </Button>
      </div>

      <ContactFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        mode="create"
        onSubmit={handleCreate}
      />

      <ContactFormDialog
        open={editingContact !== null}
        onOpenChange={(open) => !open && setEditingContact(null)}
        mode="edit"
        defaultValues={editingContact ?? undefined}
        onSubmit={handleEdit}
      />

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    沒有找到聯絡人。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 py-4">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          上一頁
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          下一頁
        </Button>
      </div>
    </div>
  );
}
