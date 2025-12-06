import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Network, 
  FileInput, 
  Briefcase, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  Circle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <div className={cn("pb-12 w-64 border-r bg-sidebar min-h-screen flex flex-col", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2 flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight text-sidebar-foreground">Vault</h2>
            <span className="text-xs text-muted-foreground">Anurag Yadav</span>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
              <Network className="h-4 w-4" />
              Nexus
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
              <FileInput className="h-4 w-4" />
              Intake
            </Button>
          </div>
        </div>
        
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-between font-medium"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Services
              </span>
              {servicesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            {servicesOpen && (
              <div className="pl-6 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8">
                  <Circle className="h-2 w-2 text-muted-foreground" />
                  Pre-active
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-2 text-sm h-8 font-medium">
                  <div className="h-4 w-1 bg-primary rounded-full -ml-3 mr-1" />
                  Active
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8">
                  <Circle className="h-2 w-2 text-muted-foreground" />
                  Blocked
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8">
                  <Circle className="h-2 w-2 text-muted-foreground" />
                  Closed
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-between font-medium"
              onClick={() => setInvoicesOpen(!invoicesOpen)}
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Invoices
              </span>
              {invoicesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            {invoicesOpen && (
              <div className="pl-6 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8">
                  <Circle className="h-2 w-2 text-muted-foreground" />
                  Proforma Invoices
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm h-8">
                  <Circle className="h-2 w-2 text-muted-foreground" />
                  Final Invoices
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4">
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
