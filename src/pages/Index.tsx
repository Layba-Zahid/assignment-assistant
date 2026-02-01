import { useState } from "react";
import { Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import UserTable, { User } from "@/components/UserTable";
import AddUserModal from "@/components/AddUserModal";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Initial sample users
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
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = {
      id: newId,
      ...userData,
    };
    setUsers([...users, newUser]);
    toast({
      title: "User added successfully",
      description: `${userData.name} has been added to the system.`,
    });
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(u => u.id === id);
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: `${userToDelete?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar onToggleSidebar={handleToggleSidebar} />
          
          <main className={cn(
            "flex-1 p-4 md:p-6 sidebar-transition",
            sidebarOpen ? "md:ml-0" : "md:ml-0"
          )}>
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Users
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage and view all users in the system
                  </p>
                </div>
                <AddUserModal onAddUser={handleAddUser} />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{users.length}</p>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                  <p className="text-sm font-medium text-muted-foreground">Admins</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {users.filter(u => u.role === "Admin").length}
                  </p>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                  <p className="text-sm font-medium text-muted-foreground">Editors</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {users.filter(u => u.role === "Editor").length}
                  </p>
                </div>
              </div>

              {/* User Table */}
              <div className="bg-card rounded-lg border border-border shadow-sm">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">All Users</h3>
                </div>
                <div className="p-4">
                  <UserTable users={users} onDeleteUser={handleDeleteUser} />
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
