const Navbar = () => {
  const username = localStorage.getItem("username");

  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        height: "80px",

        background: "white",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "0 30px",

        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h1
        style={{
          color: "#334155",
        }}
      >
        Inventory Dashboard
      </h1>

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "15px",
        }}
      >
        <div>
          <h3>{username}</h3>

          <p
            style={{
              color: "#64748b",
              textTransform: "capitalize",
            }}
          >
            {role}
          </p>
        </div>

        <div
          style={{
            width: "45px",
            height: "45px",

            borderRadius: "50%",

            background: "#0f172a",

            color: "white",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            fontWeight: "bold",
          }}
        >
          {username?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
