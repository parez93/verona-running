my-app/
├── app/
│   ├── (public)/                      # Pagine pubbliche
│   │   ├── layout.tsx                 # Layout pubblico (Navbar + Footer)
│   │   ├── page.tsx                   # Homepage
│   │   ├── about/page.tsx
│   │   └── login/page.tsx
│   │
│   ├── (private)/                     # Pagine utenti autenticati
│   │   ├── layout.tsx                 # Layout con auth guard
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── (admin)/                       # Pagine admin (ruolo admin richiesto)
│   │   ├── layout.tsx                 # Layout admin (sidebar + guard)
│   │   ├── users/page.tsx
│   │   ├── stats/page.tsx
│   │   └── config/page.tsx
│   │
│   ├── api/                           # Route handlers server-side
│   │   ├── posts/route.ts
│   │   └── admin/route.ts
│   │
│   ├── [locale]/                      # next-intl routing localizzato
│   │   ├── (public)/page.tsx
│   │   └── (private)/dashboard/page.tsx
│   │
│   ├── layout.tsx                     # Root layout globale (providers)
│   ├── globals.css                    # Tailwind + stili globali
│   └── not-found.tsx
│
├── components/
│   ├── ui/                            # Componenti base (Radix UI estesi)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── dropdown.tsx
│   │   └── ...
│   │
│   ├── layout/                        # Navbar, Footer, Sidebar
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── auth/                          # Componenti login/register/reset
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── PasswordReset.tsx
│   │
│   ├── dashboard/                     # Componenti dashboard (Card, Chart)
│   │   ├── CardStat.tsx
│   │   └── Chart.tsx
│   │
│   └── common/                        # Loader, Toast, EmptyState, ecc.
│       ├── Loader.tsx
│       ├── Toast.tsx
│       └── EmptyState.tsx
│
├── hooks/                              # Hook custom
│   ├── useAuth.ts                      # Stato utente / sessione
│   ├── useAdmin.ts                     # Verifica ruolo admin
│   ├── useLocale.ts                    # Helpers next-intl
│   └── useToast.ts                     # Notifiche
│
├── lib/                                # Librerie / helpers
│   ├── supabaseClient.ts               # Client Supabase browser-side
│   ├── supabaseServer.ts               # Client Supabase server-side
│   ├── auth.ts                         # Helpers login/logout
│   ├── i18n.ts                         # Setup next-intl
│   ├── utils.ts                        # Funzioni generiche
│   └── constants.ts                    # Costanti globali (ruoli, routes)
│
├── types/
│   ├── database.ts                     # Tipi generati da Supabase
│   ├── models.ts                       # Modelli / DTO per UI
│   └── index.d.ts
│
├── messages/                           # File traduzioni next-intl
│   ├── en.json
│   ├── it.json
│   └── id.json
│
├── public/
│   ├── locales/                        # File statici localizzati
│   └── images/
│       ├── logo.svg
│       └── ...
│
├── middleware.ts                        # Middleware auth + admin guard
├── styles/
│   ├── globals.css
│   ├── tailwind.css
│   └── themes.css
├── .env.local
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── package.json
└── tsconfig.json
