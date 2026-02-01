import { Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onDeleteUser: (id: number) => void;
}

const getRoleBadgeVariant = (role: string): "default" | "secondary" | "outline" => {
  switch (role.toLowerCase()) {
    case "admin":
      return "default";
    case "editor":
      return "secondary";
    default:
      return "outline";
  }
};

const UserTable = ({ users, onDeleteUser }: UserTableProps) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-base font-medium text-foreground mb-1">No users found</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Add your first user by clicking the "Add User" button above.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="h-12 px-4 text-left text-sm font-semibold text-foreground">ID</th>
            <th className="h-12 px-4 text-left text-sm font-semibold text-foreground">Name</th>
            <th className="h-12 px-4 text-left text-sm font-semibold text-foreground hidden sm:table-cell">Email</th>
            <th className="h-12 px-4 text-left text-sm font-semibold text-foreground">Role</th>
            <th className="h-12 px-4 text-right text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id} 
              className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
            >
              <td className="h-14 px-4 text-sm text-muted-foreground">#{user.id}</td>
              <td className="h-14 px-4">
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                <span className="block text-xs text-muted-foreground sm:hidden">{user.email}</span>
              </td>
              <td className="h-14 px-4 text-sm text-muted-foreground hidden sm:table-cell">{user.email}</td>
              <td className="h-14 px-4">
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
              </td>
              <td className="h-14 px-4 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteUser(user.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
