import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="booking-container py-6 md:py-8 px-4">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-base md:text-lg font-semibold text-accent">
                Momentous Studio Raya
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Laman raya berkonsepkan alam semula jadi dan gaya klasik Melayu untuk merakam kenangan raya yang indah dan penuh makna.
            </p>
            
            {/* Social Media Links */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm md:text-base">Follow Us</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a 
                  href="https://www.tiktok.com/@momentous.foto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent transition-colors py-1 touch-manipulation inline-block"
                >
                  TikTok: momentous.foto
                </a>
                <a 
                  href="https://www.threads.net/@momentous.foto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent transition-colors py-1 touch-manipulation inline-block"
                >
                  Thread: momentous.foto
                </a>
                <a 
                  href="https://www.instagram.com/momentous.foto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent transition-colors py-1 touch-manipulation inline-block"
                >
                  Instagram: momentous.foto
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm md:text-base">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a 
                href="mailto:momentousfotostudio@gmail.com" 
                className="flex items-center gap-3 transition-colors duration-300 hover:text-accent py-1 touch-manipulation"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">momentousfotostudio@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/60104471403" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 transition-colors duration-300 hover:text-accent py-1 touch-manipulation"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+60 10-447 1403</span>
              </a>
              <div className="flex items-center gap-3 py-1">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Bukit Lagong, Batu Caves</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs md:text-sm text-muted-foreground space-y-1">
          <p>© {new Date().getFullYear()} Momentous Foto · Momentous Studio Raya</p>
          <p>Developed by <a href="mailto:kodkot.my@gmail.com" className="text-muted-foreground hover:text-accent transition-colors touch-manipulation">Kodkot</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;