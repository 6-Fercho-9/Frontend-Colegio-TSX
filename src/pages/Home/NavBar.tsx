import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  /* ────────────────────────────  State  ──────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* ─────────────────────  Close menu on navigation  ───────────────────── */
  const location = useLocation();
  useEffect(() => setIsOpen(false), [location.pathname]);

  /* ────────────────────────  Scroll / resize handlers  ─────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      setShowTop(window.scrollY > 300);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ─────────────────────────────  Helpers  ────────────────────────────── */
  const toggle = () => setIsOpen((prev) => !prev);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ─────────────────────────────  Render  ─────────────────────────────── */
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-sm transition-colors
        ${isScrolled ? "bg-blue-600/90 text-white shadow-md" : "bg-transparent text-white"}`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo / brand */}
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            Mi&nbsp;Colegio
          </Link>

          {/* Hamburger */}
          <button
            onClick={toggle}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden"
          >
            {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>

          {/* Links */}
          <ul
            className={`md:flex md:items-center md:gap-6 w-full md:w-auto
              transition-all duration-300 ease-in-out
              ${isOpen ? "block py-4" : "hidden md:block"}`}
          >
            {[
              { href: "#welcome-principal", label: "Home" },
              { href: "#quienes-somos", label: "Quiénes Somos" },
              { href: "#nuestros-servicios", label: "Servicios" },
              { href: "#ubicacion", label: "Ubicación" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-4 py-2 rounded-md hover:bg-white/10 md:hover:bg-transparent md:hover:text-blue-300"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="md:ml-4">
              <Link
                to="/signin"
                className="block px-4 py-2 rounded-md hover:bg-white/10 md:hover:bg-transparent md:hover:text-blue-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Botón volver arriba */}
      {showTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-3 text-white shadow-lg
          transition hover:scale-110 hover:bg-blue-700"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
