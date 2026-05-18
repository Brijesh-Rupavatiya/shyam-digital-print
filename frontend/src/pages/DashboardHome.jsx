export default function DashboardHome() {
  const stats = [
    {
      title: "Today's Orders",
      value: "128",
    },
    {
      title: "Pending Payments",
      value: "₹24,500",
    },
    {
      title: "Regular Customers",
      value: "62",
    },
    {
      title: "Local Customers",
      value: "140",
    },
  ];

  return (
    <div className="p-8">
      {/* HERO */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">Welcome Back 👋</h1>

        <p className="text-gray-400 text-lg">
          Here's your printing business overview.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:scale-[1.02] transition"
          >
            <p className="text-gray-400 mb-3">{stat.title}</p>

            <h2 className="text-white text-4xl font-black">{stat.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
