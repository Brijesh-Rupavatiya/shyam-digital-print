export default function Navbar({ isLoggedIn, handleLogout, loading }) {
  return (
    <div className="h-[70px] bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#312e81] shadow-2xl flex items-center justify-between px-6 border-b border-white/10">
      {/* LEFT LOGO */}
      <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">
        Shyam Digital Print
      </h1>

      {/* RIGHT LOGOUT */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-red-500/40 transition duration-300"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      )}
    </div>
  );
}
