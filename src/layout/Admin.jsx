import { Outlet } from "react-router";
import { MainHeader } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Layout } from "../pages/Layout";

export function Admin() {
  return (
    <>
    <div className="grid grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="overscroll-y-auto">
        <MainHeader />
        <Outlet />
      </div>
    </div>
    </>
  );
}
