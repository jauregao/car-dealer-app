import { Inter } from "next/font/google";
import FilterForm from "@/components/FilterForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 BG bg-secondary ${inter.className}`}
    >
      <FilterForm/>
    </main>
  );
}
