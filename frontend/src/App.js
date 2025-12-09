import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsletterPopup from "./components/NewsletterPopup";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import BooksNew from "./pages/BooksNew";
import Extras from "./pages/Extras";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  useEffect(() => {
    document.title = "Heeloly Upasani - Author";
    
    // SEO Meta Tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Heeloly Upasani - Author of "A Journey Within". Explore poetry and stories that inspire, transform, and resonate deeply with readers.');
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BooksNew />} />
            <Route path="/books-old" element={<Books />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <NewsletterPopup />
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
