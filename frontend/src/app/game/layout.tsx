"use client";

import { GameProvider } from "@/contexts/GameContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <GameProvider>{children}</GameProvider>
      </QueryClientProvider>
    </main>
  );
}
