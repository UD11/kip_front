import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function landing() {
  return (
    <div>
      <Link href="/signin">
        <Button>Singin</Button>
      </Link>
      <Link href="/signup">
        <Button>signup</Button>
      </Link>
    </div>
  );
}
