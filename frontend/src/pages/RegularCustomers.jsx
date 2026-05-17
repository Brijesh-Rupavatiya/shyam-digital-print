import { useEffect, useState } from "react";
import API from "../api/axios";
import CustomerTable from "../components/customers/CustomerTable";
import toast from "react-hot-toast";
import CustomerModal from "../components/customers/CustomerModal";
import CustomerEntries from "./CustomerEntries";

export default function RegularCustomers() {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editCustomer, setEditCustomer] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/customers?customer_type=local&search=${search}`,
      );

      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) {
      return;
    }

    try {
      await API.delete(`/customers/${id}`);

      toast.success("Customer deleted");

      fetchCustomers();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  if (selectedCustomer) {
    return (
      <CustomerEntries
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }
  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Regular Customers
          </h1>

          <p className="text-gray-400">
            Manage regular pending-payment customers.
          </p>
        </div>

        <button
          onClick={() => {
            setEditCustomer(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          + Add Regular Customer
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[350px] px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* TABLE */}
      <CustomerTable
        customers={customers}
        loading={loading}
        onEdit={(customer) => {
          setEditCustomer(customer);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        onViewEntries={(customer) => setSelectedCustomer(customer)}
      />

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerType="regular"
        fetchCustomers={fetchCustomers}
        editCustomer={editCustomer}
      />
    </div>
  );
}
