import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/Sidebar";
import { SalesTable } from "@/components/sales/SalesTable";
import { SalesFilters } from "@/components/sales/SalesFilters";
import { SalesStats } from "@/components/sales/SalesStats";
import { fetchTransactions, fetchStats } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import type { TransactionFilters } from "@shared/schema";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    age: "",
    category: "",
    payment: "",
    date: "",
    sort: "date_desc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const apiFilters = useMemo((): TransactionFilters => {
    const baseFilters: TransactionFilters = {
      search: searchQuery || undefined,
      region: filters.region || undefined,
      gender: filters.gender || undefined,
      productCategory: filters.category || undefined,
      paymentMethod: filters.payment || undefined,
      page: currentPage,
      limit: itemsPerPage,
    };

    if (filters.age) {
      if (filters.age === "18-25") {
        baseFilters.ageMin = 18;
        baseFilters.ageMax = 25;
      } else if (filters.age === "26-35") {
        baseFilters.ageMin = 26;
        baseFilters.ageMax = 35;
      } else if (filters.age === "36-50") {
        baseFilters.ageMin = 36;
        baseFilters.ageMax = 50;
      } else if (filters.age === "50+") {
        baseFilters.ageMin = 51;
      }
    }

    if (filters.sort) {
      switch (filters.sort) {
        case "name_asc":
          baseFilters.sortBy = "customerName";
          baseFilters.sortOrder = "asc";
          break;
        case "name_desc":
          baseFilters.sortBy = "customerName";
          baseFilters.sortOrder = "desc";
          break;
        case "date_asc":
          baseFilters.sortBy = "date";
          baseFilters.sortOrder = "asc";
          break;
        case "date_desc":
          baseFilters.sortBy = "date";
          baseFilters.sortOrder = "desc";
          break;
        case "amount_desc":
          baseFilters.sortBy = "totalAmount";
          baseFilters.sortOrder = "desc";
          break;
        default:
          baseFilters.sortBy = "date";
          baseFilters.sortOrder = "desc";
      }
    }

    return baseFilters;
  }, [searchQuery, filters, currentPage]);

  const statsFilters = useMemo(() => {
    const { page, limit, sortBy, sortOrder, ...rest } = apiFilters;
    return rest;
  }, [apiFilters]);

  const { data: transactionsData, isLoading: transactionsLoading, error: transactionsError } = useQuery({
    queryKey: ["transactions", apiFilters],
    queryFn: () => fetchTransactions(apiFilters),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats", statsFilters],
    queryFn: () => fetchStats(statsFilters),
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      region: "",
      gender: "",
      age: "",
      category: "",
      payment: "",
      date: "",
      sort: "date_desc"
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const totalPages = transactionsData?.totalPages || 0;

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar className="hidden md:flex shrink-0" />
      
      <main className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">
          <div className="sticky top-0 z-10 bg-white border-b px-8 py-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Sales Management System
            </h1>
            
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Name, Phone no."
                className="w-full pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="p-8 space-y-6 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <SalesFilters 
              onSearch={setSearchQuery}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
            
            {statsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : stats ? (
              <SalesStats stats={stats} />
            ) : null}
            
            {transactionsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : transactionsError ? (
              <div className="text-center py-12 text-red-600" data-testid="error-message">
                Failed to load transactions. Please try again.
              </div>
            ) : transactionsData && transactionsData.data.length > 0 ? (
              <>
                <SalesTable 
                  data={transactionsData.data} 
                  onSort={(key) => {
                    const sortKey = key === 'customerName' ? 'name_asc' : 'date_desc';
                    handleFilterChange('sort', sortKey);
                  }} 
                />

                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            setCurrentPage(p => Math.max(1, p - 1)); 
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          data-testid="button-pagination-previous"
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              href="#" 
                              isActive={currentPage === pageNum}
                              onClick={(e) => { 
                                e.preventDefault(); 
                                setCurrentPage(pageNum); 
                              }}
                              data-testid={`button-pagination-${pageNum}`}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            setCurrentPage(p => Math.min(totalPages, p + 1)); 
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          data-testid="button-pagination-next"
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-slate-500" data-testid="text-no-data">
                No transactions found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
