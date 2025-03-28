import React from "react";
import NavItem from "./nav-item";
export default function NavLinks() {
  return (
    <>
      <NavItem
        text="Search Care"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Clear Rates Data",
            description: "Healthcare pricing data.",
          },
          {
            title: "Clear Contracts",
            description: "Healthcare contracting solutions.",
          },
          {
            title: "Standard Service Packages",
            description: "Bundled medical service packages.",
          },
        ]}
      />
      <NavItem
        text="Solutions"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Clear Rates Data",
            description: "Healthcare pricing data.",
          },
          {
            title: "Clear Contracts",
            description: "Healthcare contracting solutions.",
          },
          {
            title: "Standard Service Packages",
            description: "Bundled medical service packages.",
          },
          {
            title: "Cost Transparency",
            description: "Tools for price transparency compliance.",
          },
          {
            title: "Provider Finder",
            description: "Locate healthcare providers easily.",
          },
        ]}
      />

      <NavItem
        text="Platform"
        hasDropdown={true}
        dropdownContent={[
          { title: "Analytics", description: "Analyze pricing data." },
          {
            title: "Compliance",
            description: "Improve patient experience.",
          },
          {
            title: "All Platform Features",
            description: "View all products and services.",
          },
          {
            title: "Scheduling",
            description: "Streamline appointment booking.",
          },
          {
            title: "Data Integration",
            description: "Seamless integration with health systems.",
          },
        ]}
      />

      <NavItem
        text="Resources"
        hasDropdown={true}
        dropdownContent={[
          {
            title: "Reports",
            description: "Industry insights and analysis.",
          },
          { title: "Blog", description: "Latest updates and news." },
          {
            title: "Documentation",
            description: "Technical guides and resources.",
          },
          {
            title: "Case Studies",
            description: "Learn how others are succeeding.",
          },
          {
            title: "FAQs",
            description: "Find answers to common questions.",
          },
        ]}
      />
    </>
  );
}
