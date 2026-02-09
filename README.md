# 100xBet Gamification Platform

A modern gamification platform built with Next.js, Tailwind CSS, and Supabase.

![100xBet Rewards](public/images/coin.png)

## Features

- 🎡 **Minigames** - Wheel of Fortune, Scratch Cards, Lucky Dice, Memory Match, Higher or Lower
- 🎯 **Missions** - Complete tasks to earn rewards
- 🎁 **Daily Rewards** - Login streak bonuses
- 👑 **VIP System** - Tier-based cashback rewards
- ⚽ **Match Predictions** - Predict sports outcomes
- 🛒 **Store** - Spend coins on prizes
- 👥 **Referrals** - Invite friends, earn rewards
- 🏆 **Leaderboard** - Compete with other players

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Icons**: Lucide React

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/100xbet-gamification.git
cd 100xbet-gamification
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the schema from `lib/supabase/schema.sql`
4. Enable Email authentication in Authentication > Providers

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/100xbet-gamification)

### Option 2: Manual Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy

## Project Structure

```
100xbet-gamification/
├── app/
│   ├── globals.css      # Global styles + Tailwind
│   ├── layout.js        # Root layout
│   └── page.js          # Main page
├── components/
│   └── GamificationPlatform.jsx  # Main component
├── lib/
│   └── supabase/
│       ├── client.js    # Supabase client
│       └── schema.sql   # Database schema
├── public/
│   └── images/          # Static images
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions, open a GitHub issue or contact support.
