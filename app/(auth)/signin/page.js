"use client"

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { SIGN_IN_MUTATION } from "@/app/_graphql/graphql";


export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signInMutation, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      const { success, token } = data.signin;
      if (success) {
    
        console.log("Successfully signed in!");
        console.log("Token:", token);
        localStorage.setItem("authToken", token);
        router.push('/main');


      } else {

        console.error("Sign-in failed");
      }
    },
  });

  const handleSignIn = (event) => {
    event.preventDefault();
    signInMutation({ variables: { username, password } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={"/"}>
              <Button variant="outline">Cancel</Button>
            </Link>

            <Button type="submit" onClick={handleSignIn} disabled={loading}>
              {loading ? "Signing in..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
        <div className="flex items-center justify-center m-2">
          <p className="text-gray-500">Don't have an account?</p>
          <Link href="/signup" className="ml-1 text-blue-500 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
