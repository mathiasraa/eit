import { GameEventKey } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ event: string }>;
}>) {
  const validEvents = Object.keys(GameEventKey);

  const event = (await params).event;

  if (!validEvents.includes(event)) {
    notFound();
  }

  return <>{children}</>;
}
