"use client";

import { GameProvider } from "@/contexts/GameContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <GameProvider>{children}</GameProvider>
    </main>
  );
}
