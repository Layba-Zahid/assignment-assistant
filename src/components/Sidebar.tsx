import { LayoutDashboard, Users, Settings, ChevronLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Users", href: "/" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ease-in-out",
          isOpen 
            ? "w-64 translate-x-0" 
            : "w-64 -translate-x-full lg:w-16 lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border shrink-0">
          <div className={cn(
            "flex items-center gap-3 overflow-hidden",
            !isOpen && "lg:justify-center lg:w-full"
          )}>
            <div className="h-8 w-8 shrink-0 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Users className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className={cn(
              "font-semibold text-base whitespace-nowrap transition-opacity duration-200",
              !isOpen && "lg:opacity-0 lg:w-0"
            )}>
              UMD
            </span>
          </div>
          <button
            onClick={onToggle}
            className={cn(
              "hidden lg:flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent transition-colors shrink-0",
              !isOpen && "lg:hidden"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 h-10 px-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      !isOpen && "lg:justify-center lg:px-0"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={cn(
                      "whitespace-nowrap transition-opacity duration-200",
                      !isOpen && "lg:hidden"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <a
            href="#"
            className={cn(
              "flex items-center gap-3 h-10 px-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
              !isOpen && "lg:justify-center lg:px-0"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={cn(
              "whitespace-nowrap transition-opacity duration-200",
              !isOpen && "lg:hidden"
            )}>
              Logout
            </span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
