export interface TeamMember {
  name: string;
  role: string;
  defaultImage: string;
  hoverImage: string;
  linkedIn: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Chris Severn",
    role: "CEO & Co-founder",
    defaultImage: "/leadership/a1.png",
    hoverImage: "/leadership/n1.png",
    linkedIn: "#",
  },
  {
    name: "Adam Geitgey",
    role: "CTO & Co-founder",
    defaultImage: "/leadership/a2.png",
    hoverImage: "/leadership/n2.png",
    linkedIn: "#",
  },
  {
    name: "Marcus Dorstel",
    role: "VP of Operations",
    defaultImage: "/leadership/a3.png",
    hoverImage: "/leadership/n3.png",
    linkedIn: "#",
  },
  {
    name: "Amy Golding",
    role: "VP of Sales",
    defaultImage: "/leadership/a4.png",
    hoverImage: "/leadership/n4.png",
    linkedIn: "#",
  },
  {
    name: "Jenn Misora",
    role: "VP of Customer Success",
    defaultImage: "/leadership/a5.png",
    hoverImage: "/leadership/n5.png",
    linkedIn: "#",
  },
  {
    name: "Chris O'Dell",
    role: "VP of Market Solutions",
    defaultImage: "/leadership/a6.png",
    hoverImage: "/leadership/n6.png",
    linkedIn: "#",
  },
];
