'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Trophy, Star, Gift, Target, Crown, Gem, Diamond, Gamepad2, Store, Medal, 
  Ticket, Zap, ChevronRight, Lock, Check, X, Users, Award, Sparkles, 
  Bell, Flame, ChevronDown, ChevronUp, User, Home, Menu, Copy, 
  Map, HelpCircle, Play, RotateCcw
} from 'lucide-react';

// ============================================================================
// IMAGE PATHS - All images from GitHub repository
// ============================================================================
const IMG_BASE = 'https://raw.githubusercontent.com/aichatbotbwanabet/gamification-platform/main/public/images';

// Currency icons (local)
const CURRENCY_ICONS = {
  coin: '/images/coin.png',
  gem: '/images/gem.png',
  diamond: '/images/diamond.png',
};

const IMAGES = {
  trophy: `${IMG_BASE}/trophy.jpg`,
  medal: `${IMG_BASE}/medal.jpg`,
  treasureChest: `${IMG_BASE}/treasure-chest.jpg`,
  crown: `${IMG_BASE}/crown.jpg`,
  soccerBall: `${IMG_BASE}/soccer-ball.jpg`,
  dailyGift: `${IMG_BASE}/daily-gift.jpg`,
  mysteryBox: `${IMG_BASE}/mystery-box.jpg`,
  earbuds: `${IMG_BASE}/earbuds.jpg`,
  cap: `${IMG_BASE}/cap.jpg`,
  hoodie1: `${IMG_BASE}/hoodie-logo.jpg`,
  tshirt: `${IMG_BASE}/tshirt.jpg`,
  freeBets: `${IMG_BASE}/free-bets.jpg`,
  slotMachine: `${IMG_BASE}/slot-machine.jpg`,
  playingCards: `${IMG_BASE}/playing-cards.jpg`,
  dice: `${IMG_BASE}/dice.jpg`,
  brainQuiz: `${IMG_BASE}/brain-quiz.jpg`,
  memoryCards: `${IMG_BASE}/memory-cards.jpg`,
  wheel: `${IMG_BASE}/wheel.jpg`,
  scratchCard: `${IMG_BASE}/scratch-card.jpg`,
  mysteryBoxOpen: `${IMG_BASE}/mystery-box-open.jpg`,
  trailOfLove: `${IMG_BASE}/trail-of-love.jpg`,
  vikingSpins: `${IMG_BASE}/viking-spins.jpg`,
  winTrophy: `${IMG_BASE}/win-trophy.jpg`,
  betMission: `${IMG_BASE}/bet-mission.jpg`,
  creditCards: `${IMG_BASE}/credit-cards.jpg`,
  shoppingBags: `${IMG_BASE}/shopping-bags.jpg`,
  newArrivals: `${IMG_BASE}/new-arrivals.jpg`,
  jackpotBanner: `${IMG_BASE}/jackpot-banner.jpg`,
  welcomeBanner: `${IMG_BASE}/welcome-banner.jpg`,
  target: `${IMG_BASE}/target.jpg`,
  questMap: `${IMG_BASE}/quest-map.jpg`,
  runner: `${IMG_BASE}/ka-touch-logo.png`,
};

// ============================================================================
// TUTORIALS - Help content for each feature
// ============================================================================
const TUTORIALS = {
  wheel: {
    title: '🎡 Wheel of Fortune',
    subtitle: 'Spin to win amazing prizes!',
    image: 'wheel',
    steps: [
      { icon: '👆', title: 'Tap to Spin', desc: 'Press the golden SPIN button in the center of the wheel.' },
      { icon: '⏳', title: 'Watch the Magic', desc: 'The wheel spins with realistic physics and slows down naturally.' },
      { icon: '🎁', title: 'Claim Your Prize', desc: 'Your prize is highlighted and automatically added to your balance!' },
    ],
    prizes: ['1 Diamond 💎', '10-350 Coins 🪙', '2 Gems 💚', '10-150 XP ⭐'],
    tips: ['You get 3 FREE spins daily', 'Extra spins cost 50 Coins', 'VIP members get bonus spins!'],
  },
  scratch: {
    title: '🎫 Scratch & Win',
    subtitle: 'Scratch to reveal your prize!',
    image: 'scratchCard',
    steps: [
      { icon: '🪙', title: 'Scratch with Coin', desc: 'Click and drag across the silver area to scratch it off.' },
      { icon: '✨', title: 'Reveal 50%', desc: 'Keep scratching until you reveal at least half the card.' },
      { icon: '💰', title: 'Instant Win', desc: 'Your Coins prize is instantly credited to your account!' },
    ],
    prizes: ['25 Coins (Common)', '50-100 Coins', '200 Coins', '500 Coins (Rare!)'],
    tips: ['5 FREE scratch cards daily', 'Scratch in circular motions', 'Bigger scratches = faster reveal'],
  },
  dice: {
    title: '🎲 Lucky Dice',
    subtitle: 'Guess the total and win big!',
    image: 'dice',
    steps: [
      { icon: '🔢', title: 'Pick Your Number', desc: 'Select a total from 2 to 12 - your prediction for both dice.' },
      { icon: '🎲', title: 'Roll the Dice', desc: 'Watch the 3D dice tumble realistically!' },
      { icon: '🎯', title: 'Win Prizes', desc: 'Exact match = 500K! Close guess (±2) = 100K!' },
    ],
    prizes: ['Exact Match: 500 Coins 🎯', 'Within ±2: 100 Coins 👍', 'Any play: +10 XP'],
    tips: ['7 is statistically most likely', '2 and 12 are hardest but pay big', '5 FREE rolls daily'],
  },
  memory: {
    title: '🧠 Memory Match',
    subtitle: 'Match pairs to win rewards!',
    image: 'memoryCards',
    steps: [
      { icon: '👀', title: 'Flip Cards', desc: 'Tap any card to flip it and reveal the symbol underneath.' },
      { icon: '🧩', title: 'Find Matches', desc: 'Remember positions and match two identical symbols to score.' },
      { icon: '⚡', title: 'Be Quick', desc: 'Fewer moves = bigger prize! Complete all 8 pairs to win.' },
    ],
    prizes: ['Under 12 moves: 300 Coins', '12-16 moves: 200 Coins', '17-20 moves: 100 Coins'],
    tips: ['Start from corners', 'Create mental patterns', '3 FREE games daily'],
  },
  highlow: {
    title: '🃏 Higher or Lower',
    subtitle: 'Build your winning streak!',
    image: 'playingCards',
    steps: [
      { icon: '👁️', title: 'See Current Card', desc: 'Look at the card shown - this is your reference point.' },
      { icon: '⬆️⬇️', title: 'Make Your Guess', desc: 'Will the next card be HIGHER or LOWER? Choose wisely!' },
      { icon: '💰', title: 'Cash Out Anytime', desc: 'Each correct guess adds 25K. Cash out or risk it all!' },
    ],
    prizes: ['Each correct: +25 Coins', '5 streak: 125 Coins total', 'Cash out anytime!'],
    tips: ['Cards near 1 or 13 are easier', '7 is 50/50 - risky!', 'Know when to cash out'],
  },
  katouch: {
    title: '🏃 Ka Touch Runner',
    subtitle: 'Dodge obstacles and chase the NPC!',
    image: 'runner',
    steps: [
      { icon: '🦘', title: 'Jump & Duck', desc: 'SPACE/TAP to jump, DOWN to duck under planes!' },
      { icon: '🪙', title: 'Collect Coins', desc: 'Grab coins as you run — they add to your reward.' },
      { icon: '🐕', title: 'Watch for Scooby!', desc: 'A dog appears at 100pts — duck or jump to survive!' },
    ],
    prizes: ['Every 1000 score = 1 Coin', 'Collected coins add to total', 'Explore 5 Zambian biomes!'],
    tips: ['Jump early for higher obstacles', 'The NPC teases but you can\'t catch him!', 'Speed increases — stay sharp'],
  },
  daily: {
    title: '🎁 Daily Rewards',
    subtitle: 'Login every day for bigger prizes!',
    image: 'dailyGift',
    steps: [
      { icon: '📅', title: 'Visit Daily', desc: 'Come back every day to claim your reward. Consistency pays!' },
      { icon: '📈', title: 'Growing Rewards', desc: 'Day 1: 10K → Day 7: 250K + Gems + Diamonds!' },
      { icon: '⚠️', title: 'Keep Your Streak', desc: 'Missing a day resets your streak back to Day 1!' },
    ],
    prizes: ['Day 1: 10 Coins', 'Day 4: 75K + 5 Gems', 'Day 7: 250K + 25 Gems + 1 Diamond 💎'],
    tips: ['Set a daily reminder!', 'Claim within 24 hours', 'VIP gets 2x rewards'],
  },
  missions: {
    title: '🎯 Missions',
    subtitle: 'Complete tasks for rewards!',
    image: 'target',
    steps: [
      { icon: '📋', title: 'View Missions', desc: 'Check available missions - each has a specific goal to complete.' },
      { icon: '✅', title: 'Complete Tasks', desc: 'Do the required action: bet, deposit, play games, etc.' },
      { icon: '🎁', title: 'Auto Rewards', desc: 'Rewards are automatically added when you complete a mission!' },
    ],
    prizes: ['Easy: 30-50 Coins', 'Medium: 50-100 Coins', 'Hard: 100-150K + Gems'],
    tips: ['Check for new missions daily', 'Hot missions give extra XP', 'Some missions have time limits'],
  },
  vip: {
    title: '👑 VIP Club',
    subtitle: 'Exclusive benefits for loyal players!',
    image: 'crown',
    steps: [
      { icon: '💳', title: 'Make Deposits', desc: 'Your total deposits determine your VIP tier level.' },
      { icon: '⬆️', title: 'Climb the Ranks', desc: 'Bronze → Silver → Gold → Platinum → Diamond VIP!' },
      { icon: '💎', title: 'Enjoy Perks', desc: 'Higher tiers = better cashback, exclusive rewards!' },
    ],
    prizes: ['Bronze: 0.5% cashback', 'Silver: 1%', 'Gold: 1.5%', 'Diamond: 3% cashback'],
    tips: ['VIP status is permanent', 'Cashback paid weekly', 'Diamond VIPs get personal manager'],
  },
  store: {
    title: '🛒 Rewards Store',
    subtitle: 'Spend your Coins on prizes!',
    image: 'shoppingBags',
    steps: [
      { icon: '🪙', title: 'Earn Coins', desc: 'Play games, complete missions, login daily to earn Coins.' },
      { icon: '🛍️', title: 'Browse Items', desc: 'Free spins, free bets, merchandise, and exclusive rewards!' },
      { icon: '✅', title: 'Purchase', desc: 'Click to buy - some items require Coins + Gems.' },
    ],
    prizes: ['Free Spins: 300-500K', 'Free Bets: 200-450K', 'Merch: 400-2000K'],
    tips: ['Featured items are limited!', 'New arrivals every week', 'Check for sale prices'],
  },
  predictions: {
    title: '⚽ Match Predictions',
    subtitle: 'Predict and win Coins!',
    image: 'soccerBall',
    steps: [
      { icon: '📊', title: 'View Matches', desc: 'Browse upcoming matches with odds displayed.' },
      { icon: '🎯', title: 'Make Prediction', desc: 'Click Home, Draw, or Away to predict the result.' },
      { icon: '💰', title: 'Win Rewards', desc: 'Correct predictions earn Coins + XP!' },
    ],
    prizes: ['Regular matches: 50-60 Coins', 'Featured ⭐: 75-100 Coins', '+5 XP per prediction'],
    tips: ['Research before predicting', 'Featured matches pay more', 'No limit on predictions!'],
  },
  referrals: {
    title: '👥 Referrals',
    subtitle: 'Invite friends, earn rewards!',
    image: 'trophy',
    steps: [
      { icon: '🔗', title: 'Get Your Code', desc: 'Copy your unique referral code from the Referrals page.' },
      { icon: '📤', title: 'Share with Friends', desc: 'Send your code to friends who want to join 100xBet.' },
      { icon: '🎁', title: 'Both Win', desc: 'You get 500K + 50 Gems for each friend who signs up!' },
    ],
    prizes: ['Per referral: 500 Coins', 'Per referral: 50 Gems', 'Per referral: 200 XP'],
    tips: ['Share on social media', 'Friends get welcome bonus too', 'No limit on referrals!'],
  },
};

// ============================================================================
// WHEEL SEGMENTS - Prize wheel configuration
// ============================================================================
const WHEEL_SEGMENTS = [
  { id: 1, label: '1 Diamond', prize: { diamonds: 1 }, icon: '💎', color: '#a855f7' },
  { id: 2, label: '10 Coins', prize: { kwacha: 10 }, icon: '🪙', color: '#fbbf24' },
  { id: 3, label: '10 XP', prize: { xp: 10 }, icon: '⭐', color: '#ec4899' },
  { id: 4, label: '150 XP', prize: { xp: 150 }, icon: '🔑', color: '#22c55e' },
  { id: 5, label: '2 Gems', prize: { gems: 2 }, icon: '💚', color: '#10b981' },
  { id: 6, label: '100C+100XP', prize: { xp: 100, kwacha: 100 }, icon: '🍀', color: '#f97316' },
  { id: 7, label: '200 Coins', prize: { kwacha: 200 }, icon: '🪙', color: '#eab308' },
  { id: 8, label: '350 Coins', prize: { kwacha: 350 }, icon: '🧲', color: '#14b8a6' },
  { id: 9, label: '100 Coins', prize: { kwacha: 100 }, icon: '💍', color: '#f43f5e' },
];

// ============================================================================
// GAME DATA - Levels, VIP, Missions, etc.
// ============================================================================
const XP_LEVELS = [
  { level: 1, name: 'Stone', xp: 0, icon: '🪨' },
  { level: 2, name: 'Bronze', xp: 500, icon: '🥉' },
  { level: 3, name: 'Silver', xp: 1500, icon: '🥈' },
  { level: 4, name: 'Gold', xp: 3500, icon: '🥇' },
  { level: 5, name: 'Platinum', xp: 7000, icon: '💠' },
  { level: 6, name: 'Diamond', xp: 15000, icon: '💎' },
  { level: 7, name: 'Master', xp: 30000, icon: '👑' },
];

const VIP_TIERS = [
  { name: 'Standard', min: 0, icon: '⭐', cashback: 0 },
  { name: 'Bronze', min: 500, icon: '🥉', cashback: 0.5 },
  { name: 'Silver', min: 2000, icon: '🥈', cashback: 1 },
  { name: 'Gold', min: 5000, icon: '🥇', cashback: 1.5 },
  { name: 'Platinum', min: 15000, icon: '💠', cashback: 2 },
  { name: 'Diamond', min: 50000, icon: '💎', cashback: 3 },
];

const MISSIONS = [
  { id: 'retail', name: 'Retail Therapy', desc: 'Make a purchase in the store', target: 1, reward: { kwacha: 50 }, xp: 25, image: 'shoppingBags' },
  { id: 'deposit', name: 'Time to Deposit!', desc: 'Make a deposit', target: 1, reward: { kwacha: 100, gems: 5 }, xp: 50, image: 'creditCards', hot: true },
  { id: 'firstBet', name: 'Place Your Bet', desc: 'Place your first bet', target: 1, reward: { kwacha: 30 }, xp: 15, image: 'betMission' },
  { id: 'bet10', name: 'Regular Player', desc: 'Place 10 bets', target: 10, reward: { kwacha: 75 }, xp: 40, image: 'betMission' },
  { id: 'win5', name: 'Winner Winner!', desc: 'Win 5 bets', target: 5, reward: { kwacha: 150, gems: 10 }, xp: 60, image: 'winTrophy', hot: true },
  { id: 'spinWheel', name: 'Lucky Spinner', desc: 'Spin the wheel 3 times', target: 3, reward: { kwacha: 50 }, xp: 30, image: 'wheel' },
];

const MINIGAMES = [
  { id: 'wheel', name: 'Wheel of Fortune', desc: 'Spin to win amazing prizes!', free: 3, cost: 50, image: 'wheel' },
  { id: 'scratch', name: 'Scratch & Win', desc: 'Scratch to reveal prizes!', free: 5, cost: 25, image: 'scratchCard' },
  { id: 'dice', name: 'Lucky Dice', desc: 'Roll the dice for rewards!', free: 5, cost: 20, image: 'dice' },
  { id: 'memory', name: 'Memory Match', desc: 'Match pairs to win!', free: 3, cost: 30, image: 'memoryCards' },
  { id: 'highlow', name: 'Higher or Lower', desc: 'Guess the next card!', free: 5, cost: 15, image: 'playingCards' },
  { id: 'katouch', name: 'Ka Touch Runner', desc: 'Endless runner — dodge & collect!', free: 99, cost: 10, image: 'runner' },
  { id: 'plinko', name: 'Plinko Drop', desc: 'Drop balls for big multipliers!', free: 5, cost: 25, image: 'dice' },
  { id: 'tapfrenzy', name: 'Tap Frenzy', desc: 'Tap as fast as you can!', free: 5, cost: 15, image: 'memoryCards' },
  { id: 'stopclock', name: 'Stop the Clock', desc: 'Stop at the perfect moment!', free: 5, cost: 20, image: 'wheel' },
  { id: 'treasure', name: 'Treasure Hunt', desc: 'Find hidden treasure!', free: 3, cost: 30, image: 'scratchCard' },
];

const STORE_ITEMS = [
  { id: 'viking', name: '75 Free Spins - Vikings', desc: 'Vikings Go to Hell slot', price: { kwacha: 500 }, image: 'vikingSpins', featured: true },
  { id: 'spins50', name: '50 Free Spins', desc: 'Any slot game', price: { kwacha: 300 }, image: 'slotMachine' },
  { id: 'freeBet20', name: 'K20 Free Bet', desc: 'No wagering required', price: { kwacha: 200 }, image: 'freeBets' },
  { id: 'mystery', name: 'Mystery Box', desc: 'Random premium reward!', price: { kwacha: 400, gems: 10 }, image: 'mysteryBox', isNew: true },
  { id: 'hoodie', name: '100xBet Hoodie', desc: 'Limited edition', price: { kwacha: 1200, gems: 30 }, image: 'hoodie1', featured: true },
];

const MATCHES = [
  { id: 'm1', league: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', home: 'Manchester City', away: 'Liverpool', h: 1.85, d: 3.60, a: 4.20, date: 'Today 20:00', reward: 50 },
  { id: 'm2', league: 'La Liga', flag: '🇪🇸', home: 'Real Madrid', away: 'Barcelona', h: 2.10, d: 3.40, a: 3.50, date: 'Tomorrow 21:00', reward: 75, featured: true },
  { id: 'm3', league: 'Champions League', flag: '🏆', home: 'Bayern Munich', away: 'PSG', h: 1.95, d: 3.70, a: 3.80, date: 'Feb 1, 20:00', reward: 100, featured: true },
];

const QUESTS = [
  { id: 'welcome', name: 'Welcome Journey', desc: 'Complete your first steps!', image: 'treasureChest', reward: { kwacha: 500, gems: 50 }, xp: 250, steps: ['Make first deposit', 'Place first bet', 'Spin the wheel', 'Complete a mission'] },
  { id: 'explorer', name: 'Game Explorer', desc: 'Try all minigames!', image: 'questMap', reward: { kwacha: 300, gems: 30 }, xp: 200, steps: ['Play Wheel', 'Play Scratch Card', 'Play Dice', 'Play Memory Match'] },
];

const DAILY_REWARDS = [
  { day: 1, kwacha: 10 },
  { day: 2, kwacha: 25 },
  { day: 3, kwacha: 50 },
  { day: 4, kwacha: 75, gems: 5 },
  { day: 5, kwacha: 100, gems: 10 },
  { day: 6, kwacha: 150, gems: 15 },
  { day: 7, kwacha: 250, gems: 25, diamonds: 1 },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
const getLevel = (xp) => XP_LEVELS.reduce((curr, lvl) => xp >= lvl.xp ? lvl : curr, XP_LEVELS[0]);
const getNextLevel = (xp) => XP_LEVELS.find(l => l.xp > xp) || null;
const getXPProgress = (xp) => {
  const curr = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  return ((xp - curr.xp) / (next.xp - curr.xp)) * 100;
};
const getVIP = (deposits) => VIP_TIERS.reduce((curr, tier) => deposits >= tier.min ? tier : curr, VIP_TIERS[0]);

// ============================================================================
// TUTORIAL MODAL COMPONENT
// ============================================================================

// ===== THEME CSS =====
const ThemeCSS = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .btn-3d { position:relative; display:inline-flex; align-items:center; justify-content:center; font-weight:900; text-shadow:0 1px 2px rgba(0,0,0,0.3); border:none; cursor:pointer; transition:all 0.15s cubic-bezier(0.25,0.46,0.45,0.94); transform:translateY(0); user-select:none; }
    .btn-3d:hover { transform:translateY(-2px); }
    .btn-3d:active { transform:translateY(3px); }
    .btn-3d::after { content:''; position:absolute; top:2px; left:8%; width:84%; height:40%; background:linear-gradient(180deg,rgba(255,255,255,0.25) 0%,transparent 100%); border-radius:inherit; pointer-events:none; }
    .btn-3d-purple { background:linear-gradient(180deg,#22D3EE 0%,#06B6D4 40%,#0891B2 100%); color:#000; text-shadow:none; box-shadow:0 4px 0 #0E7490,0 6px 20px rgba(6,182,212,0.4),0 0 20px rgba(34,211,238,0.15),inset 0 1px 0 rgba(255,255,255,0.3),inset 0 -1px 0 rgba(0,0,0,0.2); }
    .btn-3d-purple:hover { box-shadow:0 6px 0 #0E7490,0 10px 30px rgba(6,182,212,0.5),0 0 30px rgba(34,211,238,0.25),inset 0 1px 0 rgba(255,255,255,0.35); }
    .btn-3d-purple:active { box-shadow:0 1px 0 #0E7490,0 2px 8px rgba(6,182,212,0.3),inset 0 2px 4px rgba(0,0,0,0.3); }
    .btn-3d-green { background:linear-gradient(180deg,#34D399 0%,#10B981 40%,#059669 100%); color:#000; text-shadow:none; box-shadow:0 4px 0 #047857,0 6px 20px rgba(16,185,129,0.35),inset 0 1px 0 rgba(255,255,255,0.25),inset 0 -1px 0 rgba(0,0,0,0.2); }
    .btn-3d-green:hover { box-shadow:0 6px 0 #047857,0 10px 30px rgba(16,185,129,0.5),inset 0 1px 0 rgba(255,255,255,0.3); }
    .btn-3d-green:active { box-shadow:0 1px 0 #047857,0 2px 8px rgba(16,185,129,0.3),inset 0 2px 4px rgba(0,0,0,0.3); }
    .btn-3d-blue { background:linear-gradient(180deg,#38BDF8 0%,#0EA5E9 40%,#0284C7 100%); color:#000; text-shadow:none; box-shadow:0 4px 0 #075985,0 6px 20px rgba(14,165,233,0.4),inset 0 1px 0 rgba(255,255,255,0.3); }
    .btn-3d-blue:hover { box-shadow:0 6px 0 #075985,0 10px 30px rgba(14,165,233,0.5),inset 0 1px 0 rgba(255,255,255,0.35); }
    .btn-3d-pink { background:linear-gradient(180deg,#F472B6 0%,#EC4899 40%,#DB2777 100%); box-shadow:0 4px 0 #9D174D,0 6px 20px rgba(236,72,153,0.35),inset 0 1px 0 rgba(255,255,255,0.2); }
    .card-interactive { border:2px solid rgba(6,182,212,0.35); border-radius:20px; background:rgba(3,8,16,0.5); backdrop-filter:blur(8px); box-shadow:0 0 15px rgba(6,182,212,0.1),0 4px 24px rgba(0,0,0,0.5); transition:all 0.25s cubic-bezier(0.22,1,0.36,1); }
    .card-interactive:hover { border-color:rgba(34,211,238,0.7); box-shadow:0 0 20px rgba(6,182,212,0.3),0 8px 32px rgba(0,0,0,0.5); transform:translateY(-4px); }
    .match-card { border:2px solid rgba(6,182,212,0.3); border-radius:20px; box-shadow:0 0 15px rgba(6,182,212,0.08),0 4px 24px rgba(0,0,0,0.5); background:rgba(3,8,16,0.5); backdrop-filter:blur(8px); }
    .odds-btn { border:2px solid rgba(6,182,212,0.35); border-radius:14px; background:rgba(6,182,212,0.08); box-shadow:0 2px 0 rgba(0,0,0,0.4); transition:all 0.2s ease; }
    .odds-btn:hover { border-color:rgba(34,211,238,0.8); background:rgba(6,182,212,0.2); box-shadow:0 0 20px rgba(6,182,212,0.4); transform:translateY(-2px); }
    .tab-btn-active { background:linear-gradient(180deg,#22D3EE 0%,#06B6D4 40%,#0891B2 100%); color:#000; font-weight:900; box-shadow:0 4px 0 #0E7490,0 6px 20px rgba(6,182,212,0.35); border:none; border-radius:14px; }
    .tab-btn-inactive { background:transparent; border:2px solid rgba(6,182,212,0.2); border-radius:14px; transition:all 0.2s ease; }
    .tab-btn-inactive:hover { border-color:rgba(34,211,238,0.5); background:rgba(6,182,212,0.08); }
    .hover-lift { transition:all 0.3s cubic-bezier(0.22,1,0.36,1); }
    .hover-lift:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,0,0,0.5),0 0 20px rgba(6,182,212,0.15); }
    .btn-glow { position:relative; overflow:hidden; }
    .btn-glow::after { content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%); animation:shimmer 3s ease-in-out infinite; }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
    @keyframes slideDown { from{opacity:0;transform:translateY(-30px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes shimmer { 0%,100%{transform:translateX(-100%) rotate(25deg)} 50%{transform:translateX(100%) rotate(25deg)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes coinBounce { 0%{transform:scale(1)} 30%{transform:scale(1.3)} 60%{transform:scale(0.9)} 100%{transform:scale(1)} }
    @keyframes pulseGlow { 0%,100%{box-shadow:0 0 8px rgba(6,182,212,0.4)} 50%{box-shadow:0 0 24px rgba(6,182,212,0.7),0 0 48px rgba(6,182,212,0.3)} }
    @keyframes borderGlow { 0%,100%{border-color:rgba(6,182,212,0.08)} 50%{border-color:rgba(6,182,212,0.3)} }
    @keyframes progressFill { from{width:0} }
    @keyframes confettiDrop { 0%{transform:translateY(-20px) rotate(0);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
    @keyframes confettiFall { 0%{transform:translateY(-10px) rotate(0) scale(1);opacity:1} 100%{transform:translateY(60px) rotate(360deg) scale(0);opacity:0} }
    @keyframes modalScaleOut { to{opacity:0;transform:scale(0.85)} }
    @keyframes backdropFadeOut { to{opacity:0} }
    @keyframes checkPop { 0%{transform:scale(0)} 50%{transform:scale(1.3)} 100%{transform:scale(1)} }
    @keyframes resultZoom { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
    @keyframes screenFlash { 0%{opacity:0.8} 100%{opacity:0} }
    @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-5deg)} 75%{transform:rotate(5deg)} }
    @keyframes sparkleFloat { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-30px) scale(0);opacity:0} }
    @keyframes lightPulse { 0%,100%{opacity:0.3;transform:scale(0.95)} 50%{opacity:1;transform:scale(1.05)} }
    .anim-fade-up { animation:fadeInUp 0.4s ease-out both; }
    .anim-fade-in { animation:fadeInUp 0.3s ease-out both; }
    .anim-scale-in { animation:scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
    .anim-slide-down { animation:slideDown 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
    .anim-float { animation:float 3s ease-in-out infinite; }
    .anim-coin-bounce { animation:coinBounce 0.5s ease-out; }
    .glow-pulse { animation:pulseGlow 2s ease-in-out infinite; }
    .glow-border { animation:borderGlow 2s ease-in-out infinite; }
    .progress-animated { animation:progressFill 1s ease-out both; }
    .anim-modal-close { animation:modalScaleOut 0.25s ease-in both; }
    .anim-backdrop-close { animation:backdropFadeOut 0.25s ease-in both; }
    .anim-check-pop { animation:checkPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
    .anim-result-zoom { animation:resultZoom 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
    .anim-wiggle { animation:wiggle 0.5s ease-in-out; }
    .anim-sparkle { animation:sparkleFloat 0.8s ease-out both; }
    .anim-correct { animation:correctPulse 0.6s ease-out; }
    .anim-wrong { animation:wrongShake 0.5s ease-in-out; }

    @keyframes bgDrift1 { 0%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} 100%{transform:translate(0,0)} }
    @keyframes bgDrift2 { 0%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} 100%{transform:translate(0,0)} }
    @keyframes bgDrift3 { 0%{transform:translate(0,0)} 50%{transform:translate(20px,35px)} 100%{transform:translate(0,0)} }
    @keyframes bgDrift4 { 0%{transform:translate(0,0)} 50%{transform:translate(-25px,-30px)} 100%{transform:translate(0,0)} }
    @keyframes lightChase { 0%,100%{opacity:0.2} 50%{opacity:1} }
    @keyframes pointerBounce { 0%,100%{transform:translateY(0) rotate(180deg)} 50%{transform:translateY(-6px) rotate(180deg)} }
    @keyframes correctPulse { 0%{box-shadow:0 0 0 0 rgba(34,197,94,0.6)} 100%{box-shadow:0 0 0 20px rgba(34,197,94,0)} }
    @keyframes wrongShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  ` }} />
);

// ===== ORANGE GRAINIENT WEBGL BACKGROUND =====
function Grainient() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false });
    if (!gl) return;
    const vs = `#version 300 es
    in vec2 a_position; out vec2 vUv;
    void main() { vUv = a_position * 0.5 + 0.5; gl_Position = vec4(a_position, 0.0, 1.0); }`;
    const fs = `#version 300 es
    precision highp float; in vec2 vUv; out vec4 fragColor;
    uniform float u_time; uniform vec2 u_resolution; uniform vec3 u_color1, u_color2, u_color3;
    uniform float u_noiseScale, u_warpStrength, u_warpFreq, u_grainAmount;
    vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289((x*34.+10.)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
    float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g,l.zxy);vec3 i2=max(g,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-.5;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));vec4 j=p-49.*floor(p/49.);vec4 x_=floor(j/7.);vec4 y_=floor(j-7.*x_);vec4 x=x_/7.-.5;vec4 y=y_/7.-.5;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 g0=vec3(a0.xy,h.x);vec3 g1=vec3(a0.zw,h.y);vec3 g2=vec3(a1.xy,h.z);vec3 g3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(g0,g0),dot(g1,g1),dot(g2,g2),dot(g3,g3)));g0*=norm.x;g1*=norm.y;g2*=norm.z;g3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(g0,x0),dot(g1,x1),dot(g2,x2),dot(g3,x3)));}
    float fbm(vec3 p){float v=0.;float a=.5;for(int i=0;i<5;i++){v+=a*snoise(p);p*=2.;a*=.5;}return v;}
    void main(){vec2 uv=vUv;float t=u_time*0.25;vec2 warp=vec2(snoise(vec3(uv*u_warpFreq,t*0.8)),snoise(vec3(uv*u_warpFreq+5.,t*0.8)))*u_warpStrength*0.01;uv+=warp;float n=fbm(vec3(uv*u_noiseScale,t));n=n*0.5+0.5;n=pow(n,1.5)*1.3;vec3 col=mix(u_color2,u_color1,n);float n2=fbm(vec3(uv*u_noiseScale*1.5+10.,t*1.2));n2=n2*0.5+0.5;col=mix(col,u_color3,n2*0.4);float grain=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453+t*100.)-.5)*u_grainAmount;col+=grain;col=clamp(col,0.,1.);fragColor=vec4(col,1.);}`;
    const compile=(src,type)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;};
    const prog=gl.createProgram();gl.attachShader(prog,compile(vs,gl.VERTEX_SHADER));gl.attachShader(prog,compile(fs,gl.FRAGMENT_SHADER));gl.linkProgram(prog);gl.useProgram(prog);
    const verts=new Float32Array([-1,-1,3,-1,-1,3]);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);
    const pos=gl.getAttribLocation(prog,'a_position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    const uTime=gl.getUniformLocation(prog,'u_time'),uRes=gl.getUniformLocation(prog,'u_resolution');
    const hex=(h)=>[parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255];
    gl.uniform3fv(gl.getUniformLocation(prog,'u_color1'),hex('#FF8C00'));
    gl.uniform3fv(gl.getUniformLocation(prog,'u_color2'),hex('#1a0a00'));
    gl.uniform3fv(gl.getUniformLocation(prog,'u_color3'),hex('#F97316'));
    gl.uniform1f(gl.getUniformLocation(prog,'u_noiseScale'),2.0);
    gl.uniform1f(gl.getUniformLocation(prog,'u_warpStrength'),1.6);
    gl.uniform1f(gl.getUniformLocation(prog,'u_warpFreq'),5.0);
    gl.uniform1f(gl.getUniformLocation(prog,'u_grainAmount'),0.08);
    let animId; const start=performance.now();
    const resize=()=>{canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight;gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2fv(uRes,[canvas.width,canvas.height]);};
    const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
    const render=()=>{gl.uniform1f(uTime,(performance.now()-start)/1000);gl.drawArrays(gl.TRIANGLES,0,3);animId=requestAnimationFrame(render);};
    render();
    return()=>{cancelAnimationFrame(animId);ro.disconnect();};
  },[]);
  return <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:0,opacity:0.85}} />;
}


function TutorialModal({ tutorialKey, onClose }) {
  const tutorial = TUTORIALS[tutorialKey];
  const [step, setStep] = useState(0);
  
  if (!tutorial) return null;
  
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[80] p-4">
      <div className="bg-gradient-to-b from-[#0a1828] to-[#030810] rounded-3xl max-w-lg w-full overflow-hidden border border-cyan-500/30 shadow-2xl">
        {/* Header Image */}
        <div className="relative h-44">
          <img src={IMAGES[tutorial.image]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1828] via-transparent to-transparent" />
          <button 
            type="button" 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-black">{tutorial.title}</h2>
            <p className="text-gray-300">{tutorial.subtitle}</p>
          </div>
        </div>
        
        <div className="p-6">
          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {tutorial.steps.map((_, i) => (
              <button 
                key={i} 
                type="button" 
                onClick={() => setStep(i)} 
                className={`h-2 rounded-full transition-all ${step === i ? 'w-8 bg-cyan-500' : 'w-2 bg-gray-600 hover:bg-gray-500'}`} 
              />
            ))}
          </div>
          
          {/* Step Content */}
          <div className="rounded-2xl p-5 mb-6 backdrop-blur-sm bg-black/30 min-h-[120px]">
            <div className="text-4xl mb-3">{tutorial.steps[step].icon}</div>
            <h3 className="font-bold text-lg mb-2">{tutorial.steps[step].title}</h3>
            <p className="text-gray-300">{tutorial.steps[step].desc}</p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-3 mb-6">
            <button 
              type="button" 
              onClick={() => setStep(s => Math.max(0, s - 1))} 
              disabled={step === 0} 
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${step === 0 ? 'bg-gray-700 opacity-50' : 'bg-black/30 hover:bg-white/[0.06]'}`}
            >
              ← Back
            </button>
            {step < tutorial.steps.length - 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(s => s + 1)} 
                className="flex-1 py-3 bg-gradient-to-r rounded-2xl font-black btn-3d btn-3d-purple"
              >
                Next →
              </button>
            ) : (
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 py-3 bg-gradient-to-r rounded-2xl font-black btn-3d btn-3d-green flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> Got it!
              </button>
            )}
          </div>
          
          {/* Prizes */}
          <div className="mb-4">
            <h4 className="text-sm font-bold text-yellow-400 mb-2">🏆 Possible Prizes</h4>
            <div className="flex flex-wrap gap-2">
              {tutorial.prizes.map((p, i) => (
                <span key={i} className="px-3 py-1 bg-yellow-500/20 rounded-lg text-sm text-yellow-200">{p}</span>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
            <h4 className="text-sm font-bold text-cyan-400 mb-2">💡 Pro Tips</h4>
            {tutorial.tips.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WHEEL GAME COMPONENT
// ============================================================================
function WheelGame({ onClose, onWin, playsLeft }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const spin = () => {
    if (spinning || playsLeft <= 0) return;
    setSpinning(true);
    setResult(null);
    
    const winIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const segment = WHEEL_SEGMENTS[winIndex];
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const targetAngle = (winIndex * segmentAngle) + (segmentAngle / 2);
    const spins = 6 + Math.floor(Math.random() * 3);
    
    setRotation(r => r + (spins * 360) + (360 - targetAngle) + 90);
    
    setTimeout(() => {
      setSpinning(false);
      setResult(segment);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4 anim-fade-in" onClick={onClose}>
      {showTutorial && <TutorialModal tutorialKey="wheel" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#0a1828] to-[#030810] rounded-3xl max-w-md w-full p-6 anim-scale-in" onClick={(e) => e.stopPropagation()} style={{ border: "2px solid rgba(6,182,212,0.25)", boxShadow: "0 0 40px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.5)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
          </button>
          <h2 className="text-3xl font-black tracking-tight">🎡 Wheel of Fortune</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Free Spins Badge */}
        <div className="text-center mb-4">
          <span className={`px-4 py-2 rounded-full font-bold ${playsLeft > 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {playsLeft > 0 ? `🎁 ${playsLeft} Free Spins` : '❌ No Free Spins'}
          </span>
        </div>
        
        {/* Wheel */}
        <div className="relative w-72 h-72 mx-auto mb-6">
          {/* Decorative Lights */}
          <div className="absolute inset-[-12px]">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${spinning ? 'animate-pulse' : ''}`}
                style={{
                  background: i % 2 === 0 ? '#fbbf24' : '#ec4899',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#fbbf24' : '#ec4899'}`,
                  left: `${50 + 46 * Math.cos((i * 22.5 - 90) * Math.PI / 180)}%`,
                  top: `${50 + 46 * Math.sin((i * 22.5 - 90) * Math.PI / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
            <div 
              className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400" 
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }} 
            />
          </div>
          
          {/* Spinning Wheel */}
          <div 
            className="absolute inset-3 rounded-full overflow-hidden shadow-2xl" 
            style={{ 
              transform: `rotate(${rotation}deg)`, 
              transition: spinning ? 'transform 5s cubic-bezier(0.15, 0.85, 0.2, 1)' : 'none' 
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {WHEEL_SEGMENTS.map((seg, i) => {
                const angle = 360 / WHEEL_SEGMENTS.length;
                const startAngle = i * angle - 90;
                const endAngle = startAngle + angle;
                const start = { 
                  x: 100 + 100 * Math.cos((startAngle * Math.PI) / 180), 
                  y: 100 + 100 * Math.sin((startAngle * Math.PI) / 180) 
                };
                const end = { 
                  x: 100 + 100 * Math.cos((endAngle * Math.PI) / 180), 
                  y: 100 + 100 * Math.sin((endAngle * Math.PI) / 180) 
                };
                const midAngle = startAngle + angle / 2;
                const iconX = 100 + 60 * Math.cos((midAngle * Math.PI) / 180);
                const iconY = 100 + 60 * Math.sin((midAngle * Math.PI) / 180);
                
                return (
                  <g key={seg.id}>
                    <path 
                      d={`M 100 100 L ${start.x} ${start.y} A 100 100 0 0 1 ${end.x} ${end.y} Z`} 
                      fill={seg.color} 
                      stroke="rgba(0,0,0,0.4)" 
                      strokeWidth="2" 
                    />
                    <text 
                      x={iconX} 
                      y={iconY} 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      fontSize="24" 
                      transform={`rotate(${midAngle + 90}, ${iconX}, ${iconY})`}
                    >
                      {seg.icon}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="25" fill="#030810" stroke="#fbbf24" strokeWidth="4" />
            </svg>
          </div>
          
          {/* Spin Button */}
          <button 
            type="button" 
            onClick={spin} 
            disabled={spinning || playsLeft <= 0} 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full font-black text-lg z-10 transition-all ${spinning || playsLeft <= 0 ? 'bg-gray-600' : 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95'}`}
          >
            {spinning ? <RotateCcw className="w-7 h-7 mx-auto animate-spin" /> : 'SPIN'}
          </button>
        </div>
        
        {/* Result */}
        {result && (
          <div className="text-center p-5 rounded-2xl anim-result-zoom" style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.05) 100%)", border: "2px solid rgba(34,197,94,0.4)", boxShadow: "0 0 30px rgba(34,197,94,0.15)" }}>
            <div className="text-6xl mb-3">{result.icon}</div>
            <div className="text-2xl font-black text-yellow-400 mb-4">{result.label}</div>
            <button 
              type="button" 
              onClick={() => { onWin(result.prize, result.label); setResult(null); }} 
              className="px-8 py-3 rounded-2xl font-black btn-3d btn-3d-green text-lg"
            >
              🎉 Claim Prize!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SCRATCH GAME COMPONENT — Lottery-style 3-zone with gold foil
// ============================================================================
function ScratchGame({ onClose, onWin }) {
  const canvas0 = useRef(null);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);
  const canvasRefs = [canvas0, canvas1, canvas2];
  const [scratching, setScratching] = useState(-1);
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [confettiParts, setConfettiParts] = useState([]);
  const [prizeAnim, setPrizeAnim] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const percents = useRef([0, 0, 0]);

  // Symbol pool and prize generation
  const SYMBOLS = [
    { icon: '💎', name: 'Diamond', color: '#60A5FA' },
    { icon: '🪙', name: 'Gold', color: '#FBBF24' },
    { icon: '💰', name: 'Cash', color: '#34D399' },
    { icon: '🔥', name: 'Fire', color: '#F87171' },
    { icon: '⭐', name: 'Star', color: '#A78BFA' },
    { icon: '🍀', name: 'Lucky', color: '#4ADE80' },
  ];

  const [symbols] = useState(() => {
    const roll = Math.random();
    if (roll < 0.20) {
      const s = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      return [s, s, s];
    } else if (roll < 0.55) {
      const s = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      let other;
      do { other = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; } while (other.icon === s.icon);
      const arr = [s, s, other];
      const pos = Math.floor(Math.random() * 3);
      [arr[pos], arr[2]] = [arr[2], arr[pos]];
      return arr;
    } else {
      const picked = [];
      while (picked.length < 3) {
        const s = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        if (picked.length < 2 || !picked.every(p => p.icon === s.icon)) picked.push(s);
        else picked.push(SYMBOLS[(SYMBOLS.indexOf(s) + 1) % SYMBOLS.length]);
      }
      return picked;
    }
  });

  const matchCount = symbols[0].icon === symbols[1].icon && symbols[1].icon === symbols[2].icon ? 3
    : (symbols[0].icon === symbols[1].icon || symbols[1].icon === symbols[2].icon || symbols[0].icon === symbols[2].icon) ? 2 : 0;

  const prize = matchCount === 3 ? [200, 300, 500][Math.floor(Math.random() * 3)]
    : matchCount === 2 ? [50, 75, 100][Math.floor(Math.random() * 3)]
    : [10, 15, 25][Math.floor(Math.random() * 3)];

  // Draw gold foil on each canvas
  useEffect(() => {
    canvasRefs.forEach((ref) => {
      const c = ref.current;
      if (!c) return;
      const ctx = c.getContext('2d');
      const w = c.width, h = c.height;
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#D4A017');
      g.addColorStop(0.2, '#F5D060');
      g.addColorStop(0.4, '#C8960C');
      g.addColorStop(0.6, '#F5D060');
      g.addColorStop(0.8, '#D4A017');
      g.addColorStop(1, '#E8C840');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 800; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
      ctx.fillStyle = 'rgba(180,140,20,0.7)';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH', w / 2, h / 2);
    });
  }, []);

  const doScratch = (e, idx) => {
    if (scratching !== idx || revealed[idx]) return;
    const c = canvasRefs[idx].current;
    const ctx = c.getContext('2d');
    const rect = c.getBoundingClientRect();
    const cx = (e.clientX || e.touches?.[0]?.clientX);
    const cy = (e.clientY || e.touches?.[0]?.clientY);
    if (!cx || !cy) return;
    const x = (cx - rect.left) * (c.width / rect.width);
    const y = (cy - rect.top) * (c.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    if (lastPos.current.x) {
      ctx.lineWidth = 40; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(x, y); ctx.stroke();
    }
    lastPos.current = { x, y };

    const imageData = ctx.getImageData(0, 0, c.width, c.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) { if (imageData.data[i] === 0) transparent++; }
    const pct = (transparent / (c.width * c.height)) * 100;
    percents.current[idx] = pct;

    if (pct > 45 && !revealed[idx]) {
      ctx.clearRect(0, 0, c.width, c.height);
      const newRevealed = [...revealed];
      newRevealed[idx] = true;
      setRevealed(newRevealed);

      if (newRevealed.every(r => r)) {
        setAllRevealed(true);
        setPrizeAnim(true);
        const parts = [];
        for (let i = 0; i < 60; i++) {
          parts.push({
            id: i, x: 50 + (Math.random() - 0.5) * 20, y: 40,
            color: ['#FBBF24', '#F87171', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'][i % 6],
            size: 4 + Math.random() * 6, rotation: Math.random() * 360,
          });
        }
        setConfettiParts(parts);
        onWin(prize);
      }
    }
  };

  const startScratch = (idx) => { setScratching(idx); lastPos.current = { x: 0, y: 0 }; };
  const stopScratch = () => setScratching(-1);

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4 anim-fade-in" onClick={onClose}>
      <div className="max-w-lg w-full anim-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Card body */}
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #1a1000 0%, #0d0800 100%)', border: '3px solid #D4A017', boxShadow: '0 0 40px rgba(212,160,23,0.2), 0 20px 60px rgba(0,0,0,0.5)' }}>
          
          {/* Header */}
          <div className="relative px-6 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div />
              <div className="text-center">
                <div className="text-xs font-bold tracking-[0.3em] text-yellow-600 mb-1">✦ PREMIUM ✦</div>
                <h2 className="text-2xl font-black text-yellow-400" style={{ textShadow: '0 2px 8px rgba(251,191,36,0.3)' }}>SCRATCH & WIN</h2>
              </div>
              <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-center text-yellow-700 text-sm mt-2 font-medium">Match 3 symbols for the jackpot!</p>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
          </div>

          {/* Prize tiers */}
          <div className="flex justify-center gap-4 px-6 pb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 text-xs font-bold">3×</span>
              <span className="text-yellow-300 text-xs font-black">JACKPOT</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="text-gray-400 text-xs font-bold">2×</span>
              <span className="text-gray-300 text-xs font-black">WIN</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="text-gray-500 text-xs font-bold">0×</span>
              <span className="text-gray-400 text-xs font-black">BONUS</span>
            </div>
          </div>

          {/* 3 Scratch Zones */}
          <div className="flex gap-4 px-6 pb-2 justify-center">
            {[0, 1, 2].map(idx => (
              <div key={idx} className="relative" style={{ width: 130, height: 150 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                  border: revealed[idx] ? `3px solid ${symbols[idx].color}` : '3px solid rgba(212,160,23,0.4)',
                  boxShadow: revealed[idx] ? `0 0 20px ${symbols[idx].color}40, inset 0 0 20px ${symbols[idx].color}15` : '0 0 10px rgba(212,160,23,0.1)',
                  transition: 'all 0.5s ease',
                }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: revealed[idx] ? `radial-gradient(circle, ${symbols[idx].color}15 0%, rgba(5,10,20,0.95) 70%)` : 'rgba(5,10,20,0.95)' }}>
                    <div className={`text-5xl transition-all duration-500 ${revealed[idx] ? 'scale-100 opacity-100' : 'scale-50 opacity-30'}`} style={{ filter: revealed[idx] ? `drop-shadow(0 0 12px ${symbols[idx].color}80)` : 'none' }}>
                      {symbols[idx].icon}
                    </div>
                    <div className={`text-xs font-black mt-2 tracking-wider transition-opacity duration-500 ${revealed[idx] ? 'opacity-100' : 'opacity-0'}`} style={{ color: symbols[idx].color }}>
                      {symbols[idx].name.toUpperCase()}
                    </div>
                  </div>
                  {!revealed[idx] && (
                    <canvas
                      ref={canvasRefs[idx]}
                      width={130} height={150}
                      className="absolute inset-0 cursor-crosshair touch-none rounded-2xl"
                      style={{ width: '100%', height: '100%' }}
                      onMouseDown={() => startScratch(idx)} onMouseUp={stopScratch} onMouseLeave={stopScratch}
                      onMouseMove={(e) => doScratch(e, idx)}
                      onTouchStart={() => startScratch(idx)} onTouchEnd={stopScratch}
                      onTouchMove={(e) => doScratch(e, idx)}
                    />
                  )}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-yellow-600/80 flex items-center justify-center text-xs font-black text-black">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              {[0, 1, 2].map(idx => (
                <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${revealed[idx] ? 'bg-green-400 shadow-lg shadow-green-400/50 scale-125' : 'bg-gray-700'}`} />
              ))}
              <span className="text-xs text-gray-500 ml-2">{revealed.filter(r => r).length}/3 revealed</span>
            </div>

            {allRevealed && (
              <div className={`text-center py-4 rounded-2xl mb-4 transition-all duration-500 ${prizeAnim ? 'anim-scale-in' : ''}`} style={{
                background: matchCount === 3 ? 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.05) 100%)' : matchCount === 2 ? 'linear-gradient(135deg, rgba(96,165,250,0.1) 0%, rgba(59,130,246,0.05) 100%)' : 'rgba(255,255,255,0.03)',
                border: matchCount === 3 ? '2px solid rgba(251,191,36,0.4)' : matchCount === 2 ? '2px solid rgba(96,165,250,0.3)' : '2px solid rgba(255,255,255,0.1)',
              }}>
                <div className="text-4xl mb-2">{matchCount === 3 ? '🎰' : matchCount === 2 ? '🎉' : '🪙'}</div>
                <div className={`text-sm font-bold mb-1 ${matchCount === 3 ? 'text-yellow-400' : matchCount === 2 ? 'text-blue-400' : 'text-gray-400'}`}>
                  {matchCount === 3 ? '🔥 JACKPOT! 3 MATCHES! 🔥' : matchCount === 2 ? '✨ 2 MATCHES!' : 'Bonus Prize'}
                </div>
                <div className={`text-5xl font-black ${matchCount === 3 ? 'text-yellow-400' : matchCount === 2 ? 'text-blue-400' : 'text-gray-300'}`} style={{ textShadow: matchCount === 3 ? '0 0 30px rgba(251,191,36,0.5)' : 'none' }}>
                  {prize}
                </div>
                <div className={`text-sm font-bold ${matchCount === 3 ? 'text-yellow-500' : matchCount === 2 ? 'text-blue-300' : 'text-gray-500'}`}>
                  KWACHA
                </div>
              </div>
            )}

            {allRevealed ? (
              <button type="button" onClick={onClose}
                className="w-full py-4 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: matchCount === 3 ? 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)' : 'linear-gradient(180deg, #22D3EE 0%, #0891B2 100%)',
                  color: '#000',
                  boxShadow: matchCount === 3 ? '0 4px 0 #92400E, 0 0 30px rgba(251,191,36,0.3)' : '0 4px 0 #164E63, 0 0 20px rgba(6,182,212,0.2)',
                }}
              >
                🎁 Collect {prize} Coins!
              </button>
            ) : (
              <p className="text-center text-gray-500 text-sm">Scratch each zone to reveal your symbols</p>
            )}
          </div>

          {/* Confetti */}
          {confettiParts.length > 0 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {confettiParts.map(p => (
                <div key={p.id} className="absolute rounded-sm"
                  style={{
                    left: `${p.x}%`, top: `${p.y}%`,
                    width: p.size, height: p.size * 0.6,
                    background: p.color,
                    transform: `rotate(${p.rotation}deg)`,
                    animation: `confettiFall ${1.5 + Math.random()}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.3}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DICE GAME COMPONENT
// ============================================================================
function DiceGame({ onClose, onWin }) {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const roll = () => {
    if (rolling || guess === null) return;
    setRolling(true);
    setResult(null);
    
    let frame = 0;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      frame++;
      
      if (frame >= 20) {
        clearInterval(interval);
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        setDice1(d1);
        setDice2(d2);
        
        const total = d1 + d2;
        const won = total === guess;
        const close = Math.abs(total - guess) <= 2 && !won;
        const prize = won ? 500 : close ? 100 : 0;
        
        setResult({ total, won, close, prize });
        setRolling(false);
        if (prize > 0) onWin(prize);
      }
    }, 60);
  };

  const DiceFace = ({ value, color = 'red' }) => {
    const dots = {
      1: [[50,50]],
      2: [[25,25],[75,75]],
      3: [[25,25],[50,50],[75,75]],
      4: [[25,25],[75,25],[25,75],[75,75]],
      5: [[25,25],[75,25],[50,50],[25,75],[75,75]],
      6: [[25,25],[75,25],[25,50],[75,50],[25,75],[75,75]]
    };
    
    return (
      <div 
        className={`w-24 h-24 rounded-2xl shadow-2xl ${rolling ? 'anim-slide-down' : ''}`} 
        style={{ background: color === 'red' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {dots[value]?.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="12" fill="white" className="drop-shadow-md" />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4 anim-fade-in" onClick={onClose}>
      {showTutorial && <TutorialModal tutorialKey="dice" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#0a1828] to-[#030810] rounded-3xl max-w-md w-full p-6 anim-scale-in" onClick={(e) => e.stopPropagation()} style={{ border: "2px solid rgba(6,182,212,0.25)", boxShadow: "0 0 40px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
          </button>
          <h2 className="text-3xl font-black tracking-tight">🎲 Lucky Dice</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-center text-gray-400 mb-6">Guess the total (2-12) and win big!</p>
        
        <div className="flex justify-center gap-8 mb-8 py-4">
          <DiceFace value={dice1} color="red" />
          <DiceFace value={dice2} color="blue" />
        </div>
        
        {!result && (
          <>
            <p className="text-center text-sm text-gray-400 mb-3">Select your guess:</p>
            <div className="grid grid-cols-6 gap-2 mb-6">
              {[2,3,4,5,6,7,8,9,10,11,12].map(n => (
                <button 
                  key={n} 
                  type="button" 
                  onClick={() => setGuess(n)} 
                  disabled={rolling} 
                  className={`py-3 rounded-xl font-bold text-lg transition-all ${guess === n ? 'bg-gradient-to-br from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-cyan-500/50' : 'bg-black/30 hover:bg-white/[0.06] hover:scale-105'}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button 
              type="button" 
              onClick={roll} 
              disabled={rolling || guess === null} 
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${rolling || guess === null ? 'bg-gray-600' : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg shadow-red-500/30'}`}
            >
              {rolling ? '🎲 Rolling...' : '🎲 Roll Dice!'}
            </button>
          </>
        )}
        
        {result && (
          <div className="text-center">
            <div className="text-6xl mb-4">{result.won ? '🎯' : result.close ? '👍' : '😢'}</div>
            <p className="text-xl mb-2">
              Total: <span className="text-4xl text-yellow-400 font-black">{result.total}</span>
            </p>
            <p className={`text-3xl font-black tracking-tight mb-6 ${result.won ? 'text-green-400' : result.close ? 'text-yellow-400' : 'text-gray-400'}`}>
              {result.won ? `🎉 EXACT! +${result.prize} Coins!` : result.close ? `Close! +${result.prize} Coins` : 'Better luck next time!'}
            </p>
            <button 
              type="button" 
              onClick={() => { setResult(null); setGuess(null); }} 
              className="px-8 py-3 bg-gradient-to-r rounded-2xl font-black btn-3d btn-3d-purple text-lg"
            >
              Play Again 🎲
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MEMORY GAME COMPONENT
// ============================================================================
function MemoryGame({ onClose, onWin }) {
  const symbols = ['🎁', '💎', '⭐', '🏆', '👑', '🎰', '🍀', '💰'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setCards([...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((s, i) => ({ id: i, symbol: s })));
  }, []);

  const flip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      
      if (cards[a].symbol === cards[b].symbol) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        
        if (newMatched.length === cards.length) {
          const prize = Math.max(300 - moves * 10, 50);
          setTimeout(() => onWin(prize), 300);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const complete = matched.length === cards.length;
  const prize = Math.max(300 - moves * 10, 50);

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4 anim-fade-in" onClick={onClose}>
      {showTutorial && <TutorialModal tutorialKey="memory" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#0a1828] to-[#030810] rounded-3xl max-w-md w-full p-6 anim-scale-in" onClick={(e) => e.stopPropagation()} style={{ border: "2px solid rgba(6,182,212,0.25)", boxShadow: "0 0 40px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
          </button>
          <h2 className="text-3xl font-black tracking-tight">🧠 Memory Match</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-6 mb-4">
          <div className="text-center px-4 py-2 bg-black/30 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-yellow-400">{moves}</div>
            <div className="text-xs text-gray-400">Moves</div>
          </div>
          <div className="text-center px-4 py-2 bg-black/30 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-green-400">{matched.length/2}/{symbols.length}</div>
            <div className="text-xs text-gray-400">Pairs</div>
          </div>
          <div className="text-center px-4 py-2 bg-black/30 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-cyan-400">{prize}</div>
            <div className="text-xs text-gray-400">Prize</div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          {cards.map(card => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
            const isMatched = matched.includes(card.id);
            
            return (
              <button 
                key={card.id} 
                type="button" 
                onClick={() => flip(card.id)} 
                disabled={isFlipped} 
                className={`aspect-square rounded-xl text-3xl flex items-center justify-center font-bold transition-all ${isFlipped ? (isMatched ? 'bg-green-500/30 border-2 border-green-400' : 'bg-gradient-to-br from-yellow-400 to-orange-500') : 'bg-gradient-to-br from-cyan-500 to-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50'}`}
              >
                {isFlipped ? card.symbol : '?'}
              </button>
            );
          })}
        </div>
        
        {complete && (
          <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/50">
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-3xl font-black tracking-tight text-green-400 mb-1">Complete!</div>
            <p className="text-gray-300">Finished in {moves} moves</p>
            <p className="text-yellow-400 font-bold text-xl">+{prize} Coins</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// HIGHER OR LOWER GAME COMPONENT
// ============================================================================
function HighLowGame({ onClose, onWin }) {
  const [current, setCurrent] = useState({ v: Math.floor(Math.random() * 13) + 1, s: '♠' });
  const [next, setNext] = useState(null);
  const [revealing, setRevealing] = useState(false);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const suits = ['♠', '♥', '♦', '♣'];
  const display = (v) => v === 1 ? 'A' : v === 11 ? 'J' : v === 12 ? 'Q' : v === 13 ? 'K' : v;
  const isRed = (s) => s === '♥' || s === '♦';

  const guess = (higher) => {
    if (revealing) return;
    setRevealing(true);
    
    const newV = Math.floor(Math.random() * 13) + 1;
    const newS = suits[Math.floor(Math.random() * 4)];
    
    setTimeout(() => {
      setNext({ v: newV, s: newS });
      
      setTimeout(() => {
        const correct = higher ? newV >= current.v : newV <= current.v;
        
        if (correct) {
          setStreak(s => s + 1);
          setCurrent({ v: newV, s: newS });
          setNext(null);
          setRevealing(false);
        } else {
          setGameOver(true);
          if (streak > 0) onWin(streak * 25);
        }
      }, 600);
    }, 300);
  };

  const Card = ({ value, suit, faceDown }) => (
    <div className={`w-24 h-36 rounded-xl flex items-center justify-center shadow-2xl ${faceDown ? 'bg-gradient-to-br from-blue-800 to-blue-950' : `bg-white ${isRed(suit) ? 'text-red-600' : 'text-gray-900'}`}`}>
      {faceDown ? (
        <span className="text-4xl">🎴</span>
      ) : (
        <div className="text-center">
          <div className="text-3xl font-black tracking-tight">{display(value)}</div>
          <div className="text-4xl">{suit}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4 anim-fade-in" onClick={onClose}>
      {showTutorial && <TutorialModal tutorialKey="highlow" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#0a1828] to-[#030810] rounded-3xl max-w-md w-full p-6 anim-scale-in" onClick={(e) => e.stopPropagation()} style={{ border: "2px solid rgba(6,182,212,0.25)", boxShadow: "0 0 40px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
          </button>
          <h2 className="text-3xl font-black tracking-tight">🃏 Higher or Lower</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
            <span className="text-yellow-400 font-bold">Streak: {streak}</span>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
            <span className="text-green-400 font-bold">{streak * 25} Coins</span>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">Current</p>
            <Card value={current.v} suit={current.s} />
          </div>
          <div className="text-3xl text-gray-500">→</div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">Next</p>
            {next ? <Card value={next.v} suit={next.s} /> : <Card faceDown />}
          </div>
        </div>
        
        {!gameOver && !revealing && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button 
                type="button" 
                onClick={() => guess(false)} 
                className="py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <ChevronDown className="w-6 h-6" /> LOWER
              </button>
              <button 
                type="button" 
                onClick={() => guess(true)} 
                className="py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
              >
                HIGHER <ChevronUp className="w-6 h-6" />
              </button>
            </div>
            {streak > 0 && (
              <button 
                type="button" 
                onClick={() => { onWin(streak * 25); onClose(); }} 
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold shadow-lg shadow-green-500/30"
              >
                💰 Cash Out ({streak * 25} Coins)
              </button>
            )}
          </>
        )}
        
        {revealing && !gameOver && (
          <p className="text-center text-xl text-cyan-400 animate-pulse">Revealing...</p>
        )}
        
        {gameOver && (
          <div className="text-center p-4 bg-red-500/20 rounded-xl border border-red-500/50">
            <div className="text-5xl mb-2">💔</div>
            <div className="text-3xl font-black tracking-tight text-red-400 mb-2">Game Over!</div>
            <p className="text-gray-300 mb-4">
              {streak > 0 ? `You won ${streak * 25} Coins!` : 'Better luck next time!'}
            </p>
            <button 
              type="button" 
              onClick={() => {
                setGameOver(false);
                setStreak(0);
                setNext(null);
                setRevealing(false);
                setCurrent({ v: Math.floor(Math.random() * 13) + 1, s: '♠' });
              }} 
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold"
            >
              Play Again 🃏
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// KA TOUCH ENDLESS RUNNER GAME
// ============================================================================

// ============================================================================
// "KA TOUCH" — Endless Runner
// NPC (sprite) drops from sky, tags coin character, stays ahead taunting.
// Obstacles: slot machine items, bobbing/crashing planes, dog at 1000pts.
// 35 coins per 60 seconds. Score counts up smoothly.
// ============================================================================

function KaTouchGame({ onClose, onWin }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animRef = useRef(null);
  const npcImgRef = useRef(null);
  const logoImgRef = useRef(null);
  const bgImgsRef = useRef({});
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const W = 1600, H = 600;
  const GROUND_Y = H - 100;

  // Load NPC sprite, logo, and background images
  useEffect(() => {
    const img = new Image();
    img.onload = () => { npcImgRef.current = img; setImgLoaded(true); };
    img.onerror = () => setImgLoaded(true);
    img.src = `${IMG_BASE}/npc-tagger.png`;
    const logo = new Image();
    logo.crossOrigin = 'anonymous'; logo.onload = () => { logoImgRef.current = logo; };
    logo.src = `${IMG_BASE}/ka-touch-logo.png`;
    // Biome background images
    ['city', 'village', 'university', 'jungle', 'stadium'].forEach(key => {
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.onload = () => { bgImgsRef.current[key] = bgImg; };
      bgImg.onerror = () => { console.log('BG load failed:', key); };
      bgImg.src = `${IMG_BASE}/bg-${key}.png`;
    });
  }, []);

  // Slot machine items using existing project images
  const SLOT_ITEMS = [
    { id: 'diamond', img: `${IMG_BASE}/diamond.png`, name: 'Diamond', color: '#60a5fa' },
    { id: 'coin', img: `${IMG_BASE}/coin.png`, name: 'Coin', color: '#fbbf24' },
    { id: 'gem', img: `${IMG_BASE}/gem.png`, name: 'Gem', color: '#a855f7' },
    { id: 'fire', img: `${IMG_BASE}/wheel/fire.png`, name: 'Fire', color: '#ef4444' },
    { id: 'star', img: `${IMG_BASE}/wheel/star.png`, name: 'Star', color: '#fcd34d' },
    { id: 'clover', img: `${IMG_BASE}/wheel/lucky-clover.png`, name: 'Clover', color: '#22c55e' },
    { id: 'crown', img: `${IMG_BASE}/wheel/crown.png`, name: 'Crown', color: '#f59e0b' },
    { id: 'lightning', img: `${IMG_BASE}/wheel/lightning.png`, name: 'Lightning', color: '#38bdf8' },
  ];
  const slotImgsRef = useRef({});

  // Preload slot item images
  useEffect(() => {
    SLOT_ITEMS.forEach(item => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { slotImgsRef.current[item.id] = img; };
      img.src = item.img;
    });
  }, []);

  const initGame = useCallback(() => {
    return {
      player: { x: 500, y: GROUND_Y, w: 72, h: 72, vy: 0, jumping: false, ducking: false, frame: 0, hitFlash: 0 },
      npc: { x: -100, y: GROUND_Y, w: 80, h: 88, vy: 0, jumping: false, targetX: 740, frame: 0, tauntTimer: 0, lookBack: false, phase: 'approaching', tagTimer: 0, landBounce: 0, flipFrame: 0, teaseTimer: 0, teaseMode: false },
      speed: 5, distance: 0, score: 0, scoreAccum: 0, coins: 0, alive: true, groundOffset: 0,
      // 35 coins per 60 sec = 1 every ~1.714s = ~103 frames
      coinTimer: 0, coinInterval: 103,
      obstacles: [], obstacleTimer: 0, obstacleInterval: 100, waveQueue: [],
      dogs: [], dogSpawned: false, dogWarning: 0,
      collectCoins: [], particles: [], dustParticles: [],
      tagText: null,
      timeOfDay: 0, skyTransition: 0,
      stars: Array.from({length: 30}, () => ({ x: Math.random() * W, y: Math.random() * (GROUND_Y - 40), size: 1 + Math.random() * 2, twinkle: Math.random() * Math.PI * 2 })),
      clouds: [{ x: 200, y: 40, w: 60, speed: 0.3 }, { x: 500, y: 70, w: 45, speed: 0.2 }, { x: 350, y: 30, w: 55, speed: 0.25 }],
    };
  }, []);

  const startGame = useCallback(() => {
    gameRef.current = initGame();
    setScore(0); setCoins(0);
    setGameState('intro');
  }, [initGame]);

  // Input
  useEffect(() => {
    const kd = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'menu' || gameState === 'dead') startGame();
        else if (gameState === 'playing' && gameRef.current) { const p = gameRef.current.player; if (!p.jumping) { p.vy = -23; p.jumping = true; } }
      }
      if (e.code === 'ArrowDown' && gameState === 'playing' && gameRef.current) gameRef.current.player.ducking = true;
    };
    const ku = (e) => { if (e.code === 'ArrowDown' && gameRef.current) gameRef.current.player.ducking = false; };
    window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, [gameState, startGame]);

  const handleTap = useCallback(() => {
    if (gameState === 'menu' || gameState === 'dead') startGame();
    else if (gameState === 'playing' && gameRef.current) { const p = gameRef.current.player; if (!p.jumping) { p.vy = -23; p.jumping = true; } }
  }, [gameState, startGame]);

  // ========== DRAW: COIN CHARACTER ==========
  const drawCoinChar = (ctx, x, y, w, h, frame, ducking, hitFlash) => {
    ctx.save();
    const bob = Math.sin(frame * 0.6) * 2.5;
    const legPhase = frame * 0.6;
    const py = y - h + bob;
    if (hitFlash > 0) ctx.globalAlpha = Math.sin(hitFlash * 10) > 0 ? 1 : 0.3;
    const cx = x + w / 2, cy = py + (ducking ? h * 0.4 : h * 0.3);
    const r = ducking ? w * 0.35 : w * 0.45;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(x + w / 2, y, w * 0.45, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Legs with arms
    if (!ducking) {
      const ll = 13, l1 = Math.sin(legPhase) * 9, l2 = Math.sin(legPhase + Math.PI) * 9;
      // Arms
      const a1 = Math.sin(legPhase + Math.PI) * 6, a2 = Math.sin(legPhase) * 6;
      ctx.strokeStyle = '#DAA520'; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - r + 2, cy + 2); ctx.lineTo(cx - r - 10, cy - 4 + a1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + r - 2, cy + 2); ctx.lineTo(cx + r + 10, cy - 4 + a2); ctx.stroke();
      // Hands
      ctx.fillStyle = '#B8860B';
      ctx.beginPath(); ctx.arc(cx - r - 10, cy - 4 + a1, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + r + 10, cy - 4 + a2, 3, 0, Math.PI * 2); ctx.fill();
      // Legs
      ctx.strokeStyle = '#B8860B'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx - 6, cy + r - 2); ctx.lineTo(cx - 6 + l1, cy + r + ll); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 6, cy + r - 2); ctx.lineTo(cx + 6 + l2, cy + r + ll); ctx.stroke();
      // Shoes
      ctx.fillStyle = '#8B4513';
      ctx.beginPath(); ctx.ellipse(cx - 6 + l1, cy + r + ll + 1, 5, 3, l1 * 0.03, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 6 + l2, cy + r + ll + 1, 5, 3, l2 * 0.03, 0, Math.PI * 2); ctx.fill();
    }

    // Body
    const cg = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, r);
    cg.addColorStop(0, '#FFE066'); cg.addColorStop(0.5, '#FFD700'); cg.addColorStop(0.8, '#DAA520'); cg.addColorStop(1, '#B8860B');
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();
    ctx.strokeStyle = '#B8860B'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(184,134,11,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();

    // $ with slight bounce
    const symbolScale = 1 + Math.sin(frame * 0.2) * 0.05;
    ctx.fillStyle = '#B8860B'; ctx.font = `bold ${Math.floor(r * 1.1 * symbolScale)}px Arial`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', cx, cy + 1);

    // Shine
    ctx.beginPath(); ctx.arc(cx - r * 0.25, cy - r * 0.3, r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill();

    // Eyes - animated blink
    const eyeY = cy - r * 0.15;
    const blink = Math.sin(frame * 0.08) > 0.97;
    const eyeH = blink ? 1 : 3.5;
    ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(cx - 5, eyeY, 3, eyeH, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(cx + 5, eyeY, 3, eyeH, 0, 0, Math.PI * 2); ctx.fill();
    if (!blink) {
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx - 4, eyeY - 1.5, 1.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx + 6, eyeY - 1.5, 1.2, 0, Math.PI * 2); ctx.fill();
    }
    // Smile when running
    ctx.strokeStyle = '#8B6914'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(cx, cy + r * 0.2, r * 0.2, 0.2, Math.PI - 0.2); ctx.stroke();

    ctx.restore();
  };

  // ========== DRAW: NPC (sprite or fallback) ==========
  const drawNPC = (ctx, npc, frame) => {
    const img = npcImgRef.current;
    const drawW = npc.w, drawH = npc.h;
    const bob = ['running', 'approaching', 'sprinting'].includes(npc.phase) ? Math.sin(frame * 0.7) * 2 : 0;
    const drawY = npc.y - drawH + bob + npc.landBounce;

    // Shadow
    if (npc.y >= GROUND_Y - 5) {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath(); ctx.ellipse(npc.x + drawW / 2, GROUND_Y, drawW * 0.4, 4, 0, 0, Math.PI * 2); ctx.fill();
    }

    if (img) {
      ctx.save();
      const isRunning = ['running', 'approaching', 'sprinting'].includes(npc.phase);
      // Flip when looking back during running, or when approaching from behind (face right)
      if (npc.lookBack && npc.phase === 'running') {
        ctx.translate(npc.x + drawW / 2, 0);
        ctx.scale(-1, 1);
        ctx.translate(-(npc.x + drawW / 2), 0);
      }
      // Running squash/stretch
      const squash = isRunning ? 1 + Math.sin(frame * 0.7) * 0.04 : 1;
      const stretch = isRunning ? 1 - Math.sin(frame * 0.7) * 0.03 : 1;
      ctx.translate(npc.x + drawW / 2, drawY + drawH / 2);
      ctx.scale(squash, stretch);
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    } else {
      // Fallback drawn NPC
      ctx.save();
      const cx = npc.x + drawW / 2, cy = drawY + drawH * 0.35, radius = drawW * 0.4;
      const bodyGrad = ctx.createRadialGradient(cx - 2, cy - 3, 2, cx, cy, radius);
      bodyGrad.addColorStop(0, '#FF6B35'); bodyGrad.addColorStop(0.5, '#FF4500'); bodyGrad.addColorStop(1, '#AA2800');
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fillStyle = bodyGrad; ctx.fill();
      ctx.strokeStyle = '#AA2800'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#5a3a2a'; ctx.beginPath(); ctx.arc(cx, cy - radius * 0.6, radius * 0.7, Math.PI * 1.1, Math.PI * 1.9); ctx.fill();
      const eyeY = cy - radius * 0.1;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(cx - 4, eyeY, 3.5, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(cx - 4, eyeY, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(cx + 4, eyeY, 3.5, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(cx + 4, eyeY, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // Taunt speech bubble when looking back
    if (npc.lookBack && npc.phase === 'running') {
      const bx = npc.x - 18, by = drawY - 20;
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(bx, by, 32, 16, -0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1.5; ctx.stroke();
      // Bubble tail
      ctx.beginPath(); ctx.moveTo(bx + 18, by + 12); ctx.lineTo(bx + 28, by + 22); ctx.lineTo(bx + 22, by + 11); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = '32px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const taunts = ['😜', '👋', '💨', '🏃'];
      ctx.fillText(taunts[Math.floor(frame / 60) % taunts.length], bx, by);
      ctx.restore();
    }
  };

  // ========== DRAW: SLOT ITEM (replaces football) ==========
  const drawSlotItem = (ctx, x, y, size, item, frame) => {
    const bob = Math.sin(frame * 0.06 + x * 0.005) * 5;
    const spin = Math.sin(frame * 0.04) * 0.08;
    const cx = x + size / 2, cy = y - size / 2 + bob;

    // Ground shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath(); ctx.ellipse(cx, y + 4, size * 0.35, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Soft glow behind icon
    ctx.save();
    const glow = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.6);
    glow.addColorStop(0, item.color + '30');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(cx, cy, size * 0.6, 0, Math.PI * 2); ctx.fill();

    // Draw icon image directly (no dark box)
    ctx.translate(cx, cy);
    ctx.rotate(spin);
    const iconImg = slotImgsRef.current[item.id];
    if (iconImg) {
      const iSize = size * 0.85;
      ctx.drawImage(iconImg, -iSize / 2, -iSize / 2, iSize, iSize);
    } else {
      ctx.font = `bold ${Math.floor(size * 0.5)}px Arial`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = item.color;
      ctx.fillText(item.name[0], 0, 2);
    }
    ctx.restore();
  };

  // ========== DRAW: AEROPLANE ==========
  const drawPlane = (ctx, x, y, w, frame, crashing, bobOffset) => {
    ctx.save();
    const hover = crashing ? 0 : bobOffset;
    const py = y + hover;
    const h = w * 0.22; // proportional height
    const tilt = crashing ? Math.min((crashing / 60) * 0.5, 0.5) : 0;
    ctx.translate(x + w / 2, py); ctx.scale(-1, 1); ctx.rotate(tilt); ctx.translate(-(x + w / 2), -py);

    // Fuselage - proportional ellipse
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath(); ctx.ellipse(x + w * 0.45, py, w * 0.45, h * 0.45, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.strokeStyle = '#bbb'; ctx.lineWidth = 1.5; ctx.stroke();
    // Nose cone
    ctx.fillStyle = '#d0d0d0';
    ctx.beginPath(); ctx.ellipse(x + w * 0.88, py, w * 0.08, h * 0.3, 0, 0, Math.PI * 2); ctx.fill();
    // Tail fin
    ctx.fillStyle = '#ff4444';
    ctx.beginPath(); ctx.moveTo(x + w * 0.05, py); ctx.lineTo(x - w * 0.04, py - h * 0.9); ctx.lineTo(x + w * 0.12, py); ctx.closePath(); ctx.fill();
    // Wings
    ctx.fillStyle = '#ccc';
    ctx.beginPath(); ctx.moveTo(x + w * 0.4, py - h * 0.15); ctx.lineTo(x + w * 0.28, py - h * 1.2); ctx.lineTo(x + w * 0.58, py - h * 0.15); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#aaa'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + w * 0.4, py + h * 0.15); ctx.lineTo(x + w * 0.28, py + h * 1.2); ctx.lineTo(x + w * 0.58, py + h * 0.15); ctx.closePath(); ctx.fill(); ctx.stroke();
    // Windows
    ctx.fillStyle = '#4dc9f6';
    const winCount = Math.max(3, Math.floor(w / 30));
    for (let i = 0; i < winCount; i++) { ctx.beginPath(); ctx.arc(x + w * 0.3 + i * (w * 0.4 / winCount), py - h * 0.15, h * 0.12, 0, Math.PI * 2); ctx.fill(); }
    // Engine pods
    ctx.fillStyle = '#888';
    ctx.beginPath(); ctx.ellipse(x + w * 0.35, py + h * 0.6, w * 0.05, h * 0.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + w * 0.55, py + h * 0.6, w * 0.05, h * 0.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Trail smoke
    ctx.save(); ctx.globalAlpha = crashing ? 0.6 : 0.25;
    ctx.fillStyle = crashing ? '#555' : '#ccc';
    for (let i = 0; i < 5; i++) { const tr = (crashing ? 6 : 4) - i * 0.8; ctx.beginPath(); ctx.arc(x + w + w * 0.05 + i * w * 0.06, y + hover + (Math.random() - 0.5) * h * 0.3, Math.max(1, tr), 0, Math.PI * 2); ctx.fill(); }
    if (crashing) {
      ctx.fillStyle = `rgba(255,${60 + Math.random() * 100},0,0.5)`;
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + w * 0.4 + Math.random() * w * 0.15, py - h * 0.5 + Math.random() * h, h * 0.2 + Math.random() * h * 0.2, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.globalAlpha = 1; ctx.restore();
  };

  // ========== DRAW: DOG ==========
  const drawDog = (ctx, x, y, w, frame) => {
    ctx.save();
    const runBob = Math.sin(frame * 0.8) * 2;
    const legPhase = frame * 0.8;
    const cy = y + runBob;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath(); ctx.ellipse(x + w / 2, GROUND_Y, w * 0.4, 4, 0, 0, Math.PI * 2); ctx.fill();

    // Legs
    const l1 = Math.sin(legPhase) * 10, l2 = Math.sin(legPhase + Math.PI) * 10;
    const l3 = Math.sin(legPhase + Math.PI * 0.5) * 10, l4 = Math.sin(legPhase + Math.PI * 1.5) * 10;
    ctx.strokeStyle = '#6B3A1F'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    // Back legs
    ctx.beginPath(); ctx.moveTo(x + 8, cy - 4); ctx.lineTo(x + 8 + l1, cy + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 14, cy - 4); ctx.lineTo(x + 14 + l2, cy + 10); ctx.stroke();
    // Front legs
    ctx.beginPath(); ctx.moveTo(x + w - 14, cy - 6); ctx.lineTo(x + w - 14 + l3, cy + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + w - 8, cy - 6); ctx.lineTo(x + w - 8 + l4, cy + 10); ctx.stroke();

    // Body
    ctx.fillStyle = '#8B4513';
    ctx.beginPath(); ctx.ellipse(x + w / 2, cy - 8, w / 2, 10, 0, 0, Math.PI * 2); ctx.fill();

    // Head
    ctx.fillStyle = '#9B5523';
    ctx.beginPath(); ctx.arc(x + w - 2, cy - 14, 10, 0, Math.PI * 2); ctx.fill();

    // Snout
    ctx.fillStyle = '#B8733B';
    ctx.beginPath(); ctx.ellipse(x + w + 6, cy - 12, 6, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Nose
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(x + w + 10, cy - 13, 2.5, 0, Math.PI * 2); ctx.fill();

    // Eye
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x + w, cy - 17, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(x + w + 1, cy - 17, 2, 0, Math.PI * 2); ctx.fill();

    // Ear
    ctx.fillStyle = '#6B3A1F';
    ctx.beginPath(); ctx.ellipse(x + w - 6, cy - 22, 5, 7, -0.3, 0, Math.PI * 2); ctx.fill();

    // Tail
    const tailWag = Math.sin(frame * 0.4) * 8;
    ctx.strokeStyle = '#8B4513'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x + 2, cy - 10);
    ctx.quadraticCurveTo(x - 8, cy - 22 + tailWag, x - 4, cy - 28 + tailWag);
    ctx.stroke();

    // Angry eyes (red tint) - this is an obstacle dog
    ctx.fillStyle = 'rgba(255,0,0,0.2)';
    ctx.beginPath(); ctx.arc(x + w, cy - 17, 4, 0, Math.PI * 2); ctx.fill();

    // Mouth open
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x + w + 6, cy - 10, 4, 0, Math.PI * 0.8); ctx.stroke();

    ctx.restore();
  };

  // ========== DRAW: COIN ==========
  const drawCollectCoin = (ctx, x, y, size, frame) => {
    const bob = Math.sin(frame * 0.1 + x * 0.01) * 4;
    const shimmer = Math.sin(frame * 0.15) * 0.15 + 0.85;
    ctx.beginPath(); ctx.arc(x, y + bob, size + 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,215,0,${0.15 * shimmer})`; ctx.fill();
    const grad = ctx.createRadialGradient(x - 2, y + bob - 2, 1, x, y + bob, size);
    grad.addColorStop(0, '#FFE66D'); grad.addColorStop(0.7, '#FFD700'); grad.addColorStop(1, '#DAA520');
    ctx.beginPath(); ctx.arc(x, y + bob, size, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#B8860B'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.font = `bold ${size}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#B8860B'; ctx.fillText('¢', x, y + bob + 1);
  };

  // ========== BIOME SYSTEM — 5 Zambian-inspired backgrounds ==========
  // Order: City (Lusaka), Village, University (UNZA), Jungle (Lower Zambezi), Stadium (Heroes)
  const BIOMES = ['city', 'village', 'university', 'jungle', 'stadium'];
  const BIOME_NAMES = ['Lusaka City', 'Zambian Village', 'UNZA Campus', 'Lower Zambezi', 'Heroes Stadium'];

  const drawBiomeLayer = useCallback((ctx, biome, scrollX, gy, isNight, nightAmt) => {
    const bgImg = bgImgsRef.current[biome];
    const darken = isNight ? nightAmt * 0.6 : 0;
    const px = scrollX * 0.3; // parallax offset

    if (bgImg) {
      // === IMAGE-BASED PARALLAX ===
      const imgW = bgImg.width, imgH = bgImg.height;
      const scale = gy / imgH;
      const dW = imgW * scale;
      const startX = -(px * scale) % dW;
      for (let x = startX; x < W; x += dW) ctx.drawImage(bgImg, x, 0, dW, gy);
      if (startX > 0) ctx.drawImage(bgImg, startX - dW, 0, dW, gy);
    } else {
      // === RICH CANVAS-DRAWN FALLBACK ===
      if (biome === 'city') {
        // Lusaka skyline silhouette
        const bldgColor = darken > 0 ? '#0a0f18' : '#556';
        const bldgHi = darken > 0 ? '#0f1520' : '#667';
        ctx.fillStyle = darken > 0 ? '#080c14' : '#ccd';
        ctx.fillRect(0, gy - 180, W, 180);
        // Buildings parallax
        for (let i = 0; i < 14; i++) {
          const bx = ((i * 130 - px * 0.4) % (W + 200)) - 100;
          const bw = 50 + (i * 37 % 60); const bh = 80 + (i * 53 % 120);
          ctx.fillStyle = i % 3 === 0 ? bldgHi : bldgColor;
          ctx.fillRect(bx, gy - bh, bw, bh);
          // Windows
          ctx.fillStyle = darken > 0 ? 'rgba(255,200,50,0.6)' : 'rgba(150,200,255,0.4)';
          for (let wy = gy - bh + 10; wy < gy - 8; wy += 16) {
            for (let wx = bx + 6; wx < bx + bw - 6; wx += 14) {
              ctx.fillRect(wx, wy, 6, 8);
            }
          }
        }
        // Findeco-style tall tower
        const tx = ((600 - px * 0.25) % (W + 300)) - 100;
        ctx.fillStyle = darken > 0 ? '#101828' : '#778';
        ctx.fillRect(tx, gy - 220, 40, 220);
        ctx.fillRect(tx - 15, gy - 230, 70, 15);
      } else if (biome === 'village') {
        // Thatched huts and mango trees
        for (let i = 0; i < 6; i++) {
          const hx = ((i * 280 - px * 0.35) % (W + 300)) - 100;
          // Hut wall
          ctx.fillStyle = darken > 0 ? '#1a0f08' : '#b8844a';
          ctx.fillRect(hx, gy - 60, 70, 60);
          // Thatch roof
          ctx.fillStyle = darken > 0 ? '#0f0a04' : '#8B6914';
          ctx.beginPath(); ctx.moveTo(hx - 10, gy - 60); ctx.lineTo(hx + 35, gy - 100); ctx.lineTo(hx + 80, gy - 60); ctx.fill();
          // Tree next to hut
          const treex = hx + 110;
          ctx.fillStyle = darken > 0 ? '#0a0804' : '#5a3a1a';
          ctx.fillRect(treex, gy - 90, 8, 90);
          ctx.fillStyle = darken > 0 ? '#081008' : '#2d6b1a';
          ctx.beginPath(); ctx.arc(treex + 4, gy - 100, 35, 0, Math.PI * 2); ctx.fill();
        }
      } else if (biome === 'university') {
        // UNZA campus with long buildings and palms
        for (let i = 0; i < 5; i++) {
          const ux = ((i * 350 - px * 0.3) % (W + 400)) - 100;
          ctx.fillStyle = darken > 0 ? '#0c0c14' : '#c8b898';
          ctx.fillRect(ux, gy - 70, 160, 70);
          ctx.fillStyle = darken > 0 ? '#0a0810' : '#884422';
          ctx.fillRect(ux, gy - 80, 160, 12);
          // Windows
          ctx.fillStyle = darken > 0 ? 'rgba(100,150,255,0.3)' : 'rgba(100,180,255,0.5)';
          for (let w = 0; w < 7; w++) ctx.fillRect(ux + 10 + w * 22, gy - 55, 12, 18);
          // Palm tree
          const palmx = ux + 200;
          ctx.fillStyle = darken > 0 ? '#0a0804' : '#7a5a2a';
          ctx.fillRect(palmx, gy - 120, 6, 120);
          ctx.fillStyle = darken > 0 ? '#061008' : '#228B22';
          for (let f = 0; f < 5; f++) {
            const angle = (f / 5) * Math.PI * 2 + scrollX * 0.001;
            ctx.beginPath(); ctx.moveTo(palmx + 3, gy - 120);
            ctx.quadraticCurveTo(palmx + 3 + Math.cos(angle) * 30, gy - 140 + Math.sin(angle) * 10, palmx + 3 + Math.cos(angle) * 50, gy - 110);
            ctx.lineWidth = 4; ctx.strokeStyle = darken > 0 ? '#061008' : '#228B22'; ctx.stroke();
          }
        }
      } else if (biome === 'jungle') {
        // Dense Lower Zambezi vegetation layers
        // Far trees
        ctx.fillStyle = darken > 0 ? '#030804' : '#1a5a1a';
        for (let i = 0; i < 20; i++) {
          const jx = ((i * 90 - px * 0.2) % (W + 200)) - 50;
          ctx.beginPath(); ctx.arc(jx, gy - 80, 50 + (i % 3) * 15, 0, Math.PI * 2); ctx.fill();
        }
        // Mid trees
        ctx.fillStyle = darken > 0 ? '#041004' : '#0d7a0d';
        for (let i = 0; i < 15; i++) {
          const jx = ((i * 120 + 40 - px * 0.35) % (W + 200)) - 50;
          ctx.beginPath(); ctx.arc(jx, gy - 40, 40 + (i % 4) * 10, 0, Math.PI * 2); ctx.fill();
        }
        // Hanging vines
        ctx.strokeStyle = darken > 0 ? '#041008' : '#0a6a0a';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          const vx = ((i * 200 - px * 0.3) % (W + 200)) - 50;
          ctx.beginPath(); ctx.moveTo(vx, 0); ctx.quadraticCurveTo(vx + 15, gy * 0.3, vx - 10, gy * 0.6); ctx.stroke();
        }
      } else if (biome === 'stadium') {
        // Heroes Stadium with stands
        ctx.fillStyle = darken > 0 ? '#060a04' : '#1a6a1a';
        ctx.fillRect(0, gy - 20, W, 20); // pitch edge
        // Stadium stands
        const sx = ((200 - px * 0.15) % (W + 400)) - 100;
        ctx.fillStyle = darken > 0 ? '#0a0c14' : '#556';
        ctx.fillRect(sx, gy - 150, 500, 130);
        // Rows of seats
        for (let row = 0; row < 5; row++) {
          ctx.fillStyle = row % 2 === 0 ? (darken > 0 ? '#0c1018' : '#668') : (darken > 0 ? '#081018' : '#8a4' );
          ctx.fillRect(sx + 10, gy - 140 + row * 24, 480, 18);
        }
        // Roof
        ctx.fillStyle = darken > 0 ? '#080c14' : '#445';
        ctx.fillRect(sx - 20, gy - 160, 540, 15);
        // Floodlights
        ctx.fillStyle = darken > 0 ? '#ff8' : '#ddd';
        ctx.fillRect(sx - 10, gy - 210, 6, 50);
        ctx.fillRect(sx + 510, gy - 210, 6, 50);
        if (darken > 0) {
          ctx.fillStyle = 'rgba(255,255,200,0.15)';
          ctx.beginPath(); ctx.moveTo(sx - 7, gy - 210); ctx.lineTo(sx - 60, gy); ctx.lineTo(sx + 50, gy); ctx.fill();
        }
        // Flag
        ctx.fillStyle = '#008000'; ctx.fillRect(sx + 240, gy - 195, 25, 8);
        ctx.fillStyle = '#FF8C00'; ctx.fillRect(sx + 240, gy - 187, 25, 5);
        ctx.fillStyle = '#000'; ctx.fillRect(sx + 240, gy - 182, 25, 5);
      }
    }

    // Night overlay
    if (darken > 0) {
      ctx.fillStyle = `rgba(5,5,20,${darken * 0.7})`;
      ctx.fillRect(0, 0, W, gy);
    }

    // Ground colors per biome
    const groundColors = {
      city: darken > 0 ? '#1a1a22' : '#3a3a3a',
      village: darken > 0 ? '#1a0a04' : '#a0522d', 
      university: darken > 0 ? '#0a0f08' : '#7a8a6a',
      jungle: darken > 0 ? '#040804' : '#1a3a12',
      stadium: darken > 0 ? '#041004' : '#2d8c2d',
    };
    ctx.fillStyle = groundColors[biome] || '#555';
    ctx.fillRect(0, gy, W, 100);
    
    // Ground details per biome
    if (biome === 'city') {
      ctx.strokeStyle = darken > 0 ? '#333' : '#666'; ctx.lineWidth = 2; ctx.setLineDash([20, 14]);
      ctx.beginPath(); ctx.moveTo(0, gy + 50); ctx.lineTo(W, gy + 50); ctx.stroke(); ctx.setLineDash([]);
    } else if (biome === 'village') {
      ctx.fillStyle = darken > 0 ? 'rgba(80,30,10,0.3)' : 'rgba(120,50,20,0.3)';
      for (let i = 0; i < 20; i++) { const dx = ((i * 90 - scrollX * 0.5) % (W + 60)) - 20; ctx.beginPath(); ctx.arc(dx, gy + 20 + (i % 3) * 24, 3 + i % 3, 0, Math.PI * 2); ctx.fill(); }
    } else if (biome === 'university') {
      ctx.fillStyle = darken > 0 ? '#141208' : '#b0a890';
      ctx.fillRect(0, gy + 4, W, 20);
    } else if (biome === 'jungle') {
      // Leaf litter
      ctx.fillStyle = darken > 0 ? 'rgba(30,50,20,0.4)' : 'rgba(60,100,40,0.3)';
      for (let i = 0; i < 25; i++) { const lx = ((i * 70 - scrollX * 0.6) % (W + 80)) - 30; ctx.beginPath(); ctx.ellipse(lx, gy + 16 + (i % 4) * 16, 6, 3, i * 0.5, 0, Math.PI * 2); ctx.fill(); }
    } else if (biome === 'stadium') {
      // Pitch stripes
      ctx.strokeStyle = darken > 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, gy + 6); ctx.lineTo(W, gy + 6); ctx.stroke();
      ctx.fillStyle = darken > 0 ? 'rgba(40,120,40,0.2)' : 'rgba(50,160,50,0.15)';
      for (let i = 0; i < 10; i++) { const sx = ((i * 180 - scrollX * 0.8) % (W + 200)) - 80; ctx.fillRect(sx, gy, 90, 100); }
    }
  }, []);


  // ========== MAIN drawBg with biome system ==========
  const drawBg = useCallback((ctx, g, fc) => {
    // Sky (same for all biomes)
    let skyTop, skyBot;
    if (g.timeOfDay === 0) {
      skyTop = lerpC('#87CEEB', '#FF8C42', g.skyTransition > 0.7 ? (g.skyTransition - 0.7) / 0.3 : 0);
      skyBot = lerpC('#E0F0FF', '#FFD4A8', g.skyTransition > 0.7 ? (g.skyTransition - 0.7) / 0.3 : 0);
    } else if (g.timeOfDay === 1) {
      skyTop = lerpC('#FF8C42', '#0a1128', g.skyTransition); skyBot = lerpC('#FFD4A8', '#1a1a3e', g.skyTransition);
    } else {
      skyTop = lerpC('#0a1128', '#87CEEB', g.skyTransition); skyBot = lerpC('#1a1a3e', '#E0F0FF', g.skyTransition);
    }
    const sg = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    sg.addColorStop(0, skyTop); sg.addColorStop(1, skyBot);
    ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);

    // Night amount
    const na = g.timeOfDay === 1 ? g.skyTransition : g.timeOfDay === 2 ? 1 - g.skyTransition : 0;
    const isNight = na > 0.4;

    // Stars
    if (na > 0.2) g.stars.forEach(s => { s.twinkle += 0.03; ctx.fillStyle = `rgba(255,255,255,${(Math.sin(s.twinkle) * 0.3 + 0.7) * na})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill(); });
    // Moon
    if (na > 0.3) { ctx.globalAlpha = na; ctx.fillStyle = '#f5f5dc'; ctx.beginPath(); ctx.arc(W - 100, 50, 25, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = skyTop; ctx.beginPath(); ctx.arc(W - 90, 45, 22, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }
    // Clouds
    const ca = g.timeOfDay === 2 ? 0.15 : g.timeOfDay === 1 ? 0.6 - g.skyTransition * 0.4 : 0.8;
    g.clouds.forEach(c => { ctx.globalAlpha = ca; ctx.fillStyle = g.timeOfDay === 2 ? '#334' : '#fff'; ctx.beginPath(); ctx.arc(c.x, c.y, c.w * 0.25, 0, Math.PI * 2); ctx.arc(c.x + c.w * 0.2, c.y - c.w * 0.1, c.w * 0.3, 0, Math.PI * 2); ctx.arc(c.x + c.w * 0.45, c.y, c.w * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });

    // Determine current biome (changes every 100pts)
    const biomeIdx = Math.floor(g.score / 100) % BIOMES.length;
    const biome = BIOMES[biomeIdx];
    const scrollX = g.distance;

    // Biome transition: crossfade near boundaries
    const scoreInBiome = g.score % 100;
    const transitionZone = 15; // pts of crossfade

    if (scoreInBiome >= 100 - transitionZone && g.score > 0) {
      // Crossfade: draw outgoing biome, then incoming on top with alpha
      const nextBiome = BIOMES[(biomeIdx + 1) % BIOMES.length];
      const fadeProgress = (scoreInBiome - (100 - transitionZone)) / transitionZone;
      drawBiomeLayer(ctx, biome, scrollX, GROUND_Y, isNight, na);
      ctx.save(); ctx.globalAlpha = fadeProgress;
      drawBiomeLayer(ctx, nextBiome, scrollX, GROUND_Y, isNight, na);
      ctx.restore();
    } else {
      drawBiomeLayer(ctx, biome, scrollX, GROUND_Y, isNight, na);
    }

    // Biome name popup on change
    if (scoreInBiome < 30 && g.score >= 5) {
      const popAlpha = scoreInBiome < 10 ? scoreInBiome / 10 : (30 - scoreInBiome) / 20;
      ctx.save(); ctx.globalAlpha = popAlpha * 0.8;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath(); ctx.roundRect(W / 2 - 160, 120, 320, 56, 16); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 26px "Courier New", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('📍 ' + BIOME_NAMES[biomeIdx], W / 2, 148);
      ctx.restore();
    }

    // Ground line (always)
    ctx.strokeStyle = isNight ? '#222' : 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(W, GROUND_Y); ctx.stroke();
    g.groundOffset = (g.groundOffset + g.speed) % 20;
  }, [drawBiomeLayer]);

  // ========== INTRO ==========
  useEffect(() => {
    if (gameState !== 'intro') return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    const introLoop = () => {
      const g = gameRef.current; if (!g) return;
      frame++; g.npc.frame = frame; g.player.frame = frame;
      drawBg(ctx, g, frame);
      const npc = g.npc;

      if (npc.phase === 'approaching') {
        // NPC runs from left toward player
        npc.x += 9;
        npc.lookBack = false;
        // When NPC reaches player
        if (npc.x >= g.player.x - 10) {
          npc.x = g.player.x - 10;
          npc.phase = 'tagging';
          npc.tagTimer = 0;
        }
      } else if (npc.phase === 'tagging') {
        npc.tagTimer++;
        if (npc.tagTimer === 1) {
          // "Ka Touch!" speech bubble above the tag point
          g.tagText = { text: 'Ka Touch! 👋', x: g.player.x + g.player.w / 2, y: g.player.y - g.player.h - 60, life: 70, scale: 0, isBubble: true };
          for (let i = 0; i < 14; i++) g.particles.push({ x: g.player.x + g.player.w / 2, y: g.player.y - g.player.h / 2, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 6 - 2, life: 20 + Math.random() * 10, size: 6 + Math.random() * 8, color: ['#FF4500', '#FFD700', '#FF6B35', '#fff'][Math.floor(Math.random() * 4)] });
        }
        // Brief pause next to player, then sprint ahead
        if (npc.tagTimer > 35) {
          npc.phase = 'sprinting';
          npc.lookBack = true; // Look back while running away
        }
      } else if (npc.phase === 'sprinting') {
        // Sprint ahead of player
        npc.x += 10;
        if (npc.x >= g.player.x + 280) {
          npc.phase = 'running';
          setGameState('playing');
        }
      }

      g.dustParticles = g.dustParticles.filter(dp => { dp.x += dp.vx; dp.y += dp.vy; dp.life--; return dp.life > 0; });
      g.particles = g.particles.filter(pp => { pp.x += pp.vx; pp.y += pp.vy; pp.vy += 0.1; pp.life--; return pp.life > 0; });
      if (g.tagText) { g.tagText.life--; g.tagText.scale = Math.min(1, g.tagText.scale + 0.1); g.tagText.y -= 0.4; if (g.tagText.life <= 0) g.tagText = null; }

      // NPC dust when running
      if ((npc.phase === 'approaching' || npc.phase === 'sprinting') && frame % 3 === 0) {
        g.dustParticles.push({ x: npc.x + 10, y: GROUND_Y - 2, vx: (npc.phase === 'approaching' ? -2 : -3), vy: -Math.random() * 2, life: 10 + Math.random() * 8, size: 2 + Math.random() * 2 });
      }

      drawCoinChar(ctx, g.player.x, g.player.y, g.player.w, g.player.h, frame, false, 0);
      drawNPC(ctx, npc, frame);
      g.dustParticles.forEach(dp => { ctx.globalAlpha = dp.life / 20; ctx.fillStyle = 'rgba(160,140,120,0.6)'; ctx.beginPath(); ctx.arc(dp.x, dp.y, dp.size * (dp.life / 20), 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });
      g.particles.forEach(pp => { ctx.globalAlpha = pp.life / 30; ctx.fillStyle = pp.color || '#FFD700'; ctx.beginPath(); ctx.arc(pp.x, pp.y, pp.size, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });

      // Tag text as speech bubble
      if (g.tagText) {
        ctx.save();
        const t = g.tagText;
        ctx.globalAlpha = Math.min(1, t.life / 20);
        const sc = t.scale;
        // Bubble background
        const bw = 100 * sc, bh = 32 * sc;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.ellipse(t.x, t.y, bw / 2, bh / 2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#FF4500'; ctx.lineWidth = 2; ctx.stroke();
        // Bubble tail
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(t.x - 8, t.y + bh / 2 - 2); ctx.lineTo(t.x, t.y + bh / 2 + 12); ctx.lineTo(t.x + 8, t.y + bh / 2 - 2); ctx.closePath(); ctx.fill();
        // Text
        ctx.font = `bold ${Math.floor(15 * sc)}px Arial`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FF4500';
        ctx.fillText(t.text, t.x, t.y);
        ctx.restore();
      }

      const introLogo = logoImgRef.current;
      if (introLogo) { const lw = 240, lh = lw * (introLogo.height / introLogo.width); ctx.drawImage(introLogo, W / 2 - lw / 2, 8, lw, lh); }
      else { ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.font = 'bold 28px "Courier New", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KA TOUCH!', W / 2, 35); }
      animRef.current = requestAnimationFrame(introLoop);
    };
    animRef.current = requestAnimationFrame(introLoop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [gameState, drawBg]);

  // ========== MAIN LOOP ==========
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let fc = 0;
    const loop = () => {
      const g = gameRef.current; if (!g || !g.alive) return;
      fc++; g.player.frame = fc; g.npc.frame = fc;
      g.speed = 5 + fc * 0.0005; g.distance += g.speed * 0.1;
      g.groundOffset = (g.groundOffset + g.speed) % 20;

      // Smooth score
      g.scoreAccum += 10 / 60;
      if (g.scoreAccum >= 1) {
        const add = Math.floor(g.scoreAccum); g.score += add; g.scoreAccum -= add;
        const p1k = Math.floor((g.score - add) / 1000), c1k = Math.floor(g.score / 1000);
        if (c1k > p1k) { g.coins++; setCoins(g.coins);
          for (let i = 0; i < 10; i++) g.particles.push({ x: 50, y: 30, vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 4 - 1, life: 20 + Math.random() * 10, size: 3 + Math.random() * 3, color: '#FFD700' });
        }
      }
      setScore(g.score);
      g.timeOfDay = Math.floor(g.score / 1000) % 3;
      g.skyTransition = (g.score % 1000) / 1000;

      // 35 coins per 60 seconds
      g.coinTimer++;
      if (g.coinTimer >= g.coinInterval) {
        g.coinTimer = 0;
        // Spawn coins in arcs between obstacle waves (at jump height = rewarding jumps)
        const hasNearbyObs = g.obstacles.some(o => o.x > W - 200 && o.x < W + 200);
        if (!hasNearbyObs) {
          // Safe gap — place a coin arc (3 coins in a jump arc)
          const baseY = GROUND_Y - 120;
          for (let i = 0; i < 3; i++) {
            const arcY = baseY - Math.sin((i / 2) * Math.PI) * 80; // arc shape
            g.collectCoins.push({ x: W + 60 + i * 70, y: arcY, size: 24, collected: false });
          }
        } else {
          // Near obstacles — single coin above obstacle height as reward for good timing
          g.collectCoins.push({ x: W + 100, y: GROUND_Y - 200 - Math.random() * 80, size: 24, collected: false });
        }
      }

      // Player physics
      const p = g.player;
      if (p.jumping) { p.vy += 1.1; p.y += p.vy; if (p.y >= GROUND_Y) { p.y = GROUND_Y; p.vy = 0; p.jumping = false; for (let i = 0; i < 5; i++) g.dustParticles.push({ x: p.x + p.w / 2 + (Math.random() - 0.5) * 40, y: GROUND_Y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 4, life: 15 + Math.random() * 10, size: 4 + Math.random() * 6 }); } }
      if (!p.jumping && fc % 4 === 0) g.dustParticles.push({ x: p.x + 5, y: GROUND_Y - 2, vx: -g.speed * 0.3 + (Math.random() - 0.5), vy: -Math.random() * 1.5, life: 12 + Math.random() * 8, size: 1.5 + Math.random() * 2 });
      if (p.hitFlash > 0) p.hitFlash -= 0.05;

      // NPC - stays ahead but sometimes teases (looks reachable)
      const npc = g.npc;
      npc.teaseTimer++;

      // Tease cycle: every ~8 seconds, NPC slows down and drifts close, then bolts away
      const teaseInterval = 480; // ~8 seconds
      const teaseDuration = 120; // ~2 seconds of being close
      const cyclePos = npc.teaseTimer % teaseInterval;

      if (cyclePos < teaseDuration) {
        // Tease phase: drift closer to player (gap shrinks to ~30px)
        npc.teaseMode = true;
        const teaseProgress = cyclePos / teaseDuration;
        const easeIn = Math.sin(teaseProgress * Math.PI); // smooth in-out
        npc.targetX = p.x + 480 - easeIn * 340 + Math.sin(fc * 0.03) * 8;
      } else if (cyclePos === teaseDuration) {
        // Bolt away moment — burst of speed particles
        npc.teaseMode = false;
        for (let i = 0; i < 6; i++) g.particles.push({ x: npc.x, y: GROUND_Y - 10, vx: -3 - Math.random() * 3, vy: -Math.random() * 3, life: 12 + Math.random() * 8, size: 2 + Math.random() * 2, color: '#FF4500' });
      } else {
        // Normal: comfortably ahead with gentle bob
        npc.teaseMode = false;
        npc.targetX = p.x + 480 + Math.sin(fc * 0.02) * 80;
      }

      // Smooth follow - faster snap-back when bolting, slower when teasing
      const followSpeed = npc.teaseMode ? 0.03 : 0.07;
      npc.x += (npc.targetX - npc.x) * followSpeed;

      npc.tauntTimer++;
      // Look back more when teasing (taunting the player)
      if (npc.teaseMode) {
        npc.lookBack = true;
      } else if (npc.tauntTimer > 100) {
        npc.lookBack = !npc.lookBack; npc.tauntTimer = 0;
      }

      // NPC evades obstacles (slot items)
      for (const o of g.obstacles) { const d = o.x - npc.x; if (d > 0 && d < 90 && !npc.jumping && o.type === 'slot') { npc.vy = -10; npc.jumping = true; } }
      // NPC evades dogs
      for (const dog of g.dogs) { const d = dog.x - npc.x; if (d > -20 && d < 60 && !npc.jumping) { npc.vy = -12; npc.jumping = true; } }
      if (npc.jumping) { npc.vy += 0.5; npc.y += npc.vy; if (npc.y >= GROUND_Y) { npc.y = GROUND_Y; npc.vy = 0; npc.jumping = false; } }
      if (!npc.jumping && fc % 5 === 0) g.dustParticles.push({ x: npc.x + 10, y: GROUND_Y - 2, vx: -g.speed * 0.2, vy: -Math.random() * 1, life: 8 + Math.random() * 5, size: 1.5 + Math.random() * 1.5 });

      // Spawn obstacles in synced waves with clear gaps
      g.obstacleTimer++;
      
      if (g.waveQueue.length === 0 && g.obstacleTimer >= g.obstacleInterval) {
        g.obstacleTimer = 0;
        // Difficulty scales with score
        const diff = Math.min(g.score / 500, 1); // 0-1 over 500pts
        g.obstacleInterval = Math.max(50, 100 - diff * 40) + Math.random() * 20;
        
        // Generate a wave pattern (group of 1-3 obstacles with synced timing)
        const waveType = Math.random();
        const spd = g.speed;
        const gap = 200 + (1 - diff) * 100; // gap between obstacles in a wave (closer at higher diff)
        
        if (waveType < 0.35) {
          // Single ground obstacle — easy jump
          const item = SLOT_ITEMS[Math.floor(Math.random() * SLOT_ITEMS.length)];
          const size = 64 + Math.random() * 20;
          g.waveQueue.push({ delay: 0, type: 'slot', y: GROUND_Y, w: size, h: size, speed: spd, item });
        } else if (waveType < 0.55) {
          // Two ground obstacles spaced for a single jump-over
          const item1 = SLOT_ITEMS[Math.floor(Math.random() * SLOT_ITEMS.length)];
          const item2 = SLOT_ITEMS[Math.floor(Math.random() * SLOT_ITEMS.length)];
          const size = 56 + Math.random() * 16;
          g.waveQueue.push({ delay: 0, type: 'slot', y: GROUND_Y, w: size, h: size, speed: spd, item: item1 });
          g.waveQueue.push({ delay: Math.floor(gap / spd), type: 'slot', y: GROUND_Y, w: size, h: size, speed: spd, item: item2 });
        } else if (waveType < 0.7) {
          // High plane — duck under it
          const planeY = GROUND_Y - 140 - Math.random() * 40;
          g.waveQueue.push({ delay: 0, type: 'plane', y: planeY, w: 140, h: 60, speed: spd + 1, isHigh: true });
        } else if (waveType < 0.85) {
          // Ground obstacle + high plane combo — jump the ground one (plane is above)
          const item = SLOT_ITEMS[Math.floor(Math.random() * SLOT_ITEMS.length)];
          const size = 60 + Math.random() * 16;
          g.waveQueue.push({ delay: 0, type: 'slot', y: GROUND_Y, w: size, h: size, speed: spd, item: item });
          g.waveQueue.push({ delay: 0, type: 'plane', y: 80 + Math.random() * 60, w: 140, h: 60, speed: spd + 1.5, isHigh: true });
        } else {
          // Crashing plane — must time the dodge
          const crashY = 100 + Math.random() * 60;
          g.waveQueue.push({ delay: 0, type: 'plane', y: crashY, w: 140, h: 60, speed: spd + 2, willCrash: true, crashX: W * 0.3 + Math.random() * W * 0.3 });
        }
      }
      
      // Process wave queue (spawn with delays)
      if (g.waveQueue.length > 0) {
        const next = g.waveQueue[0];
        if (next.delay <= 0) {
          g.waveQueue.shift();
          if (next.type === 'slot') {
            g.obstacles.push({ type: 'slot', x: W + 40, y: next.y, w: next.w, h: next.h, speed: next.speed, item: next.item, crashing: 0 });
          } else {
            const bobs = !next.willCrash && Math.random() < 0.4;
            g.obstacles.push({ type: 'plane', x: W + 40, y: next.y, baseY: next.y, w: next.w, h: next.h, speed: next.speed, crashing: 0, willCrash: !!next.willCrash, crashStartX: next.crashX || 0, bobs, bobPhase: Math.random() * Math.PI * 2, bobAmp: bobs ? 20 + Math.random() * 25 : 0 });
          }
        } else {
          next.delay--;
        }
      }

      // Dog spawning at 1000pts+
      if (g.score >= 100 && !g.dogSpawned) {
        g.dogSpawned = true;
        g.dogWarning = 90; // Warning frames
      }
      if (g.dogWarning > 0) { g.dogWarning--; if (g.dogWarning === 0) {
        g.dogs.push({ x: -120, y: GROUND_Y - 32, w: 90, speed: g.speed + 6 + Math.random() * 2, frame: 0 });
      }}
      // Respawn dogs periodically after first
      if (g.score >= 100 && g.dogs.length === 0 && g.dogWarning <= 0 && fc % 600 === 0) {
        g.dogWarning = 90;
        g.dogSpawned = false;
      }

      // Move obstacles
      g.obstacles = g.obstacles.filter(o => {
        o.x -= o.speed;
        if (o.type === 'plane') {
          // Bobbing movement
          if (o.bobs && !o.willCrash && o.crashing === 0) {
            o.bobPhase += 0.04;
            o.y = o.baseY + Math.sin(o.bobPhase) * o.bobAmp;
          }
          // Crash logic
          if (o.willCrash && o.x <= o.crashStartX && o.y < GROUND_Y - 10) {
            o.crashing++; o.y += o.crashing * 0.15; o.speed *= 0.995; o.bobs = false;
            if (o.y >= GROUND_Y - 5) { o.y = GROUND_Y - 5; o.willCrash = false; o.crashing = 999;
              for (let i = 0; i < 15; i++) g.particles.push({ x: o.x + o.w / 2, y: GROUND_Y, vx: (Math.random() - 0.5) * 8, vy: -Math.random() * 6 - 2, life: 20 + Math.random() * 15, size: 3 + Math.random() * 5, color: ['#ff4444', '#ff8800', '#ffcc00', '#888'][Math.floor(Math.random() * 4)] });
            }
          }
        }
        return o.x > -240;
      });

      // Move dogs (left to right)
      g.dogs = g.dogs.filter(dog => {
        dog.x += dog.speed; dog.frame = fc;
        return dog.x < W + 80;
      });

      // Move coins
      g.collectCoins = g.collectCoins.filter(c => { c.x -= g.speed; return c.x > -60 && !c.collected; });

      // Particles
      g.dustParticles = g.dustParticles.filter(dp => { dp.x += dp.vx; dp.y += dp.vy; dp.life--; return dp.life > 0; });
      g.particles = g.particles.filter(pp => { pp.x += pp.vx; pp.y += pp.vy; pp.vy += 0.1; pp.life--; return pp.life > 0; });
      g.clouds.forEach(c => { c.x -= c.speed + g.speed * 0.05; if (c.x < -80) { c.x = W + 40; c.y = 25 + Math.random() * 60; } });
      if (g.tagText) { g.tagText.life--; g.tagText.y -= 0.3; if (g.tagText.life <= 0) g.tagText = null; }

      // Collision: obstacles
      const ph = p.ducking ? p.h * 0.5 : p.h;
      const px = p.x + 6, py2 = p.y - ph + 4, pw = p.w - 12, pHt = ph - 8;
      for (const o of g.obstacles) {
        let ox, oy, ow, oh;
        if (o.type === 'slot') { ox = o.x + 4; oy = o.y - o.h + 4; ow = o.w - 8; oh = o.h - 8; }
        else { const bobOff = o.bobs && !o.willCrash ? Math.sin(o.bobPhase) * o.bobAmp : 0; ox = o.x + 5; oy = o.y + (o.crashing ? 0 : bobOff) - 8; ow = o.w - 10; oh = 16; }
        if (px < ox + ow && px + pw > ox && py2 < oy + oh && py2 + pHt > oy) { die(g); break; }
      }

      // Collision: dogs
      for (const dog of g.dogs) {
        const dx = dog.x + 5, dy = dog.y - 20, dw = dog.w - 10, dh = 22;
        if (px < dx + dw && px + pw > dx && py2 < dy + dh && py2 + pHt > dy) { die(g); break; }
      }

      // Coin collection
      for (const c of g.collectCoins) {
        if (c.collected) continue;
        const dx = (p.x + p.w / 2) - c.x, dy = (p.y - ph / 2) - c.y;
        if (Math.sqrt(dx * dx + dy * dy) < c.size + 36) {
          c.collected = true; g.coins++; setCoins(g.coins);
          for (let i = 0; i < 8; i++) g.particles.push({ x: c.x, y: c.y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10 - 4, life: 15 + Math.random() * 10, size: 4 + Math.random() * 6, color: '#FFD700' });
        }
      }

      // ===== DRAW =====
      drawBg(ctx, g, fc);
      g.collectCoins.forEach(c => { if (!c.collected) drawCollectCoin(ctx, c.x, c.y, c.size, fc); });
      g.obstacles.forEach(o => {
        if (o.type === 'slot') drawSlotItem(ctx, o.x, o.y, o.w, o.item, fc);
        else { const bobOff = o.bobs && !o.willCrash && o.crashing === 0 ? Math.sin(o.bobPhase) * o.bobAmp : 0; drawPlane(ctx, o.x, o.y, o.w, fc, o.crashing, bobOff); }
      });
      g.dogs.forEach(dog => drawDog(ctx, dog.x, dog.y, dog.w, fc));
      g.dustParticles.forEach(dp => { ctx.globalAlpha = dp.life / 20; ctx.fillStyle = g.timeOfDay === 2 ? 'rgba(100,100,150,0.5)' : 'rgba(160,140,120,0.6)'; ctx.beginPath(); ctx.arc(dp.x, dp.y, dp.size * (dp.life / 20), 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });
      g.particles.forEach(pp => { ctx.globalAlpha = pp.life / 30; ctx.fillStyle = pp.color || '#FFD700'; ctx.beginPath(); ctx.arc(pp.x, pp.y, pp.size * (pp.life / 30), 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });

      // Dog warning
      if (g.dogWarning > 0) {
        ctx.save();
        const pulse = Math.sin(fc * 0.3) * 0.3 + 0.7;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = '#ff4444'; ctx.font = 'bold 20px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('⚠️ Scooby is coming!!! 🐕', W / 2, H / 2 - 20);
        ctx.restore();
      }

      drawNPC(ctx, npc, fc);
      if (g.alive) drawCoinChar(ctx, p.x, p.y, p.w, p.h, fc, p.ducking, p.hitFlash);
      if (g.tagText) {
        ctx.save();
        const t = g.tagText;
        ctx.globalAlpha = Math.min(1, t.life / 20);
        const sc = t.scale || 1;
        if (t.isBubble) {
          const bw = 100 * sc, bh = 32 * sc;
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(t.x, t.y, bw / 2, bh / 2, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#FF4500'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(t.x - 8, t.y + bh / 2 - 2); ctx.lineTo(t.x, t.y + bh / 2 + 12); ctx.lineTo(t.x + 8, t.y + bh / 2 - 2); ctx.closePath(); ctx.fill();
          ctx.font = `bold ${Math.floor(15 * sc)}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#FF4500'; ctx.fillText(t.text, t.x, t.y);
        } else {
          ctx.font = 'bold 28px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeText(t.text, t.x, t.y);
          ctx.fillStyle = '#FF4500'; ctx.fillText(t.text, t.x, t.y);
        }
        ctx.restore();
      }

      // HUD
      ctx.fillStyle = g.timeOfDay === 2 ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)';
      ctx.font = 'bold 32px "Courier New", monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'top';
      ctx.fillText(`HI ${String(highScore).padStart(5, '0')}  ${String(g.score).padStart(5, '0')}`, W - 20, 15);
      ctx.textAlign = 'left'; ctx.fillStyle = '#FFD700'; ctx.fillText(`🪙 ${g.coins}`, 20, 15);
      ctx.fillStyle = g.timeOfDay === 2 ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';
      ctx.font = '22px "Courier New", monospace'; ctx.fillText(`${g.speed.toFixed(1)}x`, 40, 70);

      if (g.alive) animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [gameState, highScore, drawBg]);

  const die = (g) => {
    g.alive = false; setGameState('dead');
    const p = g.player;
    for (let i = 0; i < 15; i++) g.particles.push({ x: p.x + p.w / 2, y: p.y - p.h / 2, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8 - 3, life: 25 + Math.random() * 15, size: 6 + Math.random() * 8, color: ['#FFD700', '#DAA520', '#FFE066', '#B8860B'][Math.floor(Math.random() * 4)] });
    const reward = Math.floor(g.score / 1000) + g.coins;
    if (g.score > highScore) setHighScore(g.score);
    if (onWin && reward > 0) onWin(reward);
  };

  // Death screen
  useEffect(() => {
    if (gameState !== 'dead') return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g = gameRef.current; if (!g) return;
    let df = 0;
    const dd = () => {
      df++;
      g.particles = g.particles.filter(pp => { pp.x += pp.vx; pp.y += pp.vy; pp.vy += 0.15; pp.life--; return pp.life > 0; });
      ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, W, H);
      g.particles.forEach(pp => { ctx.globalAlpha = pp.life / 30; ctx.fillStyle = pp.color || '#FFD700'; ctx.beginPath(); ctx.arc(pp.x, pp.y, pp.size, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });
      if (df > 15) { ctx.save(); ctx.globalAlpha = Math.min(1, (df - 15) / 20); ctx.fillStyle = '#FF4500'; ctx.font = 'bold 32px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText("😜 Can't catch me!", W / 2, H / 2 - 160); ctx.restore(); }
      ctx.fillStyle = '#fff'; ctx.font = 'bold 64px "Courier New", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GAME OVER', W / 2, H / 2 - 100);
      ctx.font = '36px "Courier New", monospace'; ctx.fillStyle = '#FFD700'; ctx.fillText(`Score: ${g.score}  •  Coins: ${g.coins}`, W / 2, H / 2 - 30);
      ctx.fillStyle = '#4ADE80'; ctx.font = 'bold 40px "Courier New", monospace';
      ctx.fillText(`+${Math.floor(g.score / 1000) + g.coins} Coins earned!`, W / 2, H / 2 + 40);
      ctx.fillStyle = '#aaa'; ctx.font = '28px "Courier New", monospace'; ctx.fillText('Press SPACE or TAP to play again', W / 2, H / 2 + 110);
      if (df < 120) requestAnimationFrame(dd);
    };
    dd();
  }, [gameState]);

  // Menu
  useEffect(() => {
    if (gameState !== 'menu') return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g = initGame();
    drawBg(ctx, g, 0);
    drawCoinChar(ctx, W / 2 - 120, GROUND_Y, 96, 96, 0, false, 0);
    const menuNpc = { ...g.npc, x: W / 2 + 80, y: GROUND_Y, phase: 'running', lookBack: true, landBounce: 0, teaseMode: false };
    drawNPC(ctx, menuNpc, 0);
    // Logo
    const logo = logoImgRef.current;
    if (logo) {
      const lw = 640, lh = lw * (logo.height / logo.width);
      ctx.drawImage(logo, W / 2 - lw / 2, H / 2 - 200, lw, lh);
    } else {
      ctx.save();
      ctx.font = 'bold italic 96px "Courier New", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,69,0,0.3)'; ctx.fillText('KA TOUCH!', W / 2 + 6, H / 2 - 124);
      ctx.strokeStyle = '#000'; ctx.lineWidth = 4; ctx.strokeText('KA TOUCH!', W / 2, H / 2 - 130);
      ctx.fillStyle = '#FF6B00'; ctx.fillText('KA TOUCH!', W / 2, H / 2 - 130);
      ctx.restore();
    }
    ctx.fillStyle = '#666'; ctx.font = '16px "Courier New", monospace'; ctx.textAlign = 'center'; ctx.fillText('Press SPACE or TAP to start', W / 2, H / 2 + 60);
    ctx.fillStyle = '#999'; ctx.font = '12px "Courier New", monospace'; ctx.fillText('SPACE / TAP = Jump  •  ↓ = Duck  •  Catch the tagger!', W / 2, H / 2 + 55);
  }, [gameState, initGame, drawBg, imgLoaded]);

  function lerpC(a, b, t) {
    const ah = parseInt(a.replace('#', ''), 16), bh = parseInt(b.replace('#', ''), 16);
    const ar = (ah >> 16), ag = (ah >> 8 & 0xff), ab2 = (ah & 0xff);
    const br = (bh >> 16), bg = (bh >> 8 & 0xff), bb = (bh & 0xff);
    return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab2 + (bb - ab2) * t)})`;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 70, padding: 16, flexDirection: 'column' }}>
      {/* Close button */}
      {onClose && (
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, zIndex: 80 }}>✕</button>
      )}
      <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(255,215,0,0.1)', border: '2px solid rgba(255,215,0,0.2)', maxWidth: '100%' }}>
        <canvas ref={canvasRef} width={W} height={H} onClick={handleTap} onTouchStart={(e) => { e.preventDefault(); handleTap(); }} style={{ display: 'block', cursor: 'pointer', width: '100%', maxWidth: W, height: 'auto', imageRendering: 'pixelated' }} />
      </div>
      <div style={{ marginTop: 16, color: '#666', fontFamily: '"Courier New", monospace', fontSize: 13, textAlign: 'center' }}>
        <span style={{ color: '#FFD700' }}>SPACE</span> or <span style={{ color: '#FFD700' }}>TAP</span> to jump {' • '} <span style={{ color: '#FFD700' }}>↓</span> to duck {' • '} Avoid 💎⭐✈️🐕 • Collect 🪙
      </div>
    </div>
  );
}


// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

// ===== TRIVIA QUESTION BANK =====
const TRIVIA_QUESTIONS = [
  { q: "What year did Zambia gain independence?", a: "1964", opts: ["1960", "1964", "1968", "1972"], cat: "history" },
  { q: "What is the capital of Zambia?", a: "Lusaka", opts: ["Lusaka", "Ndola", "Kitwe", "Livingstone"], cat: "geography" },
  { q: "Victoria Falls is shared with which country?", a: "Zimbabwe", opts: ["Mozambique", "Zimbabwe", "Botswana", "Malawi"], cat: "geography" },
  { q: "What is Zambia's national animal?", a: "Fish Eagle", opts: ["Lion", "Elephant", "Fish Eagle", "Leopard"], cat: "nature" },
  { q: "What currency does Zambia use?", a: "Kwacha", opts: ["Kwacha", "Rand", "Shilling", "Dollar"], cat: "general" },
  { q: "Which river forms Victoria Falls?", a: "Zambezi", opts: ["Congo", "Zambezi", "Nile", "Limpopo"], cat: "geography" },
  { q: "Zambia has how many provinces?", a: "10", opts: ["8", "10", "12", "14"], cat: "general" },
  { q: "Who was Zambia's first president?", a: "Kenneth Kaunda", opts: ["Kenneth Kaunda", "Frederick Chiluba", "Levy Mwanawasa", "Michael Sata"], cat: "history" },
  { q: "What is Zambia's largest city?", a: "Lusaka", opts: ["Lusaka", "Kitwe", "Ndola", "Kabwe"], cat: "geography" },
  { q: "Which lake borders Zambia to the north?", a: "Lake Tanganyika", opts: ["Lake Victoria", "Lake Malawi", "Lake Tanganyika", "Lake Chad"], cat: "geography" },
  { q: "What does 'Kwacha' mean?", a: "Dawn", opts: ["Freedom", "Dawn", "Unity", "Strength"], cat: "general" },
  { q: "Which sport is most popular in Zambia?", a: "Football", opts: ["Cricket", "Rugby", "Football", "Basketball"], cat: "sport" },
  { q: "In what year did Zambia win the Africa Cup?", a: "2012", opts: ["2010", "2012", "2014", "2016"], cat: "sport" },
  { q: "What is the Zambian national motto?", a: "One Zambia, One Nation", opts: ["Unity and Freedom", "One Zambia, One Nation", "Strength in Unity", "Forward Together"], cat: "history" },
  { q: "Which metal is Zambia famous for mining?", a: "Copper", opts: ["Gold", "Copper", "Diamond", "Iron"], cat: "general" },
  { q: "Kafue National Park is one of the largest in...", a: "Africa", opts: ["The World", "Africa", "Southern Africa", "Zambia"], cat: "nature" },
  { q: "What is the national dish of Zambia?", a: "Nshima", opts: ["Nshima", "Ugali", "Sadza", "Fufu"], cat: "general" },
  { q: "Which Zambian footballer played for Arsenal?", a: "Christopher Katongo", opts: ["Kalusha Bwalya", "Christopher Katongo", "Patson Daka", "Enoch Mwepu"], cat: "sport" },
  { q: "The Copperbelt is in which part of Zambia?", a: "North", opts: ["North", "South", "East", "West"], cat: "geography" },
  { q: "What year was the 2nd Republic established?", a: "1972", opts: ["1970", "1972", "1975", "1980"], cat: "history" },
  { q: "Who scored the winning penalty in AFCON 2012?", a: "Stoppila Sunzu", opts: ["Christopher Katongo", "Stoppila Sunzu", "Rainford Kalaba", "James Chamanga"], cat: "sport" },
  { q: "Zambia borders how many countries?", a: "8", opts: ["6", "7", "8", "9"], cat: "geography" },
  { q: "What tree appears on the Zambian flag?", a: "None (Eagle only)", opts: ["Baobab", "Mopane", "None (Eagle only)", "Marula"], cat: "general" },
  { q: "South Luangwa is famous for which animal?", a: "Leopard", opts: ["Elephant", "Leopard", "Lion", "Hippo"], cat: "nature" },
];

// ===== PLINKO GAME =====
function PlinkoGame({ onClose, onWin }) {
  const canvasRef = React.useRef(null);
  const [dropping, setDropping] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [balls, setBalls] = React.useState([]);
  const pegs = React.useMemo(() => {
    const p = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col <= row; col++) {
        p.push({ x: 200 + (col - row/2) * 40, y: 60 + row * 40, r: 4 });
      }
    }
    return p;
  }, []);
  const slots = [0.1, 0.3, 0.5, 1, 2, 5, 2, 1, 0.5, 0.3, 0.1];
  const slotColors = ['#EF4444','#F97316','#EAB308','#22C55E','#06B6D4','#8B5CF6','#06B6D4','#22C55E','#EAB308','#F97316','#EF4444'];

  const drop = () => {
    if (dropping) return;
    setDropping(true); setResult(null);
    let x = 200 + (Math.random() - 0.5) * 20, y = 10, vx = 0, vy = 0;
    const path = [{x, y}];
    for (let i = 0; i < 300; i++) {
      vy += 0.3; x += vx; y += vy;
      for (const peg of pegs) {
        const dx = x - peg.x, dy = y - peg.y, dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < peg.r + 6) {
          const nx = dx/dist, ny = dy/dist;
          x = peg.x + nx*(peg.r+6); y = peg.y + ny*(peg.r+6);
          const dot = vx*nx + vy*ny;
          vx = (vx - 2*dot*nx)*0.6 + (Math.random()-0.5)*1.5;
          vy = (vy - 2*dot*ny)*0.6;
        }
      }
      if (x < 20) { x = 20; vx = Math.abs(vx)*0.6; }
      if (x > 380) { x = 380; vx = -Math.abs(vx)*0.6; }
      if (y > 390) { y = 390; break; }
      path.push({x, y});
    }
    const slotIdx = Math.min(slots.length-1, Math.max(0, Math.floor((x-20)/(360/slots.length))));
    const mult = slots[slotIdx], prize = Math.round(mult * 50);
    setBalls([{path, current: 0}]);
    const anim = setInterval(() => {
      setBalls(prev => prev.map(b => {
        if (b.current >= b.path.length - 1) {
          clearInterval(anim);
          setResult({ multiplier: mult, prize, slot: slotIdx });
          setDropping(false);
          if (prize > 0) onWin({ kwacha: prize });
          return {...b, done: true};
        }
        return {...b, current: Math.min(b.current + 3, b.path.length - 1)};
      }));
    }, 16);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, 400, 420);
      pegs.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fillStyle = 'rgba(6,182,212,0.6)'; ctx.fill(); });
      slots.forEach((s, i) => {
        const sw = 360/slots.length, sx = 20 + i*sw;
        ctx.fillStyle = result?.slot === i ? slotColors[i] : 'rgba(255,255,255,0.08)';
        ctx.fillRect(sx, 395, sw-2, 25);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(s+'x', sx+sw/2, 412);
      });
      balls.forEach(b => {
        const pos = b.path[b.current] || b.path[b.path.length-1];
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 8, 0, Math.PI*2);
        ctx.fillStyle = '#FBBF24'; ctx.shadowColor = '#FBBF24'; ctx.shadowBlur = 10;
        ctx.fill(); ctx.shadowBlur = 0;
      });
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  });

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-md anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-black tracking-tight">🎯 Plinko</h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex justify-center">
              <canvas ref={canvasRef} width={400} height={420} className="rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }} />
            </div>
            {result && (
              <div className="text-center mt-3 anim-result-zoom">
                <div className="text-3xl font-black" style={{color: slotColors[result.slot]}}>{result.multiplier}x</div>
                <div className="text-yellow-400 font-bold">+{result.prize} Coins!</div>
              </div>
            )}
            <button type="button" onClick={drop} disabled={dropping} className={`w-full mt-3 py-3 rounded-xl font-black text-lg transition-all ${dropping ? 'opacity-50' : 'btn-3d btn-3d-purple hover:scale-[1.02] active:scale-95'}`}>
              {dropping ? '⏳ Dropping...' : '🎯 Drop Ball'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== TAP FRENZY GAME =====
function TapFrenzyGame({ onClose, onWin }) {
  const [phase, setPhase] = React.useState('ready');
  const [taps, setTaps] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(10);
  const [result, setResult] = React.useState(null);
  const timerRef = React.useRef(null);
  const start = () => {
    setPhase('playing'); setTaps(0); setTimeLeft(10);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => { if (prev <= 1) { clearInterval(timerRef.current); setPhase('done'); return 0; } return prev - 1; });
    }, 1000);
  };
  React.useEffect(() => { if (phase === 'done') { const prize = taps >= 50 ? 150 : taps >= 30 ? 75 : taps >= 15 ? 30 : 10; setResult({ taps, prize }); onWin({ kwacha: prize }); } }, [phase]);
  React.useEffect(() => () => clearInterval(timerRef.current), []);
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-sm anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-6 text-center">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black tracking-tight">⚡ Tap Frenzy</h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            {phase === 'ready' && (<div><div className="text-6xl mb-4 anim-float">👆</div><p className="text-gray-400 mb-4">Tap as fast as you can in 10 seconds!</p><button type="button" onClick={start} className="w-full py-4 rounded-xl font-black text-lg btn-3d btn-3d-purple">START!</button></div>)}
            {phase === 'playing' && (<div><div className="text-5xl font-black text-cyan-400 mb-2">{timeLeft}s</div><button type="button" onClick={() => setTaps(t => t + 1)} className="w-48 h-48 mx-auto rounded-full font-black text-4xl transition-transform active:scale-90 flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #22D3EE 0%, #0891B2 100%)', boxShadow: '0 6px 0 #0E7490, 0 0 30px rgba(6,182,212,0.3)' }}>{taps}</button><div className="mt-3 h-2 bg-cyan-900/30 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all" style={{ width: `${(10-timeLeft)/10*100}%` }} /></div></div>)}
            {phase === 'done' && result && (<div className="anim-result-zoom"><div className="text-6xl mb-3">🎉</div><div className="text-4xl font-black text-cyan-400 mb-1">{result.taps} Taps!</div><div className="text-xl text-yellow-400 font-bold mb-4">+{result.prize} Coins</div><button type="button" onClick={onClose} className="w-full py-3 rounded-xl font-black btn-3d btn-3d-green">Collect</button></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== STOP THE CLOCK GAME =====
function StopClockGame({ onClose, onWin }) {
  const [phase, setPhase] = React.useState('ready');
  const [angle, setAngle] = React.useState(0);
  const [targetZone, setTargetZone] = React.useState({ start: 60, end: 120 });
  const [result, setResult] = React.useState(null);
  const animRef = React.useRef(null);
  const angleRef = React.useRef(0);
  const start = () => {
    setPhase('spinning'); setResult(null);
    const zone = { start: Math.random() * 300, end: 0 }; zone.end = zone.start + 40 + Math.random() * 20;
    setTargetZone(zone);
    const speed = 4 + Math.random() * 2;
    const spin = () => { angleRef.current = (angleRef.current + speed) % 360; setAngle(angleRef.current); animRef.current = requestAnimationFrame(spin); };
    animRef.current = requestAnimationFrame(spin);
  };
  const stop = () => {
    cancelAnimationFrame(animRef.current); setPhase('done');
    const a = angleRef.current;
    const inZone = (a >= targetZone.start && a <= targetZone.end) || (targetZone.end > 360 && (a >= targetZone.start || a <= targetZone.end - 360));
    const prize = inZone ? 200 : 0;
    setResult({ angle: a, inZone, prize });
    if (prize > 0) onWin({ kwacha: prize });
  };
  React.useEffect(() => () => cancelAnimationFrame(animRef.current), []);
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-sm anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-6 text-center">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black tracking-tight">⏱️ Stop the Clock</h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="8" />
                <path d={`M 100 100 L ${100+85*Math.cos((targetZone.start-90)*Math.PI/180)} ${100+85*Math.sin((targetZone.start-90)*Math.PI/180)} A 85 85 0 ${targetZone.end-targetZone.start>180?1:0} 1 ${100+85*Math.cos((targetZone.end-90)*Math.PI/180)} ${100+85*Math.sin((targetZone.end-90)*Math.PI/180)} Z`} fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.6)" strokeWidth="2" />
                <line x1="100" y1="100" x2={100+75*Math.cos((angle-90)*Math.PI/180)} y2={100+75*Math.sin((angle-90)*Math.PI/180)} stroke={result?(result.inZone?'#22C55E':'#EF4444'):'#22D3EE'} strokeWidth="3" strokeLinecap="round" />
                <circle cx="100" cy="100" r="6" fill="#22D3EE" />
              </svg>
            </div>
            {phase === 'ready' && <button type="button" onClick={start} className="w-full py-3 rounded-xl font-black text-lg btn-3d btn-3d-purple">Start Spinning</button>}
            {phase === 'spinning' && <button type="button" onClick={stop} className="w-full py-3 rounded-xl font-black text-lg btn-3d btn-3d-green anim-wiggle">STOP!</button>}
            {phase === 'done' && result && (<div className="anim-result-zoom"><div className="text-4xl font-black mb-2" style={{color:result.inZone?'#22C55E':'#EF4444'}}>{result.inZone?'🎯 PERFECT!':'❌ Missed!'}</div>{result.prize>0&&<div className="text-xl text-yellow-400 font-bold mb-3">+{result.prize} Coins!</div>}<button type="button" onClick={onClose} className="w-full py-3 rounded-xl font-black btn-3d btn-3d-purple">{result.inZone?'Collect!':'Try Again'}</button></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== TREASURE HUNT GAME =====
function TreasureHuntGame({ onClose, onWin }) {
  const gridSize = 5;
  const [grid, setGrid] = React.useState(() => {
    const treasurePos = Math.floor(Math.random() * 25);
    const bombs = new Set();
    while (bombs.size < 5) { const p = Math.floor(Math.random() * 25); if (p !== treasurePos) bombs.add(p); }
    return Array.from({length: 25}, (_, i) => ({
      revealed: false,
      content: i === treasurePos ? 'treasure' : bombs.has(i) ? 'bomb' : 'empty',
      distance: Math.abs(Math.floor(i/5) - Math.floor(treasurePos/5)) + Math.abs(i%5 - treasurePos%5)
    }));
  });
  const [gameOver, setGameOver] = React.useState(false);
  const [won, setWon] = React.useState(false);
  const [digs, setDigs] = React.useState(0);
  const dig = (idx) => {
    if (gameOver || grid[idx].revealed) return;
    setDigs(d => d + 1);
    setGrid(g => g.map((c, i) => i === idx ? {...c, revealed: true} : c));
    if (grid[idx].content === 'treasure') { setGameOver(true); setWon(true); onWin({ kwacha: Math.max(50, 300 - digs * 30) }); }
    else if (grid[idx].content === 'bomb') { setGameOver(true); }
  };
  const getHint = (d) => d <= 1 ? '🔥' : d <= 2 ? '🟡' : '🔵';
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-sm anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black tracking-tight">🗺️ Treasure Hunt</h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="text-sm text-gray-400 mb-3">Digs: {digs} | 🔥 Hot | 🟡 Warm | 🔵 Cold</div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {grid.map((cell, i) => (
                <button key={i} type="button" onClick={() => dig(i)} disabled={gameOver || cell.revealed}
                  className={`aspect-square rounded-xl text-xl flex items-center justify-center font-bold transition-all ${cell.revealed ? cell.content==='treasure'?'bg-yellow-500/30 border-2 border-yellow-400 anim-result-zoom':cell.content==='bomb'?'bg-red-500/30 border-2 border-red-400':'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/[0.06] border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:scale-105 active:scale-95'}`}
                >{cell.revealed ? (cell.content==='treasure'?'💎':cell.content==='bomb'?'💣':getHint(cell.distance)) : '❓'}</button>
              ))}
            </div>
            {gameOver && (<div className="text-center anim-result-zoom"><div className="text-3xl font-black mb-2">{won?'💎 FOUND IT!':'💣 BOOM!'}</div>{won&&<div className="text-yellow-400 font-bold mb-2">+{Math.max(50,300-digs*30)} Coins!</div>}<button type="button" onClick={onClose} className="w-full py-3 rounded-xl font-black btn-3d btn-3d-purple">{won?'Collect!':'Try Again'}</button></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== CLASSIC QUIZ =====
function ClassicQuiz({ onClose, onWin }) {
  const [questions] = React.useState(() => [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10));
  const [current, setCurrent] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const answer = (opt) => {
    if (selected) return; setSelected(opt);
    const correct = opt === questions[current].a;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) { setDone(true); const prize = (score + (correct?1:0)) * 20; if (prize > 0) onWin({ kwacha: prize }); }
      else { setCurrent(c => c + 1); setSelected(null); setFeedback(null); }
    }, 1200);
  };
  const q = questions[current];
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black tracking-tight">📚 Classic Quiz</h2>
              <div className="flex items-center gap-3"><span className="text-cyan-400 font-bold">{current+1}/{questions.length}</span><button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button></div>
            </div>
            {!done ? (<>
              <div className="h-1.5 bg-cyan-900/30 rounded-full mb-4 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" style={{width:`${(current/questions.length)*100}%`}} /></div>
              <div className="match-card p-5 mb-4 min-h-[80px] flex items-center"><p className="text-lg font-bold">{q.q}</p></div>
              <div className="grid grid-cols-2 gap-3">
                {q.opts.map((opt, i) => (
                  <button key={i} type="button" onClick={() => answer(opt)} disabled={!!selected}
                    className={`p-4 rounded-xl font-bold text-left transition-all ${selected===opt ? feedback==='correct'?'bg-green-500/30 border-2 border-green-400 scale-105':'bg-red-500/30 border-2 border-red-400 scale-95' : selected&&opt===q.a?'bg-green-500/20 border-2 border-green-400':'bg-white/[0.06] border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]'}`}
                  >{opt}</button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm"><span className="text-gray-400">Score: <strong className="text-cyan-400">{score}</strong></span><span className="text-gray-500">{q.cat}</span></div>
            </>) : (
              <div className="text-center anim-result-zoom py-6"><div className="text-5xl mb-3">{score>=8?'🏆':score>=5?'⭐':'📖'}</div><div className="text-3xl font-black text-cyan-400 mb-1">{score}/{questions.length}</div><div className="text-yellow-400 font-bold mb-4">+{score*20} Coins!</div><button type="button" onClick={onClose} className="px-8 py-3 rounded-xl font-black btn-3d btn-3d-green">Collect</button></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SPEED ROUND =====
function SpeedRound({ onClose, onWin }) {
  const [questions] = React.useState(() => [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 15));
  const [current, setCurrent] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(5);
  const [done, setDone] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const timerRef = React.useRef(null);
  React.useEffect(() => {
    if (done) return; setTimeLeft(5);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { setCurrent(c => { if (c+1>=questions.length){setDone(true);return c;} return c+1; }); return 5; } return t-1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, done]);
  React.useEffect(() => { if (done && score > 0) onWin({ kwacha: score * 15 }); }, [done]);
  const answer = (opt) => {
    if (feedback) return; clearInterval(timerRef.current);
    const correct = opt === questions[current].a;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
    setTimeout(() => { setFeedback(null); if (current+1>=questions.length) setDone(true); else setCurrent(c=>c+1); }, 600);
  };
  if (done) return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-md anim-scale-in text-center" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="text-5xl mb-3 anim-result-zoom">⚡</div><div className="text-3xl font-black text-cyan-400">{score}/{questions.length}</div>
          <div className="text-yellow-400 font-bold mb-4">+{score*15} Coins!</div><button type="button" onClick={onClose} className="px-8 py-3 rounded-xl font-black btn-3d btn-3d-green">Collect</button>
        </div>
      </div>
    </div>
  );
  const q = questions[current];
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3"><h2 className="text-xl font-black">⚡ Speed Round</h2><div className="flex items-center gap-3"><span className={`text-2xl font-black ${timeLeft<=2?'text-red-400 anim-wiggle':'text-cyan-400'}`}>{timeLeft}s</span><button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button></div></div>
            <div className="h-1.5 bg-cyan-900/30 rounded-full mb-4 overflow-hidden"><div className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full transition-all duration-1000" style={{width:`${(timeLeft/5)*100}%`}} /></div>
            <div className={`match-card p-5 mb-4 transition-colors ${feedback==='correct'?'bg-green-900/20':feedback==='wrong'?'bg-red-900/20':''}`}><p className="text-lg font-bold">{q.q}</p></div>
            <div className="grid grid-cols-2 gap-2">{q.opts.map((opt, i) => (<button key={i} type="button" onClick={() => answer(opt)} className="p-3 rounded-xl font-bold text-sm text-left bg-white/[0.06] border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all active:scale-95">{opt}</button>))}</div>
            <div className="mt-3 text-center text-sm text-gray-400">Score: <strong className="text-cyan-400">{score}</strong> | Q{current+1}/{questions.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== STREAK TRIVIA =====
function StreakTrivia({ onClose, onWin }) {
  const [questions] = React.useState(() => [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const answer = (opt) => {
    if (feedback) return;
    const correct = opt === questions[current].a;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) { const ns = streak+1; setStreak(ns); if (ns>bestStreak) setBestStreak(ns); }
    setTimeout(() => {
      if (!correct) { setDone(true); const prize = bestStreak*25; if (prize>0) onWin({kwacha:prize}); }
      else if (current+1>=questions.length) { setDone(true); onWin({kwacha:(streak+1)*25}); }
      else { setCurrent(c=>c+1); setFeedback(null); }
    }, 800);
  };
  if (done) return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-md anim-scale-in text-center" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="text-5xl mb-3 anim-result-zoom">🔥</div><div className="text-3xl font-black text-cyan-400 mb-1">{bestStreak} Streak!</div>
          <div className="text-yellow-400 font-bold mb-4">+{bestStreak*25} Coins!</div><button type="button" onClick={onClose} className="px-8 py-3 rounded-xl font-black btn-3d btn-3d-green">Collect</button>
        </div>
      </div>
    </div>
  );
  const q = questions[current];
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 anim-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3"><h2 className="text-xl font-black">🔥 Streak Trivia</h2><div className="flex items-center gap-3"><span className="text-xl font-black text-orange-400">🔥{streak}</span><button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button></div></div>
            <div className="text-center mb-3"><span className="text-sm text-gray-400">Multiplier: </span><span className="text-cyan-400 font-black">{streak+1}x</span><span className="text-sm text-gray-400"> — one wrong answer ends the game!</span></div>
            <div className={`match-card p-5 mb-4 transition-colors ${feedback==='correct'?'bg-green-900/20':feedback==='wrong'?'bg-red-900/20':''}`}><p className="text-lg font-bold">{q.q}</p></div>
            <div className="grid grid-cols-2 gap-3">
              {q.opts.map((opt, i) => (
                <button key={i} type="button" onClick={() => answer(opt)} disabled={!!feedback}
                  className={`p-4 rounded-xl font-bold text-left transition-all ${feedback&&opt===q.a?'bg-green-500/30 border-2 border-green-400':feedback==='wrong'&&opt!==q.a?'opacity-50':'bg-white/[0.06] border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]'}`}
                >{opt}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function GamificationPlatform() {
  const [tab, setTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [activeTrivia, setActiveTrivia] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(null);
  const [coinBounce, setCoinBounce] = useState(false);
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [notif, setNotif] = useState(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  // Avatar options
  const AVATARS = [
    '😎', '🤩', '😈', '👻', '🤖', '👽', '🦁', '🐯', '🦊', '🐺',
    '🦅', '🦉', '🐲', '🔥', '⚡', '💀', '👑', '🎮', '🎯', '🏆',
    '💎', '🌟', '🚀', '🎪', '🎭', '🃏', '🎲', '🎰', '💰', '🏴‍☠️'
  ];

  // Add CSS to hide scrollbars
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [user, setUser] = useState({
    avatar: '😎',
    kwacha: 500,
    gems: 10,
    diamonds: 0,
    xp: 0,
    deposits: 0,
    bets: 0,
    wins: 0,
    streak: 1,
    gamesPlayed: 0,
    predictions: [],
    missionsComplete: [],
    missionProgress: {},
    dailyDay: 1,
    dailyClaimed: false,
    referrals: 0,
    gamePlays: { wheel: 3, scratch: 5, dice: 5, memory: 3, highlow: 5, katouch: 99, plinko: 5, tapfrenzy: 5, stopclock: 5, treasure: 3 },
  });

  const level = getLevel(user.xp);
  const nextLevel = getNextLevel(user.xp);
  const xpProgress = getXPProgress(user.xp);
  const vip = getVIP(user.deposits);

  // Helper functions
  const showNotif = (msg, type = 'success') => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 2500);
  };
  
  const addCoins = (n) => setUser(u => ({ ...u, kwacha: u.kwacha + n }));
  const addGems = (n) => setUser(u => ({ ...u, gems: u.gems + n }));
  const addDiamonds = (n) => setUser(u => ({ ...u, diamonds: u.diamonds + n }));
  const addXP = (n) => setUser(u => ({ ...u, xp: u.xp + n }));
  const useGamePlay = (game) => setUser(u => ({ 
    ...u, 
    gamePlays: { ...u.gamePlays, [game]: Math.max(0, u.gamePlays[game] - 1) } 
  }));

  const handleWin = (prize, name) => {
    if (typeof prize === 'number') {
      addCoins(prize);
      showNotif(`🎉 +${prize} Coins!`);
    } else {
      if (prize.kwacha) addCoins(prize.kwacha);
      if (prize.gems) addGems(prize.gems);
      if (prize.diamonds) addDiamonds(prize.diamonds);
      if (prize.xp) addXP(prize.xp);
      showNotif(`🎉 Won: ${name}!`);
    }
    setUser(u => ({ ...u, gamesPlayed: u.gamesPlayed + 1 }));
  };

  const playGame = (gameId) => {
    if (user.gamePlays[gameId] > 0) {
      useGamePlay(gameId);
    } else if (user.kwacha >= (MINIGAMES.find(g => g.id === gameId)?.cost || 0)) {
      addCoins(-(MINIGAMES.find(g => g.id === gameId)?.cost || 0));
    }
    setActiveGame(gameId);
  };

  const tabs = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'missions', icon: Target, label: 'Missions' },
    { id: 'quests', icon: Map, label: 'Quests' },
    { id: 'minigames', icon: Gamepad2, label: 'Games' },
    { id: 'store', icon: Store, label: 'Store' },
    { id: 'predictions', icon: Trophy, label: 'Predict' },
    { id: 'daily', icon: Gift, label: 'Daily' },
    { id: 'vip', icon: Crown, label: 'VIP' },
    { id: 'referrals', icon: Users, label: 'Refer' },
    { id: 'leaderboard', icon: Medal, label: 'Leaders' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];
  const triviaGames = [
    { id: 'classic', name: 'Classic Quiz', desc: '10 questions, no timer', icon: '📚', color: 'cyan' },
    { id: 'speed', name: 'Speed Round', desc: '5 seconds per question!', icon: '⚡', color: 'yellow' },
    { id: 'streak', name: 'Streak Trivia', desc: 'One wrong = game over', icon: '🔥', color: 'orange' },
  ];


  return (
    <div className="flex h-screen bg-[#030810] text-white overflow-hidden relative">
      <Grainient />
      <ThemeCSS />
      {/* Notification Toast */}
      {notif && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-2xl anim-slide-down ${notif.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">{notif.msg}</span>
          </div>
        </div>
      )}

      {/* Tutorial Modal */}
      
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[80] p-4 anim-fade-in" onClick={() => setShowBuyModal(null)}>
          <div className="w-full max-w-md anim-scale-in" onClick={e => e.stopPropagation()}>
            <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #030810 100%)', border: '2px solid rgba(6,182,212,0.25)' }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">Buy {showBuyModal === 'coins' ? 'Coins' : showBuyModal === 'gems' ? 'Gems' : 'Diamonds'}</h2>
                  <button type="button" onClick={() => setShowBuyModal(null)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  {(showBuyModal === 'coins' ? [{a:500,p:'K50',b:''},{a:2000,p:'K150',b:'+200 bonus'},{a:5000,p:'K300',b:'+800 bonus',best:true},{a:15000,p:'K750',b:'+3000 bonus'}]
                  : showBuyModal === 'gems' ? [{a:50,p:'K100',b:''},{a:150,p:'K250',b:'+20 bonus'},{a:500,p:'K600',b:'+100 bonus',best:true}]
                  : [{a:10,p:'K200',b:''},{a:30,p:'K500',b:'+5 bonus'},{a:100,p:'K1500',b:'+25 bonus',best:true}]
                  ).map((pkg,i) => {
                    const col = showBuyModal==='coins'?{b:'rgba(234,179,8,0.3)',bg:'rgba(234,179,8,0.06)',t:'text-yellow-400'}:showBuyModal==='gems'?{b:'rgba(16,185,129,0.3)',bg:'rgba(16,185,129,0.06)',t:'text-emerald-400'}:{b:'rgba(59,130,246,0.3)',bg:'rgba(59,130,246,0.06)',t:'text-blue-400'};
                    return (
                      <button key={i} type="button" onClick={()=>{const k=showBuyModal==='coins'?'kwacha':showBuyModal;setUser(u=>({...u,[k]:u[k]+pkg.a}));showNotif(`+${pkg.a.toLocaleString()} ${showBuyModal}!`);setShowBuyModal(null);}}
                        className="w-full flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] relative"
                        style={{border:`1.5px solid ${pkg.best?'rgba(6,182,212,0.6)':col.b}`,background:pkg.best?'rgba(6,182,212,0.08)':col.bg}}>
                        {pkg.best && <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-cyan-500 text-black text-xs font-black rounded-md">BEST VALUE</span>}
                        <div className="flex items-center gap-3">
                          <img src={CURRENCY_ICONS[showBuyModal==='coins'?'coin':showBuyModal==='gems'?'gem':'diamond']} alt="" className="w-10 h-10 object-contain" />
                          <div className="text-left"><div className={`font-black text-xl ${col.t}`}>{pkg.a.toLocaleString()}</div>{pkg.b && <div className="text-xs text-cyan-400 font-bold">{pkg.b}</div>}</div>
                        </div>
                        <div className="px-4 py-2 rounded-lg font-black text-sm btn-3d btn-3d-green">{pkg.p}</div>
                      </button>);
                  })}
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">Demo mode &#8212; credits are free</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTutorial && <TutorialModal tutorialKey={activeTutorial} onClose={() => setActiveTutorial(null)} />}

      {/* Game Modals */}
      {activeGame === 'wheel' && (
        <WheelGame 
          onClose={() => setActiveGame(null)} 
          onWin={handleWin} 
          playsLeft={user.gamePlays.wheel} 
        />
      )}
      {activeGame === 'scratch' && (
        <ScratchGame 
          onClose={() => setActiveGame(null)} 
          onWin={(n) => {
            addCoins(n);
            showNotif(`🎉 +${n} Coins!`);
            setUser(u => ({ ...u, gamesPlayed: u.gamesPlayed + 1 }));
          }} 
        />
      )}
      {activeGame === 'dice' && (
        <DiceGame 
          onClose={() => setActiveGame(null)} 
          onWin={(n) => {
            addCoins(n);
            showNotif(`🎉 +${n} Coins!`);
            setUser(u => ({ ...u, gamesPlayed: u.gamesPlayed + 1 }));
          }} 
        />
      )}
      {activeGame === 'memory' && (
        <MemoryGame 
          onClose={() => setActiveGame(null)} 
          onWin={(n) => {
            addCoins(n);
            addXP(20);
            showNotif(`🎉 +${n} Coins + 20 XP!`);
            setUser(u => ({ ...u, gamesPlayed: u.gamesPlayed + 1 }));
          }} 
        />
      )}
      {activeGame === 'highlow' && (
        <HighLowGame 
          onClose={() => setActiveGame(null)} 
          onWin={(n) => {
            addCoins(n);
            showNotif(`🎉 +${n} Coins!`);
            setUser(u => ({ ...u, gamesPlayed: u.gamesPlayed + 1 }));
          }} 
        />
      )}
      {activeGame === 'katouch' && (
        <KaTouchGame 
          onClose={() => setActiveGame(null)} 
          onWin={(n) => {
            addCoins(n);
            addXP(30);
            showNotif(`🏃 +${n} Coins + 30 XP!`);
            setUser(u => ({ ...u, gamesPlayed: u.gamesPlayed + 1 }));
          }} 
        />
      )}
      {activeGame === 'plinko' && <PlinkoGame onClose={() => setActiveGame(null)} onWin={(p) => handleWin(p, 'Plinko Drop')} />}
      {activeGame === 'tapfrenzy' && <TapFrenzyGame onClose={() => setActiveGame(null)} onWin={(p) => handleWin(p, 'Tap Frenzy')} />}
      {activeGame === 'stopclock' && <StopClockGame onClose={() => setActiveGame(null)} onWin={(p) => handleWin(p, 'Stop the Clock')} />}
      {activeGame === 'treasure' && <TreasureHuntGame onClose={() => setActiveGame(null)} onWin={(p) => handleWin(p, 'Treasure Hunt')} />}
      {activeTrivia === 'classic' && <ClassicQuiz onClose={() => setActiveTrivia(null)} onWin={(p) => handleWin(p, 'Classic Quiz')} />}
      {activeTrivia === 'speed' && <SpeedRound onClose={() => setActiveTrivia(null)} onWin={(p) => handleWin(p, 'Speed Round')} />}
      {activeTrivia === 'streak' && <StreakTrivia onClose={() => setActiveTrivia(null)} onWin={(p) => handleWin(p, 'Streak Trivia')} />}

      {/* Avatar Selector Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[80] p-4">
          <div className="bg-gradient-to-b from-[#0a1828] to-[#030810] rounded-3xl max-w-md w-full p-6 anim-scale-in" onClick={(e) => e.stopPropagation()} style={{ border: "2px solid rgba(6,182,212,0.25)", boxShadow: "0 0 40px rgba(6,182,212,0.1), 0 20px 60px rgba(0,0,0,0.5)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black tracking-tight">Choose Avatar</h2>
              <button 
                type="button" 
                onClick={() => setShowAvatarSelector(false)} 
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Current Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-5xl shadow-lg shadow-cyan-500/50">
                {user.avatar}
              </div>
            </div>
            
            {/* Avatar Grid */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => {
                    setUser(u => ({ ...u, avatar }));
                    showNotif('Avatar updated!');
                    setShowAvatarSelector(false);
                  }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 ${user.avatar === avatar ? 'bg-gradient-to-br from-cyan-400 to-blue-500 ring-2 ring-cyan-400' : 'bg-black/30 hover:bg-white/[0.06]'}`}
                >
                  {avatar}
                </button>
              ))}
            </div>
            
            <p className="text-center text-gray-400 text-sm">
              Click an avatar to select it
            </p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky md:top-0 top-0 left-0 z-40 w-64 h-full md:h-screen flex-shrink-0 transition-transform overflow-y-auto`} style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: '1px solid rgba(6,182,212,0.1)', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center font-black text-lg shadow-lg shadow-orange-500/30">
              100x
            </div>
            <div>
              <div className="font-bold text-lg">100xBet</div>
              <div className="text-xs text-cyan-400">REWARDS</div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAvatarSelector(true)}
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl hover:scale-105 transition-transform group"
              >
                {user.avatar}
                <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-xs">Edit</span>
                </div>
              </button>
              <button 
                type="button" 
                onClick={() => setTab('profile')}
                className="flex-1 text-left"
              >
                <div className="font-bold">Player1</div>
                <div className="text-xs text-cyan-300">{level.icon} {level.name}</div>
              </button>
            </div>
            <div className="mt-2 h-2 bg-cyan-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" 
                style={{ width: `${xpProgress}%` }} 
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {user.xp} / {nextLevel?.xp || 'MAX'} XP
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {tabs.map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button 
                  key={t.id} 
                  type="button" 
                  onClick={() => { setTab(t.id); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-200 ${active ? 'text-black font-black' : 'text-gray-300 hover:text-white'}`}
                  style={active ? {
                    background: 'linear-gradient(180deg, #22D3EE 0%, #06B6D4 40%, #0891B2 100%)',
                    boxShadow: '0 4px 0 #0E7490, 0 6px 20px rgba(6,182,212,0.35), 0 0 20px rgba(34,211,238,0.15)',
                    border: '2px solid rgba(34,211,238,0.5)'
                  } : {
                    background: 'rgba(0,0,0,0.7)',
                    border: '2px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-bold text-[15px]">{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Demo Controls */}
          <div className="mt-6 p-4 rounded-2xl" style={{ background: 'rgba(0,0,0,0.6)', border: '2px solid rgba(6,182,212,0.15)' }}>
            <div className="flex items-center gap-2 text-xs text-cyan-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold">DEMO CONTROLS</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={() => {
                  addCoins(100);
                  addXP(50);
                  setUser(u => ({ ...u, deposits: u.deposits + 100 }));
                  showNotif('+100K + 50XP!');
                }} 
                className="py-2 rounded-lg text-xs font-black btn-3d btn-3d-green"
              >
                +Deposit
              </button>
              <button 
                type="button" 
                onClick={() => {
                  addXP(5);
                  setUser(u => ({ ...u, bets: u.bets + 1 }));
                  showNotif('+1 Bet!');
                }} 
                className="py-2 rounded-lg text-xs font-black btn-3d btn-3d-blue"
              >
                +Bet
              </button>
              <button 
                type="button" 
                onClick={() => {
                  addCoins(50);
                  addXP(15);
                  setUser(u => ({ ...u, wins: u.wins + 1 }));
                  showNotif('+Win!');
                }} 
                className="py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-xs font-bold"
              >
                +Win
              </button>
              <button 
                type="button" 
                onClick={() => {
                  addXP(100);
                  showNotif('+100 XP!');
                }} 
                className="py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-xs font-bold"
              >
                +100 XP
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden anim-fade-in" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Header */}
        <header className="p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Mobile Menu Button */}
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 hover:bg-cyan-500/15 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Spacer for centering on desktop */}
            <div className="hidden md:block w-32"></div>

            {/* Currency Display - Centered */}
            <div className="flex items-center justify-center gap-3 flex-1 md:flex-none">
              <button type="button" onClick={() => setShowBuyModal('coins')} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 border-yellow-500/40 backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] group ${coinBounce ? 'anim-coin-bounce' : ''}`} style={{ background: 'rgba(0,0,0,0.4)', boxShadow: '0 0 15px rgba(234,179,8,0.1)' }}>
                <img src={CURRENCY_ICONS.coin} alt="Coins" className="w-8 h-8 object-contain" />
                <div className="text-left">
                  <div className="font-black text-lg text-yellow-400 leading-tight">{user.kwacha.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider">COINS</div>
                </div>
                <span className="ml-1 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-black text-sm group-hover:bg-yellow-500/30 transition-colors">+</span>
              </button>
              <button type="button" onClick={() => setShowBuyModal('gems')} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 border-emerald-500/40 backdrop-blur-sm transition-all hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] group" style={{ background: 'rgba(0,0,0,0.4)', boxShadow: '0 0 15px rgba(16,185,129,0.1)' }}>
                <img src={CURRENCY_ICONS.gem} alt="Gems" className="w-8 h-8 object-contain" />
                <div className="text-left">
                  <div className="font-black text-lg text-green-400 leading-tight">{user.gems}</div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider">GEMS</div>
                </div>
                <span className="ml-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm group-hover:bg-emerald-500/30 transition-colors">+</span>
              </button>
              <button type="button" onClick={() => setShowBuyModal('diamonds')} className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 border-blue-500/40 backdrop-blur-sm transition-all hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] group" style={{ background: 'rgba(0,0,0,0.4)', boxShadow: '0 0 15px rgba(59,130,246,0.1)' }}>
                <img src={CURRENCY_ICONS.diamond} alt="Diamonds" className="w-8 h-8 object-contain" />
                <div className="text-left">
                  <div className="font-black text-lg text-blue-400 leading-tight">{user.diamonds}</div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider">DIAMONDS</div>
                </div>
                <span className="ml-1 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm group-hover:bg-blue-500/30 transition-colors">+</span>
              </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Level {level.level}</div>
                  <div className="font-bold text-cyan-400">{level.name}</div>
                </div>
                <div className="text-3xl">{level.icon}</div>
              </div>
              <button type="button" className="relative p-2 hover:bg-cyan-500/15 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {/* ============================================================= */}
          {/* OVERVIEW TAB */}
          {/* ============================================================= */}
          {tab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-3xl">
                <img src={IMAGES.welcomeBanner} alt="" className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8">
                  <div>
                    <h1 className="text-3xl font-black mb-2">Welcome back! 👋</h1>
                    <p className="text-white/80 mb-4">Ready to win big today?</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="font-bold">{user.streak} day streak</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">{user.xp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions - 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Daily Reward Card */}
                <div className="rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-green-500/50 backdrop-blur-sm bg-black/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]" onClick={() => setTab('daily')}>
                  <div className="relative h-44">
                    <img src={IMAGES.dailyGift} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setActiveTutorial('daily'); }} 
                      className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {!user.dailyClaimed && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 rounded-full text-sm font-bold animate-pulse">
                        CLAIM!
                      </span>
                    )}
                    {user.dailyClaimed && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Check className="w-12 h-12 text-green-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-lg mb-1">
                      {user.dailyClaimed ? 'Claimed Today!' : 'Daily Reward'}
                    </div>
                    <div className="text-sm text-gray-400 mb-3">Day {user.dailyDay} of 7</div>
                    {!user.dailyClaimed && (
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation();
                          const r = DAILY_REWARDS[user.dailyDay - 1];
                          addCoins(r.kwacha);
                          if (r.gems) addGems(r.gems);
                          if (r.diamonds) addDiamonds(r.diamonds);
                          addXP(20);
                          setUser(u => ({ 
                            ...u, 
                            dailyClaimed: true, 
                            dailyDay: u.dailyDay >= 7 ? 1 : u.dailyDay + 1 
                          }));
                          showNotif(`🎉 +${r.kwacha} Coins!`);
                        }} 
                        className="w-full py-3 bg-gradient-to-r rounded-2xl font-black btn-3d btn-3d-green"
                      >
                        Claim!
                      </button>
                    )}
                  </div>
                </div>

                {/* Wheel Card */}
                <div className="rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-sm bg-black/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]" onClick={() => playGame('wheel')}>
                  <div className="relative h-44">
                    <img src={IMAGES.wheel} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setActiveTutorial('wheel'); }} 
                      className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {user.gamePlays.wheel > 0 && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-cyan-500 rounded-full text-sm font-bold">
                        {user.gamePlays.wheel} FREE
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-black text-lg mb-1">Spin Wheel</div>
                        <div className="text-sm text-gray-400">{user.gamePlays.wheel} spins left</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Predictions Card */}
                <div className="rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-blue-500/50 backdrop-blur-sm bg-black/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]" onClick={() => setTab('predictions')}>
                  <div className="relative h-44">
                    <img src={IMAGES.soccerBall} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setActiveTutorial('predictions'); }} 
                      className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-blue-500 rounded-full text-sm font-bold">
                      {MATCHES.length} LIVE
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-black text-lg mb-1">Predictions</div>
                        <div className="text-sm text-gray-400">{MATCHES.length} matches available</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Jackpot Banner */}
              <button 
                type="button" 
                onClick={() => setTab('minigames')} 
                className="w-full rounded-2xl overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img src={IMAGES.jackpotBanner} alt="" className="w-full h-44 object-cover" />
              </button>

              {/* Missions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Missions</h2>
                    <button 
                      type="button" 
                      onClick={() => setActiveTutorial('missions')} 
                      className="p-1 hover:bg-white/10 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5 text-cyan-400" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setTab('missions')} 
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MISSIONS.filter(m => !user.missionsComplete.includes(m.id)).slice(0, 3).map(m => (
                    <div key={m.id} onClick={() => setTab('missions')} className="rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-sm bg-black/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                      <div className="relative h-40">
                        <img src={IMAGES[m.image]} alt="" className="w-full h-full object-cover" />
                        {m.hot && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 rounded text-sm font-bold">
                            🔥 HOT
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="font-bold text-lg mb-1">{m.name}</div>
                        <div className="text-sm text-gray-400 mb-3">{m.desc}</div>
                        <div className="flex items-center gap-3">
                          <span className="text-yellow-400 font-bold">🪙 {m.reward.kwacha}</span>
                          {m.reward.gems && (
                            <span className="text-green-400 font-bold">💚 {m.reward.gems}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Store Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Featured Store</h2>
                    <button 
                      type="button" 
                      onClick={() => setActiveTutorial('store')} 
                      className="p-1 hover:bg-white/10 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5 text-cyan-400" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setTab('store')} 
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {STORE_ITEMS.filter(i => i.featured || i.isNew).slice(0, 4).map(item => (
                    <div key={item.id} onClick={() => setTab('store')} className="rounded-xl overflow-hidden border border-cyan-500/20 backdrop-blur-sm bg-black/30 cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:border-cyan-500/50 transition-all">
                      <div className="relative h-32">
                        <img src={IMAGES[item.image]} alt="" className="w-full h-full object-cover" />
                        {item.isNew && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-green-500 rounded text-xs font-bold">
                            NEW
                          </span>
                        )}
                        {item.featured && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-amber-500 rounded text-xs font-bold">
                            ⭐
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="font-bold truncate">{item.name}</div>
                        <div className="text-yellow-400 font-bold">🪙 {item.price.kwacha}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* MINIGAMES TAB */}
          {/* ============================================================= */}
          {tab === 'minigames' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight">Minigames</h1>
                <p className="text-gray-400">Play games and win prizes!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MINIGAMES.map(game => (
                  <div key={game.id} className="rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-sm bg-black/30 transition-all cursor-pointer" onClick={() => playGame(game.id)}>
                    <div className="relative h-44">
                      <img src={IMAGES[game.image]} alt="" className="w-full h-full object-cover" />
                      {user.gamePlays[game.id] > 0 && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 rounded-full text-sm font-bold">
                          {user.gamePlays[game.id]} FREE
                        </span>
                      )}
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setActiveTutorial(game.id); }} 
                        className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="font-black text-lg mb-1">{game.name}</div>
                      <div className="text-sm text-gray-400 mb-2">{game.desc}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${user.gamePlays[game.id] > 0 ? 'text-cyan-400' : 'text-gray-500'}`}>
                          {user.gamePlays[game.id] > 0 ? `${user.gamePlays[game.id]} Free Plays` : `${game.cost} Coins`}
                        </span>
                        <ChevronRight className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trivia Games */}
              <div className="mt-8">
                <h3 className="text-3xl font-black tracking-tight mb-4">🧠 Trivia</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {triviaGames.map(game => (
                    <button key={game.id} type="button" onClick={() => setActiveTrivia(game.id)} className="card-interactive p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
                      <div className="text-3xl mb-2">{game.icon}</div>
                      <div className="font-black text-lg">{game.name}</div>
                      <div className="text-sm text-gray-400 mt-1">{game.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* MISSIONS TAB */}
          {/* ============================================================= */}
          {tab === 'missions' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={IMAGES.target} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Missions</h1>
                  <p className="text-gray-400">{user.missionsComplete.length}/{MISSIONS.length} completed</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('missions')} 
                  className="ml-auto p-2 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MISSIONS.map(m => {
                  const done = user.missionsComplete.includes(m.id);
                  const progress = user.missionProgress[m.id] || 0;
                  return (
                    <div key={m.id} 
                      onClick={() => {
                        if (!done) {
                          addCoins(m.reward.kwacha);
                          if (m.reward.gems) addGems(m.reward.gems);
                          addXP(m.xp);
                          setUser(u => ({ ...u, missionsComplete: [...u.missionsComplete, m.id] }));
                          showNotif(`✅ ${m.name} completed! +${m.reward.kwacha} Coins`);
                        }
                      }}
                      className={`rounded-2xl overflow-hidden border cursor-pointer backdrop-blur-sm bg-black/30 hover:scale-[1.02] active:scale-[0.98] ${done ? 'border-green-500/50 opacity-70' : 'border-cyan-500/20 hover:border-cyan-500/50'} transition-all`}>
                      <div className="relative h-40">
                        <img src={IMAGES[m.image]} alt="" className="w-full h-full object-cover" />
                        {m.hot && !done && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 rounded text-sm font-bold">
                            🔥 HOT
                          </span>
                        )}
                        {done && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-10 h-10" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="font-bold text-lg mb-1">{m.name}</div>
                        <div className="text-sm text-gray-400 mb-3">{m.desc}</div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-yellow-400 font-bold">🪙 {m.reward.kwacha}</span>
                          {m.reward.gems && <span className="text-green-400 font-bold">💚 {m.reward.gems}</span>}
                          <span className="text-cyan-400 font-bold">⚡ {m.xp} XP</span>
                        </div>
                        <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${done ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'}`} 
                            style={{ width: `${(progress / m.target) * 100}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* DAILY TAB */}
          {/* ============================================================= */}
          {tab === 'daily' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={IMAGES.dailyGift} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Daily Rewards</h1>
                  <p className="text-gray-400">Login every day for bigger rewards!</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('daily')} 
                  className="ml-auto p-2 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm bg-black/30">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-3xl font-black tracking-tight">{user.streak} Day Streak</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {DAILY_REWARDS.map((r, i) => {
                    const day = i + 1;
                    const isPast = day < user.dailyDay;
                    const isCurrent = day === user.dailyDay;
                    const canClaim = isCurrent && !user.dailyClaimed;
                    return (
                      <button 
                        key={day} 
                        type="button" 
                        onClick={() => {
                          if (canClaim) {
                            addCoins(r.kwacha);
                            if (r.gems) addGems(r.gems);
                            if (r.diamonds) addDiamonds(r.diamonds);
                            addXP(20);
                            setUser(u => ({ 
                              ...u, 
                              dailyClaimed: true, 
                              dailyDay: u.dailyDay >= 7 ? 1 : u.dailyDay + 1 
                            }));
                            showNotif(`🎉 +${r.kwacha} Coins!`);
                          }
                        }} 
                        disabled={!canClaim} 
                        className={`p-3 rounded-2xl text-center transition-all ${isPast ? 'bg-green-500/20 border-2 border-green-500/50' : isCurrent ? canClaim ? 'bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50' : 'bg-cyan-500/15 border-2 border-cyan-500/50' : 'bg-black/30 border-2 border-gray-700/50'}`}
                      >
                        <div className="text-xs text-gray-400 mb-1">Day {day}</div>
                        <div className={`font-bold ${isPast ? 'text-green-400' : 'text-yellow-400'}`}>{r.kwacha}</div>
                        {r.gems && <div className="text-xs text-green-400">+{r.gems}g</div>}
                        {r.diamonds && <div className="text-xs text-blue-400">+💎</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* VIP TAB */}
          {/* ============================================================= */}
          {tab === 'vip' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={IMAGES.crown} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h1 className="text-3xl font-black tracking-tight">VIP Club</h1>
                  <p className="text-gray-400">Exclusive benefits for loyal players</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('vip')} 
                  className="ml-auto p-2 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/50">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{vip.icon}</div>
                  <div>
                    <div className="text-2xl font-black">{vip.name}</div>
                    <div className="text-cyan-300">{vip.cashback}% Cashback on losses</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {VIP_TIERS.map(tier => (
                  <div key={tier.name} className={`rounded-2xl p-4 border backdrop-blur-sm bg-black/30 ${tier.name === vip.name ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-cyan-500/20'}`}>
                    <div className="text-4xl mb-2">{tier.icon}</div>
                    <div className="font-bold">{tier.name}</div>
                    <div className="text-sm text-gray-400">K{tier.min}+ deposits</div>
                    <div className="text-sm text-green-400 mt-2">{tier.cashback}% cashback</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* STORE TAB */}
          {/* ============================================================= */}
          {tab === 'store' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-black tracking-tight">Store</h1>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('store')} 
                  className="p-2 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={IMAGES.newArrivals} alt="" className="w-full h-44 object-cover" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STORE_ITEMS.map(item => {
                  const canBuy = user.kwacha >= item.price.kwacha && (!item.price.gems || user.gems >= item.price.gems);
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        if (canBuy) {
                          addCoins(-item.price.kwacha);
                          if (item.price.gems) addGems(-item.price.gems);
                          showNotif(`Purchased ${item.name}!`);
                        } else {
                          showNotif('Not enough currency!', 'error');
                        }
                      }}
                      className={`rounded-2xl overflow-hidden border cursor-pointer backdrop-blur-sm bg-black/30 transition-all hover:scale-[1.02] active:scale-[0.98] ${item.featured ? 'border-amber-500/50 hover:border-amber-400' : 'border-cyan-500/20 hover:border-cyan-500/50'}`}
                    >
                      <div className="relative h-44">
                        <img src={IMAGES[item.image]} alt="" className="w-full h-full object-cover" />
                        {item.featured && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-amber-500 rounded text-sm font-bold text-black">⭐</span>
                        )}
                        {item.isNew && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 rounded text-sm font-bold">NEW</span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="font-black text-lg mb-1">{item.name}</div>
                        <div className="text-sm text-gray-400 mb-3">{item.desc}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 font-bold">🪙 {item.price.kwacha}</span>
                            {item.price.gems && <span className="text-green-400 font-bold">💚 {item.price.gems}</span>}
                          </div>
                          <ChevronRight className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* PREDICTIONS TAB */}
          {/* ============================================================= */}
          {tab === 'predictions' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={IMAGES.soccerBall} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Match Predictions</h1>
                  <p className="text-gray-400">Predict outcomes and win Coins!</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('predictions')} 
                  className="ml-auto p-2 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {MATCHES.map(m => {
                  const pred = user.predictions.find(p => p.id === m.id);
                  return (
                    <div key={m.id} className={`rounded-2xl p-5 border backdrop-blur-sm bg-black/30 ${m.featured ? 'border-amber-500/50' : 'border-cyan-500/20'}`}>
                      {m.featured && (
                        <div className="text-xs text-amber-400 font-bold mb-2">⭐ FEATURED MATCH</div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{m.flag}</span>
                          <span>{m.league}</span>
                          <span>•</span>
                          <span>{m.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 font-bold">
                          🪙 +{m.reward}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg">{m.home}</div>
                        </div>
                        <div className="text-3xl font-black tracking-tight text-gray-500 px-4">VS</div>
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg">{m.away}</div>
                        </div>
                      </div>
                      {pred ? (
                        <div className="text-center p-3 bg-cyan-500/15 rounded-xl">
                          <span className="text-cyan-300">
                            Your prediction: <strong>{pred.choice === 'home' ? m.home : pred.choice === 'away' ? m.away : 'Draw'}</strong>
                          </span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {['home', 'draw', 'away'].map(choice => (
                            <button 
                              key={choice} 
                              type="button" 
                              onClick={() => {
                                setUser(u => ({ ...u, predictions: [...u.predictions, { id: m.id, choice }] }));
                                addXP(5);
                                showNotif('+5 XP!');
                              }} 
                              className="p-3 bg-black/30 hover:bg-cyan-600/20 border border-transparent hover:border-cyan-500 rounded-xl transition-all"
                            >
                              <div className="font-bold text-lg">
                                {choice === 'home' ? m.h : choice === 'draw' ? m.d : m.a}
                              </div>
                              <div className="text-xs text-gray-400 capitalize">{choice}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* QUESTS TAB */}
          {/* ============================================================= */}
          {tab === 'quests' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={IMAGES.questMap} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Quests</h1>
                  <p className="text-gray-400">Multi-step adventures for bigger rewards!</p>
                </div>
              </div>
              {QUESTS.map(q => (
                <div key={q.id} className="rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-sm bg-black/30 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                  onClick={() => showNotif(`🗺️ Quest "${q.name}" — coming soon!`)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 h-48 md:h-auto">
                      <img src={IMAGES[q.image]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-black text-xl">{q.name}</div>
                        <ChevronRight className="w-5 h-5 text-cyan-400" />
                      </div>
                      <p className="text-gray-400 mb-3">{q.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {q.steps.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-black/30 border border-cyan-500/15 rounded-lg text-xs text-gray-400">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400 font-bold">🪙 {q.reward.kwacha}</span>
                        <span className="text-green-400 font-bold">💚 {q.reward.gems}</span>
                        <span className="text-cyan-400 font-bold">⚡ {q.xp} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================= */}
          {/* REFERRALS TAB */}
          {/* ============================================================= */}
          {tab === 'referrals' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-black tracking-tight">Referrals</h1>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('referrals')} 
                  className="p-2 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/50">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">Your Referral Code</h3>
                  <p className="text-gray-400">Earn 500 Coins + 50 Gems per referral!</p>
                </div>
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 rounded-xl p-4 font-mono backdrop-blur-sm bg-black/50 text-2xl text-center">PLAYER1X</div>
                  <button 
                    type="button" 
                    onClick={() => {
                      navigator.clipboard.writeText('PLAYER1X');
                      showNotif('Code copied!');
                    }} 
                    className="px-6 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-bold"
                  >
                    <Copy className="w-6 h-6" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                    <div className="text-3xl font-black text-cyan-400">{user.referrals}</div>
                    <div className="text-gray-400">Referrals</div>
                  </div>
                  <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                    <div className="text-3xl font-black text-yellow-400">{user.referrals * 500}</div>
                    <div className="text-gray-400">Coins</div>
                  </div>
                  <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                    <div className="text-3xl font-black text-green-400">{user.referrals * 50}</div>
                    <div className="text-gray-400">Gems</div>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    setUser(u => ({ ...u, referrals: u.referrals + 1 }));
                    addCoins(500);
                    addGems(50);
                    addXP(200);
                    showNotif('🎉 +500 Coins + 50 Gems!');
                  }} 
                  className="w-full py-4 bg-gradient-to-r rounded-2xl font-black btn-3d btn-3d-green"
                >
                  Simulate Referral (Demo)
                </button>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* LEADERBOARD TAB */}
          {/* ============================================================= */}
          {tab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={IMAGES.trophy} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Leaderboard</h1>
                  <p className="text-gray-400">Top players this week</p>
                </div>
              </div>
              {/* Top 3 Podium */}
              <div className="flex justify-center items-end gap-4 mb-8">
                {[
                  { n: 'BetKing', k: 12350, i: '🥈' },
                  { n: 'ProGamer', k: 15420, i: '👑' },
                  { n: 'LuckyAce', k: 9870, i: '🥉' }
                ].map((p, i) => (
                  <div key={p.n} className={`text-center ${i === 1 ? 'order-2' : i === 0 ? 'order-1 mt-8' : 'order-3 mt-8'}`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 mx-auto ${i === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 w-24 h-24 shadow-lg shadow-yellow-500/50' : 'bg-gradient-to-br from-gray-400 to-gray-600'}`}>
                      {p.i}
                    </div>
                    <div className="font-bold">{p.n}</div>
                    <div className="text-yellow-400 font-bold">{p.k.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              {/* Rankings List */}
              <div className="space-y-2">
                {[
                  { r: 1, n: 'ProGamer', k: 15420 },
                  { r: 2, n: 'BetKing', k: 12350 },
                  { r: 3, n: 'LuckyAce', k: 9870 },
                  { r: 4, n: 'Player1', k: user.kwacha, u: true },
                  { r: 5, n: 'WinMaster', k: 700 }
                ].map(p => (
                  <div key={p.r} className={`flex items-center gap-4 p-4 rounded-xl ${p.u ? 'bg-cyan-500/15 border border-cyan-500/50' : 'bg-black/20'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${p.r === 1 ? 'bg-yellow-500' : p.r === 2 ? 'bg-gray-400' : p.r === 3 ? 'bg-amber-700' : 'bg-black/30'}`}>
                      {p.r}
                    </div>
                    <div className="flex-1 font-bold">{p.n}</div>
                    <div className="text-yellow-400 font-bold">{p.k.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* PROFILE TAB */}
          {/* ============================================================= */}
          {tab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/50">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAvatarSelector(true)}
                    className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-4xl hover:scale-105 transition-transform group"
                  >
                    {user.avatar}
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-sm font-bold">Change</span>
                    </div>
                  </button>
                  <div>
                    <h2 className="text-2xl font-black">Player1</h2>
                    <div className="text-cyan-300">{level.icon} {level.name} • {user.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                  <div className="text-3xl font-black tracking-tight text-yellow-400">{user.bets}</div>
                  <div className="text-gray-400">Bets Placed</div>
                </div>
                <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                  <div className="text-3xl font-black tracking-tight text-green-400">{user.wins}</div>
                  <div className="text-gray-400">Bets Won</div>
                </div>
                <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                  <div className="text-3xl font-black tracking-tight text-cyan-400">{user.gamesPlayed}</div>
                  <div className="text-gray-400">Games Played</div>
                </div>
                <div className="rounded-xl p-4 text-center backdrop-blur-sm bg-black/30">
                  <div className="text-3xl font-black tracking-tight text-cyan-300">{user.missionsComplete.length}</div>
                  <div className="text-gray-400">Missions Done</div>
                </div>
              </div>
              <div className="rounded-2xl p-5 border backdrop-blur-sm bg-black/30 border-cyan-500/20">
                <h3 className="font-bold text-lg mb-4">Wallet</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3"><img src={CURRENCY_ICONS.coin} alt="" className="w-8 h-8 object-contain" /> Coins</span>
                    <span className="text-yellow-400 font-bold text-xl">{user.kwacha.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3"><img src={CURRENCY_ICONS.gem} alt="" className="w-8 h-8 object-contain" /> Gems</span>
                    <span className="text-green-400 font-bold text-xl">{user.gems}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3"><img src={CURRENCY_ICONS.diamond} alt="" className="w-8 h-8 object-contain" /> Diamonds</span>
                    <span className="text-blue-400 font-bold text-xl">{user.diamonds}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
