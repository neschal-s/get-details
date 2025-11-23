import { useEffect } from "react";

function Home() {
  useEffect(() => {
    async function collectData() {
      let preciseLocation = {};

      try {
        preciseLocation = await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy
              }),
            () => resolve({ error: "User blocked location" })
          );
        });
      } catch {
        preciseLocation = { error: "Location not available" };
      }

      await fetch("http://localhost:5000/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          browser: navigator.userAgent,
          os: navigator.platform,
          device: /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          preciseLocation
        })
      });
    }

    collectData();
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Tracking visitor data...</p>
    </div>
  );
}

export default Home;
