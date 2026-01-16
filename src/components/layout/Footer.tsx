import ScrollReveal from '@/components/ui/ScrollReveal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Tagline */}
            <div className="space-y-4">
              <img
                src="https://i.imgur.com/DUmbFoD.png"
                alt="4ME Engenharia"
                className="h-40 w-auto"
                loading="lazy"
              />
              <p className="text-white text-lg font-medium">
                O Arquétipo do Criador.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Localização</h4>
              <div className="space-y-2 text-white">
                <p>Rua Miguel Matte, N 687, Sala 1804</p>
                <p>Bairro Pioneiros, Balneário Camboriú</p>
                <p className="pt-2">Atendemos:</p>
                <p>Todo o Brasil 🇧🇷</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Contato</h4>
              <div className="space-y-2 text-white">
                <a
                  href="mailto:contato@4meengenharia.com"
                  className="block hover:text-green-400 transition-colors duration-300"
                >
                  contato@4meengenharia.com
                </a>
                <a
                  href="https://instagram.com/4meengenharia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-green-400 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @4meengenharia
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-white">
            <p>© {currentYear} 4ME Engenharia. Todos os direitos reservados.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;