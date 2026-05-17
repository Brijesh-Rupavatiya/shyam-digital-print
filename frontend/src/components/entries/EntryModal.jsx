import { useState } from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

export default function EntryModal({
  isOpen,
  onClose,
  customer,
  fetchEntries,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    entry_date: "",
    card_sheet: "",
    sticker: "",
    size: "",
    lamination: "none",
    full_cut: "",
    plotter_cut: "",
    quantity: 1,
    amount: "",
    payment_status:
      customer?.customer_type === "local" ? "complete" : "pending",
    remark: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/entries", {
        ...form,
        customer_id: customer.id,
      });

      toast.success("Entry added successfully");

      fetchEntries();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error("Failed to add entry");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">Add Entry</h2>

            <p className="text-gray-400 mt-1">{customer.customer_name}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="datetime-local"
            name="entry_date"
            value={form.entry_date}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="card_sheet"
            placeholder="Card Sheet"
            value={form.card_sheet}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="sticker"
            placeholder="Sticker"
            value={form.sticker}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            value={form.size}
            onChange={handleChange}
            className="input"
          />

          <select
            name="lamination"
            value={form.lamination}
            onChange={handleChange}
            className="input"
          >
            <option value="none">None</option>

            <option value="gloss">Gloss</option>

            <option value="matt">Matt</option>
          </select>

          <input
            type="text"
            name="full_cut"
            placeholder="Full Cut"
            value={form.full_cut}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="plotter_cut"
            placeholder="Plotter Cut"
            value={form.plotter_cut}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="input"
          />

          {/* ONLY REGULAR */}
          {customer.customer_type === "regular" && (
            <select
              name="payment_status"
              value={form.payment_status}
              onChange={handleChange}
              className="input"
            >
              <option value="pending">Pending</option>

              <option value="complete">Complete</option>
            </select>
          )}

          <textarea
            name="remark"
            placeholder="Remark"
            value={form.remark}
            onChange={handleChange}
            rows="4"
            className="input md:col-span-2"
          />

          <button
            disabled={loading}
            className="md:col-span-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:scale-[1.02] transition"
          >
            {loading ? "Saving..." : "Add Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
