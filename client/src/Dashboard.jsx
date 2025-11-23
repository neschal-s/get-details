import { useEffect, useState } from "react";

function Dashboard() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visits`);
      const data = await res.json();
      setVisits(data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Visitor Dashboard</h1>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>IP</th>
            <th>Device</th>
            <th>Browser</th>
            <th>GPS</th>
          </tr>
        </thead>

        <tbody>
          {visits.map((v) => (
            <tr key={v._id}>
              <td>{new Date(v.createdAt).toLocaleString()}</td>
              <td>{v.ip}</td>
              <td>{v.device}</td>
              <td>{v.browser}</td>
              <td>
                {v.preciseLocation?.latitude
                  ? `${v.preciseLocation.latitude}, ${v.preciseLocation.longitude}`
                  : "No GPS"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
