'use client'

import React, { useState, useEffect, useRef } from 'react';
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
function TutorialModal({ tutorialKey, onClose }) {
  const tutorial = TUTORIALS[tutorialKey];
  const [step, setStep] = useState(0);
  
  if (!tutorial) return null;
  
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[80] p-4">
      <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-lg w-full overflow-hidden border border-purple-500/30 shadow-2xl">
        {/* Header Image */}
        <div className="relative h-44">
          <img src={IMAGES[tutorial.image]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1333] via-transparent to-transparent" />
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
                className={`h-2 rounded-full transition-all ${step === i ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600 hover:bg-gray-500'}`} 
              />
            ))}
          </div>
          
          {/* Step Content */}
          <div className="bg-[#231a40] rounded-2xl p-5 mb-6 min-h-[120px]">
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
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${step === 0 ? 'bg-gray-700 opacity-50' : 'bg-[#231a40] hover:bg-[#2d2250]'}`}
            >
              ← Back
            </button>
            {step < tutorial.steps.length - 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(s => s + 1)} 
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold"
              >
                Next →
              </button>
            ) : (
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold flex items-center justify-center gap-2"
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
          <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
            <h4 className="text-sm font-bold text-purple-400 mb-2">💡 Pro Tips</h4>
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
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4">
      {showTutorial && <TutorialModal tutorialKey="wheel" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-md w-full p-6 border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-purple-400" />
          </button>
          <h2 className="text-2xl font-bold">🎡 Wheel of Fortune</h2>
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
                      stroke="#1a1333" 
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
              <circle cx="100" cy="100" r="25" fill="#1a1333" stroke="#fbbf24" strokeWidth="4" />
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
          <div className="text-center p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/50 animate-pulse">
            <div className="text-6xl mb-3">{result.icon}</div>
            <div className="text-2xl font-black text-yellow-400 mb-4">{result.label}</div>
            <button 
              type="button" 
              onClick={() => { onWin(result.prize, result.label); setResult(null); }} 
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-lg shadow-lg"
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
// SCRATCH GAME COMPONENT
// ============================================================================
function ScratchGame({ onClose, onWin }) {
  const canvasRef = useRef(null);
  const [scratching, setScratching] = useState(false);
  const [percent, setPercent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  
  const [prize] = useState(() => {
    const prizes = [25, 50, 75, 100, 150, 200, 500];
    const weights = [30, 25, 20, 12, 7, 4, 2];
    const rand = Math.random() * 100;
    let sum = 0;
    for (let i = 0; i < prizes.length; i++) {
      sum += weights[i];
      if (rand <= sum) return prizes[i];
    }
    return prizes[0];
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#c0c0c0');
    gradient.addColorStop(0.5, '#d8d8d8');
    gradient.addColorStop(1, '#b0b0b0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#777';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🪙 SCRATCH HERE 🪙', canvas.width / 2, canvas.height / 2 + 6);
  }, []);

  const scratch = (e) => {
    if (!scratching || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) * (canvas.width / rect.width);
    const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) * (canvas.height / rect.height);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    
    if (lastPos.current.x) {
      ctx.lineWidth = 44;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastPos.current = { x, y };
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const pct = (transparent / (canvas.width * canvas.height)) * 100;
    setPercent(pct);
    
    if (pct > 50 && !revealed) {
      setRevealed(true);
      onWin(prize);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4">
      {showTutorial && <TutorialModal tutorialKey="scratch" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-md w-full p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-purple-400" />
          </button>
          <h2 className="text-2xl font-bold">🎫 Scratch & Win</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-center text-gray-400 mb-4">Scratch the card to reveal your prize!</p>
        
        <div className="relative mx-auto rounded-2xl overflow-hidden border-4 border-yellow-500 shadow-2xl" style={{ width: 300, height: 180 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🎁</div>
              <div className="text-5xl font-black text-white" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>{prize}</div>
              <div className="text-white font-bold text-lg">KWACHA</div>
            </div>
          </div>
          <canvas 
            ref={canvasRef} 
            width={300} 
            height={180} 
            className="absolute inset-0 cursor-crosshair touch-none"
            onMouseDown={() => { setScratching(true); lastPos.current = { x: 0, y: 0 }; }}
            onMouseUp={() => setScratching(false)}
            onMouseLeave={() => setScratching(false)}
            onMouseMove={scratch}
            onTouchStart={() => { setScratching(true); lastPos.current = { x: 0, y: 0 }; }}
            onTouchEnd={() => setScratching(false)}
            onTouchMove={scratch}
          />
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.min(Math.round(percent * 2), 100)}%</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all" 
              style={{ width: `${Math.min(percent * 2, 100)}%` }} 
            />
          </div>
          <p className="text-center text-gray-400 mt-2">
            {revealed ? '🎉 Prize Revealed!' : 'Scratch at least 50% to reveal'}
          </p>
        </div>
        
        {revealed && (
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full mt-4 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-lg shadow-lg"
          >
            💰 Collect {prize} Coins!
          </button>
        )}
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
        className={`w-24 h-24 rounded-2xl shadow-2xl ${rolling ? 'animate-bounce' : ''}`} 
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
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4">
      {showTutorial && <TutorialModal tutorialKey="dice" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-md w-full p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-purple-400" />
          </button>
          <h2 className="text-2xl font-bold">🎲 Lucky Dice</h2>
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
                  className={`py-3 rounded-xl font-bold text-lg transition-all ${guess === n ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-110 shadow-lg shadow-purple-500/50' : 'bg-[#231a40] hover:bg-[#2d2250] hover:scale-105'}`}
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
            <p className={`text-2xl font-bold mb-6 ${result.won ? 'text-green-400' : result.close ? 'text-yellow-400' : 'text-gray-400'}`}>
              {result.won ? `🎉 EXACT! +${result.prize} Coins!` : result.close ? `Close! +${result.prize} Coins` : 'Better luck next time!'}
            </p>
            <button 
              type="button" 
              onClick={() => { setResult(null); setGuess(null); }} 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-lg"
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
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4">
      {showTutorial && <TutorialModal tutorialKey="memory" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-md w-full p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-purple-400" />
          </button>
          <h2 className="text-2xl font-bold">🧠 Memory Match</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-6 mb-4">
          <div className="text-center px-4 py-2 bg-[#231a40] rounded-xl">
            <div className="text-xl font-bold text-yellow-400">{moves}</div>
            <div className="text-xs text-gray-400">Moves</div>
          </div>
          <div className="text-center px-4 py-2 bg-[#231a40] rounded-xl">
            <div className="text-xl font-bold text-green-400">{matched.length/2}/{symbols.length}</div>
            <div className="text-xs text-gray-400">Pairs</div>
          </div>
          <div className="text-center px-4 py-2 bg-[#231a40] rounded-xl">
            <div className="text-xl font-bold text-purple-400">{prize}</div>
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
                className={`aspect-square rounded-xl text-3xl flex items-center justify-center font-bold transition-all ${isFlipped ? (isMatched ? 'bg-green-500/30 border-2 border-green-400' : 'bg-gradient-to-br from-yellow-400 to-orange-500') : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50'}`}
              >
                {isFlipped ? card.symbol : '?'}
              </button>
            );
          })}
        </div>
        
        {complete && (
          <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/50">
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-2xl font-bold text-green-400 mb-1">Complete!</div>
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
          <div className="text-2xl font-bold">{display(value)}</div>
          <div className="text-4xl">{suit}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[70] p-4">
      {showTutorial && <TutorialModal tutorialKey="highlow" onClose={() => setShowTutorial(false)} />}
      
      <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-md w-full p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={() => setShowTutorial(true)} className="p-2 hover:bg-white/10 rounded-full">
            <HelpCircle className="w-6 h-6 text-purple-400" />
          </button>
          <h2 className="text-2xl font-bold">🃏 Higher or Lower</h2>
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
          <p className="text-center text-xl text-purple-400 animate-pulse">Revealing...</p>
        )}
        
        {gameOver && (
          <div className="text-center p-4 bg-red-500/20 rounded-xl border border-red-500/50">
            <div className="text-5xl mb-2">💔</div>
            <div className="text-2xl font-bold text-red-400 mb-2">Game Over!</div>
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
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold"
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
// MAIN APP COMPONENT
// ============================================================================
export default function GamificationPlatform() {
  const [tab, setTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
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
    gamePlays: { wheel: 3, scratch: 5, dice: 5, memory: 3, highlow: 5 },
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
      setActiveGame(gameId);
    } else {
      showNotif('No free plays!', 'error');
    }
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

  return (
    <div className="flex h-screen bg-[#0f0a1f] text-white overflow-hidden">
      {/* Notification Toast */}
      {notif && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-2xl animate-bounce ${notif.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">{notif.msg}</span>
          </div>
        </div>
      )}

      {/* Tutorial Modal */}
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

      {/* Avatar Selector Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[80] p-4">
          <div className="bg-gradient-to-b from-[#1a1333] to-[#0f0a1f] rounded-3xl max-w-md w-full p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Choose Avatar</h2>
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
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-lg shadow-purple-500/50">
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
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 ${user.avatar === avatar ? 'bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400' : 'bg-[#231a40] hover:bg-[#2d2250]'}`}
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
      <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky md:top-0 top-0 left-0 z-40 w-64 bg-[#1a1333] h-full md:h-screen flex-shrink-0 transition-transform overflow-y-auto`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center font-black text-lg shadow-lg shadow-orange-500/30">
              100x
            </div>
            <div>
              <div className="font-bold text-lg">100xBet</div>
              <div className="text-xs text-purple-400">REWARDS</div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAvatarSelector(true)}
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl hover:scale-105 transition-transform group"
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
                <div className="text-xs text-purple-300">{level.icon} {level.name}</div>
              </button>
            </div>
            <div className="mt-2 h-2 bg-purple-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${active ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30' : 'hover:bg-[#2d2250] text-gray-300 hover:text-white'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Demo Controls */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/50">
            <div className="flex items-center gap-2 text-xs text-purple-400 mb-3">
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
                className="py-2 bg-green-600 hover:bg-green-700 rounded-lg text-xs font-bold"
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
                className="py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-bold"
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
                className="py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-xs font-bold"
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
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Header */}
        <header className="bg-[#1a1333]/95 backdrop-blur-lg border-b border-purple-900/50 p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Mobile Menu Button */}
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 hover:bg-purple-500/20 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Currency Display */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-[#231a40] rounded-2xl border border-yellow-500/30">
                <img src={CURRENCY_ICONS.coin} alt="Coins" className="w-10 h-10 object-contain" />
                <div>
                  <div className="font-bold text-xl text-yellow-400">{user.kwacha.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Coins</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-[#231a40] rounded-2xl border border-green-500/30">
                <img src={CURRENCY_ICONS.gem} alt="Gems" className="w-10 h-10 object-contain" />
                <div>
                  <div className="font-bold text-xl text-green-400">{user.gems}</div>
                  <div className="text-xs text-gray-400">Gems</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-[#231a40] rounded-2xl border border-blue-500/30">
                <img src={CURRENCY_ICONS.diamond} alt="Diamonds" className="w-10 h-10 object-contain" />
                <div>
                  <div className="font-bold text-xl text-blue-400">{user.diamonds}</div>
                  <div className="text-xs text-gray-400">Diamonds</div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Level {level.level}</div>
                  <div className="font-bold text-purple-400">{level.name}</div>
                </div>
                <div className="text-3xl">{level.icon}</div>
              </div>
              <button type="button" className="relative p-2 hover:bg-purple-500/20 rounded-lg">
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
                <div className="bg-[#1a1333] rounded-2xl overflow-hidden border border-purple-900/30 hover:border-green-500/50 transition-all">
                  <div className="relative h-44">
                    <img src={IMAGES.dailyGift} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setActiveTutorial('daily')} 
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
                        onClick={() => {
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
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold"
                      >
                        Claim!
                      </button>
                    )}
                  </div>
                </div>

                {/* Wheel Card */}
                <div className="bg-[#1a1333] rounded-2xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all">
                  <div className="relative h-44">
                    <img src={IMAGES.wheel} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setActiveTutorial('wheel')} 
                      className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {user.gamePlays.wheel > 0 && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-purple-500 rounded-full text-sm font-bold">
                        {user.gamePlays.wheel} FREE
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-lg mb-1">Spin Wheel</div>
                    <div className="text-sm text-gray-400 mb-3">{user.gamePlays.wheel} spins left</div>
                    <button 
                      type="button" 
                      onClick={() => playGame('wheel')} 
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold"
                    >
                      Play!
                    </button>
                  </div>
                </div>

                {/* Predictions Card */}
                <div className="bg-[#1a1333] rounded-2xl overflow-hidden border border-purple-900/30 hover:border-blue-500/50 transition-all">
                  <div className="relative h-44">
                    <img src={IMAGES.soccerBall} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setActiveTutorial('predictions')} 
                      className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-blue-500 rounded-full text-sm font-bold">
                      {MATCHES.length} LIVE
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-lg mb-1">Predictions</div>
                    <div className="text-sm text-gray-400 mb-3">{MATCHES.length} matches available</div>
                    <button 
                      type="button" 
                      onClick={() => setTab('predictions')} 
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold"
                    >
                      Predict!
                    </button>
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
                      <HelpCircle className="w-5 h-5 text-purple-400" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setTab('missions')} 
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MISSIONS.filter(m => !user.missionsComplete.includes(m.id)).slice(0, 3).map(m => (
                    <div key={m.id} className="bg-[#1a1333] rounded-2xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all">
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
                      <HelpCircle className="w-5 h-5 text-purple-400" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setTab('store')} 
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {STORE_ITEMS.filter(i => i.featured || i.isNew).slice(0, 4).map(item => (
                    <div key={item.id} className="bg-[#1a1333] rounded-xl overflow-hidden border border-purple-900/30">
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
                <h1 className="text-2xl font-bold">Minigames</h1>
                <p className="text-gray-400">Play games and win prizes!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MINIGAMES.map(game => (
                  <div key={game.id} className="bg-[#1a1333] rounded-2xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all">
                    <div className="relative h-44">
                      <img src={IMAGES[game.image]} alt="" className="w-full h-full object-cover" />
                      {user.gamePlays[game.id] > 0 && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 rounded-full text-sm font-bold">
                          {user.gamePlays[game.id]} FREE
                        </span>
                      )}
                      <button 
                        type="button" 
                        onClick={() => setActiveTutorial(game.id)} 
                        className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-lg mb-1">{game.name}</div>
                      <div className="text-sm text-gray-400 mb-4">{game.desc}</div>
                      <button 
                        type="button" 
                        onClick={() => playGame(game.id)} 
                        className={`w-full py-3 rounded-xl font-bold transition-all ${user.gamePlays[game.id] > 0 ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gray-700'}`}
                      >
                        {user.gamePlays[game.id] > 0 ? 'Play Free' : `${game.cost} Coins`}
                      </button>
                    </div>
                  </div>
                ))}
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
                  <h1 className="text-2xl font-bold">Missions</h1>
                  <p className="text-gray-400">{user.missionsComplete.length}/{MISSIONS.length} completed</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('missions')} 
                  className="ml-auto p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MISSIONS.map(m => {
                  const done = user.missionsComplete.includes(m.id);
                  const progress = user.missionProgress[m.id] || 0;
                  return (
                    <div key={m.id} className={`bg-[#1a1333] rounded-2xl overflow-hidden border ${done ? 'border-green-500/50' : 'border-purple-900/30 hover:border-purple-500/50'} transition-all`}>
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
                          <span className="text-purple-400 font-bold">⚡ {m.xp} XP</span>
                        </div>
                        <div className="h-2 bg-[#231a40] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${done ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`} 
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
                  <h1 className="text-2xl font-bold">Daily Rewards</h1>
                  <p className="text-gray-400">Login every day for bigger rewards!</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('daily')} 
                  className="ml-auto p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-[#1a1333] rounded-2xl p-6 border border-purple-900/30">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-2xl font-bold">{user.streak} Day Streak</span>
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
                        className={`p-3 rounded-2xl text-center transition-all ${isPast ? 'bg-green-500/20 border-2 border-green-500/50' : isCurrent ? canClaim ? 'bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse shadow-lg shadow-purple-500/50' : 'bg-purple-500/20 border-2 border-purple-500/50' : 'bg-[#231a40] border-2 border-gray-700/50'}`}
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
                  <h1 className="text-2xl font-bold">VIP Club</h1>
                  <p className="text-gray-400">Exclusive benefits for loyal players</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('vip')} 
                  className="ml-auto p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-6 border border-purple-500/50">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{vip.icon}</div>
                  <div>
                    <div className="text-2xl font-black">{vip.name}</div>
                    <div className="text-purple-300">{vip.cashback}% Cashback on losses</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {VIP_TIERS.map(tier => (
                  <div key={tier.name} className={`bg-[#1a1333] rounded-2xl p-4 border ${tier.name === vip.name ? 'border-purple-500/50 bg-purple-500/10' : 'border-purple-900/30'}`}>
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
                <h1 className="text-2xl font-bold">Store</h1>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('store')} 
                  className="p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl"
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
                    <div key={item.id} className={`bg-[#1a1333] rounded-2xl overflow-hidden border ${item.featured ? 'border-amber-500/50' : 'border-purple-900/30'}`}>
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
                        <div className="font-bold text-lg mb-1">{item.name}</div>
                        <div className="text-sm text-gray-400 mb-4">{item.desc}</div>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (canBuy) {
                              addCoins(-item.price.kwacha);
                              if (item.price.gems) addGems(-item.price.gems);
                              showNotif(`Purchased ${item.name}!`);
                            }
                          }} 
                          disabled={!canBuy} 
                          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${canBuy ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600' : 'bg-gray-700 opacity-50'}`}
                        >
                          🪙 {item.price.kwacha}
                          {item.price.gems && <><span>+</span>💚 {item.price.gems}</>}
                        </button>
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
                  <h1 className="text-2xl font-bold">Match Predictions</h1>
                  <p className="text-gray-400">Predict outcomes and win Coins!</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('predictions')} 
                  className="ml-auto p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {MATCHES.map(m => {
                  const pred = user.predictions.find(p => p.id === m.id);
                  return (
                    <div key={m.id} className={`bg-[#1a1333] rounded-2xl p-5 border ${m.featured ? 'border-amber-500/50' : 'border-purple-900/30'}`}>
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
                        <div className="text-2xl font-bold text-gray-500 px-4">VS</div>
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg">{m.away}</div>
                        </div>
                      </div>
                      {pred ? (
                        <div className="text-center p-3 bg-purple-500/20 rounded-xl">
                          <span className="text-purple-300">
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
                              className="p-3 bg-[#231a40] hover:bg-purple-600/30 border border-transparent hover:border-purple-500 rounded-xl transition-all"
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
                  <h1 className="text-2xl font-bold">Quests</h1>
                  <p className="text-gray-400">Multi-step adventures for bigger rewards!</p>
                </div>
              </div>
              {QUESTS.map(q => (
                <div key={q.id} className="bg-[#1a1333] rounded-2xl overflow-hidden border border-purple-900/30">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 h-48 md:h-auto">
                      <img src={IMAGES[q.image]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="font-bold text-xl mb-2">{q.name}</div>
                      <p className="text-gray-400 mb-3">{q.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {q.steps.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-[#231a40] rounded-lg text-xs text-gray-400">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400 font-bold">🪙 {q.reward.kwacha}</span>
                        <span className="text-green-400 font-bold">💚 {q.reward.gems}</span>
                        <span className="text-purple-400 font-bold">⚡ {q.xp} XP</span>
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
                <h1 className="text-2xl font-bold">Referrals</h1>
                <button 
                  type="button" 
                  onClick={() => setActiveTutorial('referrals')} 
                  className="p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-6 border border-purple-500/50">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">Your Referral Code</h3>
                  <p className="text-gray-400">Earn 500 Coins + 50 Gems per referral!</p>
                </div>
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 bg-[#1a1333] rounded-xl p-4 font-mono text-2xl text-center">PLAYER1X</div>
                  <button 
                    type="button" 
                    onClick={() => {
                      navigator.clipboard.writeText('PLAYER1X');
                      showNotif('Code copied!');
                    }} 
                    className="px-6 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold"
                  >
                    <Copy className="w-6 h-6" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#1a1333] rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-purple-400">{user.referrals}</div>
                    <div className="text-gray-400">Referrals</div>
                  </div>
                  <div className="bg-[#1a1333] rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-yellow-400">{user.referrals * 500}</div>
                    <div className="text-gray-400">Coins</div>
                  </div>
                  <div className="bg-[#1a1333] rounded-xl p-4 text-center">
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
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold"
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
                  <h1 className="text-2xl font-bold">Leaderboard</h1>
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
                  <div key={p.r} className={`flex items-center gap-4 p-4 rounded-xl ${p.u ? 'bg-purple-500/20 border border-purple-500/50' : 'bg-[#1a1333]'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${p.r === 1 ? 'bg-yellow-500' : p.r === 2 ? 'bg-gray-400' : p.r === 3 ? 'bg-amber-700' : 'bg-[#231a40]'}`}>
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
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-6 border border-purple-500/50">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAvatarSelector(true)}
                    className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl hover:scale-105 transition-transform group"
                  >
                    {user.avatar}
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-sm font-bold">Change</span>
                    </div>
                  </button>
                  <div>
                    <h2 className="text-2xl font-black">Player1</h2>
                    <div className="text-purple-300">{level.icon} {level.name} • {user.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1333] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{user.bets}</div>
                  <div className="text-gray-400">Bets Placed</div>
                </div>
                <div className="bg-[#1a1333] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{user.wins}</div>
                  <div className="text-gray-400">Bets Won</div>
                </div>
                <div className="bg-[#1a1333] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{user.gamesPlayed}</div>
                  <div className="text-gray-400">Games Played</div>
                </div>
                <div className="bg-[#1a1333] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-400">{user.missionsComplete.length}</div>
                  <div className="text-gray-400">Missions Done</div>
                </div>
              </div>
              <div className="bg-[#1a1333] rounded-2xl p-5 border border-purple-900/30">
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
