export default function EntryFilters({
  search,
  setSearch,
  paymentFilter,
  setPaymentFilter,
  sortAmount,
  setSortAmount,
}) {
  return (
    <div className="flex flex-col xl:flex-row gap-4 mb-6">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search entries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input xl:w-[350px]"
      />

      {/* PAYMENT FILTER */}
      <select
        value={paymentFilter}
        onChange={(e) => setPaymentFilter(e.target.value)}
        className="input xl:w-[220px]"
      >
        <option value="all">All Payments</option>

        <option value="pending">Pending</option>

        <option value="complete">Complete</option>
      </select>

      {/* AMOUNT SORT */}
      <select
        value={sortAmount}
        onChange={(e) => setSortAmount(e.target.value)}
        className="input xl:w-[220px]"
      >
        <option value="">Sort Amount</option>

        <option value="asc">Low → High</option>

        <option value="desc">High → Low</option>
      </select>
    </div>
  );
}
