// app/login/page.tsx
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Access the PAF-IAST Rule Book Assistant
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
                    <p className="text-xs text-center text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-400 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
