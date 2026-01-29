import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Trophy, Star, Gift, Target, Crown, Coins, Gem, Diamond,
  Gamepad2, Store, Medal, Ticket, Calendar, Mail, Zap,
  ChevronRight, Lock, Check, X, Play, RefreshCw, Clock,
  TrendingUp, Users, Award, Sparkles, Heart, Shuffle,
  CircleDollarSign, Percent, Package, ShoppingBag, Send,
  UserPlus, MessageCircle, Bell, Flame, Timer, PartyPopper,
  ArrowUp, ArrowDown, RotateCcw, Eye, CheckCircle, XCircle,
  Backpack, ChevronDown, ChevronUp, Volume2, VolumeX,
  User, Settings, Edit3, Shield, Swords, MapPin, Flag,
  ChevronLeft, Info, HelpCircle, Compass, Map, BookOpen,
  AlertCircle, CheckCircle2, Gift as GiftIcon, TrendingDown,
  Minus, Equal, Circle, Home, Menu, X as XIcon
} from 'lucide-react';

// ============ CONFIGURATION ============
const CONFIG = {
  levels: [
    { name: 'Stone', minPoints: 0, icon: '🪨', color: '#6b7280', perks: ['Access to basic missions', '3 free daily minigames'] },
    { name: 'Bronze', minPoints: 100, icon: '🥉', color: '#cd7f32', perks: ['5% store discount', 'Unlock Bronze missions', '5 free daily minigames'] },
    { name: 'Silver', minPoints: 350, icon: '🥈', color: '#c0c0c0', perks: ['10% store discount', 'Access to tournaments', 'Weekly bonus spins'] },
    { name: 'Gold', minPoints: 750, icon: '🥇', color: '#ffd700', perks: ['15% store discount', 'Priority support', 'Exclusive Gold missions'] },
    { name: 'Diamond', minPoints: 1500, icon: '💎', color: '#b9f2ff', perks: ['20% store discount', 'VIP events access', 'Monthly mystery box'] },
    { name: 'Ruby', minPoints: 3000, icon: '❤️‍🔥', color: '#e0115f', perks: ['25% store discount', 'Personal account manager', 'Exclusive Ruby rewards'] },
  ],
  
  vipTiers: [
    { name: 'Standard', minDeposits: 0, icon: '⭐', color: '#9ca3af', cashback: 0, perks: ['Basic rewards access'] },
    { name: 'Bronze VIP', minDeposits: 500, icon: '🥉', color: '#cd7f32', cashback: 0.5, perks: ['0.5% cashback', 'Birthday bonus', 'VIP support'] },
    { name: 'Silver VIP', minDeposits: 2000, icon: '🥈', color: '#c0c0c0', cashback: 1, perks: ['1% cashback', 'Weekly bonuses', 'Faster withdrawals'] },
    { name: 'Gold VIP', minDeposits: 5000, icon: '🥇', color: '#ffd700', cashback: 1.5, perks: ['1.5% cashback', 'Personal manager', 'Exclusive events'] },
    { name: 'Platinum VIP', minDeposits: 15000, icon: '💠', color: '#e5e4e2', cashback: 2, perks: ['2% cashback', 'Luxury gifts', 'VIP trips'] },
    { name: 'Diamond VIP', minDeposits: 50000, icon: '💎', color: '#b9f2ff', cashback: 3, perks: ['3% cashback', 'Concierge service', 'Unlimited perks'] },
  ],

  currencies: {
    points: { name: 'Points', icon: Coins, color: '#fbbf24' },
    gems: { name: 'Gems', icon: Gem, color: '#22c55e' },
    diamonds: { name: 'Diamonds', icon: Diamond, color: '#3b82f6' },
  },

  avatars: [
    { id: 'default', emoji: '😎', name: 'Cool', unlocked: true },
    { id: 'fire', emoji: '🔥', name: 'Fire', cost: 100 },
    { id: 'crown', emoji: '👑', name: 'Royal', cost: 250 },
    { id: 'star', emoji: '⭐', name: 'Star', cost: 150 },
    { id: 'diamond', emoji: '💎', name: 'Diamond', cost: 500, requiredLevel: 4 },
    { id: 'rocket', emoji: '🚀', name: 'Rocket', cost: 200 },
    { id: 'lightning', emoji: '⚡', name: 'Lightning', cost: 175 },
    { id: 'ghost', emoji: '👻', name: 'Ghost', cost: 300 },
    { id: 'alien', emoji: '👽', name: 'Alien', cost: 350 },
    { id: 'robot', emoji: '🤖', name: 'Robot', cost: 400 },
    { id: 'ninja', emoji: '🥷', name: 'Ninja', cost: 450 },
    { id: 'wizard', emoji: '🧙', name: 'Wizard', cost: 500 },
  ],

  frames: [
    { id: 'none', name: 'None', style: 'border-transparent', unlocked: true },
    { id: 'bronze', name: 'Bronze', style: 'border-amber-700', cost: 150 },
    { id: 'silver', name: 'Silver', style: 'border-gray-400', cost: 250 },
    { id: 'gold', name: 'Gold', style: 'border-yellow-500', cost: 400 },
    { id: 'rainbow', name: 'Rainbow', style: 'border-gradient', cost: 600 },
    { id: 'fire', name: 'Fire', style: 'border-orange-500 shadow-orange-500/50 shadow-lg', cost: 500 },
    { id: 'ice', name: 'Ice', style: 'border-cyan-400 shadow-cyan-400/50 shadow-lg', cost: 500 },
    { id: 'diamond', name: 'Diamond', style: 'border-blue-400 shadow-blue-400/50 shadow-lg', cost: 800, requiredLevel: 4 },
  ],

  titles: [
    { id: 'newcomer', name: 'Newcomer', unlocked: true },
    { id: 'player', name: 'Player', cost: 50 },
    { id: 'bettor', name: 'Bettor', cost: 100 },
    { id: 'winner', name: 'Winner', cost: 200, requirement: 'Win 10 bets' },
    { id: 'champion', name: 'Champion', cost: 400, requirement: 'Win a tournament' },
    { id: 'high_roller', name: 'High Roller', cost: 500, requirement: 'Deposit €1000' },
    { id: 'legend', name: 'Legend', cost: 1000, requiredLevel: 5 },
    { id: 'vip', name: 'VIP', cost: 750, requirement: 'Reach VIP status' },
  ],
};

// ============ QUESTS/CAMPAIGNS DATA ============
const QUESTS = [
  {
    id: 'welcome_journey',
    name: 'Welcome Journey',
    description: 'Start your 100xBet adventure!',
    icon: '🗺️',
    totalReward: { points: 500, gems: 50 },
    steps: [
      { id: 'step1', name: 'First Login', description: 'Log in to the platform', target: 1, type: 'login', reward: { points: 25 } },
      { id: 'step2', name: 'Explore Missions', description: 'View the missions page', target: 1, type: 'view_missions', reward: { points: 25 } },
      { id: 'step3', name: 'Play a Minigame', description: 'Play any minigame', target: 1, type: 'minigame', reward: { points: 50 } },
      { id: 'step4', name: 'First Deposit', description: 'Make your first deposit', target: 1, type: 'deposit', reward: { points: 100, gems: 10 } },
      { id: 'step5', name: 'Complete 3 Missions', description: 'Complete any 3 missions', target: 3, type: 'mission_complete', reward: { points: 150, gems: 20 } },
    ],
  },
  {
    id: 'betting_master',
    name: 'Betting Master',
    description: 'Prove your betting skills!',
    icon: '🎯',
    totalReward: { points: 1000, gems: 100, diamonds: 5 },
    requiredLevel: 1,
    steps: [
      { id: 'step1', name: 'Place 5 Bets', description: 'Place any 5 bets', target: 5, type: 'bet', reward: { points: 50 } },
      { id: 'step2', name: 'Win 3 Bets', description: 'Win 3 bets', target: 3, type: 'win', reward: { points: 100, gems: 10 } },
      { id: 'step3', name: 'Place 20 Bets', description: 'Place 20 total bets', target: 20, type: 'bet', reward: { points: 150 } },
      { id: 'step4', name: 'Win Streak', description: 'Win 3 bets in a row', target: 1, type: 'win_streak_3', reward: { points: 200, gems: 25 } },
      { id: 'step5', name: 'Big Winner', description: 'Win 10 bets total', target: 10, type: 'win', reward: { points: 300, gems: 40, diamonds: 5 } },
    ],
  },
  {
    id: 'casino_royale',
    name: 'Casino Royale',
    description: 'Become a casino legend!',
    icon: '🎰',
    totalReward: { points: 800, gems: 75 },
    requiredLevel: 2,
    steps: [
      { id: 'step1', name: 'First Spin', description: 'Play your first casino game', target: 1, type: 'spin', reward: { points: 25 } },
      { id: 'step2', name: 'Spin 25 Times', description: 'Play 25 casino spins', target: 25, type: 'spin', reward: { points: 75 } },
      { id: 'step3', name: 'Try 3 Games', description: 'Play 3 different minigames', target: 3, type: 'unique_games', reward: { points: 100, gems: 15 } },
      { id: 'step4', name: 'Spin 100 Times', description: 'Play 100 casino spins', target: 100, type: 'spin', reward: { points: 200, gems: 25 } },
      { id: 'step5', name: 'Slot Master', description: 'Play 250 casino spins', target: 250, type: 'spin', reward: { points: 300, gems: 35 } },
    ],
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Connect with the community!',
    icon: '🦋',
    totalReward: { points: 600, gems: 60 },
    steps: [
      { id: 'step1', name: 'Add a Friend', description: 'Add your first friend', target: 1, type: 'friend_add', reward: { points: 50 } },
      { id: 'step2', name: 'Send a Challenge', description: 'Challenge a friend', target: 1, type: 'challenge_send', reward: { points: 75 } },
      { id: 'step3', name: 'Gift Points', description: 'Gift points to a friend', target: 1, type: 'gift_send', reward: { points: 100, gems: 10 } },
      { id: 'step4', name: 'Make 5 Friends', description: 'Add 5 friends total', target: 5, type: 'friend_add', reward: { points: 150, gems: 20 } },
      { id: 'step5', name: 'Win a Challenge', description: 'Win a friend challenge', target: 1, type: 'challenge_win', reward: { points: 200, gems: 30 } },
    ],
  },
  {
    id: 'prediction_pro',
    name: 'Prediction Pro',
    description: 'Master match predictions!',
    icon: '🔮',
    totalReward: { points: 1200, gems: 120, diamonds: 10 },
    requiredLevel: 2,
    steps: [
      { id: 'step1', name: 'First Prediction', description: 'Make your first match prediction', target: 1, type: 'prediction', reward: { points: 50 } },
      { id: 'step2', name: 'Correct Prediction', description: 'Get a prediction right', target: 1, type: 'prediction_correct', reward: { points: 100, gems: 15 } },
      { id: 'step3', name: 'Predict 10 Matches', description: 'Make 10 predictions', target: 10, type: 'prediction', reward: { points: 150 } },
      { id: 'step4', name: '5 Correct', description: 'Get 5 predictions right', target: 5, type: 'prediction_correct', reward: { points: 300, gems: 40 } },
      { id: 'step5', name: 'Oracle', description: 'Get 10 predictions right', target: 10, type: 'prediction_correct', reward: { points: 500, gems: 65, diamonds: 10 } },
    ],
  },
];

// ============ MATCH PREDICTIONS DATA ============
const MATCHES = [
  // La Liga
  { id: 'm1', league: 'La Liga', leagueIcon: '🇪🇸', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeOdds: 2.10, drawOdds: 3.40, awayOdds: 3.20, date: '2026-02-01', time: '21:00', status: 'upcoming' },
  { id: 'm2', league: 'La Liga', leagueIcon: '🇪🇸', homeTeam: 'Atletico Madrid', awayTeam: 'Sevilla', homeOdds: 1.75, drawOdds: 3.60, awayOdds: 4.50, date: '2026-02-01', time: '18:30', status: 'upcoming' },
  { id: 'm3', league: 'La Liga', leagueIcon: '🇪🇸', homeTeam: 'Valencia', awayTeam: 'Real Betis', homeOdds: 2.40, drawOdds: 3.30, awayOdds: 2.90, date: '2026-02-02', time: '16:00', status: 'upcoming' },
  
  // Premier League
  { id: 'm4', league: 'Premier League', leagueIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeTeam: 'Manchester City', awayTeam: 'Liverpool', homeOdds: 1.90, drawOdds: 3.60, awayOdds: 3.80, date: '2026-02-02', time: '17:30', status: 'upcoming' },
  { id: 'm5', league: 'Premier League', leagueIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeTeam: 'Arsenal', awayTeam: 'Chelsea', homeOdds: 1.85, drawOdds: 3.50, awayOdds: 4.20, date: '2026-02-02', time: '14:00', status: 'upcoming' },
  { id: 'm6', league: 'Premier League', leagueIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeTeam: 'Manchester United', awayTeam: 'Tottenham', homeOdds: 2.20, drawOdds: 3.40, awayOdds: 3.10, date: '2026-02-03', time: '16:30', status: 'upcoming' },
  
  // Champions League
  { id: 'm7', league: 'Champions League', leagueIcon: '🏆', homeTeam: 'Bayern Munich', awayTeam: 'PSG', homeOdds: 1.95, drawOdds: 3.50, awayOdds: 3.70, date: '2026-02-04', time: '21:00', status: 'upcoming' },
  { id: 'm8', league: 'Champions League', leagueIcon: '🏆', homeTeam: 'Inter Milan', awayTeam: 'Borussia Dortmund', homeOdds: 2.00, drawOdds: 3.40, awayOdds: 3.50, date: '2026-02-04', time: '21:00', status: 'upcoming' },
  
  // Finished matches
  { id: 'm9', league: 'La Liga', leagueIcon: '🇪🇸', homeTeam: 'Real Sociedad', awayTeam: 'Athletic Bilbao', homeOdds: 2.30, drawOdds: 3.20, awayOdds: 3.10, date: '2026-01-28', time: '20:00', status: 'finished', result: { home: 2, away: 1, winner: 'home' } },
  { id: 'm10', league: 'Premier League', leagueIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeTeam: 'Newcastle', awayTeam: 'Brighton', homeOdds: 1.80, drawOdds: 3.60, awayOdds: 4.40, date: '2026-01-27', time: '15:00', status: 'finished', result: { home: 1, away: 1, winner: 'draw' } },
];

// ============ MINIGAMES DATA ============
const MINIGAMES = [
  { id: 'scratch', name: 'Scratch & Win', description: 'Scratch to reveal prizes', icon: '🎴', freeDaily: 3 },
  { id: 'wheel', name: 'Wheel of Fortune', description: 'Spin for rewards', icon: '🎡', freeDaily: 2 },
  { id: 'memory', name: 'Memory Match', description: 'Match pairs to win', icon: '🧠', freeDaily: 3 },
  { id: 'trivia', name: 'Sports Trivia', description: 'Test your knowledge', icon: '❓', freeDaily: 5 },
  { id: 'plinko', name: 'Plinko Drop', description: 'Drop and win big', icon: '🔴', freeDaily: 3 },
  { id: 'highlow', name: 'Higher or Lower', description: 'Guess the card', icon: '🃏', freeDaily: 5 },
  { id: 'slots', name: 'Mini Slots', description: 'Quick slot fun', icon: '🎰', freeDaily: 5 },
  { id: 'dice', name: 'Lucky Dice', description: 'Roll for rewards', icon: '🎲', freeDaily: 3 },
];

// ============ STORE ITEMS DATA ============
const STORE_ITEMS = [
  { id: 'spins_10', name: '10 Free Spins', description: 'Free spins on any slot', category: 'spins', price: { points: 50 }, icon: '🎰', stock: null },
  { id: 'spins_50', name: '50 Free Spins', description: 'Free spins on Vikings Go to Hell', category: 'spins', price: { points: 200 }, icon: '⚔️', stock: null },
  { id: 'bonus_5', name: '€5 Free Bet', description: 'Free bet voucher', category: 'bonus', price: { points: 100 }, icon: '🎫', stock: null },
  { id: 'bonus_20', name: '€20 Free Bet', description: 'Free bet voucher', category: 'bonus', price: { points: 350 }, icon: '💳', stock: 100 },
  { id: 'tshirt_black', name: '100xBet T-Shirt', description: 'Premium cotton tee', category: 'merch', price: { points: 500 }, icon: '👕', stock: 200, requiredLevel: 1 },
  { id: 'hoodie', name: '100xBet Hoodie', description: 'Cozy premium hoodie', category: 'merch', price: { points: 1200, gems: 30 }, icon: '🧥', stock: 100, requiredLevel: 2 },
  { id: 'cap', name: '100xBet Cap', description: 'Snapback cap', category: 'merch', price: { points: 350 }, icon: '🧢', stock: 150, requiredLevel: 1 },
  { id: 'mug', name: '100xBet Mug', description: 'Color-changing mug', category: 'merch', price: { points: 300 }, icon: '☕', stock: 200, requiredLevel: 1 },
  { id: 'headphones', name: 'Wireless Earbuds', description: 'Premium TWS earbuds', category: 'merch', price: { points: 2000, gems: 100 }, icon: '🎧', stock: 50, requiredLevel: 3 },
  { id: 'iphone', name: 'iPhone 15 Pro', description: 'With 100xBet case', category: 'prizes', price: { points: 15000, diamonds: 200 }, icon: '📱', stock: 3, requiredLevel: 5 },
];

// ============ MISSIONS DATA ============
const MISSIONS = [
  { id: 'first_deposit', name: 'First Steps', description: 'Make your first deposit', type: 'deposit', target: 1, reward: { points: 50 }, icon: '💰', category: 'deposits' },
  { id: 'deposit_100', name: 'Money Moves', description: 'Deposit €100 total', type: 'deposit_amount', target: 100, reward: { points: 100, gems: 5 }, icon: '💵', category: 'deposits' },
  { id: 'first_bet', name: 'Take the Odds', description: 'Place your first bet', type: 'bet', target: 1, reward: { points: 30 }, icon: '🎯', category: 'betting' },
  { id: 'bet_10', name: 'Regular Player', description: 'Place 10 bets', type: 'bet', target: 10, reward: { points: 75 }, icon: '📊', category: 'betting' },
  { id: 'win_5', name: 'Winner Winner', description: 'Win 5 bets', type: 'win', target: 5, reward: { points: 100, gems: 10 }, icon: '🏆', category: 'betting' },
  { id: 'first_spin', name: 'The First Spin', description: 'Play a casino game', type: 'spin', target: 1, reward: { points: 25 }, icon: '🎰', category: 'casino' },
  { id: 'play_minigame', name: 'Game On', description: 'Play any minigame', type: 'minigame', target: 1, reward: { points: 20 }, icon: '🎮', category: 'engagement' },
  { id: 'first_prediction', name: 'Oracle', description: 'Make a match prediction', type: 'prediction', target: 1, reward: { points: 30 }, icon: '🔮', category: 'predictions' },
  { id: 'correct_prediction', name: 'Seer', description: 'Get 3 predictions right', type: 'prediction_correct', target: 3, reward: { points: 150, gems: 15 }, icon: '✨', category: 'predictions' },
];

// ============ INITIAL STATE ============
const getInitialState = () => {
  const saved = localStorage.getItem('100xbet_gamification_v3');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure new fields exist
      return {
        ...getDefaultState(),
        ...parsed,
        profile: { ...getDefaultState().profile, ...parsed.profile },
        notifications: parsed.notifications || [],
        predictions: parsed.predictions || [],
        questProgress: parsed.questProgress || {},
        onboardingComplete: parsed.onboardingComplete || false,
      };
    } catch (e) {
      console.error('Failed to parse saved state');
    }
  }
  return getDefaultState();
};

const getDefaultState = () => ({
  user: {
    id: 'user_001',
    username: 'Player1',
    joinDate: new Date().toISOString(),
  },
  profile: {
    avatar: 'default',
    frame: 'none',
    title: 'newcomer',
    unlockedAvatars: ['default'],
    unlockedFrames: ['none'],
    unlockedTitles: ['newcomer'],
  },
  currencies: {
    points: 0,
    gems: 0,
    diamonds: 0,
  },
  stats: {
    totalDeposits: 0,
    totalBets: 0,
    totalWins: 0,
    totalSpins: 0,
    loginStreak: 0,
    lastLogin: null,
    gamesPlayed: 0,
    missionsCompleted: 0,
    predictionsTotal: 0,
    predictionsCorrect: 0,
    uniqueGamesPlayed: [],
  },
  missions: {
    completed: [],
    progress: {},
  },
  questProgress: {},
  predictions: [],
  inventory: [],
  dailyLootbox: {
    lastClaimed: null,
    currentDay: 1,
    streak: 0,
  },
  notifications: [],
  friends: [],
  sentChallenges: [],
  minigamePlays: {},
  lastMinigameReset: null,
  onboardingComplete: false,
  onboardingStep: 0,
});

// ============ SAMPLE FRIENDS ============
const SAMPLE_FRIENDS = [
  { id: 'friend_1', username: 'LuckyAce', avatar: '🔥', level: 'Gold', points: 1250, online: true },
  { id: 'friend_2', username: 'BetMaster', avatar: '👑', level: 'Silver', points: 680, online: false },
  { id: 'friend_3', username: 'SpinQueen', avatar: '💎', level: 'Diamond', points: 2100, online: true },
  { id: 'friend_4', username: 'ProGamer', avatar: '🚀', level: 'Bronze', points: 220, online: false },
];

// ============ ONBOARDING STEPS ============
const ONBOARDING_STEPS = [
  {
    title: 'Welcome to 100xBet Rewards! 🎉',
    description: 'Earn points for every bet, deposit, and activity. Redeem them for exclusive rewards!',
    icon: '🎁',
  },
  {
    title: 'Earn Points Everywhere',
    description: 'Every deposit, bet, and casino spin earns you points. The more you play, the more you earn!',
    icon: '💰',
  },
  {
    title: 'Complete Missions & Quests',
    description: 'Take on missions and multi-step quests for bonus rewards and achievements.',
    icon: '🎯',
  },
  {
    title: 'Play Minigames',
    description: 'Enjoy free daily minigames like Scratch Cards, Wheel of Fortune, and more!',
    icon: '🎮',
  },
  {
    title: 'Predict & Win',
    description: 'Predict match outcomes to earn points. Correct predictions mean big rewards!',
    icon: '⚽',
  },
  {
    title: 'Level Up & Go VIP',
    description: 'Progress through levels and VIP tiers for better perks, cashback, and exclusive items.',
    icon: '👑',
  },
  {
    title: 'Ready to Start?',
    description: 'Your journey begins now. Claim your first daily reward and start earning!',
    icon: '🚀',
  },
];

// ============ MAIN APP COMPONENT ============
export default function GamificationPlatform() {
  const [state, setState] = useState(getInitialState);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(!state.onboardingComplete);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [animatingElements, setAnimatingElements] = useState([]);

  // Save state
  useEffect(() => {
    localStorage.setItem('100xbet_gamification_v3', JSON.stringify(state));
  }, [state]);

  // Reset daily minigame plays
  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastMinigameReset !== today) {
      setState(prev => ({ ...prev, minigamePlays: {}, lastMinigameReset: today }));
    }
  }, [state.lastMinigameReset]);

  // Calculate current level
  const getCurrentLevel = useCallback(() => {
    const points = state.currencies.points;
    let currentLevel = CONFIG.levels[0];
    let levelIndex = 0;
    
    for (let i = CONFIG.levels.length - 1; i >= 0; i--) {
      if (points >= CONFIG.levels[i].minPoints) {
        currentLevel = CONFIG.levels[i];
        levelIndex = i;
        break;
      }
    }
    
    const nextLevel = CONFIG.levels[levelIndex + 1];
    const progress = nextLevel 
      ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
      : 100;
    
    return { ...currentLevel, index: levelIndex, progress, nextLevel };
  }, [state.currencies.points]);

  // Calculate VIP tier
  const getVIPTier = useCallback(() => {
    const deposits = state.stats.totalDeposits;
    let currentTier = CONFIG.vipTiers[0];
    let tierIndex = 0;
    
    for (let i = CONFIG.vipTiers.length - 1; i >= 0; i--) {
      if (deposits >= CONFIG.vipTiers[i].minDeposits) {
        currentTier = CONFIG.vipTiers[i];
        tierIndex = i;
        break;
      }
    }
    
    const nextTier = CONFIG.vipTiers[tierIndex + 1];
    const progress = nextTier 
      ? ((deposits - currentTier.minDeposits) / (nextTier.minDeposits - currentTier.minDeposits)) * 100
      : 100;
    
    return { ...currentTier, index: tierIndex, progress, nextTier };
  }, [state.stats.totalDeposits]);

  // Show notification with animation
  const showNotificationToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add notification to center
  const addNotification = (notif) => {
    setState(prev => ({
      ...prev,
      notifications: [
        { id: Date.now(), timestamp: new Date().toISOString(), read: false, ...notif },
        ...prev.notifications.slice(0, 49)
      ]
    }));
  };

  // Add currency with level check
  const addCurrency = useCallback((type, amount) => {
    setState(prev => {
      const oldPoints = prev.currencies.points;
      const newCurrencies = {
        ...prev.currencies,
        [type]: Math.max(0, prev.currencies[type] + amount)
      };
      
      // Check for level up
      if (type === 'points' && amount > 0) {
        const oldLevelIndex = CONFIG.levels.findIndex((l, i) => 
          oldPoints >= l.minPoints && (!CONFIG.levels[i + 1] || oldPoints < CONFIG.levels[i + 1].minPoints)
        );
        const newLevelIndex = CONFIG.levels.findIndex((l, i) => 
          newCurrencies.points >= l.minPoints && (!CONFIG.levels[i + 1] || newCurrencies.points < CONFIG.levels[i + 1].minPoints)
        );
        
        if (newLevelIndex > oldLevelIndex) {
          setNewLevel(CONFIG.levels[newLevelIndex]);
          setShowLevelUp(true);
          addNotification({
            type: 'level_up',
            title: 'Level Up!',
            message: `You reached ${CONFIG.levels[newLevelIndex].name} level!`,
            icon: CONFIG.levels[newLevelIndex].icon,
          });
        }
      }
      
      return { ...prev, currencies: newCurrencies };
    });
  }, []);

  // Check missions
  const checkMissions = useCallback((type, value = 1) => {
    const currentLevelIndex = getCurrentLevel().index;
    
    setState(prev => {
      const newProgress = { ...prev.missions.progress };
      const newCompleted = [...prev.missions.completed];
      let currencyUpdates = { ...prev.currencies };
      
      MISSIONS.forEach(mission => {
        if (newCompleted.includes(mission.id)) return;
        if (mission.type !== type) return;
        if (mission.requiredLevel && currentLevelIndex < mission.requiredLevel) return;
        
        const currentProgress = newProgress[mission.id] || 0;
        newProgress[mission.id] = currentProgress + value;
        
        if (newProgress[mission.id] >= mission.target) {
          newCompleted.push(mission.id);
          if (mission.reward.points) currencyUpdates.points += mission.reward.points;
          if (mission.reward.gems) currencyUpdates.gems += mission.reward.gems;
          if (mission.reward.diamonds) currencyUpdates.diamonds += mission.reward.diamonds;
          
          showNotificationToast(`🎉 Mission Complete: ${mission.name}!`);
          addNotification({
            type: 'mission',
            title: 'Mission Complete!',
            message: `You completed "${mission.name}" and earned ${mission.reward.points} points!`,
            icon: mission.icon,
          });
        }
      });
      
      return {
        ...prev,
        missions: { completed: newCompleted, progress: newProgress },
        currencies: currencyUpdates,
        stats: { ...prev.stats, missionsCompleted: newCompleted.length }
      };
    });
  }, [getCurrentLevel]);

  // Check quest progress
  const checkQuestProgress = useCallback((type, value = 1) => {
    setState(prev => {
      const newQuestProgress = { ...prev.questProgress };
      let currencyUpdates = { ...prev.currencies };
      
      QUESTS.forEach(quest => {
        if (quest.requiredLevel && getCurrentLevel().index < quest.requiredLevel) return;
        
        quest.steps.forEach(step => {
          if (step.type !== type) return;
          
          const questStepKey = `${quest.id}_${step.id}`;
          const currentProgress = newQuestProgress[questStepKey] || 0;
          const completed = newQuestProgress[`${questStepKey}_completed`];
          
          if (completed) return;
          
          const newValue = currentProgress + value;
          newQuestProgress[questStepKey] = newValue;
          
          if (newValue >= step.target) {
            newQuestProgress[`${questStepKey}_completed`] = true;
            if (step.reward.points) currencyUpdates.points += step.reward.points;
            if (step.reward.gems) currencyUpdates.gems += step.reward.gems;
            if (step.reward.diamonds) currencyUpdates.diamonds += step.reward.diamonds;
            
            showNotificationToast(`✅ Quest Step: ${step.name} complete!`);
          }
        });
      });
      
      return { ...prev, questProgress: newQuestProgress, currencies: currencyUpdates };
    });
  }, [getCurrentLevel]);

  // Simulate activity
  const simulateActivity = (type) => {
    const rewards = {
      deposit: 10, bet_placed: 5, bet_won: 15, casino_spin: 2, daily_login: 25
    };
    
    const points = rewards[type] || 0;
    addCurrency('points', points);
    showNotificationToast(`+${points} points from ${type.replace('_', ' ')}`);
    
    setState(prev => {
      const newStats = { ...prev.stats };
      switch (type) {
        case 'deposit': newStats.totalDeposits += 100; break;
        case 'bet_placed': newStats.totalBets += 1; break;
        case 'bet_won': newStats.totalWins += 1; break;
        case 'casino_spin': newStats.totalSpins += 1; break;
      }
      return { ...prev, stats: newStats };
    });
    
    const missionMap = { deposit: 'deposit', bet_placed: 'bet', bet_won: 'win', casino_spin: 'spin' };
    if (missionMap[type]) {
      checkMissions(missionMap[type], 1);
      checkQuestProgress(missionMap[type], 1);
    }
  };

  // Make prediction
  const makePrediction = (matchId, prediction) => {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match || state.predictions.find(p => p.matchId === matchId)) {
      showNotificationToast('Already predicted!', 'error');
      return;
    }
    
    setState(prev => ({
      ...prev,
      predictions: [...prev.predictions, { matchId, prediction, timestamp: new Date().toISOString() }],
      stats: { ...prev.stats, predictionsTotal: prev.stats.predictionsTotal + 1 }
    }));
    
    showNotificationToast(`Prediction submitted: ${prediction === 'home' ? match.homeTeam : prediction === 'away' ? match.awayTeam : 'Draw'}`);
    checkMissions('prediction', 1);
    checkQuestProgress('prediction', 1);
    
    // If match is finished, check result
    if (match.status === 'finished' && match.result.winner === prediction) {
      addCurrency('points', 50);
      setState(prev => ({
        ...prev,
        stats: { ...prev.stats, predictionsCorrect: prev.stats.predictionsCorrect + 1 }
      }));
      checkMissions('prediction_correct', 1);
      checkQuestProgress('prediction_correct', 1);
    }
  };

  // Claim daily reward
  const claimDailyReward = () => {
    const today = new Date().toDateString();
    if (state.dailyLootbox.lastClaimed === today) {
      showNotificationToast('Already claimed!', 'error');
      return;
    }
    
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const isConsecutive = state.dailyLootbox.lastClaimed === yesterday;
    const currentDay = isConsecutive ? (state.dailyLootbox.currentDay % 7) + 1 : 1;
    
    const rewards = [
      { points: 10 }, { points: 20 }, { points: 30, gems: 2 },
      { points: 40 }, { points: 50, gems: 5 }, { points: 75 },
      { points: 100, gems: 10, diamonds: 1 }
    ];
    const reward = rewards[currentDay - 1];
    
    setState(prev => ({
      ...prev,
      currencies: {
        points: prev.currencies.points + (reward.points || 0),
        gems: prev.currencies.gems + (reward.gems || 0),
        diamonds: prev.currencies.diamonds + (reward.diamonds || 0),
      },
      dailyLootbox: { lastClaimed: today, currentDay, streak: isConsecutive ? prev.dailyLootbox.streak + 1 : 1 }
    }));
    
    showNotificationToast(`🎁 Day ${currentDay} reward: +${reward.points} points!`);
    addNotification({
      type: 'reward',
      title: 'Daily Reward Claimed!',
      message: `You earned ${reward.points} points from Day ${currentDay}!`,
      icon: '🎁',
    });
  };

  // Get remaining plays
  const getRemainingPlays = (gameId) => {
    const game = MINIGAMES.find(g => g.id === gameId);
    const used = state.minigamePlays[gameId] || 0;
    return Math.max(0, game.freeDaily - used);
  };

  // Play minigame
  const playMinigame = (game) => {
    const remaining = getRemainingPlays(game.id);
    if (remaining <= 0) {
      showNotificationToast('No plays left!', 'error');
      return;
    }
    
    setState(prev => ({
      ...prev,
      minigamePlays: { ...prev.minigamePlays, [game.id]: (prev.minigamePlays[game.id] || 0) + 1 },
      stats: {
        ...prev.stats,
        gamesPlayed: prev.stats.gamesPlayed + 1,
        uniqueGamesPlayed: prev.stats.uniqueGamesPlayed.includes(game.id) 
          ? prev.stats.uniqueGamesPlayed 
          : [...prev.stats.uniqueGamesPlayed, game.id]
      }
    }));
    
    setActiveGame(game);
    checkMissions('minigame', 1);
    checkQuestProgress('minigame', 1);
    checkQuestProgress('unique_games', state.stats.uniqueGamesPlayed.includes(game.id) ? 0 : 1);
  };

  // Update profile
  const updateProfile = (field, value, cost = 0) => {
    if (cost > 0 && state.currencies.points < cost) {
      showNotificationToast('Not enough points!', 'error');
      return;
    }
    
    setState(prev => {
      const unlockedField = field === 'avatar' ? 'unlockedAvatars' : field === 'frame' ? 'unlockedFrames' : 'unlockedTitles';
      const isUnlocked = prev.profile[unlockedField].includes(value);
      
      return {
        ...prev,
        currencies: {
          ...prev.currencies,
          points: prev.currencies.points - (isUnlocked ? 0 : cost)
        },
        profile: {
          ...prev.profile,
          [field]: value,
          [unlockedField]: isUnlocked ? prev.profile[unlockedField] : [...prev.profile[unlockedField], value]
        }
      };
    });
    
    if (cost > 0) showNotificationToast(`Unlocked and equipped!`);
    else showNotificationToast(`Profile updated!`);
  };

  // Add friend
  const addFriend = (friend) => {
    if (state.friends.find(f => f.id === friend.id)) return;
    
    setState(prev => ({ ...prev, friends: [...prev.friends, friend] }));
    showNotificationToast(`Added ${friend.username}!`);
    checkMissions('friend_add', 1);
    checkQuestProgress('friend_add', 1);
  };

  // Complete onboarding
  const completeOnboarding = () => {
    setState(prev => ({ ...prev, onboardingComplete: true }));
    setShowOnboarding(false);
    addCurrency('points', 50);
    showNotificationToast('🎉 Welcome bonus: +50 points!');
    addNotification({
      type: 'welcome',
      title: 'Welcome to 100xBet!',
      message: 'Your adventure begins. Complete missions to earn rewards!',
      icon: '🎉',
    });
  };

  // Reset data
  const resetData = () => {
    localStorage.removeItem('100xbet_gamification_v3');
    window.location.reload();
  };

  // Mark notification as read
  const markNotificationRead = (id) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const currentLevel = getCurrentLevel();
  const vipTier = getVIPTier();
  const unreadNotifications = state.notifications.filter(n => !n.read).length;
  const currentAvatar = CONFIG.avatars.find(a => a.id === state.profile.avatar);
  const currentFrame = CONFIG.frames.find(f => f.id === state.profile.frame);
  const currentTitle = CONFIG.titles.find(t => t.id === state.profile.title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal 
          steps={ONBOARDING_STEPS}
          onComplete={completeOnboarding}
        />
      )}

      {/* Level Up Modal */}
      {showLevelUp && newLevel && (
        <LevelUpModal level={newLevel} onClose={() => { setShowLevelUp(false); setNewLevel(null); }} />
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-5 py-3 rounded-lg shadow-2xl transform transition-all duration-500 animate-slideIn ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-gradient-to-r from-green-500 to-emerald-600'
        }`}>
          <div className="flex items-center gap-2 text-sm font-medium">
            {notification.type === 'error' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Notification Center Slide-out */}
      {showNotificationCenter && (
        <NotificationCenter 
          notifications={state.notifications}
          onClose={() => setShowNotificationCenter(false)}
          onMarkRead={markNotificationRead}
        />
      )}

      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo & User */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-white text-xs">
                  100x
                </div>
                <div className="hidden md:block">
                  <div className="font-black text-lg bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    100xBet
                  </div>
                  <div className="text-[9px] text-gray-400 -mt-1">REWARDS</div>
                </div>
              </div>
              
              <div className="hidden md:block h-8 w-px bg-slate-600" />
              
              {/* User Profile Mini */}
              <button 
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 hover:bg-slate-700/50 rounded-lg px-2 py-1 transition-all"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 ${currentFrame?.style || ''} bg-gradient-to-br from-purple-600 to-pink-600`}>
                  {currentAvatar?.emoji || '😎'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold">{state.user.username}</div>
                  <div className="text-[10px] text-gray-400">{currentTitle?.name}</div>
                </div>
              </button>
            </div>

            {/* Currencies */}
            <div className="flex items-center gap-2 sm:gap-3">
              {Object.entries(CONFIG.currencies).map(([key, currency]) => {
                const Icon = currency.icon;
                return (
                  <div key={key} className="flex items-center gap-1 bg-slate-700/50 px-2 sm:px-3 py-1 rounded-lg">
                    <Icon className="w-4 h-4" style={{ color: currency.color }} />
                    <span className="font-bold text-xs sm:text-sm">{state.currencies[key].toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Notification Bell */}
              <button 
                onClick={() => setShowNotificationCenter(true)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Level Progress (desktop) */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[10px] text-gray-400">Level: {currentLevel.name}</div>
                  <div className="text-[9px] text-purple-400">
                    {currentLevel.nextLevel ? `${currentLevel.nextLevel.minPoints - state.currencies.points} to ${currentLevel.nextLevel.name}` : 'MAX'}
                  </div>
                </div>
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                    style={{ width: `${currentLevel.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className={`${showMobileMenu ? 'fixed inset-0 z-50 bg-black/80' : 'hidden'} lg:relative lg:block lg:bg-transparent`}>
          <div className={`w-56 bg-slate-800/95 lg:bg-slate-800/30 min-h-screen p-3 border-r border-purple-500/20 ${showMobileMenu ? 'animate-slideInLeft' : ''}`}>
            {/* Mobile Close Button */}
            <button 
              onClick={() => setShowMobileMenu(false)}
              className="lg:hidden absolute top-3 right-3 p-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <nav className="space-y-1 mt-8 lg:mt-0">
              {[
                { id: 'overview', icon: Home, label: 'Overview' },
                { id: 'missions', icon: Target, label: 'Missions' },
                { id: 'quests', icon: Map, label: 'Quests', badge: '!' },
                { id: 'predictions', icon: Swords, label: 'Predictions', badge: MATCHES.filter(m => m.status === 'upcoming').length },
                { id: 'minigames', icon: Gamepad2, label: 'Minigames' },
                { id: 'store', icon: Store, label: 'Store' },
                { id: 'daily', icon: Calendar, label: 'Daily Rewards' },
                { id: 'profile', icon: User, label: 'Profile' },
                { id: 'vip', icon: Crown, label: 'VIP Club' },
                { id: 'social', icon: Users, label: 'Friends' },
                { id: 'leaderboard', icon: TrendingUp, label: 'Leaderboard' },
                { id: 'achievements', icon: Award, label: 'Achievements' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setShowMobileMenu(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-lg'
                        : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Demo Controls */}
            <div className="mt-6 p-3 bg-slate-700/30 rounded-lg border border-amber-500/20">
              <div className="text-[10px] text-amber-400 mb-2 font-semibold">🎮 Demo Controls</div>
              <div className="space-y-1">
                {[
                  { action: 'deposit', label: '+Deposit', color: 'bg-green-600/30 text-green-400' },
                  { action: 'bet_placed', label: '+Bet', color: 'bg-blue-600/30 text-blue-400' },
                  { action: 'bet_won', label: '+Win', color: 'bg-yellow-600/30 text-yellow-400' },
                  { action: 'casino_spin', label: '+Spin', color: 'bg-purple-600/30 text-purple-400' },
                ].map(({ action, label, color }) => (
                  <button
                    key={action}
                    onClick={() => simulateActivity(action)}
                    className={`w-full py-1.5 px-2 rounded text-[10px] hover:opacity-80 transition-opacity ${color}`}
                  >
                    {label}
                  </button>
                ))}
                <button onClick={resetData} className="w-full py-1.5 px-2 bg-red-600/30 text-red-400 rounded text-[10px] mt-2">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto min-h-screen">
          {activeTab === 'overview' && (
            <OverviewTab 
              state={state}
              currentLevel={currentLevel}
              vipTier={vipTier}
              onClaimDaily={claimDailyReward}
              setActiveTab={setActiveTab}
              missions={MISSIONS}
              quests={QUESTS}
            />
          )}
          
          {activeTab === 'missions' && (
            <MissionsTab state={state} missions={MISSIONS} currentLevel={currentLevel} />
          )}
          
          {activeTab === 'quests' && (
            <QuestsTab 
              quests={QUESTS}
              questProgress={state.questProgress}
              currentLevel={currentLevel}
            />
          )}
          
          {activeTab === 'predictions' && (
            <PredictionsTab 
              matches={MATCHES}
              predictions={state.predictions}
              onPredict={makePrediction}
              stats={state.stats}
            />
          )}
          
          {activeTab === 'minigames' && (
            <MinigamesTab 
              games={MINIGAMES}
              activeGame={activeGame}
              setActiveGame={setActiveGame}
              onPlay={playMinigame}
              getRemainingPlays={getRemainingPlays}
              addCurrency={addCurrency}
              showNotification={showNotificationToast}
            />
          )}
          
          {activeTab === 'store' && (
            <StoreTab 
              items={STORE_ITEMS}
              currencies={state.currencies}
              currentLevel={currentLevel}
            />
          )}
          
          {activeTab === 'daily' && (
            <DailyRewardsTab 
              dailyLootbox={state.dailyLootbox}
              onClaim={claimDailyReward}
            />
          )}
          
          {activeTab === 'profile' && (
            <ProfileTab 
              state={state}
              currentLevel={currentLevel}
              vipTier={vipTier}
              onUpdateProfile={updateProfile}
            />
          )}
          
          {activeTab === 'vip' && (
            <VIPTab vipTier={vipTier} totalDeposits={state.stats.totalDeposits} />
          )}
          
          {activeTab === 'social' && (
            <SocialTab 
              friends={state.friends.length > 0 ? state.friends : SAMPLE_FRIENDS}
              onAddFriend={addFriend}
              sampleFriends={SAMPLE_FRIENDS}
            />
          )}
          
          {activeTab === 'leaderboard' && (
            <LeaderboardTab username={state.user.username} points={state.currencies.points} />
          )}
          
          {activeTab === 'achievements' && (
            <AchievementsTab stats={state.stats} completed={state.missions.completed} />
          )}
        </main>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-bounce-soft { animation: bounce-soft 2s infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        .animate-confetti { animation: confetti 3s ease-out forwards; }
      `}</style>
    </div>
  );
}

// ============ ONBOARDING MODAL ============
function OnboardingModal({ steps, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-purple-500/30 animate-fadeIn">
        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${
              i === currentStep ? 'w-6 bg-purple-500' : i < currentStep ? 'w-1.5 bg-purple-500' : 'w-1.5 bg-slate-600'
            }`} />
          ))}
        </div>

        {/* Content */}
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-soft">{step.icon}</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{step.title}</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-8">{step.description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(c => c - 1)}
              className="flex-1 py-3 bg-slate-700 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={() => isLast ? onComplete() : setCurrentStep(c => c + 1)}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-amber-500 rounded-lg font-bold hover:from-purple-600 hover:to-amber-600 transition-all"
          >
            {isLast ? "Let's Go!" : 'Next'}
          </button>
        </div>

        {/* Skip Button */}
        {!isLast && (
          <button onClick={onComplete} className="w-full mt-3 text-gray-500 text-sm hover:text-gray-400">
            Skip Tutorial
          </button>
        )}
      </div>
    </div>
  );
}

// ============ LEVEL UP MODAL ============
function LevelUpModal({ level, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#fbbf24', '#8b5cf6', '#22c55e', '#ef4444', '#3b82f6'][i % 5],
              animationDelay: `${Math.random() * 2}s`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
            }}
          />
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-sm w-full border border-purple-500/50 animate-fadeIn relative">
        <div className="text-center">
          <PartyPopper className="w-12 h-12 mx-auto text-yellow-400 mb-4 animate-bounce" />
          <h2 className="text-2xl font-black mb-2">LEVEL UP!</h2>
          <div className="text-6xl mb-3">{level.icon}</div>
          <h3 className="text-xl font-bold mb-4" style={{ color: level.color }}>{level.name}</h3>
          
          <div className="bg-slate-700/50 rounded-lg p-3 mb-6 text-left">
            <div className="text-xs text-gray-400 mb-2">New Perks:</div>
            {level.perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-green-400 mb-1">
                <Check className="w-3 h-3" /> {perk}
              </div>
            ))}
          </div>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-amber-500 rounded-lg font-bold hover:from-purple-600 hover:to-amber-600"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ NOTIFICATION CENTER ============
function NotificationCenter({ notifications, onClose, onMarkRead }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-slate-800 h-full overflow-y-auto animate-slideIn"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="font-bold text-lg">Notifications</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  notif.read ? 'bg-slate-700/30' : 'bg-slate-700/70 border-l-2 border-purple-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{notif.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{notif.title}</div>
                    <div className="text-xs text-gray-400 truncate">{notif.message}</div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      {new Date(notif.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ============ OVERVIEW TAB ============
function OverviewTab({ state, currentLevel, vipTier, onClaimDaily, setActiveTab, missions, quests }) {
  const canClaimDaily = state.dailyLootbox.lastClaimed !== new Date().toDateString();
  const availableMissions = missions.filter(m => !state.missions.completed.includes(m.id)).slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back! 👋</h1>
          <p className="text-gray-400 text-sm">Your 100xBet Rewards dashboard</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-400">
          <Flame className="w-4 h-4" />
          <span>{state.dailyLootbox.streak || 0} day streak</span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Level', value: currentLevel.name, icon: currentLevel.icon, color: currentLevel.color, sub: `${Math.round(currentLevel.progress)}% to next` },
          { label: 'VIP Status', value: vipTier.name, icon: vipTier.icon, color: vipTier.color, sub: `${vipTier.cashback}% cashback` },
          { label: 'Missions', value: `${state.missions.completed.length}/${missions.length}`, icon: '🎯', color: '#3b82f6', sub: 'completed' },
          { label: 'Predictions', value: `${state.stats.predictionsCorrect}/${state.stats.predictionsTotal}`, icon: '🔮', color: '#8b5cf6', sub: 'correct' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl sm:text-2xl">{stat.icon}</span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <div className="font-bold text-sm sm:text-lg" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-gray-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Daily Reward */}
        <button
          onClick={canClaimDaily ? onClaimDaily : undefined}
          className={`p-4 rounded-xl text-left transition-all ${
            canClaimDaily 
              ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-purple-500/50 hover:from-purple-600/50 hover:to-pink-600/50 animate-pulse-glow' 
              : 'bg-slate-800/50 border border-slate-600/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <Gift className={`w-8 h-8 ${canClaimDaily ? 'text-pink-400' : 'text-gray-500'}`} />
            <div>
              <div className="font-bold text-sm">{canClaimDaily ? 'Claim Daily Reward!' : 'Claimed Today ✓'}</div>
              <div className="text-xs text-gray-400">Day {state.dailyLootbox.currentDay} of 7</div>
            </div>
          </div>
        </button>

        {/* Play Minigames */}
        <button
          onClick={() => setActiveTab('minigames')}
          className="p-4 rounded-xl bg-gradient-to-br from-amber-600/30 to-orange-600/30 border border-amber-500/30 hover:from-amber-600/40 hover:to-orange-600/40 text-left transition-all"
        >
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-amber-400" />
            <div>
              <div className="font-bold text-sm">Play Minigames</div>
              <div className="text-xs text-gray-400">Free daily games available</div>
            </div>
          </div>
        </button>

        {/* Predictions */}
        <button
          onClick={() => setActiveTab('predictions')}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border border-blue-500/30 hover:from-blue-600/40 hover:to-cyan-600/40 text-left transition-all"
        >
          <div className="flex items-center gap-3">
            <Swords className="w-8 h-8 text-blue-400" />
            <div>
              <div className="font-bold text-sm">Predict Matches</div>
              <div className="text-xs text-gray-400">{MATCHES.filter(m => m.status === 'upcoming').length} matches available</div>
            </div>
          </div>
        </button>
      </div>

      {/* Available Missions */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Available Missions</h2>
          <button onClick={() => setActiveTab('missions')} className="text-purple-400 text-xs hover:text-purple-300 flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {availableMissions.map(mission => {
            const progress = state.missions.progress[mission.id] || 0;
            const percent = Math.min((progress / mission.target) * 100, 100);
            return (
              <div key={mission.id} className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{mission.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs truncate">{mission.name}</div>
                    <div className="text-[10px] text-gray-400 truncate">{mission.description}</div>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-purple-500 transition-all" style={{ width: `${percent}%` }} />
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400">{progress}/{mission.target}</span>
                  <span className="text-yellow-400">+{mission.reward.points}pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Quests Preview */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Active Quests</h2>
          <button onClick={() => setActiveTab('quests')} className="text-purple-400 text-xs hover:text-purple-300 flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quests.slice(0, 2).map(quest => {
            const completedSteps = quest.steps.filter(s => state.questProgress[`${quest.id}_${s.id}_completed`]).length;
            const percent = (completedSteps / quest.steps.length) * 100;
            return (
              <div key={quest.id} className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{quest.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{quest.name}</div>
                    <div className="text-[10px] text-gray-400">{completedSteps}/{quest.steps.length} steps</div>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ MISSIONS TAB ============
function MissionsTab({ state, missions, currentLevel }) {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(missions.map(m => m.category))];
  const filtered = filter === 'all' ? missions : missions.filter(m => m.category === filter);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Missions</h1>
        <p className="text-gray-400 text-sm">{state.missions.completed.length}/{missions.length} completed</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${
              filter === cat ? 'bg-purple-600' : 'bg-slate-700/50 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(mission => {
          const isCompleted = state.missions.completed.includes(mission.id);
          const progress = state.missions.progress[mission.id] || 0;
          const percent = Math.min((progress / mission.target) * 100, 100);

          return (
            <div key={mission.id} className={`rounded-xl p-4 border transition-all ${
              isCompleted ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/50 border-purple-500/20'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{mission.icon}</span>
                {isCompleted && <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">✓ Done</span>}
              </div>
              <h3 className="font-bold text-sm mb-1">{mission.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{mission.description}</p>
              
              {!isCompleted && (
                <div className="mb-3">
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-purple-500 transition-all" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{progress}/{mission.target}</div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs">
                <span className="text-yellow-400 font-bold">+{mission.reward.points}pts</span>
                {mission.reward.gems && <span className="text-green-400">+{mission.reward.gems}💎</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ QUESTS TAB ============
function QuestsTab({ quests, questProgress, currentLevel }) {
  const [selectedQuest, setSelectedQuest] = useState(null);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Quests</h1>
        <p className="text-gray-400 text-sm">Multi-step campaigns for big rewards</p>
      </div>

      {selectedQuest ? (
        <div className="bg-slate-800/50 rounded-xl p-4 sm:p-6 border border-purple-500/20">
          <button onClick={() => setSelectedQuest(null)} className="text-purple-400 text-sm mb-4 flex items-center gap-1 hover:text-purple-300">
            <ChevronLeft className="w-4 h-4" /> Back to Quests
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{selectedQuest.icon}</span>
            <div>
              <h2 className="text-xl font-bold">{selectedQuest.name}</h2>
              <p className="text-sm text-gray-400">{selectedQuest.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            {selectedQuest.steps.map((step, i) => {
              const key = `${selectedQuest.id}_${step.id}`;
              const progress = questProgress[key] || 0;
              const completed = questProgress[`${key}_completed`];
              const percent = Math.min((progress / step.target) * 100, 100);

              return (
                <div key={step.id} className={`p-4 rounded-lg border ${
                  completed ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-700/50 border-slate-600/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      completed ? 'bg-green-500' : 'bg-slate-600'
                    }`}>
                      {completed ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{step.name}</span>
                        <span className="text-yellow-400 text-xs">+{step.reward.points}pts</span>
                      </div>
                      <p className="text-xs text-gray-400">{step.description}</p>
                      {!completed && (
                        <div className="mt-2">
                          <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${percent}%` }} />
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{progress}/{step.target}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Total Quest Reward</div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-bold">{selectedQuest.totalReward.points} pts</span>
              {selectedQuest.totalReward.gems && <span className="text-green-400">{selectedQuest.totalReward.gems} gems</span>}
              {selectedQuest.totalReward.diamonds && <span className="text-blue-400">{selectedQuest.totalReward.diamonds} 💎</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quests.map(quest => {
            const completedSteps = quest.steps.filter(s => questProgress[`${quest.id}_${s.id}_completed`]).length;
            const allComplete = completedSteps === quest.steps.length;
            const percent = (completedSteps / quest.steps.length) * 100;
            const locked = quest.requiredLevel && currentLevel.index < quest.requiredLevel;

            return (
              <button
                key={quest.id}
                onClick={() => !locked && setSelectedQuest(quest)}
                disabled={locked}
                className={`p-4 rounded-xl border text-left transition-all ${
                  locked ? 'bg-slate-800/30 border-slate-600/30 opacity-50' :
                  allComplete ? 'bg-green-500/10 border-green-500/30' : 
                  'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{quest.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{quest.name}</h3>
                      {locked && <Lock className="w-4 h-4 text-gray-500" />}
                      {allComplete && <Check className="w-4 h-4 text-green-400" />}
                    </div>
                    <p className="text-xs text-gray-400">{quest.description}</p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{completedSteps}/{quest.steps.length} steps</span>
                    <span className="text-yellow-400">+{quest.totalReward.points} pts</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ PREDICTIONS TAB ============
function PredictionsTab({ matches, predictions, onPredict, stats }) {
  const [filter, setFilter] = useState('upcoming');
  const leagues = [...new Set(matches.map(m => m.league))];
  
  const filtered = matches.filter(m => {
    if (filter === 'upcoming') return m.status === 'upcoming';
    if (filter === 'finished') return m.status === 'finished';
    return m.league === filter;
  });

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Match Predictions</h1>
          <p className="text-gray-400 text-sm">Predict outcomes to earn points</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-slate-700/50 px-3 py-1.5 rounded-lg">
            <span className="text-gray-400">Correct: </span>
            <span className="text-green-400 font-bold">{stats.predictionsCorrect}/{stats.predictionsTotal}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-3 py-1.5 rounded-lg text-xs ${filter === 'upcoming' ? 'bg-purple-600' : 'bg-slate-700/50 text-gray-400'}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('finished')}
          className={`px-3 py-1.5 rounded-lg text-xs ${filter === 'finished' ? 'bg-purple-600' : 'bg-slate-700/50 text-gray-400'}`}
        >
          Finished
        </button>
        {leagues.map(league => (
          <button
            key={league}
            onClick={() => setFilter(league)}
            className={`px-3 py-1.5 rounded-lg text-xs ${filter === league ? 'bg-purple-600' : 'bg-slate-700/50 text-gray-400'}`}
          >
            {league}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(match => {
          const userPrediction = predictions.find(p => p.matchId === match.id);
          const isFinished = match.status === 'finished';
          const result = match.result;

          return (
            <div key={match.id} className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
              {/* League & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{match.leagueIcon}</span>
                  <span>{match.league}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {match.date} • {match.time}
                </div>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between gap-4">
                {/* Home Team */}
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold mb-1">{match.homeTeam}</div>
                  {isFinished && <div className="text-3xl font-black text-white">{result.home}</div>}
                  <button
                    onClick={() => onPredict(match.id, 'home')}
                    disabled={!!userPrediction || isFinished}
                    className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-all ${
                      userPrediction?.prediction === 'home' 
                        ? isFinished && result.winner === 'home' 
                          ? 'bg-green-500' 
                          : isFinished 
                            ? 'bg-red-500' 
                            : 'bg-purple-600'
                        : userPrediction || isFinished
                          ? 'bg-slate-700 text-gray-500'
                          : 'bg-slate-700 hover:bg-green-600'
                    }`}
                  >
                    Home {match.homeOdds}
                  </button>
                </div>

                {/* VS / Draw */}
                <div className="flex flex-col items-center">
                  <div className="text-gray-500 text-sm mb-1">VS</div>
                  <button
                    onClick={() => onPredict(match.id, 'draw')}
                    disabled={!!userPrediction || isFinished}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      userPrediction?.prediction === 'draw'
                        ? isFinished && result?.winner === 'draw'
                          ? 'bg-green-500'
                          : isFinished
                            ? 'bg-red-500'
                            : 'bg-purple-600'
                        : userPrediction || isFinished
                          ? 'bg-slate-700 text-gray-500'
                          : 'bg-slate-700 hover:bg-yellow-600'
                    }`}
                  >
                    Draw {match.drawOdds}
                  </button>
                </div>

                {/* Away Team */}
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold mb-1">{match.awayTeam}</div>
                  {isFinished && <div className="text-3xl font-black text-white">{result.away}</div>}
                  <button
                    onClick={() => onPredict(match.id, 'away')}
                    disabled={!!userPrediction || isFinished}
                    className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-all ${
                      userPrediction?.prediction === 'away'
                        ? isFinished && result?.winner === 'away'
                          ? 'bg-green-500'
                          : isFinished
                            ? 'bg-red-500'
                            : 'bg-purple-600'
                        : userPrediction || isFinished
                          ? 'bg-slate-700 text-gray-500'
                          : 'bg-slate-700 hover:bg-blue-600'
                    }`}
                  >
                    Away {match.awayOdds}
                  </button>
                </div>
              </div>

              {/* User Prediction Status */}
              {userPrediction && (
                <div className={`mt-3 text-center text-sm py-2 rounded-lg ${
                  isFinished 
                    ? result.winner === userPrediction.prediction 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {isFinished 
                    ? result.winner === userPrediction.prediction 
                      ? '✓ Correct! +50 points' 
                      : '✗ Incorrect'
                    : `Your prediction: ${userPrediction.prediction === 'home' ? match.homeTeam : userPrediction.prediction === 'away' ? match.awayTeam : 'Draw'}`
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ MINIGAMES TAB ============
function MinigamesTab({ games, activeGame, setActiveGame, onPlay, getRemainingPlays, addCurrency, showNotification }) {
  if (activeGame) {
    return (
      <MiniGamePlayer 
        game={activeGame}
        onClose={() => setActiveGame(null)}
        addCurrency={addCurrency}
        showNotification={showNotification}
      />
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Minigames</h1>
        <p className="text-gray-400 text-sm">Play free games to earn points</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {games.map(game => {
          const remaining = getRemainingPlays(game.id);
          
          return (
            <div key={game.id} className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="text-4xl mb-2">{game.icon}</div>
              <h3 className="font-bold text-sm mb-1">{game.name}</h3>
              <p className="text-[10px] text-gray-400 mb-3">{game.description}</p>
              
              <div className="flex items-center justify-between mb-3 text-[10px]">
                <span className={remaining > 0 ? 'text-green-400' : 'text-red-400'}>{remaining} left</span>
                <span className="text-gray-500">{game.freeDaily}/day</span>
              </div>
              
              <button
                onClick={() => onPlay(game)}
                disabled={remaining <= 0}
                className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 ${
                  remaining > 0
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Play className="w-3 h-3" /> Play
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ MINI GAME PLAYER ============
function MiniGamePlayer({ game, onClose, addCurrency, showNotification }) {
  const [playing, setPlaying] = useState(false);
  const [result, setResult] = useState(null);

  const playGame = () => {
    setPlaying(true);
    setResult(null);

    setTimeout(() => {
      const prizes = [0, 0, 5, 5, 10, 10, 15, 25, 50, 100];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(prize);
      setPlaying(false);
      
      if (prize > 0) {
        addCurrency('points', prize);
        showNotification(`🎉 Won ${prize} points!`);
      }
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-3xl">{game.icon}</span> {game.name}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl p-8 border border-purple-500/30 text-center">
        {!playing && result === null && (
          <div>
            <div className="text-6xl mb-4 animate-bounce-soft">{game.icon}</div>
            <p className="text-gray-300 mb-6">{game.description}</p>
            <button
              onClick={playGame}
              className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 animate-pulse"
            >
              Play Now
            </button>
          </div>
        )}

        {playing && (
          <div>
            <div className="text-6xl mb-4 animate-bounce">{game.icon}</div>
            <p className="text-lg text-purple-300 mb-4">Playing...</p>
            <RefreshCw className="w-10 h-10 mx-auto animate-spin text-purple-400" />
          </div>
        )}

        {!playing && result !== null && (
          <div>
            <div className="text-6xl mb-4">{result > 0 ? '🎉' : '😢'}</div>
            <p className="text-xl font-bold mb-2">{result > 0 ? `You won ${result} points!` : 'No luck this time!'}</p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => { setResult(null); }}
                className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700"
              >
                Play Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-600 rounded-lg font-bold hover:bg-slate-700"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ STORE TAB ============
function StoreTab({ items, currencies, currentLevel }) {
  const [category, setCategory] = useState('all');
  const categories = ['all', ...new Set(items.map(i => i.category))];
  const filtered = category === 'all' ? items : items.filter(i => i.category === category);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">100xBet Store</h1>
        <p className="text-gray-400 text-sm">Redeem points for rewards</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize ${
              category === cat ? 'bg-purple-600' : 'bg-slate-700/50 text-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map(item => {
          const canAfford = Object.entries(item.price).every(([k, v]) => currencies[k] >= v);
          const locked = item.requiredLevel && currentLevel.index < item.requiredLevel;

          return (
            <div key={item.id} className={`bg-slate-800/50 rounded-xl p-4 border transition-all ${
              locked ? 'border-slate-600/30 opacity-50' : 'border-purple-500/20'
            }`}>
              {item.stock && <div className="text-[10px] text-orange-400 mb-1">{item.stock} left</div>}
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-xs mb-1">{item.name}</h3>
              <p className="text-[10px] text-gray-400 mb-3">{item.description}</p>
              
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {Object.entries(item.price).map(([currency, amount]) => {
                  const Icon = CONFIG.currencies[currency].icon;
                  return (
                    <div key={currency} className="flex items-center gap-1 text-[10px]">
                      <Icon className="w-3 h-3" style={{ color: CONFIG.currencies[currency].color }} />
                      <span className={currencies[currency] >= amount ? '' : 'text-red-400'}>{amount}</span>
                    </div>
                  );
                })}
              </div>

              <button
                disabled={!canAfford || locked}
                className={`w-full py-2 rounded-lg font-bold text-xs ${
                  locked ? 'bg-slate-700 text-gray-500' :
                  canAfford ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-700 text-gray-500'
                }`}
              >
                {locked ? <><Lock className="w-3 h-3 inline mr-1" />{CONFIG.levels[item.requiredLevel].name}</> : canAfford ? 'Buy' : 'Not enough'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ DAILY REWARDS TAB ============
function DailyRewardsTab({ dailyLootbox, onClaim }) {
  const today = new Date().toDateString();
  const canClaim = dailyLootbox.lastClaimed !== today;
  const currentDay = dailyLootbox.currentDay || 1;
  
  const rewards = [
    { day: 1, points: 10, icon: '📦' }, { day: 2, points: 20, icon: '📦' },
    { day: 3, points: 30, gems: 2, icon: '🎁' }, { day: 4, points: 40, icon: '📦' },
    { day: 5, points: 50, gems: 5, icon: '🎁' }, { day: 6, points: 75, icon: '📦' },
    { day: 7, points: 100, gems: 10, diamonds: 1, icon: '👑' },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Daily Rewards</h1>
        <p className="text-gray-400 text-sm">🔥 {dailyLootbox.streak || 0} day streak</p>
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4 sm:p-6 border border-purple-500/30">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {rewards.map((day, i) => {
            const isPast = i + 1 < currentDay;
            const isCurrent = i + 1 === currentDay;

            return (
              <div
                key={i}
                className={`rounded-lg p-2 sm:p-3 text-center transition-all ${
                  isCurrent ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-105 shadow-lg' :
                  isPast ? 'bg-green-500/20 border border-green-500/50' : 'bg-slate-700/50'
                }`}
              >
                <div className="text-[10px] text-gray-400 mb-1">Day {day.day}</div>
                <div className="text-xl sm:text-2xl mb-1">{day.icon}</div>
                <div className="text-[10px] text-yellow-400">{day.points}pts</div>
                {isPast && <Check className="w-3 h-3 mx-auto text-green-400 mt-1" />}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onClaim}
            disabled={!canClaim}
            className={`px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg ${
              canClaim ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 animate-pulse' : 'bg-slate-700 text-gray-500'
            }`}
          >
            {canClaim ? `Claim Day ${currentDay}!` : '✓ Claimed Today'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ PROFILE TAB ============
function ProfileTab({ state, currentLevel, vipTier, onUpdateProfile }) {
  const [tab, setTab] = useState('avatar');
  
  const currentAvatar = CONFIG.avatars.find(a => a.id === state.profile.avatar);
  const currentFrame = CONFIG.frames.find(f => f.id === state.profile.frame);
  const currentTitle = CONFIG.titles.find(t => t.id === state.profile.title);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl border-4 ${currentFrame?.style || ''} bg-gradient-to-br from-purple-600 to-pink-600`}>
          {currentAvatar?.emoji || '😎'}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{state.user.username}</h1>
          <div className="text-sm text-gray-400">{currentTitle?.name}</div>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span style={{ color: currentLevel.color }}>{currentLevel.icon} {currentLevel.name}</span>
            <span className="text-gray-500">•</span>
            <span style={{ color: vipTier.color }}>{vipTier.icon} {vipTier.name}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {['avatar', 'frame', 'title'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm capitalize ${tab === t ? 'bg-purple-600' : 'bg-slate-700/50 text-gray-400'}`}
          >
            {t}s
          </button>
        ))}
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
        {tab === 'avatar' && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {CONFIG.avatars.map(avatar => {
              const owned = state.profile.unlockedAvatars.includes(avatar.id);
              const selected = state.profile.avatar === avatar.id;
              const locked = avatar.requiredLevel && currentLevel.index < avatar.requiredLevel;

              return (
                <button
                  key={avatar.id}
                  onClick={() => !locked && onUpdateProfile('avatar', avatar.id, owned ? 0 : avatar.cost || 0)}
                  disabled={locked}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                    selected ? 'bg-purple-600 ring-2 ring-purple-400' :
                    locked ? 'bg-slate-700/50 opacity-50' :
                    owned ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <span className="text-3xl">{avatar.emoji}</span>
                  <span className="text-[10px] mt-1">{avatar.name}</span>
                  {!owned && !locked && <span className="text-[9px] text-yellow-400">{avatar.cost}pts</span>}
                  {locked && <Lock className="w-3 h-3 text-gray-500 mt-1" />}
                </button>
              );
            })}
          </div>
        )}

        {tab === 'frame' && (
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
            {CONFIG.frames.map(frame => {
              const owned = state.profile.unlockedFrames.includes(frame.id);
              const selected = state.profile.frame === frame.id;
              const locked = frame.requiredLevel && currentLevel.index < frame.requiredLevel;

              return (
                <button
                  key={frame.id}
                  onClick={() => !locked && onUpdateProfile('frame', frame.id, owned ? 0 : frame.cost || 0)}
                  disabled={locked}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                    selected ? 'bg-purple-600 ring-2 ring-purple-400' :
                    locked ? 'bg-slate-700/50 opacity-50' :
                    owned ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full border-4 ${frame.style} bg-slate-600`} />
                  <span className="text-xs mt-2">{frame.name}</span>
                  {!owned && !locked && <span className="text-[9px] text-yellow-400">{frame.cost}pts</span>}
                  {locked && <Lock className="w-3 h-3 text-gray-500 mt-1" />}
                </button>
              );
            })}
          </div>
        )}

        {tab === 'title' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CONFIG.titles.map(title => {
              const owned = state.profile.unlockedTitles.includes(title.id);
              const selected = state.profile.title === title.id;
              const locked = title.requiredLevel && currentLevel.index < title.requiredLevel;

              return (
                <button
                  key={title.id}
                  onClick={() => !locked && onUpdateProfile('title', title.id, owned ? 0 : title.cost || 0)}
                  disabled={locked}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selected ? 'bg-purple-600 ring-2 ring-purple-400' :
                    locked ? 'bg-slate-700/50 opacity-50' :
                    owned ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-medium text-sm">{title.name}</span>
                  {title.requirement && <span className="block text-[9px] text-gray-400 mt-1">{title.requirement}</span>}
                  {!owned && !locked && <span className="block text-[9px] text-yellow-400 mt-1">{title.cost}pts</span>}
                  {locked && <Lock className="w-3 h-3 mx-auto text-gray-500 mt-1" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ VIP TAB ============
function VIPTab({ vipTier, totalDeposits }) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">VIP Club</h1>
        <p className="text-gray-400 text-sm">Exclusive perks based on your activity</p>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-br from-purple-600/30 to-amber-600/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{vipTier.icon}</span>
          <div>
            <div className="text-2xl font-bold" style={{ color: vipTier.color }}>{vipTier.name}</div>
            <div className="text-sm text-gray-400">Your current VIP status</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Total Deposits: €{totalDeposits}</span>
            <span>{vipTier.nextTier ? `€${vipTier.nextTier.minDeposits} for ${vipTier.nextTier.name}` : 'Max tier!'}</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-amber-500" style={{ width: `${vipTier.progress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{vipTier.cashback}%</div>
            <div className="text-xs text-gray-400">Cashback</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{vipTier.perks.length}</div>
            <div className="text-xs text-gray-400">Perks</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-400">{vipTier.index + 1}/{CONFIG.vipTiers.length}</div>
            <div className="text-xs text-gray-400">Tier</div>
          </div>
        </div>
      </div>

      {/* All Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONFIG.vipTiers.map((tier, i) => {
          const isUnlocked = totalDeposits >= tier.minDeposits;
          const isCurrent = vipTier.name === tier.name;

          return (
            <div key={tier.name} className={`rounded-xl p-4 border ${
              isCurrent ? 'bg-purple-600/20 border-purple-500' :
              isUnlocked ? 'bg-slate-800/50 border-green-500/30' : 'bg-slate-800/30 border-slate-600/30 opacity-60'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{tier.icon}</span>
                <div>
                  <div className="font-bold" style={{ color: tier.color }}>{tier.name}</div>
                  <div className="text-[10px] text-gray-400">€{tier.minDeposits}+ deposits</div>
                </div>
              </div>
              
              <div className="text-xs space-y-1">
                {tier.perks.map((perk, j) => (
                  <div key={j} className="flex items-center gap-1 text-gray-400">
                    <Check className="w-3 h-3 text-green-400" /> {perk}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ SOCIAL TAB ============
function SocialTab({ friends, onAddFriend, sampleFriends }) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Friends</h1>
        <p className="text-gray-400 text-sm">{friends.length} friends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {friends.map(friend => (
          <div key={friend.id} className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  {friend.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${friend.online ? 'bg-green-500' : 'bg-gray-500'}`} />
              </div>
              <div className="flex-1">
                <div className="font-bold">{friend.username}</div>
                <div className="text-xs text-gray-400">{friend.level} • {friend.points} pts</div>
              </div>
              <button className="px-3 py-1.5 bg-purple-600/20 text-purple-400 rounded-lg text-xs hover:bg-purple-600/30">
                Challenge
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Friends */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
        <h3 className="font-bold mb-3">Suggested Friends</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleFriends.filter(f => !friends.find(fr => fr.id === f.id)).map(friend => (
            <div key={friend.id} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                {friend.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{friend.username}</div>
                <div className="text-[10px] text-gray-400">{friend.level}</div>
              </div>
              <button
                onClick={() => onAddFriend(friend)}
                className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs font-medium hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ LEADERBOARD TAB ============
function LeaderboardTab({ username, points }) {
  const leaderboard = [
    { rank: 1, name: 'HighRoller99', points: 15420 },
    { rank: 2, name: 'LuckyAce', points: 12350 },
    { rank: 3, name: 'SlotKing', points: 9870 },
    { rank: 4, name: 'BetMaster', points: 7650 },
    { rank: 5, name: 'WinStreak', points: 5430 },
    { rank: 6, name: username, points: points, isUser: true },
    { rank: 7, name: 'GambleGuru', points: 4210 },
    { rank: 8, name: 'CasinoFan', points: 3890 },
  ].sort((a, b) => b.points - a.points).map((p, i) => ({ ...p, rank: i + 1 }));

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Leaderboard</h1>
        <p className="text-gray-400 text-sm">Top players this week</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 mb-4">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => (
          <div key={p?.rank} className={`text-center ${i === 1 ? 'order-2' : i === 0 ? 'order-1' : 'order-3'}`}>
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl ${
              i === 1 ? 'bg-yellow-500' : i === 0 ? 'bg-gray-400' : 'bg-amber-700'
            }`}>
              {i === 1 ? '🥇' : i === 0 ? '🥈' : '🥉'}
            </div>
            <div className="font-bold text-xs sm:text-sm truncate max-w-[80px]">{p?.name}</div>
            <div className="text-yellow-400 text-[10px] sm:text-xs">{p?.points?.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Full List */}
      <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 overflow-hidden">
        {leaderboard.slice(3).map(player => (
          <div key={player.rank} className={`flex items-center gap-3 p-3 border-b border-slate-700/50 last:border-0 ${player.isUser ? 'bg-purple-500/20' : ''}`}>
            <span className="w-8 text-center text-gray-400">#{player.rank}</span>
            <div className="flex-1">
              <span className={player.isUser ? 'font-bold text-purple-400' : ''}>{player.name}</span>
            </div>
            <span className="text-yellow-400 font-bold">{player.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ ACHIEVEMENTS TAB ============
function AchievementsTab({ stats, completed }) {
  const achievements = [
    { id: 'first_mission', name: 'First Mission', description: 'Complete a mission', icon: '🎯', condition: completed.length >= 1 },
    { id: 'mission_5', name: 'Mission Expert', description: 'Complete 5 missions', icon: '🏅', condition: completed.length >= 5 },
    { id: 'bettor', name: 'Bettor', description: 'Place 10 bets', icon: '📊', condition: stats.totalBets >= 10 },
    { id: 'winner', name: 'Winner', description: 'Win 10 bets', icon: '🏆', condition: stats.totalWins >= 10 },
    { id: 'spinner', name: 'Spinner', description: 'Play 50 spins', icon: '🎰', condition: stats.totalSpins >= 50 },
    { id: 'gamer', name: 'Gamer', description: 'Play 10 minigames', icon: '🎮', condition: stats.gamesPlayed >= 10 },
    { id: 'predictor', name: 'Predictor', description: 'Get 5 predictions right', icon: '🔮', condition: stats.predictionsCorrect >= 5 },
    { id: 'depositor', name: 'Depositor', description: 'Deposit €500', icon: '💰', condition: stats.totalDeposits >= 500 },
  ];

  const unlocked = achievements.filter(a => a.condition).length;

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Achievements</h1>
        <p className="text-gray-400 text-sm">{unlocked}/{achievements.length} unlocked</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {achievements.map(ach => (
          <div key={ach.id} className={`rounded-xl p-4 border text-center transition-all ${
            ach.condition ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-slate-800/30 border-slate-600/30 opacity-50'
          }`}>
            <div className={`text-4xl mb-2 ${!ach.condition ? 'grayscale' : ''}`}>{ach.icon}</div>
            <div className="font-bold text-xs">{ach.name}</div>
            <div className="text-[10px] text-gray-400">{ach.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
