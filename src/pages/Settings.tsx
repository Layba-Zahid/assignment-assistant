import { useState } from "react";
import { Bell, Lock, User, Palette, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />

      <div className={cn(
        "flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300"
      )}>
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page header */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="bg-card rounded-xl border border-border">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="text-base font-semibold text-foreground">Profile Information</h3>
                    <p className="text-sm text-muted-foreground mt-1">Update your personal details</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div className="pt-4">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <div className="bg-card rounded-xl border border-border">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="text-base font-semibold text-foreground">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground mt-1">Choose how you want to be notified</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Product Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
                      </div>
                      <Switch
                        checked={notifications.updates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                      />
                    </div>
                    <div className="pt-4">
                      <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <div className="bg-card rounded-xl border border-border">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="text-base font-semibold text-foreground">Security Settings</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manage your password and security options</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <div className="bg-card rounded-xl border border-border">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="text-base font-semibold text-foreground">Appearance</h3>
                    <p className="text-sm text-muted-foreground mt-1">Customize the look and feel</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Language</p>
                          <p className="text-sm text-muted-foreground">English (US)</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Theme</p>
                          <p className="text-sm text-muted-foreground">Dark Mode</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Settings;
