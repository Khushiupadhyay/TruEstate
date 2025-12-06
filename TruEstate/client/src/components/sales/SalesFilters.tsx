import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  RotateCcw, 
  Search, 
  Calendar as CalendarIcon,
  ChevronDown
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SalesFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (type: string, value: string) => void;
  onReset: () => void;
}

export function SalesFilters({ onSearch, onFilterChange, onReset }: SalesFiltersProps) {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-4">
      {/* Search Bar - Top Right in Layout, but here for logic */}
      {/* The search bar is actually separate in the layout provided in image, but filters are below */}
      
      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" size="icon" onClick={onReset} className="h-9 w-9 shrink-0">
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Select onValueChange={(v) => onFilterChange('region', v)}>
          <SelectTrigger className="h-9 w-[160px] bg-white">
            <SelectValue placeholder="Customer Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="North">North</SelectItem>
            <SelectItem value="South">South</SelectItem>
            <SelectItem value="East">East</SelectItem>
            <SelectItem value="West">West</SelectItem>
            <SelectItem value="Central">Central</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onFilterChange('gender', v)}>
          <SelectTrigger className="h-9 w-[120px] bg-white">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onFilterChange('age', v)}>
          <SelectTrigger className="h-9 w-[130px] bg-white">
            <SelectValue placeholder="Age Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="18-25">18-25</SelectItem>
            <SelectItem value="26-35">26-35</SelectItem>
            <SelectItem value="36-50">36-50</SelectItem>
            <SelectItem value="50+">50+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onFilterChange('category', v)}>
          <SelectTrigger className="h-9 w-[160px] bg-white">
            <SelectValue placeholder="Product Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Home">Home & Decor</SelectItem>
            <SelectItem value="Beauty">Beauty</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={(v) => onFilterChange('payment', v)}>
          <SelectTrigger className="h-9 w-[160px] bg-white">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Credit Card">Credit Card</SelectItem>
            <SelectItem value="Debit Card">Debit Card</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[140px] h-9 justify-start text-left font-normal bg-white",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                if (d) onFilterChange('date', d.toISOString());
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="ml-auto">
           <Select onValueChange={(v) => onFilterChange('sort', v)}>
            <SelectTrigger className="h-9 w-[220px] border-none shadow-none bg-transparent font-medium text-muted-foreground hover:text-foreground">
              <span className="mr-2">Sort by:</span>
              <SelectValue placeholder="Customer Name (A-Z)" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="name_asc">Customer Name (A-Z)</SelectItem>
              <SelectItem value="name_desc">Customer Name (Z-A)</SelectItem>
              <SelectItem value="date_desc">Date (Newest First)</SelectItem>
              <SelectItem value="date_asc">Date (Oldest First)</SelectItem>
              <SelectItem value="amount_desc">Amount (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
