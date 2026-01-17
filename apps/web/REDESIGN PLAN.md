🎨 REDESIGN PLAN: Elegant Tech-Obsidian Portfolio
Design Philosophy
- Aesthetic: Dark, sophisticated, premium dev tool vibes - think Linear, Vercel, or VS Code dark theme elevated
- Tone: Your snarky personality injected tastefully - subtle terminal humor, dev culture references, tech inside jokes
- Layout: Bento grid with asymmetric flow, micro-animations, scroll-triggered reveals
- Animation: motion (formerly Framer Motion) - the 2025 standard for React animations
---
1. Color Strategy (OKLCH Refinement)
Keep your palette but BOLDLY re-arrange:
Dark Mode (Primary/Default)
- Background: oklch(0.12 0.04 240) - deeper, richer dark
- Surface cards: oklch(0.16 0.04 235) - subtle elevation
- Primary accents: oklch(0.7 0.2 140) - your green, but used strategically for CTAs
- Secondary: oklch(0.55 0.18 175) - teal for interactive elements
- Accent: oklch(0.75 0.18 115) - vibrant green-yellow for highlights
Light Mode (Optional Toggle)
- Background: oklch(0.97 0.01 90) - clean warm off-white
- Surface: oklch(1 0 0) - pure white cards
- Keep same accent colors for consistency
Color Usage Rules:
- 80% neutral (backgrounds, text, borders)
- 15% secondary (hover states, decorative elements)
- 5% primary (CTAs, key actions only)
---
2. New Component Architecture
A. Navigation (navbar.tsx)
- Floating glassmorphism pill (not fixed top bar)
- Logo as monospace <Dbuild /> with animated cursor
- Links with subtle glow on hover
- Theme toggle as sleek icon switch with transition
B. Hero Section (hero-section.tsx)
Full-screen bento grid layout:
- Left column (60%): Dynamic project showcase
  - Large featured project card (your best work)
  - Smooth carousel with 3D tilt on hover
  - Project details animate in on switch
- Right column (40%): 
  - Terminal-style intro: > init portfolio...
  - Stats row: "8 projects" "3 years shipping" "∞ bugs fixed"
  - CTA buttons with magnetic hover effect
  - Typing animation cycling through your tech stack
Animations:
- Page load: staggered fade-in from bottom
- Project switch: slide + blur + scale
- Hover: subtle scale + glow
C. Projects Bento Grid (bento-projects.tsx)
Asymmetric 4-column grid:
[Featured  ] [Medium   ] [Small     ] [Small     ]
[Featured  ] [Medium   ] [Medium   ] [Small     ]
[Large     ] [Large     ] [Medium   ] [Small     ]
Card styles:
- Glassmorphism with subtle border glow
- Project image with hover reveal overlay
- Tags as code-style badges (monospace)
- GitHub/Live links as icon-only that expand on hover
Animations:
- Scroll-triggered: items cascade in from different directions
- Hover: card lifts + border glows + details slide up
- Masonry shuffling on filter (if implemented)
D. Blog Section
- Minimalist editorial layout
- Article cards as code blocks with syntax highlighting colors
- Date in terminal style: 2025-01-17 14:32 > post title
- Hover triggers subtle typewriter effect on title
E. Footer
- Simple, centered, monospace
- <!-- end of transmission --> style comment
- Social links with hover glow
---
3. Typography Strategy
- Headings: Geist Mono or JetBrains Mono - tech but readable
- Body: Inter (keep current - it's solid)
- Code snippets: Fira Code with ligatures
- Decorative: Terminal-style for jokes/hints
---
4. Micro-Interactions
- Custom cursor: subtle techy crosshair or pointer that follows with lag
- Button clicks: ripple effect + satisfying bounce
- Scroll: parallax on hero project images
- Page transitions: fade + blur + slight zoom
---
5. Personality Touches (Your "Snarky Smartass" Elements)
- 404 page: Terminal with > 404: feature not implemented yet
- Loading states: > compiling sarcasm... 
- Empty states: > nothing to see here, move along
- Easter eggs: Konami code triggers a "you found nothing" modal
- Footer: > console.log("thanks for scrolling")
---
6. Technical Implementation Plan
Phase 1: Setup (15 min)
1. Install motion library: bun add motion
2. Create new color CSS variables in index.css
3. Add Geist Mono font to layout
Phase 2: Core Components (2-3 hrs)
1. Build new hero-section.tsx with bento layout
2. Create bento-grid.tsx component for projects
3. Refactor navigation to floating pill
Phase 3: Page Updates (1-2 hrs)
1. Update homepage with new hero
2. Redesign projects page as bento grid
3. Refresh blog section styling
4. Update project detail page
Phase 4: Polish & Animations (1 hr)
1. Add motion animations throughout
2. Implement scroll-triggered reveals
3. Add micro-interactions
4. Test responsive behavior
---
7. File Structure Changes
apps/web/src/
├── components/
│   ├── ui/ (keep existing shadcn)
│   ├── hero-section.tsx (REDO - bento layout)
│   ├── bento-grid.tsx (NEW)
│   ├── bento-card.tsx (NEW)
│   ├── navigation.tsx (UPDATE - floating pill)
│   └── animated-stats.tsx (NEW)
├── app/
│   ├── page.tsx (UPDATE)
│   ├── projects/page.tsx (REDO - bento)
│   └── blog/page.tsx (UPDATE styling)
└── index.css (UPDATE - refined color variables)
---
8. Responsive Strategy
- Desktop: Full 4-column bento grid
- Tablet: 2-3 columns, stack some items
- Mobile: Single column, maintain asymmetric feel with varied heights
- Hero: On mobile, stack vertically with animation preserved
---
9. Performance Considerations
- Use layoutId in Motion for smooth element transitions
- Lazy load project images with blur-up placeholders
- Debounce scroll animations
- Use will-change sparingly, only on animated elements
---
10. Accessibility
- Maintain contrast ratios (will test with OKLCH)
- Keyboard navigation for bento grid
- ARIA labels for custom interactions
- Reduced motion support (respect user preferences)