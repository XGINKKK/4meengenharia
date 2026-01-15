import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionCTA from '@/components/ui/SectionCTA';
import ContactForm from '@/components/forms/ContactForm';

const ContactSection = () => {
  const contactInfo = [
    {
      title: 'Endereço',
      details: [
        'Rua Miguel Matte, N 687, Sala 1804',
        'Bairro Pioneiros, Balneário Camboriú'
      ]
    },
    {
      title: 'Telefone',
      details: ['+55 (47) 99795-7480']
    },
    {
      title: 'Email',
      details: ['contato@4meengenharia.com'],
      link: 'mailto:contato@4meengenharia.com'
    },
    {
      title: 'Instagram',
      details: ['@4meengenharia'],
      link: 'https://instagram.com/4meengenharia'
    }
  ];

  return (
    <section id="contact" className="relative z-10 py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Entre em <span className="engineering-text-gradient">Contato</span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Tem uma ideia ou um projeto em mente? Adoraríamos ouvir sobre ele.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal>
            <div className="space-y-8">
              {contactInfo.map((info) => (
                <div key={info.title} className="engineering-card p-6 flex items-start space-x-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
                    {info.details.map((detail, detailIndex) => (
                      info.link ? (
                        <a
                          key={detailIndex}
                          href={info.link}
                          target={info.link.startsWith('mailto:') ? undefined : '_blank'}
                          rel={info.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          className="block text-white hover:text-green-400 transition-colors duration-300"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={detailIndex} className="text-white">
                          {detail}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* CTA */}
              <SectionCTA
                variant="minimal"
                title="Pronto para começar?"
                subtitle="Entre em contato e vamos transformar sua ideia em realidade"
                primaryAction={{
                  text: "Solicitar Orçamento",
                  onClick: () => window.open('https://wa.me/5547997957480?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento.', '_blank')
                }}
                secondaryAction={undefined}
              />
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.2}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;