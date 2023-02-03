import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const CompanySetting = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="h-screen p-3">
      <h1 className="text-3xl mb-3">Company Setting</h1>
      <div className="flex">
        <ul className="flex border rounded-lg overflow-hidden">
          <Link to={"/company-settings/general"}>
            <li
              className={`border-r p-2 hover:bg-gray-100 ${
                location.pathname === "/company-settings/general"
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              General
            </li>
          </Link>

          <Link to={"/company-settings/user"}>
            <li
              className={`border-r p-2 hover:bg-gray-100 ${
                location.pathname === "/company-settings/user"
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              Users
            </li>
          </Link>
          <Link to={"/company-settings/plan"}>
            <li
              className={`border-r p-2 hover:bg-gray-100 ${
                location.pathname === "/company-settings/plan"
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              Plan
            </li>{" "}
          </Link>
          <Link to={"/company-settings/billing"}>
            <li
              className={`border-r p-2 hover:bg-gray-100 ${
                location.pathname === "/company-settings/billing"
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              Billing
            </li>
          </Link>
          <Link to={"/company-settings/integrations"}>
            <li
              className={`p-2 hover:bg-gray-100 ${
                location.pathname === "/company-settings/integrations"
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              Integrations
            </li>
          </Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default CompanySetting;
