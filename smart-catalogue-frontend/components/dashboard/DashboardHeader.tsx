export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Naman! 👋</h1>
        <p className="text-sm text-gray-500">
          Here's what's happening with your catalogue today.
        </p>

        <div className="flex gap-3 mt-4">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add New Product
          </button>
          {/* <button className="border px-4 py-2 rounded-lg text-sm">Edit Catalogue</button>  */}
          <button className="border px-4 py-2 rounded-lg text-sm">View Live Catalogue</button>
        </div>
      </div>

      <div className="flex gap-3">
        <select className="border rounded-lg px-2 py-2 text-sm">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
        <button className="border px-3 py-2 rounded-lg text-sm">Export</button>
      </div>
    </div>
  );
}
