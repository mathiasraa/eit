"use client";
import { GameProvider } from "@/contexts/GameContext";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        <GameProvider>
        {children}
        </GameProvider>
      </body>
    </html>
  );
}
