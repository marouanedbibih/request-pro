import React from "react";
import Input from "../inputs/Input";
import Button from "../buttons/Button";

const LINKS = [
  {
    title: "Company",
    items: ["About Us", "Home"],
  },
  {
    title: "Pages",
    items: ["Login", "Register", "Products", "Contact"],
  },
  {
    title: "Legal",
    items: ["Terms", "Privacy", "Team", "About Us"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="px-8 pt-24 pb-8">
      <div className="container max-w-6xl flex flex-col mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full ">
          <div className="flex col-span-2 items-start gap-10 mb-10 lg:mb-0 md:gap-36">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <h6 className="mb-4 text-blue-gray">{title}</h6>
                {items.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="py-1 font-normal text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="">
            <h6 className="mb-3 text-left">Subscribe</h6>
            <p className="text-gray-500 font-normal mb-4 text-base">
              Get access to subscriber exclusive deals and be the first who gets
              informed about fresh sales.
            </p>
            <p className="font-medium mb-2 text-left">Your Email</p>
            <div className="flex mb-3 flex-col lg:flex-row items-start gap-4">
              <div className="w-full">
                <Input
                  onChange={() => {}}
                  placeholder={"Enter your email"}
                  type={"email"}
                  value={""}
                />
              </div>
              <Button
                text={"Subscribe"}
                color={"gray"}
                disabled={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        <p className="text-blue-gray md:text-center mt-16 font-normal text-gray-700">
          &copy; {CURRENT_YEAR} Made with{" "}
          <a href="https://www.material-tailwind.com" target="_blank">
            Material Tailwind
          </a>{" "}
          by{" "}
          <a href="https://www.creative-tim.com" target="_blank">
            Creative Tim
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
