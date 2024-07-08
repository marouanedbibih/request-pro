// eslint-disable-next-line no-unused-vars
import React from "react";
// import { Link, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";

// import { FiUsers } from "react-icons/fi";
import { PiUsersFourFill } from "react-icons/pi";
import MenuLink from "../menu/MenuLink";
import { BiSolidNotepad } from "react-icons/bi";

import { useStateContext } from "../../context/ContextProvider";

// import { useStateContext } from "../../context/ContextProvider";

function Sidebar() {
  // const location = useLocation();
  const { role, token } = useStateContext();

  return (
    <aside className="w-60 bg-gray-800 px-4">
      <div className="h-20 flex items-center">
        <div className="text-white text-lg font-bold font-['Roboto'] leading-normal">
          RequestPro
        </div>
      </div>

      {token && (
        <div>
          {role === "ADMIN" && (
            <>
              <MenuLink
                route="/admins"
                label="Admins"
                icon={<BiUser color="white" />}
                top_vl="40px"
              />
              <MenuLink
                route="/clients"
                label="Clients"
                icon={<PiUsersFourFill color="white" />}
                top_vl="40px"
              />
              <MenuLink
                route="/demandes"
                label="Demandes"
                icon={<BiSolidNotepad color="white" />}
                top_vl="40px"
              />
            </>
          )}
          {role === "CLIENT" && (
            <>
              <MenuLink
                route="/my-demandes"
                label="My Demandes"
                icon={<BiSolidNotepad color="white" />}
                top_vl="40px"
              />
            </>
          )}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
