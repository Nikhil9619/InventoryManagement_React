

import React, { useState, useEffect } from "react";
import InvoiceManager from "./InvoiceManager";

"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InvoiceTable({ onInvoicesChange }) {
  const [invoices, setInvoices] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  // ✅ Load invoices from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem("invoices");
    if (saved) {
      const parsed = JSON.parse(saved);
      setInvoices(parsed);
      if (onInvoicesChange) onInvoicesChange(parsed);
    }
  }, []);

  // ✅ Save to localStorage whenever invoices change
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // ✅ Add / Edit Invoice handler
  const handleSaveInvoice = (invoice) => {
    if (editInvoice) {
      // Update existing
      const updated = invoices.map((inv) =>
        inv.id === editInvoice.id ? { ...invoice, id: editInvoice.id } : inv
      );
      setInvoices(updated);
      setEditInvoice(null);
    } else {
      // Add new
      const newInvoice = {
        ...invoice,
        id: Date.now(),
        status: "Pending",
      };
      setInvoices([...invoices, newInvoice]);
    }
    setShowModal(false);
  };

  // ✅ Delete invoice
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  // ✅ Mark as Paid
  const handleMarkAsPaid = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "Paid" } : inv
    );
    setInvoices(updated);
  };

  // ✅ Table columns
  const columns = [
    {
      accessorKey: "invoiceNo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Invoice No
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.invoiceNo}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              row.original.customerName
            )}&background=random`}
            alt={row.original.customerName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{row.original.customerName}</span>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => row.original.date || "-",
    },
    {
      accessorKey: "totalAfterTax",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Total (₹)
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        `₹${Number(row.original.totalAfterTax || 0).toLocaleString("en-IN")}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status || "Pending";
        const color =
          s === "Paid"
            ? "bg-green-100 text-green-700"
            : s === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700";
        return (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}
          >
            {s}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const inv = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(inv.invoiceNo)}
              >
                Copy Invoice No
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMarkAsPaid(inv.id)}>
                Mark as Paid
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditInvoice(inv);
                  setShowModal(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(inv.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // ✅ Table instance
  const table = useReactTable({
    data: invoices,
    columns,
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      {/* === Header with Add + Search === */}
      <div className="flex items-center justify-between py-4">
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            setEditInvoice(null);
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4" /> Add Invoice
        </Button>
        <Input
          placeholder="Search invoices..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* === Table === */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center text-gray-500"
                >
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* === Pagination === */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* === Add/Edit Modal === */}
      <InvoiceManager
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveInvoice}
        editData={editInvoice}
      />
    </div>
  );
}
