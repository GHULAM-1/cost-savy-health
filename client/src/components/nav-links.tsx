import React from "react";
import NavItem from "./nav-item";
import { useAuth } from "@/context/AuthContext";

interface NavLinksProps {
  onLinkClick?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function NavLinks({
  onLinkClick,
  isMobileMenuOpen,
}: NavLinksProps) {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleAdminDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onLinkClick?.();

    if (isAdmin) {
      window.open("https://cost-savy.sanity.studio/structure", "_blank");
    }
  };

  const handleRegularLinkClick = () => {
    onLinkClick?.();
  }

  return (
    <>
      {isAdmin && (
        <a href="/" onClick={handleAdminDashboardClick}>
          <NavItem text="Dashboard" hasDropdown={false} isMobileMenuOpen={isMobileMenuOpen} />
        </a>
      )}
      <a href="/" onClick={handleRegularLinkClick}>
        <NavItem text="Search Care" hasDropdown={false} isMobileMenuOpen={isMobileMenuOpen} />
      </a>
      <a href="/providers-glossary" onClick={handleRegularLinkClick}>
        <NavItem text="Providers" hasDropdown={false} isMobileMenuOpen={isMobileMenuOpen} />
      </a>


      {/* <NavItem
        text="Search Care"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Clear Rates Data",
            description: "Healthcare pricing data.",
            url: "#",
          },
          {
            title: "Clear Contracts",
            description: "Healthcare contracting solutions.",
            url: "#",
          },
          {
            title: "Providers",
            description: "View All healthcare providers.",
            url: "/providers-glossary",
          },
        ]}
      /> */}
      {/* <NavItem
        text="Solutions"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Clear Rates Data",
            description: "Healthcare pricing data.",
            url: "#",
          },
          {
            title: "Clear Contracts",
            description: "Healthcare contracting solutions.",
            url: "#",
          },
          {
            title: "Standard Service Packages",
            description: "Bundled medical service packages.",
            url: "#",
          },
          {
            title: "Cost Transparency",
            description: "Tools for price transparency compliance.",
            url: "#",
          },
          {
            title: "Provider Finder",
            description: "Locate healthcare providers easily.",
            url: "#",
          },
        ]}
      />
      <NavItem
        text="Platform"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Analytics",
            description: "Analyze pricing data.",
            url: "#",
          },
          {
            title: "Compliance",
            description: "Improve patient experience.",
            url: "#",
          },
          {
            title: "All Platform Features",
            description: "View all products and services.",
            url: "#",
          },
          {
            title: "Scheduling",
            description: "Streamline appointment booking.",
            url: "#",
          },
          {
            title: "Data Integration",
            description: "Seamless integration with health systems.",
            url: "#",
          },
        ]}
      /> */}
      <NavItem
        text="Resources"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "About Us",
            description: "Consumer healthcare marketing",
            url: "/about",
          },
          {
            title: "Blog",
            description: "Healthcare news and information",
            url: "/blog",
          },
          // {
          //   title: "Documentation",
          //   description: "Technical guides and resources.",
          //   url: "#",
          // },
          // {
          //   title: "Case Studies",
          //   description: "Learn how others are succeeding.",
          //   url: "#",
          // },
        ]}
        onItemClick={onLinkClick}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <NavItem
        text="Shop for Plans"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Medicare",
            url: "/medicare",
          },
          {
            title: "Individual & Family Health",
            url: "/indiviual",
          }
        ]}
        onItemClick={onLinkClick}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </>
  );
}
