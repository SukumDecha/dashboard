import Logo from "./Logo";
import SideMenuList from "./SideMenuList";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-12 gap-12 bg-[#fff]">
      <Logo />
      <SideMenuList />
    </div>
  )
}