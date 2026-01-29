import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/utils/imagePath";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/book", label: "Book Now" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="booking-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center transition-all duration-300 hover:opacity-80" onClick={closeMenu}>
          <img 
            src={getImagePath("/images/logo/logo.png")} 
            alt="Momentous Studio Raya" 
            className="h-10 w-auto"
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-accent",
                location.pathname === link.href
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="booking-container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className={cn(
                  "text-base font-medium transition-all duration-300 hover:text-accent py-2",
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;