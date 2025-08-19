import { JSX } from "react";
import {
  FaReact,
  FaJava,
  FaPython,
  FaDocker,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiSpringboot,
  SiFlask,
  SiPostgresql,
  SiRedis,
  SiLangchain,
  SiDigitalocean,
} from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function TechStackOverview() {
  type Group = {
    label?: string
    items: { name: string; icon: JSX.Element }[]
  }

  type Section = {
    title: string
    groups: Group[]
  }

  const sections: Section[] = [
    {
      title: "Frontend",
      groups: [
        {
          label: "Frameworks",
          items: [{ name: "Next.js", icon: <SiNextdotjs className="text-foreground" /> }],
        },
        {
          label: "Languages",
          items: [{ name: "TypeScript", icon: <FaReact className="text-primary" /> }],
        },
      ],
    },
    {
      title: "Backend",
      groups: [
        {
          label: "Frameworks",
          items: [
            { name: "Spring Boot", icon: <SiSpringboot className="text-success" /> },
            { name: "Flask", icon: <SiFlask className="text-foreground" /> },
          ],
        },
        {
          label: "Languages",
          items: [
            { name: "Java", icon: <FaJava className="text-danger" /> },
            { name: "Python", icon: <FaPython className="text-primary" /> },
          ],
        },
      ],
    },
    {
      title: "Database",
      groups: [
        {
          items: [{ name: "PostgreSQL", icon: <SiPostgresql className="text-primary" /> }],
        },
      ],
    },
    {
      title: "Cache & Session",
      groups: [
        {
          items: [{ name: "Redis", icon: <SiRedis className="text-danger" /> }],
        },
      ],
    },
    {
      title: "OCR",
      groups: [
        {
          items: [{ name: "Docling", icon: <FaPython className="text-primary" /> }],
        },
      ],
    },
    {
      title: "AI / ML",
      groups: [
        {
          items: [{ name: "LangChain + LangGraph", icon: <SiLangchain className="text-purple-accent" /> }],
        },
      ],
    },
    {
      title: "Deployment",
      groups: [
        {
          items: [
            { name: "Docker", icon: <FaDocker className="text-primary" /> },
            { name: "GitHub", icon: <FaGithub className="text-foreground" /> },
            { name: "DigitalOcean", icon: <SiDigitalocean className="text-primary" /> },
          ],
        },
      ],
    },
  ];

  return (
    <div className=" mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="border-border">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {section.groups.map((group, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  {group.label && (
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {group.label}
                    </h3>
                  )}
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.name} className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
