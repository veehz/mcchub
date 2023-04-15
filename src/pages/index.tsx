import Nav from "../components/Nav.js";

export default function Home() {
  return (
    <div>
      <Nav pages={{ Dashboard: "/", Profile: "/profile" }} />
      <main className="p-4">
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}
