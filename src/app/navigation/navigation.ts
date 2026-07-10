import {
  Home,
  Flag,
  Users,
  Calendar,
  Trophy,
  Radio,
  Clapperboard,
  Settings,
  DollarSign,
  Swords,
} from "lucide-react";

export const navigation = [
  {
    title: "Home",
    items: [
      { label: "Dashboard", path: "/", icon: Home },
    ],
  },
  {
    title: "Event",
    items: [
      { label: "Race Director", path: "/race-director", icon: Flag },
      { label: "Drivers", path: "/drivers", icon: Users },
      { label: "Events", path: "/events", icon: Calendar },
      { label: "Battles", path: "/battles", icon: Swords },
      { label: "Championship", path: "/competition", icon: Trophy },
    ],
  },
  {
    title: "Broadcast",
    items: [
      { label: "Broadcast", path: "/broadcast", icon: Radio },
      { label: "Replay", path: "/replay-director", icon: Clapperboard },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Sponsors", path: "/sponsors", icon: DollarSign },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", path: "/settings", icon: Settings },
    ],
  },
];