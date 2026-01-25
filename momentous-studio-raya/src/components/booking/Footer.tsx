import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="booking-container py-12">
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Momentous Studio Raya
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A classic garden studio setting for capturing meaningful 
              and enduring Raya moments with your loved ones.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="mailto:momentousfotostudio@gmail.com" className="flex items-center gap-2 transition-colors duration-300 hover:text-accent">
                <Mail className="h-4 w-4" />
                <span>momentousfotostudio@gmail.com</span>
              </a>
              <a href="tel:+60104471403" className="flex items-center gap-2 transition-colors duration-300 hover:text-accent">
                <Phone className="h-4 w-4" />
                <span>+60 10-447 1403</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground space-y-1">
          <p>© {new Date().getFullYear()} Momentous Foto · Momentous Studio Raya</p>
          <p>Developed by <a href="mailto:kodkot.my@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">Kodkot</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;