"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { copy } from "@/app/_assets/strings";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Button size="sm" onClick={handleLogout}>
      {copy.dashboardPage.links.logOut}
    </Button>
  );
};
