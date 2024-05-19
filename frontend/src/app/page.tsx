import { BackgroundGradient } from "./components/BackgroundGradient";
import { List } from "@/app/components/List/List";
import { Navbar } from "@/app/components/Navbar";
import { CustomAlert } from "./components/CustomAlert";
import AuthValidationProvider from "./providers/AuthValidationProvider";

export default function Home() {
  return (
    <>
      <AuthValidationProvider />
      <BackgroundGradient />
      <Navbar />
      <List />
      <CustomAlert />
    </>
  );
}
