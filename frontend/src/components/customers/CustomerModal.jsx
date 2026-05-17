import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

export default function CustomerModal({
  isOpen,
  onClose,
  customerType,
  fetchCustomers,
  editCustomer = null,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editCustomer) {
      setForm({
        customer_name: editCustomer.customer_name || "",
        phone: editCustomer.phone || "",
        address: editCustomer.address || "",
      });
    } else {
      setForm({
        customer_name: "",
        phone: "",
        address: "",
      });
    }
  }, [editCustomer, isOpen]);

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

      const payload = {
        ...form,
        customer_type: customerType,
      };

      if (editCustomer) {
        await API.put(`/customers/${editCustomer.id}`, payload);

        toast.success("Customer updated successfully");
      } else {
        await API.post("/customers", payload);

        toast.success("Customer created successfully");
      }

      fetchCustomers();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white">
            {editCustomer ? "Edit Customer" : "Add Customer"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            value={form.customer_name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            rows="4"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:scale-[1.02] transition"
          >
            {loading
              ? "Saving..."
              : editCustomer
                ? "Update Customer"
                : "Create Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}
