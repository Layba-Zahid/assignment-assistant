import { useState } from "react";
import { Users, UserCheck, UserCog } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import UserTable, { User } from "@/components/UserTable";
import AddUserModal from "@/components/AddUserModal";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialUsers: User[] = [
  { id: 1, name: "John Smith", email: "john.smith@email.com", role: "Admin" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", role: "Editor" },
  { id: 3, name: "Mike Williams", email: "mike.w@email.com", role: "Viewer" },
  { id: 4, name: "Emily Davis", email: "emily.d@email.com", role: "Editor" },
  { id: 5, name: "Chris Brown", email: "chris.b@email.com", role: "Viewer" },
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { toast } = useToast();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddUser = (userData: { name: string; email: string; role: string }) => {
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser: User = { id: newId, ...userData };
    setUsers([...users, newUser]);
    toast({
      title: "User added",
      description: `${userData.name} has been added successfully.`,
    });
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find((u) => u.id === id);
    setUsers(users.filter((user) => user.id !== id));
    toast({
      title: "User deleted",
      description: `${userToDelete?.name} has been removed.`,
      variant: "destructive",
    });
  };

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
    },
    {
      label: "Admins",
      value: users.filter((u) => u.role === "Admin").length,
      icon: UserCog,
    },
    {
      label: "Editors",
      value: users.filter((u) => u.role === "Editor").length,
      icon: UserCheck,
    },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />

      {/* Main content area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300",
        sidebarOpen ? "lg:ml-0" : "lg:ml-0"
      )}>
        {/* Navbar */}
        <Navbar onToggleSidebar={handleToggleSidebar} />

        {/* Main */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Users</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and view all users in the system
                </p>
              </div>
              <AddUserModal onAddUser={handleAddUser} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Users table card */}
            <div className="bg-card rounded-xl border border-border">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-base font-semibold text-foreground">All Users</h3>
              </div>
              <UserTable users={users} onDeleteUser={handleDeleteUser} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
