import { format } from "date-fns";
import type { Transaction } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, FileEdit, Eye, ArrowUpDown } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SalesTableProps {
  data: Transaction[];
  onSort: (key: string) => void;
}

export function SalesTable({ data, onSort }: SalesTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" size="sm" className="-ml-3 h-8 font-semibold" onClick={() => onSort('id')}>
                Transaction ID
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" className="-ml-3 h-8 font-semibold" onClick={() => onSort('date')}>
                Date
              </Button>
            </TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" className="-ml-3 h-8 font-semibold" onClick={() => onSort('customerName')}>
                Customer Name
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Product Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-muted/30 group" data-testid={`row-transaction-${transaction.id}`}>
              <TableCell className="font-mono text-xs text-muted-foreground" data-testid={`text-transaction-id-${transaction.id}`}>
                {transaction.transactionId}
              </TableCell>
              <TableCell className="text-sm" data-testid={`text-date-${transaction.id}`}>
                {transaction.date}
              </TableCell>
              <TableCell className="font-mono text-xs" data-testid={`text-customer-id-${transaction.id}`}>
                {transaction.customerId}
              </TableCell>
              <TableCell className="font-medium" data-testid={`text-customer-name-${transaction.id}`}>
                {transaction.customerName}
              </TableCell>
              <TableCell className="text-sm flex items-center gap-2" data-testid={`text-phone-${transaction.id}`}>
                {transaction.phoneNumber}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`button-copy-phone-${transaction.id}`}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Phone</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell data-testid={`text-gender-${transaction.id}`}>{transaction.gender}</TableCell>
              <TableCell data-testid={`text-age-${transaction.id}`}>{transaction.age}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" data-testid={`text-category-${transaction.id}`}>
                  {transaction.productCategory}
                </span>
              </TableCell>
              <TableCell className="text-right font-mono" data-testid={`text-quantity-${transaction.id}`}>
                {transaction.quantity.toString().padStart(2, '0')}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
