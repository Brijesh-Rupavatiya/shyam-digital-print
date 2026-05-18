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
      <div className="w-full max-w-3xl bg-[#111827] border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-[#111827] border-b border-white/10 px-8 py-6 flex items-center justify-between">
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
        <div className="overflow-y-auto px-8 py-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Entry Date & Time
              </label>

              <input
                type="datetime-local"
                name="entry_date"
                value={form.entry_date}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Card Sheet
              </label>

              <input
                type="text"
                name="card_sheet"
                placeholder="Card Sheet"
                value={form.card_sheet}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Sticker
              </label>

              <input
                type="text"
                name="sticker"
                placeholder="Sticker"
                value={form.sticker}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Size</label>

              <input
                type="text"
                name="size"
                placeholder="12x18"
                value={form.size}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Lamination
              </label>

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
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Full Cut
              </label>

              <input
                type="text"
                name="full_cut"
                placeholder="50 sheets"
                value={form.full_cut}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Plotter Cut
              </label>

              <input
                type="text"
                name="plotter_cut"
                placeholder="20 sheets"
                value={form.plotter_cut}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Amount (₹)
              </label>

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* ONLY REGULAR */}
            {customer.customer_type === "regular" && (
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Payment Status
                </label>

                <select
                  name="payment_status"
                  value={form.payment_status}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="pending">Pending</option>

                  <option value="complete">Complete</option>
                </select>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="text-sm text-gray-300 mb-2 block">
                Remark / Remake Note
              </label>

              <textarea
                name="remark"
                placeholder="Remark"
                value={form.remark}
                onChange={handleChange}
                rows="4"
                className="input"
              />
            </div>

            <button
              disabled={loading}
              className="md:col-span-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:scale-[1.02] transition"
            >
              {loading ? "Saving..." : "Add Entry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
