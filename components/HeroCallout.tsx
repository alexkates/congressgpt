import { getBillsCount } from "@/actions/get-bills-count";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Megaphone } from "lucide-react";

export default async function HeroCallout() {
  const { count } = await getBillsCount();

  return (
    <Alert className="max-w-sm">
      <Megaphone className="h-4 w-4" />

      <AlertTitle>
        Over {(Math.floor((count ?? 0) / 100) * 100).toLocaleString()} bills available for chat context
      </AlertTitle>
      <AlertDescription>
        New bills are added nightly from&nbsp;
        <a
          href="https://www.govinfo.gov/app/collection/bills"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          govinfo.gov
        </a>
      </AlertDescription>
    </Alert>
  );
}
