import { Pencil, Trash2 } from "lucide-react";

export default function EntryTable({ entries, loading, onDelete }) {
  if (loading) {
    return (
      <div className="text-white text-center py-10">Loading entries...</div>
    );
  }

  if (!entries.length) {
    return (
      <div className="text-gray-400 text-center py-10">No entries found.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-white/10 text-gray-300">
          <tr>
            <th className="p-5">Date</th>

            <th className="p-5">Card Sheet</th>

            <th className="p-5">Sticker</th>

            <th className="p-5">Size</th>

            <th className="p-5">Qty</th>

            <th className="p-5">Amount</th>

            <th className="p-5">Payment</th>

            <th className="p-5">Remark</th>

            <th className="p-5 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              className="border-t border-white/10 hover:bg-white/5 transition"
            >
              <td className="p-5 text-gray-300">
                {new Date(entry.entry_date).toLocaleString()}
              </td>

              <td className="p-5 text-white">{entry.card_sheet || "-"}</td>

              <td className="p-5 text-white">{entry.sticker || "-"}</td>

              <td className="p-5 text-white">{entry.size || "-"}</td>

              <td className="p-5 text-white">{entry.quantity}</td>

              <td className="p-5 text-green-400 font-bold">₹{entry.amount}</td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold

                  ${
                    entry.payment_status === "complete"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }
                  `}
                >
                  {entry.payment_status}
                </span>
              </td>

              <td className="p-5 text-gray-300">{entry.remark || "-"}</td>

              <td className="p-5">
                <div className="flex items-center justify-center gap-3">
                  <button className="p-2 rounded-xl bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition">
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(entry.id)}
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
