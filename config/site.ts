export type Service = {
  icon: string;
  title: string;
  description: string;
};

export type ExperienceCase = {
  tag: string;
  title: string;
  description: string;
};

export const CONTACT = {
  name: "Johan Correa",
  phone: "+57 318 740 2859",
  whatsapp: "573187402859",
  email: "johanandres888@hotmail.com",
  address: "Cra. 17 No. 34-86, Of. 606 · Edif. Banco Mercantil",
  city: "Bucaramanga, Santander",
} as const;

export const NAV_ITEMS = [
  { label: "Inicio", id: "inicio" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Servicios", id: "servicios" },
  { label: "Experiencia", id: "experiencia" },
  { label: "Contacto", id: "contacto" },
] as const;

export const TRUST_ITEMS = [
  "Atención personalizada",
  "Confidencialidad",
  "Compromiso",
  "Rigor jurídico",
] as const;

export const PRINCIPLES = [
  "Análisis riguroso",
  "Confianza y reserva",
  "Ética profesional",
  "Atención personal",
] as const;

export const SERVICES: Service[] = [
  {
    icon: "§",
    title: "Derecho Civil",
    description:
      "Orientación y representación en obligaciones, contratos y controversias entre particulares.",
  },
  {
    icon: "◇",
    title: "Derecho Laboral",
    description:
      "Acompañamiento preventivo y representación en asuntos derivados de relaciones laborales.",
  },
  {
    icon: "▦",
    title: "Derecho Comercial",
    description:
      "Asesoría legal para empresas, comerciantes y el desarrollo seguro de sus negocios.",
  },
  {
    icon: "⌂",
    title: "Derecho de Familia",
    description:
      "Atención sensible y estratégica en asuntos familiares y patrimoniales.",
  },
  {
    icon: "▤",
    title: "Derecho Administrativo",
    description:
      "Orientación frente a actuaciones, trámites y controversias con entidades públicas.",
  },
  {
    icon: "✦",
    title: "Asesoría Jurídica",
    description:
      "Análisis riguroso para comprender sus alternativas y tomar decisiones informadas.",
  },
  {
    icon: "⚖",
    title: "Representación Legal",
    description:
      "Defensa técnica de sus intereses en procesos y actuaciones jurídicas.",
  },
  {
    icon: "◎",
    title: "Conciliaciones",
    description:
      "Búsqueda de acuerdos viables para resolver conflictos de manera eficiente.",
  },
];

export const EXPERIENCE_CASES: ExperienceCase[] = [
  {
    tag: "Asesoría empresarial",
    title: "Asesoría jurídica empresarial",
    description:
      "Acompañamiento preventivo en decisiones corporativas, revisión de documentos y gestión de riesgos legales.",
  },
  {
    tag: "Derecho Civil",
    title: "Representación en procesos civiles",
    description:
      "Estudio de controversias y diseño de estrategias de representación adaptadas a cada situación.",
  },
  {
    tag: "Derecho Laboral",
    title: "Acompañamiento en procesos laborales",
    description:
      "Orientación en relaciones laborales, reclamaciones y actuaciones ante las autoridades competentes.",
  },
  {
    tag: "Conciliación",
    title: "Conciliaciones y resolución de conflictos",
    description:
      "Preparación y acompañamiento en escenarios de negociación para construir soluciones claras y sostenibles.",
  },
];

export const WHATSAPP_MESSAGE =
  "Hola, vi la página web de Correa & Asociados y estoy interesado en recibir asesoría jurídica.";
