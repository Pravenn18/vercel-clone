import { ProjectCard } from "@/components/card";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="justify-center items-center">
      <Header />
      <ProjectCard />
    </div>
  );
}