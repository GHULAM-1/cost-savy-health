import React from "react";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/Footer/Logo.webp";
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
              className="text-gray-600 bg-[#dff9f5] p-2 rounded-md"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="#"
              className="text-gray-600 bg-[#dff9f5] p-2  rounded-md"
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
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Search Care
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
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
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Providers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Payers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  ASCs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
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
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Data
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Contracting
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
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
                  className="text-gray-600 hover:text-[#06b6d4]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-[#06b6d4]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Press & Media
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div className="self-end ">
            <ul className="space-y-3 text-lg ">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  MRF Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
                  Research Datasets
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#06b6d4]">
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
              href="#"
              className="text-sm text-gray-600 hover:text-[#06b6d4]"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#06b6d4]"
            >
              Email Us
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#06b6d4]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#06b6d4]"
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
