export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-900">
      {/* SIDEBAR */}
      <div className="w-[260px] bg-white/5 backdrop-blur-xl border-r border-white/10 shadow-2xl">
        {/* SIDEBAR HEADER */}
        <div className="h-[70px] flex items-center px-6 border-b border-white/10">
          <h2 className="text-white text-2xl font-bold">Admin Dashboard</h2>
        </div>

        {/* SIDEBAR MENU */}
        <div className="p-5 space-y-4">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">
            Local User
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Regular User
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Add Entry
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-white text-4xl font-bold mb-4">
            Welcome Admin 👋
          </h1>

          <p className="text-gray-300 text-lg">
            Manage billing, customers, and digital print entries from here.
          </p>
        </div>
      </div>
    </div>
  );
}
