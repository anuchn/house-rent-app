import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🏠 House Rent App</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/add" style={styles.link}>Add House</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#111827",
    color: "white"
  },
  logo: {
    margin: 0
  },
  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Navbar;