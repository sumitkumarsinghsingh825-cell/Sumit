export interface PointCategory {
  title: string;
  items: {
    label: string;
    points: string;
    description?: string;
  }[];
}

export const POINTS_SYSTEM: PointCategory[] = [
  {
    title: "Batting",
    items: [
      { label: "Run", points: "+1" },
      { label: "Boundary Bonus", points: "+1" },
      { label: "Six Bonus", points: "+2" },
      { label: "30 Run Bonus", points: "+4" },
      { label: "Half-century Bonus", points: "+8" },
      { label: "Century Bonus", points: "+16" },
      { label: "Dismissal for Duck", points: "-2", description: "(Batter, Wicket-Keeper & All-Rounder only)" }
    ]
  },
  {
    title: "Bowling",
    items: [
      { label: "Wicket (Excluding Run Out)", points: "+25" },
      { label: "Bonus (LBW / Bowled)", points: "+8" },
      { label: "3 Wicket Bonus", points: "+4" },
      { label: "4 Wicket Bonus", points: "+8" },
      { label: "5 Wicket Bonus", points: "+16" },
      { label: "Maiden Over", points: "+12" }
    ]
  },
  {
    title: "Fielding",
    items: [
      { label: "Catch", points: "+8" },
      { label: "3 Catch Bonus", points: "+4" },
      { label: "Stumping", points: "+12" },
      { label: "Run Out (Direct Hit)", points: "+12" },
      { label: "Run Out (Not a Direct Hit)", points: "+6/6" }
    ]
  },
  {
    title: "Others",
    items: [
      { label: "Captain (C)", points: "2x", description: "Double the points" },
      { label: "Vice-Captain (VC)", points: "1.5x", description: "1.5 times the points" },
      { label: "In Announced Lineups", points: "+4" }
    ]
  }
];
