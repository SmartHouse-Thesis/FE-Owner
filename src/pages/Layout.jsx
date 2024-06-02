import { BreadCrumb } from "../components/BreadCrumb";
import { MainHeader } from "../components/Header";
import { AssignStaff } from "./AssignStaff";
import { ConstructionPage } from "./ConstructionPage";
import { Dashboard } from "./Dashboard";
import { DevicePage } from "./DevicePage";
import { PromotionPage } from "./PromotionPage";

export function Layout() {
    return (
      <div className="overscroll-y-auto">
        <MainHeader />
        <AssignStaff />
      </div>
    );
  }
  