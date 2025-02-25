import React from "react";

function Header({ title}) {
  return (
    <div className="w-full h-20  justify-start items-center inline-flex">
      <div className="text-black text-5xl font-bold font-['Roboto'] leading-[62.40px]">
        {title}
      </div>
    </div>
  );
}

export default Header;
