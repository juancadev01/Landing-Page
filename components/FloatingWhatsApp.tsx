import { CONTACT, WHATSAPP_MESSAGE } from "@/config/site";

export function FloatingWhatsApp() {
  const message = encodeURIComponent(WHATSAPP_MESSAGE);

  return (
    <a
      className="whatsapp"
      href={`https://wa.me/${CONTACT.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar por WhatsApp"
    >
      <span>◔</span>
      <b>WhatsApp</b>
    </a>
  );
}
