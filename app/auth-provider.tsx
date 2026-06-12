"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { ensureAppUser } from "@/actions/authActions";
import { authClient } from "@/lib/auth/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={async () => {
        await ensureAppUser();
        router.refresh();
      }}
      redirectTo="/dashboard"
      Link={Link}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
