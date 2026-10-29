# MaykNLD Portfolio

Portfolio profesional para Fiverr - Ilustración digital, diseño web, logos, vídeos cortos y comunidad gaming.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Estilos | CSS Modules + CSS Variables |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (email + OTP 2FA) |
| Storage | Supabase Storage (con marca de agua server-side) |
| i18n | next-intl (ES / EN) |
| Deploy | Vercel |
| Protección | Vercel Edge + rate limiting + RLS |

## Estructura del proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/          # i18n routing
│   │   │   ├── page.tsx       # Home
│   │   │   ├── ilustraciones/ # Galería ilustraciones
│   │   │   ├── webs/          # Portfolio webs
│   │   │   ├── logos/         # Portfolio logos
│   │   │   ├── videos/        # Reels
│   │   │   ├── gaming/        # Comunidad gaming
│   │   │   └── contacto/      # Formulario contacto
│   │   ├── admin/             # Panel admin (protegido)
│   │   └── api/               # API routes (contact, watermark)
│   ├── components/            # Componentes reutilizables
│   ├── lib/                   # Supabase client, utils
│   └── styles/                # CSS global y variables
├── supabase/
│   └── schema.sql             # Schema completo de la BD
└── messages/                  # Traducciones ES/EN
```

## Setup inicial

### 1. Supabase

1. Crea proyecto en [supabase.com](https://supabase.com) (gratis)
2. Ve a SQL Editor y ejecuta `supabase/schema.sql`
3. Ve a Storage y crea los buckets:
   - `illustrations` (público)
   - `illustrations-private` (privado)
   - `game-covers` (público)
   - `thumbnails` (público)
4. Copia tu `Project URL` y `anon key` del dashboard

### 2. Variables de entorno

Crea `portfolio/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Solo en server-side
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Instalar y arrancar

```bash
cd portfolio
npm install
npm run dev
```

### 4. Crear admin

1. Ve a Supabase > Authentication > Users
2. Crea tu usuario con email + contraseña
3. Ejecuta en SQL Editor:
   ```sql
   INSERT INTO profiles (id, role, display_name)
   VALUES ('<tu-user-id>', 'admin', 'MaykNLD');
   ```

## Deploy en Vercel

1. Conecta el repo `MaykNLD/mayknld-portfolio` en Vercel
2. Añade las variables de entorno en Vercel Dashboard
3. Deploy automático en cada push a `main`

## Seguridad implementada

- ✅ RLS (Row Level Security) en todas las tablas
- ✅ Solo admin/manager pueden escribir contenido
- ✅ Imágenes originales en bucket privado
- ✅ Marca de agua server-side antes de servir imágenes
- ✅ Rate limiting en API routes de contacto
- ✅ Validación y sanitización de formularios
- ✅ Bloqueo de IPs maliciosas
- ✅ CSRF protection (Next.js nativo)
- ✅ Headers de seguridad (CSP, HSTS, etc.)
