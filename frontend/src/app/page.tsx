import { BackgroundGradient } from "./components/BackgroundGradient";
import { List } from "@/app/components/List/List";
import { Navbar } from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <List />
    </>
  );
}
