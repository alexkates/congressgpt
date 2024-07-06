import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SignInCard() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to CongressGPT</CardTitle>
        <CardDescription>
          To get started, sign in with your Google account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
      </CardContent>
    </Card>
  );
}
