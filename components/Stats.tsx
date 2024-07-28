import { getBillsCount } from "@/actions/get-bills-count";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { ScrollText } from "lucide-react";

export default async function Stats() {
  const { count } = await getBillsCount();

  const cards = [
    {
      title: "Bills",
      description: "added nightly",
      value: `+${Math.floor((count ?? 0) / 100) * 100}`,
      valueDescription: "total",
      icon: <ScrollText />,
    },
  ];

  return (
    <div className="grid grid-cols-1">
      {cards.map((card) => (
        <Card key={card.title} className="max-w-sm">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="flex items-center justify-between gap-1">
              {card.title}
              {card.icon}
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
            <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
              {card.value}
              <span className="text-sm font-normal text-muted-foreground">{card.valueDescription}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
