// src/icons/heroicons.ts
import {
  UserIcon,
  UserPlusIcon,
  LockClosedIcon,
  EnvelopeIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ChartBarIcon,
  Squares2X2Icon,
  TrophyIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

export const Icons = {
  // User related
  User: UserIcon,
  AddUser: UserPlusIcon,
  Password: LockClosedIcon,
  Email: EnvelopeIcon,

  // Transactions
  Transaction: CreditCardIcon,
  Money: CurrencyDollarIcon,
  Deposit: BanknotesIcon,
  History: CalendarDaysIcon,

  // Bets & Games
  Bet: TrophyIcon,
  Game: PlayCircleIcon,
  GamesGrid: Squares2X2Icon,

  // Dashboard/Stats
  Stats: ChartBarIcon,
};
