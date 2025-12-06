import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SalesStatsProps {
  stats: {
    totalUnits: number;
    totalAmount: number;
    totalDiscount: number;
    transactionCount: number;
  }
}

export function SalesStats({ stats }: SalesStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white shadow-sm rounded-lg border-none ring-1 ring-black/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total units sold</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Total quantity of items across all displayed transactions</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-2xl font-bold tracking-tight">{stats.totalUnits}</div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm rounded-lg border-none ring-1 ring-black/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Total revenue before discounts</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-2xl font-bold tracking-tight">
            ₹{stats.totalAmount.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">({stats.transactionCount} SRs)</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm rounded-lg border-none ring-1 ring-black/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Discount</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Total discount value applied</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-2xl font-bold tracking-tight">
            ₹{stats.totalDiscount.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
