import { Pencil, Trash2, Eye } from "lucide-react";

export default function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
  onViewEntries,
}) {
  if (loading) {
    return (
      <div className="text-white text-center py-10">Loading customers...</div>
    );
  }

  if (!customers.length) {
    return (
      <div className="text-gray-400 text-center py-10">No customers found.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-white/10 text-gray-300">
          <tr>
            <th className="p-5">Customer Name</th>

            <th className="p-5">Type</th>

            <th className="p-5">Phone</th>

            <th className="p-5">Address</th>

            <th className="p-5 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t border-white/10 hover:bg-white/5 transition"
            >
              <td className="p-5 text-white font-medium">
                {customer.customer_name}
              </td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold

                  ${
                    customer.customer_type === "local"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-purple-500/20 text-purple-300"
                  }
                  `}
                >
                  {customer.customer_type}
                </span>
              </td>

              <td className="p-5 text-gray-300">{customer.phone || "-"}</td>

              <td className="p-5 text-gray-300">{customer.address || "-"}</td>

              <td className="p-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onViewEntries(customer)}
                    className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(customer)}
                    className="p-2 rounded-xl bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(customer.id)}
                    className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
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
}
