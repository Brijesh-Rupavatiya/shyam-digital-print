export default function Topbar({ handleLogout, loading }) {
  return (
    <div className="h-[80px] bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8">
      <div>
        <h2 className="text-white text-2xl font-bold">Admin Dashboard</h2>

        <p className="text-gray-400 text-sm">
          Manage your digital print billing system
        </p>
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
