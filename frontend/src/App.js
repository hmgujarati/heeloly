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
import Extras from "./pages/Extras";
import Contact from "./pages/Contact";

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
            <Route path="/books" element={<Books />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/contact" element={<Contact />} />
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
