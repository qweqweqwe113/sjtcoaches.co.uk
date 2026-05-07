import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, LogOut, Settings, Inbox, CalendarDays, FolderOpen, FileText, ChevronRight, Image, DollarSign, Edit2, Save, X, Plus, Trash2, ChevronDown, Home, Car, Briefcase, MapPin, Users, Phone, FileQuestion, Check, Mail, Calendar, User } from "lucide-react";
import { loginFn, logoutFn, checkSessionFn, getCredentialsFn, updateEmailFn, updatePasswordFn } from "../server-fns/auth.server";
import {
  getBlogPostsFn,
  createBlogPostFn,
  updateBlogPostFn,
  deleteBlogPostFn,
  getContactMessagesFn,
  deleteContactMessageFn,
  getFleetVehiclesFn,
  createFleetVehicleFn,
  updateFleetVehicleFn,
  deleteFleetVehicleFn,
} from "../server-fns/admin.server";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionFn()
      .then((res) => {
        setAuthed(res.authed);
        setLoading(false);
      })
      .catch(() => {
        setAuthed(false);
        setLoading(false);
      });
  }, []);

  async function handleLogout() {
    try {
      const result = await logoutFn();
      if (result.ok) {
        setAuthed(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-ivory/40 text-sm">Loading...</p>
      </div>
    );
  }

  return authed ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onSuccess={() => setAuthed(true)} />
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginFn({ data: { email, password } });
      if (result.ok) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-champagne/30 mb-6">
            <Lock className="h-5 w-5 text-champagne" strokeWidth={1.25} />
          </div>
          <h1 className="font-display text-3xl text-ivory">SJT Coaches</h1>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-champagne mt-1">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              className="w-full bg-transparent border-b border-ivory/20 focus:border-champagne-deep py-2.5 text-ivory text-sm outline-none transition-colors placeholder:text-ivory/25"
            />
          </div>
          <div>
            <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-ivory/20 focus:border-champagne-deep py-2.5 text-ivory text-sm outline-none transition-colors placeholder:text-ivory/25 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-0 top-2.5 text-ivory/30 hover:text-ivory/70 transition-colors"
                aria-label="Toggle password"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400 tracking-wide">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-champagne-deep text-ink py-3.5 text-[0.65rem] tracking-[0.3em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-center text-ivory/20 text-xs mt-10 tracking-wide">
          SJT Coaches · Admin Panel
        </p>
      </div>
    </div>
  );
}

type Section = "settings" | "messages" | "bookings" | "resource-home" | "resource-fleet" | "resource-services" | "resource-hire" | "resource-about" | "resource-contact" | "resource-quote" | "resource-blog";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("settings");
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const mainNavItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
    { id: "messages", label: "Messages", icon: <Inbox className="h-4 w-4" /> },
    { id: "bookings", label: "Bookings", icon: <CalendarDays className="h-4 w-4" /> },
  ];

  const resourceNavItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "resource-home", label: "Home", icon: <Home className="h-3.5 w-3.5" /> },
    { id: "resource-fleet", label: "Fleet", icon: <Car className="h-3.5 w-3.5" /> },
    { id: "resource-services", label: "Services", icon: <Briefcase className="h-3.5 w-3.5" /> },
    { id: "resource-hire", label: "Hire", icon: <MapPin className="h-3.5 w-3.5" /> },
    { id: "resource-about", label: "About Us", icon: <Users className="h-3.5 w-3.5" /> },
    { id: "resource-contact", label: "Contact", icon: <Phone className="h-3.5 w-3.5" /> },
    { id: "resource-quote", label: "Quote", icon: <FileQuestion className="h-3.5 w-3.5" /> },
    { id: "resource-blog", label: "Blog", icon: <FileText className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-ink text-ivory flex flex-col">
      <header className="border-b border-ivory/10 px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-ivory">SJT Coaches</span>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-champagne">Admin</span>
        </div>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40 hover:text-ivory transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 border-r border-ivory/10 py-8 px-4 shrink-0 flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-[0.65rem] tracking-[0.2em] uppercase transition-colors ${
                section === item.id
                  ? "bg-ivory/10 text-champagne"
                  : "text-ivory/50 hover:text-ivory hover:bg-ivory/5"
              }`}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </span>
              {section === item.id && <ChevronRight className="h-3 w-3 text-champagne" />}
            </button>
          ))}

          {/* Resource Management Dropdown */}
          <div className="mt-4">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-[0.65rem] tracking-[0.2em] uppercase text-ivory/50 hover:text-ivory hover:bg-ivory/5 transition-colors"
            >
              <span className="flex items-center gap-3">
                <FolderOpen className="h-4 w-4" />
                Resource Management
              </span>
              <ChevronDown className={`h-3 w-3 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {resourcesOpen && (
              <div className="mt-1 space-y-1">
                {resourceNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`w-full flex items-center justify-between gap-3 pl-12 pr-4 py-2.5 text-left text-[0.6rem] tracking-[0.2em] uppercase transition-colors ${
                      section === item.id
                        ? "bg-ivory/10 text-champagne"
                        : "text-ivory/40 hover:text-ivory hover:bg-ivory/5"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    {section === item.id && <ChevronRight className="h-3 w-3 text-champagne" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-10 py-12">
          {section === "settings" && <SettingsPanel />}
          {section === "messages" && <MessagesPanel />}
          {section === "bookings" && <BookingsPanel />}
          {section === "resource-home" && <ResourceContentPanel page="Home" />}
          {section === "resource-fleet" && <FleetManagementPanel />}
          {section === "resource-services" && <ResourceContentPanel page="Services" />}
          {section === "resource-hire" && <ResourceContentPanel page="Hire" />}
          {section === "resource-about" && <ResourceContentPanel page="About Us" />}
          {section === "resource-contact" && <ResourceContentPanel page="Contact" />}
          {section === "resource-quote" && <ResourceContentPanel page="Quote" />}
          {section === "resource-blog" && <BlogPanel />}
        </main>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [credentials, setCredentials] = useState({ email: "", hasPassword: false });
  const [loading, setLoading] = useState(true);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCredentials();
  }, []);

  async function loadCredentials() {
    try {
      const creds = await getCredentialsFn();
      setCredentials(creds);
      setNewEmail(creds.email);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load credentials:", err);
      setLoading(false);
    }
  }

  async function handleUpdateEmail() {
    if (!newEmail || !newEmail.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateEmailFn({ data: { email: newEmail } });
      setCredentials(prev => ({ ...prev, email: newEmail }));
      setSuccess("Email updated successfully");
      setEditingEmail(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update email");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdatePassword() {
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Please enter your current password");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setSaving(true);

    try {
      await updatePasswordFn({ 
        data: { 
          currentPassword, 
          newPassword 
        } 
      });
      setSuccess("Password updated successfully");
      setEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  }

  function cancelEmailEdit() {
    setEditingEmail(false);
    setNewEmail(credentials.email);
    setError("");
  }

  function cancelPasswordEdit() {
    setEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  }

  if (loading) {
    return <div className="text-ivory/40 text-sm">Loading settings...</div>;
  }

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h2 className="font-display text-2xl text-ivory">Settings</h2>
        <p className="text-ivory/40 text-sm mt-1">Manage your admin credentials</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 p-4 flex items-center gap-3">
          <Check className="h-4 w-4 text-green-400" />
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Email Section */}
      <div className="bg-ivory/5 border border-ivory/10 p-8 space-y-4">
        <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-champagne mb-3">
          <Lock className="h-3.5 w-3.5" /> Admin Email
        </div>

        {editingEmail ? (
          <div className="space-y-4">
            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateEmail}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-2.5 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" /> Save Email
              </button>
              <button
                onClick={cancelEmailEdit}
                disabled={saving}
                className="px-5 py-2.5 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-ivory/50 text-xs tracking-wider uppercase block mb-1">Current Email</span>
              <span className="text-ivory font-mono">{credentials.email}</span>
            </div>
            <button
              onClick={() => setEditingEmail(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
            >
              <Edit2 className="h-3.5 w-3.5" /> Change Email
            </button>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="bg-ivory/5 border border-ivory/10 p-8 space-y-4">
        <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-champagne mb-3">
          <Lock className="h-3.5 w-3.5" /> Admin Password
        </div>

        {editingPassword ? (
          <div className="space-y-4">
            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPw ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 pr-10 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-2.5 text-ivory/30 hover:text-ivory/70 transition-colors"
                >
                  {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPw ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 pr-10 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-2.5 text-ivory/30 hover:text-ivory/70 transition-colors"
                >
                  {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPw ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 pr-10 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-2.5 text-ivory/30 hover:text-ivory/70 transition-colors"
                >
                  {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleUpdatePassword}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-2.5 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" /> Save Password
              </button>
              <button
                onClick={cancelPasswordEdit}
                disabled={saving}
                className="px-5 py-2.5 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-ivory/50 text-xs tracking-wider uppercase block mb-1">Password</span>
              <span className="text-ivory font-mono">••••••••</span>
            </div>
            <button
              onClick={() => setEditingPassword(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
            >
              <Edit2 className="h-3.5 w-3.5" /> Change Password
            </button>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-ivory/10">
        <p className="text-ivory/40 text-xs leading-relaxed">
          <strong className="text-ivory/60">Security Note:</strong> Your credentials are securely stored in MongoDB with password hashing (PBKDF2 with 100,000 iterations). Changes are permanent and persist across server restarts.
        </p>
      </div>
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    try {
      const msgs = await getContactMessagesFn();
      setMessages(msgs);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  }

  function confirmDelete(id: string) {
    setMessageToDelete(id);
    setShowDeleteConfirm(true);
  }

  async function handleDelete() {
    if (!messageToDelete) return;

    setDeleting(true);
    setShowDeleteConfirm(false);
    
    try {
      await deleteContactMessageFn({ data: { id: messageToDelete } });
      await loadMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message. Please try again.");
    } finally {
      setDeleting(false);
      setMessageToDelete(null);
    }
  }

  function cancelDelete() {
    setShowDeleteConfirm(false);
    setMessageToDelete(null);
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (loading) {
    return <div className="text-ivory/40 text-sm">Loading messages...</div>;
  }

  // Show message detail view
  if (selectedMessage) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => setSelectedMessage(null)}
            className="text-ivory/40 hover:text-ivory transition-colors text-sm flex items-center gap-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to messages
          </button>
        </div>

        <div className="bg-ivory/5 border border-ivory/10 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-ivory mb-2">
                Message from {selectedMessage.name}
              </h2>
              <p className="text-ivory/40 text-sm">
                Received {formatDate(selectedMessage.created_at)}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2 flex items-center gap-2">
                  <User className="h-3.5 w-3.5" /> Full Name
                </div>
                <div className="text-ivory">{selectedMessage.name}</div>
              </div>

              <div>
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2 flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" /> Email
                </div>
                <a href={`mailto:${selectedMessage.email}`} className="text-champagne hover:text-champagne-deep transition-colors">
                  {selectedMessage.email}
                </a>
              </div>

              {selectedMessage.phone && (
                <div>
                  <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> Phone
                  </div>
                  <a href={`tel:${selectedMessage.phone}`} className="text-champagne hover:text-champagne-deep transition-colors">
                    {selectedMessage.phone}
                  </a>
                </div>
              )}

              {selectedMessage.journey_date && (
                <div>
                  <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" /> Journey Date
                  </div>
                  <div className="text-ivory">{selectedMessage.journey_date}</div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-ivory/10">
              <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-3">
                Message
              </div>
              <div className="bg-ivory/5 border border-ivory/10 p-6 text-ivory leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-6 border-t border-ivory/10 flex gap-3 flex-wrap">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry&body=Hello ${selectedMessage.name},%0D%0A%0D%0A`}
                className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors"
              >
                <Mail className="h-3.5 w-3.5" /> Reply via Email
              </a>
              {selectedMessage.phone && (
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              )}
              <button
                onClick={() => confirmDelete(selectedMessage._id)}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase border border-red-400/20 text-red-400/50 hover:border-red-400 hover:text-red-400 transition-colors disabled:opacity-50 ml-auto"
              >
                <Trash2 className="h-3.5 w-3.5" /> {deleting ? "Deleting..." : "Delete Message"}
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 p-4">
            <div className="bg-ink border-2 border-ivory/20 max-w-md w-full p-8">
              <h3 className="font-display text-xl text-ivory mb-4">Delete Message</h3>
              <p className="text-ivory/70 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase bg-red-500 text-ivory hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show messages list
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-ivory">Contact Messages</h2>
        <p className="text-ivory/40 text-sm mt-1">
          {messages.length} message{messages.length !== 1 ? 's' : ''} received
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="border border-ivory/10 p-12 text-center">
          <Inbox className="h-12 w-12 text-ivory/20 mx-auto mb-4" />
          <p className="text-ivory/30 text-sm">No messages yet</p>
          <p className="text-ivory/20 text-xs mt-2">Messages will appear here when submitted</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="border border-ivory/10 p-6 hover:bg-ivory/5 transition-colors cursor-pointer"
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-ivory font-medium text-lg">{msg.name}</h3>
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 border border-champagne/30 text-champagne/70">
                      New
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-ivory/40 mb-3">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {msg.email}
                    </span>
                    {msg.phone && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {msg.phone}
                        </span>
                      </>
                    )}
                    {msg.journey_date && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {msg.journey_date}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-ivory/60 text-sm line-clamp-2">
                    {msg.message}
                  </p>

                  <div className="mt-3 text-xs text-ivory/30">
                    {formatDate(msg.created_at)}
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-ivory/30 shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FleetManagementPanel() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    model: "",
    tag: "Executive",
    img: "",
    capacity: "",
    range: "",
    price: 0,
    description: "",
    features: [] as string[],
  });
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    setLoading(true);
    try {
      const veh = await getFleetVehiclesFn();
      setVehicles(veh);
    } catch (error) {
      console.error("Failed to load vehicles:", error);
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setIsCreating(true);
    setEditingVehicle(null);
    setFormData({
      id: "",
      name: "",
      model: "",
      tag: "Executive",
      img: "",
      capacity: "",
      range: "",
      price: 0,
      description: "",
      features: [],
    });
    setError("");
  }

  function startEdit(vehicle: any) {
    setIsCreating(false);
    setEditingVehicle(vehicle);
    setFormData({
      id: vehicle.id,
      name: vehicle.name,
      model: vehicle.model,
      tag: vehicle.tag,
      img: vehicle.img,
      capacity: vehicle.capacity,
      range: vehicle.range,
      price: vehicle.price,
      description: vehicle.description,
      features: vehicle.features || [],
    });
    setError("");
  }

  function cancelEdit() {
    setIsCreating(false);
    setEditingVehicle(null);
    setError("");
  }

  function addFeature() {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  }

  function removeFeature(index: number) {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    setError("");

    // Validation
    if (!formData.id.trim()) {
      setError("ID is required");
      return;
    }
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.model.trim()) {
      setError("Model is required");
      return;
    }

    setSaving(true);

    try {
      if (editingVehicle) {
        // Update existing vehicle
        await updateFleetVehicleFn({ 
          data: { 
            id: editingVehicle.id, 
            updates: formData 
          } 
        });
      } else {
        // Create new vehicle
        await createFleetVehicleFn({ data: formData });
      }
      
      await loadVehicles();
      cancelEdit();
    } catch (err: any) {
      setError(err.message || "Failed to save vehicle");
    } finally {
      setSaving(false);
    }
  }

  function confirmDelete(id: string) {
    setVehicleToDelete(id);
    setShowDeleteConfirm(true);
  }

  async function handleDelete() {
    if (!vehicleToDelete) return;

    setSaving(true);
    setShowDeleteConfirm(false);
    
    try {
      await deleteFleetVehicleFn({ data: { id: vehicleToDelete } });
      await loadVehicles();
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      setError("Failed to delete vehicle. Please try again.");
    } finally {
      setSaving(false);
      setVehicleToDelete(null);
    }
  }

  function cancelDelete() {
    setShowDeleteConfirm(false);
    setVehicleToDelete(null);
  }

  if (loading) {
    return <div className="text-ivory/40 text-sm">Loading fleet...</div>;
  }

  // Show create/edit form
  if (isCreating || editingVehicle) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-ivory">
              {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </h2>
            <p className="text-ivory/40 text-sm mt-1">
              {editingVehicle ? "Update vehicle details" : "Add a new vehicle to the fleet"}
            </p>
          </div>
          <button
            onClick={cancelEdit}
            className="text-ivory/40 hover:text-ivory transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                ID (Unique) *
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                placeholder="royal-suite"
                disabled={!!editingVehicle}
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Royal Suite"
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Model *
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                placeholder="Mercedes-Benz Sprinter"
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Tag
              </label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              >
                <option value="Flagship">Flagship</option>
                <option value="Executive">Executive</option>
                <option value="Touring">Touring</option>
                <option value="Saloon">Saloon</option>
                <option value="Heritage">Heritage</option>
              </select>
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Capacity
              </label>
              <input
                type="text"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                placeholder="Up to 16 passengers"
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Range
              </label>
              <input
                type="text"
                value={formData.range}
                onChange={(e) => setFormData(prev => ({ ...prev, range: e.target.value }))}
                placeholder="London & Home Counties"
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Price (£/day)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="850"
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                Image Path
              </label>
              <input
                type="text"
                value={formData.img}
                onChange={(e) => setFormData(prev => ({ ...prev, img: e.target.value }))}
                placeholder="/src/assets/fleet-executive.jpg"
                className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the vehicle..."
              rows={4}
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Features
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Add a feature..."
                className="flex-1 bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
              />
              <button
                onClick={addFeature}
                type="button"
                className="px-4 py-2 bg-champagne-deep text-ink text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-ivory/10 border border-ivory/20 px-3 py-1 text-ivory text-sm"
                >
                  {feature}
                  <button
                    onClick={() => removeFeature(index)}
                    className="text-ivory/40 hover:text-red-400 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-ivory/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </>
              )}
            </button>
            <button
              onClick={cancelEdit}
              disabled={saving}
              className="px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show list view
  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ivory">Fleet Management</h2>
          <p className="text-ivory/40 text-sm mt-1">
            {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} in fleet
          </p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      {vehicles.length === 0 ? (
        <div className="border border-ivory/10 p-12 text-center">
          <Car className="h-12 w-12 text-ivory/20 mx-auto mb-4" />
          <p className="text-ivory/30 text-sm">No vehicles yet</p>
          <button
            onClick={startCreate}
            className="mt-4 inline-flex items-center gap-2 text-champagne text-sm hover:text-champagne-deep transition-colors"
          >
            <Plus className="h-4 w-4" /> Add your first vehicle
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="border border-ivory/10 p-6 hover:bg-ivory/5 transition-colors">
              <div className="flex gap-4">
                {vehicle.img && (
                  <div className="w-32 h-24 bg-ivory/5 border border-ivory/10 overflow-hidden shrink-0">
                    <img
                      src={vehicle.img}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-ivory font-medium text-lg truncate">{vehicle.name}</h3>
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 border border-champagne/30 text-champagne/70 shrink-0">
                      {vehicle.tag}
                    </span>
                  </div>
                  <p className="text-ivory/50 text-sm mb-2">{vehicle.model}</p>
                  <div className="flex items-center gap-4 text-xs text-ivory/40 mb-3">
                    {vehicle.capacity && <span>{vehicle.capacity}</span>}
                    {vehicle.price > 0 && (
                      <>
                        <span>•</span>
                        <span>£{vehicle.price}/day</span>
                      </>
                    )}
                  </div>
                  {vehicle.description && (
                    <p className="text-ivory/60 text-sm line-clamp-2 mb-3">{vehicle.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(vehicle)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.6rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                    >
                      <Edit2 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(vehicle.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.6rem] tracking-[0.25em] uppercase border border-red-400/20 text-red-400/50 hover:border-red-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 p-4">
          <div className="bg-ink border-2 border-ivory/20 max-w-md w-full p-8">
            <h3 className="font-display text-xl text-ivory mb-4">Delete Vehicle</h3>
            <p className="text-ivory/70 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase bg-red-500 text-ivory hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingsPanel() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-ivory">Bookings</h2>
        <p className="text-ivory/40 text-sm mt-1">Manage booking requests and reservations</p>
      </div>
      <div className="border border-ivory/10 p-12 text-center">
        <p className="text-ivory/30 text-sm">No bookings yet</p>
        <p className="text-ivory/20 text-xs mt-2">Booking requests will appear here</p>
      </div>
    </div>
  );
}

function BlogPanel() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "SJT Coaches",
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Mock data for demonstration - replace with actual server function
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const posts = await getBlogPostsFn();
      setPosts(posts);
    } catch (error) {
      console.error("Failed to load blog posts:", error);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      author: "SJT Coaches",
      published: false,
    });
    setError("");
  }

  function startEdit(post: any) {
    setIsCreating(false);
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      author: post.author,
      published: post.published,
    });
    setError("");
  }

  function cancelEdit() {
    setIsCreating(false);
    setEditingPost(null);
    setError("");
  }

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  }

  async function handleSave() {
    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.slug.trim()) {
      setError("Slug is required");
      return;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }

    setSaving(true);

    try {
      if (editingPost) {
        // Update existing post
        await updateBlogPostFn({ 
          data: { 
            id: editingPost._id, 
            updates: formData 
          } 
        });
      } else {
        // Create new post
        await createBlogPostFn({ data: formData });
      }
      
      // Reload posts
      await loadPosts();
      cancelEdit();
    } catch (err: any) {
      setError(err.message || "Failed to save article");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteBlogPostFn({ data: { id } });
      await loadPosts();
    } catch (err: any) {
      setError(err.message || "Failed to delete article");
    }
  }

  async function togglePublished(post: any) {
    try {
      await updateBlogPostFn({ 
        data: { 
          id: post._id, 
          updates: { published: !post.published } 
        } 
      });
      await loadPosts();
    } catch (err: any) {
      setError(err.message || "Failed to update publish status");
    }
  }

  if (loading) {
    return <div className="text-ivory/40 text-sm">Loading blog posts...</div>;
  }

  // Show create/edit form
  if (isCreating || editingPost) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-ivory">
              {editingPost ? "Edit Article" : "Create New Article"}
            </h2>
            <p className="text-ivory/40 text-sm mt-1">
              {editingPost ? "Update the article details" : "Write and publish a new blog post"}
            </p>
          </div>
          <button
            onClick={cancelEdit}
            className="text-ivory/40 hover:text-ivory transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title"
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="article-url-slug"
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
            />
            <p className="text-ivory/30 text-xs mt-1">URL: /blog/{formData.slug || "article-slug"}</p>
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the article (optional)"
              rows={3}
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your article content here..."
              rows={12}
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Featured Image
            </label>
            <input
              type="text"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="/src/assets/blog-image.jpg"
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
            />
            {formData.featured_image && (
              <div className="mt-3 w-48 h-32 bg-ivory/5 border border-ivory/10 overflow-hidden">
                <img
                  src={formData.featured_image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Author name"
              className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-ivory/70 text-sm">
              Publish immediately
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-ivory/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  {editingPost ? "Update Article" : "Publish Article"}
                </>
              )}
            </button>
            <button
              onClick={cancelEdit}
              disabled={saving}
              className="px-6 py-3 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show list view
  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ivory">Blog Management</h2>
          <p className="text-ivory/40 text-sm mt-1">
            {posts.length} article{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors"
        >
          <Plus className="h-4 w-4" /> New Article
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="border border-ivory/10 p-12 text-center">
          <p className="text-ivory/30 text-sm">No blog posts yet</p>
          <button
            onClick={startCreate}
            className="mt-4 inline-flex items-center gap-2 text-champagne text-sm hover:text-champagne-deep transition-colors"
          >
            <Plus className="h-4 w-4" /> Create your first article
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="border border-ivory/10 p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-ivory font-medium text-lg">{post.title}</h3>
                    <span className={`text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 border ${
                      post.published
                        ? "text-green-400 border-green-400/30 bg-green-400/10"
                        : "text-amber-400 border-amber-400/30 bg-amber-400/10"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="text-ivory/50 text-sm mb-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-ivory/40">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>/blog/{post.slug}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {post.featured_image && (
                  <div className="w-32 h-20 bg-ivory/5 border border-ivory/10 overflow-hidden shrink-0">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-ivory/10">
                <button
                  onClick={() => startEdit(post)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                >
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => togglePublished(post)}
                  className="px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                >
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-red-400/20 text-red-400/50 hover:border-red-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceContentPanel({ page }: { page: string }) {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  // Mock data for demonstration - replace with actual server function
  useEffect(() => {
    // Simulate loading content for specific page
    setTimeout(() => {
      const pageKey = page.toLowerCase().replace(/\s+/g, '_');
      const mockData: Record<string, any[]> = {
        home: [
          { key: "home_hero_title", section: "home", type: "text", label: "Hero Title", value: "Travel without compromise.", description: "Main homepage headline" },
          { key: "home_hero_subtitle", section: "home", type: "textarea", label: "Hero Subtitle", value: "Luxury coach hire across London & the United Kingdom", description: "Homepage subtitle text" },
          { key: "home_hero_image", section: "home", type: "image", label: "Hero Image", value: "/src/assets/hero-coach-light.jpg", description: "Main hero background image" },
          { key: "home_about_title", section: "home", type: "text", label: "About Section Title", value: "The premier private coach charter company", description: "About section heading" },
        ],
        fleet: [
          { key: "fleet_hero_title", section: "fleet", type: "text", label: "Fleet Page Title", value: "Our Fleet", description: "Fleet page main title" },
          { key: "fleet_description", section: "fleet", type: "textarea", label: "Fleet Description", value: "Discover our range of luxury vehicles", description: "Fleet page description" },
          { key: "fleet_hero_image", section: "fleet", type: "image", label: "Fleet Hero Image", value: "/src/assets/fleet-hero.jpg", description: "Fleet page hero image" },
        ],
        services: [
          { key: "services_hero_title", section: "services", type: "text", label: "Services Title", value: "Our Services", description: "Services page title" },
          { key: "services_description", section: "services", type: "textarea", label: "Services Description", value: "Premium transportation services", description: "Services description" },
        ],
        hire: [
          { key: "hire_hero_title", section: "hire", type: "text", label: "Hire Page Title", value: "Coach Hire", description: "Hire page title" },
          { key: "hire_description", section: "hire", type: "textarea", label: "Hire Description", value: "Book your luxury coach", description: "Hire page description" },
        ],
        about_us: [
          { key: "about_hero_title", section: "about", type: "text", label: "About Title", value: "About SJT Coaches", description: "About page title" },
          { key: "about_description", section: "about", type: "textarea", label: "About Description", value: "Our story and values", description: "About page description" },
          { key: "about_team_image", section: "about", type: "image", label: "Team Image", value: "/src/assets/team-founder.jpg", description: "Team photo" },
        ],
        contact: [
          { key: "contact_phone", section: "contact", type: "phone", label: "Contact Phone", value: "+44 20 4577 1234", description: "Main contact number" },
          { key: "contact_email", section: "contact", type: "email", label: "Contact Email", value: "concierge@sjtcoaches.co.uk", description: "Main contact email" },
          { key: "contact_address", section: "contact", type: "text", label: "Address", value: "12 Berkeley Square, Mayfair, London W1J 6BR", description: "Office address" },
          { key: "contact_whatsapp", section: "contact", type: "phone", label: "WhatsApp", value: "+44 7700 900123", description: "WhatsApp number" },
        ],
        quote: [
          { key: "quote_hero_title", section: "quote", type: "text", label: "Quote Page Title", value: "Get a Quote", description: "Quote page title" },
          { key: "quote_description", section: "quote", type: "textarea", label: "Quote Description", value: "Build your journey in seconds", description: "Quote page description" },
        ],
      };
      
      setContents(mockData[pageKey] || []);
      setLoading(false);
    }, 500);
  }, [page]);

  function startEdit(item: any) {
    setEditingKey(item.key);
    setEditValue(item.value);
  }

  function cancelEdit() {
    setEditingKey(null);
    setEditValue("");
  }

  async function saveEdit(key: string) {
    setSaving(true);
    // Simulate save - replace with actual server function
    setTimeout(() => {
      setContents(prev => prev.map(c => 
        c.key === key ? { ...c, value: editValue } : c
      ));
      setSaving(false);
      cancelEdit();
    }, 500);
  }

  if (loading) {
    return <div className="text-ivory/40 text-sm">Loading content...</div>;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ivory">{page} Page Content</h2>
          <p className="text-ivory/40 text-sm mt-1">
            Manage text, images, and content for the {page} page
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors">
          <Plus className="h-4 w-4" /> Add Content
        </button>
      </div>

      {contents.length === 0 ? (
        <div className="border border-ivory/10 p-12 text-center">
          <p className="text-ivory/30 text-sm">No content items yet</p>
          <p className="text-ivory/20 text-xs mt-2">Click "Add Content" to create new items</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((item) => (
            <div key={item.key} className="border border-ivory/10 p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-ivory font-medium">{item.label}</h3>
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 border border-champagne/30 text-champagne/70">
                      {item.type}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-ivory/40 text-xs mb-3">{item.description}</p>
                  )}

                  {editingKey === item.key ? (
                    <div className="space-y-3">
                      {item.type === "textarea" ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          rows={4}
                          className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                        />
                      ) : (
                        <input
                          type={item.type === "image" || item.type === "url" ? "text" : item.type}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(item.key)}
                          disabled={saving}
                          className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
                        >
                          <Save className="h-3.5 w-3.5" /> Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          disabled={saving}
                          className="px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {item.type === "image" ? (
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-20 bg-ivory/5 border border-ivory/10 overflow-hidden">
                            <img
                              src={item.value}
                              alt={item.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <code className="text-ivory/70 text-sm">{item.value}</code>
                        </div>
                      ) : (
                        <div className="text-ivory text-base font-mono">{item.value}</div>
                      )}
                      <button
                        onClick={() => startEdit(item)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PricingPanel() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    vehicle_type: "",
    base_price: 0,
    price_per_mile: 0,
    price_per_hour: 0,
    minimum_hours: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setRules([
        { _id: "1", vehicle_type: "Executive Minibus", base_price: 280, price_per_mile: 2.5, price_per_hour: 45, minimum_hours: 4, active: true },
        { _id: "2", vehicle_type: "Luxury Coach", base_price: 640, price_per_mile: 3.5, price_per_hour: 80, minimum_hours: 6, active: true },
        { _id: "3", vehicle_type: "VIP Coach", base_price: 960, price_per_mile: 4.5, price_per_hour: 120, minimum_hours: 8, active: true },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  function startEdit(rule: any) {
    setEditingId(rule._id);
    setFormData({
      vehicle_type: rule.vehicle_type,
      base_price: rule.base_price,
      price_per_mile: rule.price_per_mile,
      price_per_hour: rule.price_per_hour,
      minimum_hours: rule.minimum_hours,
      active: rule.active,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({
      vehicle_type: "",
      base_price: 0,
      price_per_mile: 0,
      price_per_hour: 0,
      minimum_hours: 0,
      active: true,
    });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    setTimeout(() => {
      setRules(prev => prev.map(r => 
        r._id === id ? { ...r, ...formData } : r
      ));
      setSaving(false);
      cancelEdit();
    }, 500);
  }

  if (loading) {
    return <div className="text-ivory/40 text-sm">Loading pricing rules...</div>;
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ivory">Pricing Management</h2>
          <p className="text-ivory/40 text-sm mt-1">
            Manage pricing rules for different vehicle types
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors">
          <Plus className="h-4 w-4" /> Add Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule._id} className="border border-ivory/10 p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-ivory font-medium text-lg">{rule.vehicle_type}</h3>
                  <span className={`text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 border ${
                    rule.active 
                      ? "text-green-400 border-green-400/30 bg-green-400/10" 
                      : "text-red-400 border-red-400/30 bg-red-400/10"
                  }`}>
                    {rule.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {editingId === rule._id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                          Base Price (£)
                        </label>
                        <input
                          type="number"
                          value={formData.base_price}
                          onChange={(e) => setFormData(prev => ({ ...prev, base_price: Number(e.target.value) }))}
                          className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                          Price per Mile (£)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.price_per_mile}
                          onChange={(e) => setFormData(prev => ({ ...prev, price_per_mile: Number(e.target.value) }))}
                          className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                          Price per Hour (£)
                        </label>
                        <input
                          type="number"
                          value={formData.price_per_hour}
                          onChange={(e) => setFormData(prev => ({ ...prev, price_per_hour: Number(e.target.value) }))}
                          className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 mb-2">
                          Minimum Hours
                        </label>
                        <input
                          type="number"
                          value={formData.minimum_hours}
                          onChange={(e) => setFormData(prev => ({ ...prev, minimum_hours: Number(e.target.value) }))}
                          className="w-full bg-ivory/5 border border-ivory/20 px-4 py-2 text-ivory text-sm outline-none focus:border-champagne transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`active-${rule._id}`}
                        checked={formData.active}
                        onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`active-${rule._id}`} className="text-ivory/70 text-sm">
                        Active
                      </label>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => saveEdit(rule._id)}
                        disabled={saving}
                        className="inline-flex items-center gap-2 bg-champagne-deep text-ink px-5 py-2.5 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-champagne transition-colors disabled:opacity-50"
                      >
                        <Save className="h-3.5 w-3.5" /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={saving}
                        className="px-5 py-2.5 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-ivory/40 text-xs tracking-wider uppercase mb-1">Base Price</div>
                        <div className="text-ivory text-lg font-display">£{rule.base_price}</div>
                      </div>
                      <div>
                        <div className="text-ivory/40 text-xs tracking-wider uppercase mb-1">Per Mile</div>
                        <div className="text-ivory text-lg font-display">£{rule.price_per_mile}</div>
                      </div>
                      <div>
                        <div className="text-ivory/40 text-xs tracking-wider uppercase mb-1">Per Hour</div>
                        <div className="text-ivory text-lg font-display">£{rule.price_per_hour}</div>
                      </div>
                      <div>
                        <div className="text-ivory/40 text-xs tracking-wider uppercase mb-1">Min Hours</div>
                        <div className="text-ivory text-lg font-display">{rule.minimum_hours}h</div>
                      </div>
                    </div>
                    <button
                      onClick={() => startEdit(rule)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase border border-ivory/20 text-ivory/50 hover:border-champagne hover:text-champagne transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" /> Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
