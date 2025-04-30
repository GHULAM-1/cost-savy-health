import React from "react";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/Footer/logo-black.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="  px-4">
        <div className="flex flex-col  space-x-2 mb-8 gap-3 ">
          <Image src={Logo} alt="Logo of the company" />
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-600 bg-[#F3E8EF] p-2 rounded-md"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="#"
              className="text-gray-600 bg-[#F3E8EF] p-2  rounded-md"
            >
              <Twitter size={24} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          <div>
            <h3 className="text-[#0F172A] text-[22px] font-semibold mb-4">
              Care
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Search Care
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Providers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0F172A] text-[22px] font-semibold mb-4">
              Solutions
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Providers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Payers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  ASCs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Employers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0F172A] text-[22px] font-semibold mb-4">
              Platform
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Data
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Contracting
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  All Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0F172A] text-[22px] font-semibold mb-4">
              More
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#A34E78]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-[#A34E78]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Press & Media
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div className="self-end ">
            <ul className="space-y-3 text-lg ">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  MRF Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  Research Datasets
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#A34E78]">
                  TQU
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t pt-8">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025 Turquoise Health. All Rights Reserved. CPT® © 2024 American
            Medical Association. All Rights Reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/contact-us"
              className="text-sm text-gray-600 hover:text-[#A34E78]"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#A34E78]"
            >
              Email Us
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#A34E78]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#A34E78]"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
