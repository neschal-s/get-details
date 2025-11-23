import { useEffect } from "react";

function Home() {
  useEffect(() => {

    // OPTIONAL: Send simple visit log (no hidden tracking)
    fetch(`${import.meta.env.VITE_API_URL}/api/collect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitedAt: new Date().toISOString() })
    }).catch(() => {});

    // Redirect to Google search
   setTimeout(() => {
  window.location.href =
    "https://www.google.com/search?q=best+haunted+places+to+visit";
}, 100);


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
      Redirecting you to Google…
    </div>
  );
}

export default Home;
