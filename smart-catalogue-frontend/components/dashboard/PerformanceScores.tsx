const statusColorMap: Record<string, string> = {
  excellent: "bg-green-100 text-green-700",
  good: "bg-blue-100 text-blue-700",
  bad: "bg-red-100 text-red-700",
};

export default function PerformanceScores({ data }: { data?: any[] }) {
  const scores = data && data.length > 0 ? data : [
    { title: "Mobile Score", value: "-", status: "good" },
    { title: "Desktop Score", value: "-", status: "good" },
    { title: "SEO Score", value: "-", status: "good" },
    { title: "Load Time", value: "-", status: "good" },
  ];

  return (
    <>
      {scores.map((item) => (
        <div
          key={item.title}
          className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <h3 className="text-2xl font-semibold mt-2">{item.value}</h3>
          </div>

          <div className="mt-2">
            <span
              className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${statusColorMap[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
