import type { Metadata } from "next";
import { LaunchStudio } from "@/components/launch/LaunchStudio";

export const metadata: Metadata = { title: "Launch" };

export default function LaunchPage() {
  return <LaunchStudio />;
}
