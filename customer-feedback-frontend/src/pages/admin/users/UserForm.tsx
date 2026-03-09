import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

interface UserFormProps {
  user?: User;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    password?: string;
    role: "CUSTOMER" | "ADMIN";
  }) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER" as "CUSTOMER" | "ADMIN",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "CUSTOMER",
      });
    }
  }, [user, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && !formData.password) {
      // If editing and no password provided, don't include it
      const { password, ...data } = formData;
      onSubmit(data);
    } else {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-bg-2 rounded-lg max-w-md w-full p-6 text-text-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {user ? "Edit" : "Create"} User
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-1"
              placeholder="Enter fullname"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-1"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {user ? "Password (leave empty to keep current)" : "Password *"}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!user}
              className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-1"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role *</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "CUSTOMER" | "ADMIN",
                })
              }
              className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-1"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-text-muted hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-accent-1 text-white hover:bg-accent-1/80 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
