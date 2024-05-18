import { BackgroundGradient } from "./components/BackgroundGradient";
import { List } from "@/app/components/List/List";
import { Navbar } from "@/app/components/Navbar";
import { CustomAlert } from "./components/CustomAlert";

export default function Home() {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <List />
      <CustomAlert />
    </>
  );
}
