import React, { useState, useEffect, useContext, createContext } from "react";

// ---------- Mock backend helpers ----------
const USERS_KEY = "demo_users";
const PRODUCTS_KEY = "demo_products";

function seedProducts() {
  const existing = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "null");
  if (existing && existing.length) return;
  const sample = [];
  for (let i = 1; i <= 20; i++) {
    sample.push({
      id: i,
      name: `Product ${i}`,
      price: Number((Math.random() * 200 + 10).toFixed(2)),
      category: ["Electronics", "Home", "Food"][i % 3],
      stock: Math.floor(Math.random() * 100),
    });
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sample));
}

function getProductsFromStorage() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]");
}

function saveProductsToStorage(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
}

// ---------- Auth context ----------
const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    seedProducts();
  }, []);

  const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid credentials");
    setUser({ id: found.id, name: found.name, email: found.email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------- Pages ----------
function Navbar({ setPage }) {
  const auth = useAuth();
  return (
    <nav style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("products")} style={{ marginLeft: "10px" }}>Products</button>
      {auth.user ? (
        <>
          <span style={{ marginLeft: "10px" }}>Hi, {auth.user.name}</span>
          <button onClick={auth.logout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setPage("login")} style={{ marginLeft: "10px" }}>Login</button>
          <button onClick={() => setPage("signup")} style={{ marginLeft: "10px" }}>Signup</button>
        </>
      )}
    </nav>
  );
}

function Home() {
  return (
    <div>
      <h1>React Interview Demo</h1>
      <p>This demo shows authentication and a products table with search, sort, and add/delete.</p>
    </div>
  );
}

function Login({ setPage }) {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      auth.login({ email, password });
      setPage("products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

function Signup({ setPage }) {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      auth.signup({ name, email, password });
      setPage("products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Create account</button>
    </form>
  );
}

function ProductsPage() {
  const auth = useAuth();
  const [products, setProducts] = useState(() => getProductsFromStorage());
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    setProducts(getProductsFromStorage());
  }, []);

  function deleteProduct(id) {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveProductsToStorage(next);
  }

  function addProduct() {
    const name = prompt("Product name?");
    if (!name) return;
    const newP = {
      id: Date.now(),
      name,
      category: "Misc",
      price: Math.floor(Math.random() * 100),
      stock: Math.floor(Math.random() * 50),
    };
    const next = [newP, ...products];
    setProducts(next);
    saveProductsToStorage(next);
  }

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string") {
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === "asc" ? aVal - bVal : bVal - aVal;
  });

  if (!auth.user) return <div>Please login first</div>;

  return (
    <div>
      <h2>Products</h2>
      <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={addProduct}>+ Add Product</button>
      <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th onClick={() => setSortKey("id")}>ID</th>
            <th onClick={() => setSortKey("name")}>Name</th>
            <th onClick={() => setSortKey("category")}>Category</th>
            <th onClick={() => setSortKey("price")}>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- App Component ----------
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <AuthProvider>
      <Navbar setPage={setPage} />
      {page === "home" && <Home />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "products" && <ProductsPage />}
    </AuthProvider>
  );
}
