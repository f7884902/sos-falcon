// Conteúdo centralizado do site. Qualquer pessoa com conhecimento básico
// pode editar textos, imagens e dados de contato aqui, sem tocar nos
// componentes React. Veja o README para instruções completas.
//
// Caminhos de imagem apontam para public/images/*.jpg — já usam as fotos
// reais fornecidas pelo cliente. Para trocar uma imagem, basta substituir o
// arquivo em public/images/ mantendo o mesmo nome (ou apontar para um novo
// arquivo dentro dessa mesma pasta). Arquivos em public/ são copiados como
// estão para o build final, por isso as imagens do conteúdo ficam lá e não
// em src/.

export const siteContent = {
  brand: {
    name: 'SOS Falcon',
    fullName: 'SOS Falcon Soluções Ambientais',
    logo: 'images/logo.jpg',
  },

  contact: {
    phone: '(32) 99948-8188',
    whatsapp: '5532999488188',
    email: 'contato@sosfalcon.com.br',
    instagram: 'https://www.instagram.com/sos.falcon/',
    instagramHandle: '@sos.falcon',
    address: 'Atendimento em todo o Brasil — endereço a confirmar',
  },

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Contato', href: '#contato' },
  ],

  hero: {
    eyebrow: 'Controle biológico de fauna urbana',
    title: 'Precisão da natureza contra a infestação de pombos.',
    subtitle:
      'Manejo técnico de aves urbanas com falcoaria profissional, para indústrias, galpões logísticos e ambientes corporativos que exigem uma solução eficaz e não letal.',
    ctaPrimaryLabel: 'Solicitar avaliação',
    ctaSecondaryLabel: 'Conheça nossos serviços',
    ctaSecondaryHref: '#servicos',
    image: 'images/hero.jpg',
    imageAlt: 'Gavião-de-Harris pousado em poleiro portátil às margens de um lago, ao entardecer',
  },

  trust: [
    {
      title: 'Método biológico e não letal',
      description: 'Manejo com aves de rapina treinadas, sem uso de venenos ou métodos agressivos.',
    },
    {
      title: 'Atuação em ambientes exigentes',
      description: 'Experiência em indústrias, centros de distribuição e linhas de produção em operação.',
    },
    {
      title: 'Equipe técnica certificada',
      description: 'Falcoeiros profissionais preparados para trabalho em altura e em ambientes controlados.',
    },
    {
      title: 'Acompanhamento contínuo',
      description: 'Da avaliação inicial ao monitoramento de resultados, com relatórios claros.',
    },
  ],

  about: {
    eyebrow: 'Sobre a SOS Falcon',
    title: 'Uma solução ambiental construída sobre técnica, não sobre improviso.',
    description:
      'A SOS Falcon nasceu da união entre falcoaria profissional e engenharia de controle ambiental. Atuamos onde pombos e aves urbanas representam risco sanitário, dano patrimonial ou parada operacional — combinando o instinto natural de aves de rapina treinadas com planejamento técnico, segurança do trabalho e acompanhamento de resultado.',
    secondaryText:
      'Nossa equipe está preparada para operar em campo aberto, unidades fabris, galpões logísticos e coberturas, inclusive em trabalhos com uso de EPI para altura, seguindo os protocolos de segurança de cada ambiente.',
    image: 'images/about-main.jpg',
    imageAlt: 'Falcoeiro com cinto de segurança e capacete segurando um gavião-de-Harris dentro de uma planta industrial',
    secondaryImage: 'images/about-secondary.jpg',
    secondaryImageAlt: 'Gavião-de-Harris olhando diretamente para a câmera, ao amanhecer, em área arborizada',
  },

  services: [
    {
      title: 'Controle de Pombos por Falcoaria',
      description:
        'Redução da presença de pombos urbanos por meio da presença controlada de aves de rapina treinadas, alterando o comportamento das aves-praga sem uso de métodos letais.',
      image: 'images/service-falcoaria.jpg',
      imageAlt: 'Gavião-de-Harris encapuzado sendo conduzido em linha de produção industrial',
    },
    {
      title: 'Manejo de Aves Urbanas',
      description:
        'Planejamento técnico para áreas com infestação recorrente, considerando rotas de deslocamento, pontos de pouso e origem da atração das aves.',
      image: 'images/service-manejo.jpg',
      imageAlt: 'Gavião-de-Harris pousado em galho de árvore junto a edificação industrial urbana',
    },
    {
      title: 'Avaliação Técnica de Área',
      description:
        'Diagnóstico do espaço, identificação de riscos sanitários e estruturais, e recomendação da estratégia mais adequada para cada ambiente.',
      image: 'images/service-avaliacao.jpg',
      imageAlt: 'Gavião-de-Harris em avaliação de área junto a galpão industrial',
    },
    {
      title: 'Atuação em Ambientes Industriais e em Altura',
      description:
        'Equipe preparada para operar dentro de plantas industriais, galpões logísticos e coberturas, com uso de EPI e conformidade aos protocolos de segurança do trabalho.',
      image: 'images/service-altura.jpg',
      imageAlt: 'Falcoeiro com cinto de segurança, capacete e EPI completo para trabalho em altura',
    },
  ],

  process: [
    {
      step: '01',
      title: 'Avaliação',
      description: 'Visita técnica ao local para entender a extensão do problema e as características do ambiente.',
    },
    {
      step: '02',
      title: 'Identificação',
      description: 'Mapeamento dos pontos críticos, rotas de pouso e origem da infestação.',
    },
    {
      step: '03',
      title: 'Planejamento',
      description: 'Definição da estratégia de manejo, cronograma e protocolos de segurança necessários.',
    },
    {
      step: '04',
      title: 'Aplicação da Solução',
      description: 'Atuação em campo com aves de rapina treinadas, conduzida por falcoeiros profissionais.',
    },
    {
      step: '05',
      title: 'Acompanhamento',
      description: 'Monitoramento dos resultados e ajustes de estratégia quando necessário.',
    },
  ],

  gallery: [
    {
      image: 'images/gallery-1.jpg',
      alt: 'Gavião-de-Harris sobre porta-paletes em galpão logístico',
      caption: 'Galpão logístico',
    },
    {
      image: 'images/gallery-2.jpg',
      alt: 'Gavião-de-Harris no interior de um galpão industrial com estrutura de telhado em madeira',
      caption: 'Ambiente industrial',
    },
    {
      image: 'images/gallery-3.jpg',
      alt: 'Gavião-de-Harris em operação noturna próximo a área urbana',
      caption: 'Operação noturna',
    },
    {
      image: 'images/gallery-4.jpg',
      alt: 'Gavião-de-Harris concentrado durante operação noturna',
      caption: 'Concentração em campo',
    },
    {
      image: 'images/gallery-5.jpg',
      alt: 'Gavião-de-Harris no perímetro de uma área industrial urbana',
      caption: 'Perímetro urbano',
    },
    {
      image: 'images/gallery-6.jpg',
      alt: 'Retrato do gavião-de-Harris da nossa equipe',
      caption: 'Nossa equipe em campo',
    },
  ],

  cta: {
    title: 'Tem um problema com pombos na sua planta ou galpão?',
    description: 'Vamos avaliar a melhor solução técnica para o seu espaço.',
    buttonLabel: 'Solicitar avaliação pelo WhatsApp',
    image: 'images/cta-bg.jpg',
  },

  footer: {
    description:
      'Controle biológico de pombos e aves urbanas com falcoaria técnica, para ambientes que exigem uma solução séria e eficaz.',
    copyright: `© ${new Date().getFullYear()} SOS Falcon Soluções Ambientais. Todos os direitos reservados.`,
  },
}
