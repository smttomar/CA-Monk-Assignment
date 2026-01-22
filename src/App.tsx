import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import { Button } from "./components/ui/button";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-semibold">
                        CA MONK
                    </Link>
                    <nav className="flex items-center gap-3">
                        <Link to="/">
                            <Button>Home</Button>
                        </Link>
                        <Link to="/create">
                            <Button>Create Blog</Button>
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/create" element={<CreateBlog />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
