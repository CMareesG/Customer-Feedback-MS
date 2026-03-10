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
  const [createUsersAlerts,setCreateUsersAlerts] = useState("");
  const [deleteUsersAlerts,setDeleteUsersAlerts] = useState("");
  const [updateUsersAlerts,setUpdateUsersAlerts] = useState("");

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
      const username=users.find(u=>u.id===id)
      try {
        setIsLoading(true);
        await deleteUser(id);
        await loadUsers();
        if(username?.role==='ADMIN'){
          setDeleteUsersAlerts(`Admin has been deleted`);
          setTimeout(() => setDeleteUsersAlerts(""), 3000);
        }
        else{
          setDeleteUsersAlerts(`User has been deleted`);
          setTimeout(() => setDeleteUsersAlerts(""), 3000);
        }
        
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
        if(data.role==='ADMIN'){
          setUpdateUsersAlerts(`Admin has been updated`);
          setTimeout(() => setUpdateUsersAlerts(""), 3000);
        }
        else{
          setUpdateUsersAlerts(`User has been updated`);
          setTimeout(() => setUpdateUsersAlerts(""), 3000);
        }
      } else {
        await createUser({
          ...data,
          password: data.password || "",
        });
        
        if(data.role==='ADMIN'){
          setCreateUsersAlerts(`Admin has been created`);
          setTimeout(() => setCreateUsersAlerts(""), 3000);
        }
        else{
          setCreateUsersAlerts(`User has been created`);
          setTimeout(() => setCreateUsersAlerts(""), 3000);
        }
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
      {createUsersAlerts && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {createUsersAlerts}
          </div>
      )}
      {updateUsersAlerts && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {updateUsersAlerts}
          </div>
      )}
      {deleteUsersAlerts && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {deleteUsersAlerts}
          </div>
      )}
    </div>
  );
};

export default AdminUserPage;
