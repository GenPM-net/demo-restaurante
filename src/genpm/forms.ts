// Formularios definidos en código. Los editores también pueden crearlos en el panel (Formularios).
import { z } from 'zod';
import { defineForm } from '@/lib/forms';

defineForm({
  key: 'contact',
  label: 'Contact',
  schema: z.object({ name: z.string().trim().min(1).max(120), email: z.email(), message: z.string().trim().min(5).max(5000) }),
  emailField: 'email',
  // Texto pendiente de revisar por el titular del sitio: enlaza a su política de privacidad real.
  consent: { required: true, version: '2026-10', text: 'I have read the privacy policy and agree to be contacted about my request.' },
});

// Reservas de mesa: llegan al panel (Formularios → envíos) y por email a FORMS_NOTIFY_TO.
const horas = ['13:30', '14:00', '14:30', '15:00', '20:30', '21:00', '21:30', '22:00'];
const personas = ['1', '2', '3', '4', '5', '6', '7', '8+'];
defineForm({
  key: 'reserva',
  label: 'Reservas',
  schema: z.object({
    nombre: z.string().trim().min(1).max(120),
    email: z.email(),
    telefono: z.string().trim().min(6).max(30),
    fecha: z.string().trim().min(4).max(40),
    hora: z.enum(horas),
    personas: z.enum(personas),
    notas: z.string().trim().max(1000).optional(),
  }),
  fields: [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', required: true },
    { name: 'fecha', label: 'Día (p. ej. viernes 24)', type: 'text', required: true },
    { name: 'hora', label: 'Hora', type: 'select', required: true, options: horas },
    { name: 'personas', label: 'Personas', type: 'select', required: true, options: personas },
    { name: 'notas', label: 'Alergias o peticiones', type: 'textarea', required: false, maxLength: 1000 },
  ],
  emailField: 'email',
  autoReply: { subject: 'Hemos recibido tu reserva — Taberna Lumbre', text: 'Gracias por reservar. Te confirmamos la mesa en menos de una hora.' },
  consent: { required: true, version: '2026-10', text: 'Acepto la política de privacidad y que me contacten para confirmar la reserva.' },
});
