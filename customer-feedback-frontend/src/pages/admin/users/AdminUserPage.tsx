import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../services/adminService";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

const AdminUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formModal, setFormModal] = useState({
    isOpen: false,
    user: null as User | null,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = () => {
    setFormModal({
      isOpen: true,
      user: null,
    });
  };

  const handleEdit = (user: User) => {
    setFormModal({
      isOpen: true,
      user,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        setIsLoading(true);
        await deleteUser(id);
        await loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (data: {
    name: string;
    email: string;
    password?: string;
    role: "CUSTOMER" | "ADMIN";
  }) => {
    try {
      setIsLoading(true);
      if (formModal.user) {
        await updateUser(formModal.user.id, data);
      } else {
        await createUser({
          ...data,
          password: data.password || "",
        });
      }
      await loadUsers();
      setFormModal({ isOpen: false, user: null });
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">Users</h1>
        <button
          onClick={handleCreateUser}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-1 text-white hover:bg-accent-1/80 transition"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="bg-bg-2 rounded-lg border border-white/10 overflow-hidden">
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      <UserForm
        user={formModal.user || undefined}
        isOpen={formModal.isOpen}
        isLoading={isLoading}
        onClose={() => setFormModal({ isOpen: false, user: null })}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminUserPage;
