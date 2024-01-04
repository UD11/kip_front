"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SIGN_UP_MUTATION } from "@/app/_graphql/graphql";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

export default function Signup() {
  const [selectedPassoutYear, setSelectedPassoutYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    enrollmentNumber: "",
    email: "",
    username: "",
    password: "",
    passoutYear: "",
    department: "",
    state: "",
  });

  const router = useRouter();

  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      if (data.signup.success) {
        console.log("Successfully signed up");
        router.push("/");
      } else {
        console.error("Signup failed");
      }
    },
    onError: (error) => {
      console.error("Signup error", error);
    },
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        passoutYear: selectedPassoutYear,
        department: selectedDepartment,
        state: selectedState,
      };

      await signUp({ variables: updatedFormData });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="bg-black min-h-screen w-2/4"></div>{" "}
        <div className="flex items-center justify-center min-h-screen w-2/4">
          <div className="">
            <Card className="w-[550px]">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  create your profile in one click!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-row w-full">
                      <div className="flex flex-col space-y-1.5 mr-2 w-full">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="enroll">College Id</Label>
                      <Input
                        id="enrollmentNumber"
                        placeholder="College Id"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        placeholder="password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-row">
                      <Select
                        onSelect={(value) => setSelectedPassoutYear(value)}
                      >
                        <SelectTrigger
                          className="w-[200px] mr-2"
                          // id="passoutYear"
                        >
                          <SelectValue placeholder="Passout Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                          <SelectItem value="2030">2030</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        onSelect={(value) => setSelectedDepartment(value)}
                      >
                        <SelectTrigger
                          className="w-[120px]"
                          // id="department"
                        >
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AIML">CSE AIML</SelectItem>
                          <SelectItem value="IOT">CSE IOT</SelectItem>
                          <SelectItem value="CSE">CSE</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select onSelect={(value) => setSelectedState(value)}>
                        <SelectTrigger
                          className="w-[100px] ml-2"
                          // id="state"
                        >
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="West Bengal">West Bengal</SelectItem>
                          <SelectItem value="Bihar">Bihar</SelectItem>
                          <SelectItem value="Orissa">Orissa</SelectItem>
                          <SelectItem value="Assam">Assam</SelectItem>
                          <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={"/"}>
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" onClick={handleSignUp} disabled={loading}>
                  {loading ? "Signing up..." : "Submit"}
                </Button>
              </CardFooter>
            </Card>
            <div className="flex items-center justify-center m-2">
              <p className="text-gray-500">Already have an account?</p>
              <Link
                href="/signin"
                className="ml-1 text-blue-500 hover:underline"
              >
                Signin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
