import { getBillsCount } from "@/actions/get-bills-count";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default async function HeroCallout() {
  const { count } = await getBillsCount();

  return (
    <Alert className="text-center">
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
