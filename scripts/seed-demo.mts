// Contenido de demostración de Taberna Lumbre (restaurante ficticio): ajustes, menús, imágenes y páginas publicadas.
// Idempotente. Uso: npx tsx --env-file=.env.local scripts/seed-demo.mts
// Fotos: Unsplash (licencia Unsplash, uso libre). Todo es editable después desde /admin.
import '../src/genpm/index.ts';
import { seedEntry } from '../src/lib/content/index.ts';
import { importRemoteImage } from '../src/lib/media/index.ts';

const photo = async (id: string, alt: string) =>
  (
    await importRemoteImage(`https://images.unsplash.com/photo-${id}?w=1800&q=80&fm=jpg&fit=crop`, {
      allowedHosts: ['images.unsplash.com'],
      alt,
      folder: 'demo',
    })
  ).id;

const img = {
  mesa: await photo('1656423521731-9665583f100c', 'Mesa con tapas, paella, embutidos y vermut'),
  pintxos: await photo('1781115650881-bc5d55bd31d2', 'Pintxos de queso y jamón sobre pan'),
  bravas: await photo('1565599837634-134bc3aadce8', 'Patatas bravas con salsa picante'),
  surtido: await photo('1767096088529-1ba1ecc457ee', 'Surtido de tapas con una copa de vino tinto'),
  arroz: await photo('1763647738062-d83e44328a6f', 'Arroz de marisco con gambas, mejillones y almejas'),
  paella: await photo('1694685367640-05d6624e57f1', 'Paella grande a la leña'),
  sala: await photo('1709548145082-04d0cde481d4', 'Comedor de la taberna con luz cálida'),
  pizarra: await photo('1625418277638-6db2d521a78c', 'Pizarra con las tapas del día'),
};

await seedEntry({
  collection: 'site_settings',
  data: {
    name: 'Taberna Lumbre',
    tagline: 'Tapas, arroces a la leña y vino en el centro de Madrid',
    phone: '+34 910 000 000',
    address: 'Calle de la Lumbre 12, 28012 Madrid',
    contactEmail: 'reservas@example.com',
    social: [{ platform: 'instagram', url: 'https://instagram.com/' }],
  },
});
await seedEntry({
  collection: 'menus',
  slug: 'header',
  data: { items: [{ label: 'Carta', href: '/carta' }, { label: 'Reservas', href: '/reservas' }, { label: 'Contacto', href: '/contacto' }] },
});
await seedEntry({
  collection: 'menus',
  slug: 'footer',
  data: { items: [{ label: 'Carta', href: '/carta' }, { label: 'Reservar mesa', href: '/reservas' }, { label: 'Cómo llegar', href: '/contacto' }] },
});

await seedEntry({
  collection: 'pages',
  slug: 'home',
  data: {
    title: 'Taberna Lumbre',
    seo: { title: 'Taberna Lumbre · Tapas y arroces a la leña en Madrid', description: 'Tapas de mercado, arroces a la leña y 120 vinos. Reserva tu mesa online.' },
    blocks: [
      {
        id: 'hero',
        type: 'hero',
        data: {
          eyebrow: 'Madrid · desde 1987',
          title: 'Tapas de siempre, fuego lento.',
          subtitle: 'Producto de mercado, arroces a la leña y una bodega de 120 vinos. Ven a picar algo o quédate a cenar.',
          image: img.mesa,
          ctaLabel: 'Reservar mesa',
          ctaHref: '/reservas',
          secondaryLabel: 'Ver la carta',
          secondaryHref: '/carta',
          align: 'start',
          asPageTitle: true,
        },
      },
      {
        id: 'cocina',
        type: 'features',
        data: {
          title: 'Nuestra cocina',
          columns: 3,
          items: [
            { icon: '🔥', title: 'Arroces a la leña', text: 'Paella de marisco, arroz negro y arroz del señorito, al momento y para compartir.' },
            { icon: '🧺', title: 'Producto de mercado', text: 'Compramos cada mañana en el mercado de Antón Martín. La pizarra cambia cada día.' },
            { icon: '🍷', title: '120 vinos', text: 'De Ribera, Rioja y Jerez a vinos naturales. Una docena por copa.' },
          ],
        },
      },
      {
        id: 'fotos',
        type: 'gallery',
        data: {
          title: 'Para abrir boca',
          items: [
            { image: img.arroz, caption: 'Arroz de marisco' },
            { image: img.bravas, caption: 'Bravas de la casa' },
            { image: img.pintxos, caption: 'Pintxos del día' },
            { image: img.sala, caption: 'El comedor' },
          ],
        },
      },
      { id: 'datos', type: 'stats', data: { items: [{ value: '4,8★', label: '1.200 reseñas' }, { value: '37', label: 'años de fuego' }, { value: '120', label: 'vinos en bodega' }] } },
      {
        id: 'opiniones',
        type: 'testimonials',
        data: {
          title: 'Lo que dicen',
          items: [
            { quote: 'Las mejores bravas de Madrid y un arroz de marisco que todavía recuerdo.', author: 'Lucía M.', rating: 5 },
            { quote: 'Sitio con alma. Trato cercano, buen vino por copas y precios honestos.', author: 'Daniel R.', rating: 5 },
            { quote: 'Reservé online en un minuto y nos tenían la mesa de la ventana.', author: 'Carmen y Pablo', rating: 5 },
          ],
        },
      },
      { id: 'reserva', type: 'cta', data: { title: 'Reserva tu mesa', text: 'Comidas de 13:30 a 16:00 y cenas de 20:30 a 23:30. Cerramos los lunes.', ctaLabel: 'Reservar ahora', ctaHref: '/reservas', tone: 'primary' } },
    ],
  },
});

await seedEntry({
  collection: 'pages',
  slug: 'carta',
  data: {
    title: 'Carta',
    seo: { description: 'Tapas, raciones, arroces a la leña y postres caseros de Taberna Lumbre.' },
    blocks: [
      { id: 'hero', type: 'hero', data: { eyebrow: 'Carta de otoño', title: 'Nuestra carta', subtitle: 'Precios con IVA. Pregúntanos por las tapas del día en la pizarra.', image: img.surtido, align: 'start', asPageTitle: true } },
      {
        id: 'picar',
        type: 'features',
        data: {
          title: 'Para picar',
          columns: 3,
          items: [
            { title: 'Croquetas de jamón · 9 €', text: 'Seis unidades, bechamel de leche fresca.' },
            { title: 'Bravas de la casa · 7 €', text: 'Patata confitada, salsa brava y alioli.' },
            { title: 'Pintxo de queso y jamón · 3,5 €', text: 'Pan de masa madre y pimiento asado.' },
            { title: 'Gambas al ajillo · 14 €', text: 'Ajo, guindilla y aceite de oliva virgen extra.' },
            { title: 'Tabla de ibéricos · 18 €', text: 'Jamón, lomo y chorizo de bellota.' },
            { title: 'Pimientos de Padrón · 8 €', text: 'Unos pican y otros no.' },
          ],
        },
      },
      {
        id: 'arroces',
        type: 'features',
        data: {
          title: 'Arroces a la leña (mínimo 2 personas)',
          columns: 3,
          items: [
            { title: 'Paella de marisco · 22 €/pers.', text: 'Gamba roja, mejillón y almeja.' },
            { title: 'Arroz negro · 20 €/pers.', text: 'Sepia, tinta y alioli suave.' },
            { title: 'Arroz de verduras · 17 €/pers.', text: 'De temporada, apto para veganos.' },
          ],
        },
      },
      {
        id: 'postres',
        type: 'features',
        data: {
          title: 'Postres caseros',
          columns: 3,
          items: [
            { title: 'Tarta de queso · 7 €', text: 'Cremosa, al horno de leña.' },
            { title: 'Torrija · 6,5 €', text: 'Con helado de canela.' },
            { title: 'Flan de huevo · 5,5 €', text: 'Como el de la abuela.' },
          ],
        },
      },
      { id: 'reserva', type: 'cta', data: { title: '¿Te apetece?', text: 'Los arroces se hacen al momento: resérvalos con tu mesa.', ctaLabel: 'Reservar mesa', ctaHref: '/reservas', tone: 'primary' } },
    ],
  },
});

await seedEntry({
  collection: 'pages',
  slug: 'reservas',
  data: {
    title: 'Reservas',
    seo: { description: 'Reserva tu mesa en Taberna Lumbre en menos de un minuto.' },
    blocks: [
      { id: 'form', type: 'form', data: { title: 'Reserva tu mesa', intro: 'Te confirmamos por email en menos de una hora. Para grupos de más de 8, llámanos.', formKey: 'reserva' } },
      {
        id: 'faq',
        type: 'faq',
        data: {
          title: 'Antes de venir',
          structuredData: true,
          items: [
            { question: '¿Tenéis opciones sin gluten o veganas?', answer: 'Sí. Indícalo en la reserva y la cocina lo tendrá en cuenta.' },
            { question: '¿Puedo reservar la terraza?', answer: 'De mayo a octubre. Escríbelo en peticiones y te diremos si hay sitio.' },
            { question: '¿Hay que reservar el arroz?', answer: 'No es obligatorio, pero se hace al momento (unos 25 minutos).' },
          ],
        },
      },
    ],
  },
});

await seedEntry({
  collection: 'pages',
  slug: 'contacto',
  data: {
    title: 'Contacto',
    seo: { description: 'Horario, dirección y teléfono de Taberna Lumbre.' },
    blocks: [
      { id: 'hero', type: 'hero', data: { title: 'Ven a vernos', subtitle: 'Calle de la Lumbre 12, 28012 Madrid · Metro Antón Martín', image: img.pizarra, align: 'start', asPageTitle: true } },
      {
        id: 'info',
        type: 'features',
        data: {
          columns: 3,
          items: [
            { icon: '🕐', title: 'Horario', text: 'Martes a domingo: 13:30–16:00 y 20:30–23:30. Lunes cerrado.' },
            { icon: '📞', title: 'Teléfono', text: '+34 910 000 000' },
            { icon: '✉️', title: 'Email', text: 'reservas@example.com' },
          ],
        },
      },
      { id: 'contacto', type: 'form', data: { title: 'Escríbenos', formKey: 'contact' } },
    ],
  },
});

console.log('Taberna Lumbre: contenido publicado');
process.exit(0);
