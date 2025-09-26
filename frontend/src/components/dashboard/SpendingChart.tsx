import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const SpendingChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/transfer/transactions/spending-chart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ adjust if you store token differently
          },
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          console.error("Failed to fetch chart data");
        }
      } catch (err) {
        console.error("Error fetching spending data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalSpending = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const percentage = ((d.value / totalSpending) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{d.name}</p>
          <p className="text-sm text-gray-600">
            ${d.value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading spending chart...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div className="text-center text-sm font-medium text-gray-600">
          Total Spending: ${totalSpending.toLocaleString()}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600">{item.name}</span>
              </div>
              <span className="font-medium">${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
