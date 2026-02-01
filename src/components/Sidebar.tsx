import { LayoutDashboard, Users, Settings, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Users, label: "Users", active: true },
  { icon: Settings, label: "Settings", active: false },
];

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-sidebar text-sidebar-foreground sidebar-transition",
          "md:relative md:translate-x-0",
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className={cn("flex items-center gap-3", !isOpen && "md:justify-center md:w-full")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <Users className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className={cn("font-semibold text-lg", !isOpen && "md:hidden")}>
              UMD
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hidden md:flex text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")} />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                !isOpen && "md:justify-center md:px-2"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className={cn(!isOpen && "md:hidden")}>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <a
            href="#"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
              !isOpen && "md:justify-center md:px-2"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={cn(!isOpen && "md:hidden")}>Logout</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
