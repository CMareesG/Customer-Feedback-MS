import { Edit2, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (users.length === 0) {
    return (
      <p className="text-text-muted text-center py-8">No users found</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left px-4 py-3 font-semibold text-text-primary">
              Name
            </th>
            <th className="text-left px-4 py-3 font-semibold text-text-primary">
              Email
            </th>
            <th className="text-left px-4 py-3 font-semibold text-text-primary">
              Role
            </th>
            <th className="text-left px-4 py-3 font-semibold text-text-primary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-white/10 hover:bg-white/5 transition"
            >
              <td className="px-4 py-3 text-text-primary font-medium">
                {user.name}
              </td>
              <td className="px-4 py-3 text-text-muted">{user.email}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === "ADMIN"
                      ? "bg-accent-1/20 text-accent-1"
                      : "bg-accent-2/20 text-accent-2"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    disabled={isLoading}
                    className="p-2 hover:bg-accent-1/20 rounded-lg text-accent-1 transition disabled:opacity-50"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    disabled={isLoading}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
