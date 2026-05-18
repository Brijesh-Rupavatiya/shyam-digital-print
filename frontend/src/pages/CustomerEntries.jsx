import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import API from "../api/axios";
import EntryTable from "../components/entries/EntryTable";
import EntryModal from "../components/entries/EntryModal";
import EntryFilters from "../components/entries/EntryFilters";

export default function CustomerEntries({ customer, onBack }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortAmount, setSortAmount] = useState("");

  const fetchEntries = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/entries?customer_id=${customer.id}&search=${search}&payment_status=${paymentFilter}&sort=${sortAmount}`,
      );

      setEntries(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this entry?")) {
      return;
    }

    try {
      await API.delete(`/entries/${id}`);

      toast.success("Entry deleted");

      fetchEntries();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [search, paymentFilter, sortAmount]);

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBack}
            className="mb-4 text-indigo-400 hover:text-indigo-300"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-black text-white">
            {customer.customer_name}
          </h1>

          <p className="text-gray-400 mt-2">Customer billing entries</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          + Add Entry
        </button>
      </div>

      {/* Filters */}
      <EntryFilters
        search={search}
        setSearch={setSearch}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        sortAmount={sortAmount}
        setSortAmount={setSortAmount}
      />

      {/* TABLE */}
      <EntryTable entries={entries} loading={loading} onDelete={handleDelete} />

      {/* MODAL */}
      <EntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={customer}
        fetchEntries={fetchEntries}
      />
    </div>
  );
}
