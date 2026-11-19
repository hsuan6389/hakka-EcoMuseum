import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "台三線文化問路所｜客庄生態博物館 AI 導覽",
  description: "從一個問題出發，探索台三線的山城、聚落與客家生活。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
