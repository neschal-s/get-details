import { useEffect, useState } from "react";

function Dashboard() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/api/visits");
      const data = await res.json();
      setVisits(data);
    }
    getData();
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
            <th>Location (GPS)</th>
            <th>IP City</th>
            <th>IP Country</th>
          </tr>
        </thead>
        <tbody>
          {visits.map(v => (
            <tr key={v._id}>
              <td>{new Date(v.createdAt).toLocaleString()}</td>
              <td>{v.ip}</td>
              <td>{v.device}</td>
              <td>{v.browser}</td>
              <td>
                {v.preciseLocation?.latitude ? (
                  <>
                    {v.preciseLocation.latitude}, {v.preciseLocation.longitude}
                  </>
                ) : (
                  "No GPS"
                )}
              </td>
              <td>{v.ipLocation?.city || "N/A"}</td>
              <td>{v.ipLocation?.country || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
