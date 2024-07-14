import { ProjectCard } from "@/components/card";
import { Header } from "@/components/header";
import { TopBar } from "@/components/top-bar";

const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="ml-96 w-[1200px] justify-center items-center">
      <TopBar />
      <ProjectCard />
      </div>
    </div>
  );
}

export default Home;