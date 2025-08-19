"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SiDigitalocean } from "react-icons/si"
import { FaDocker, FaGithub } from "react-icons/fa"

export default function TechStackDeployment() {
  const deployment = {
    groups: [
      {
        label: "CI/CD",
        items: [
          {
            name: "GitHub",
            icon: <FaGithub className="text-foreground text-3xl" />,
            description: "Source code hosting and version control, also powering CI/CD workflows through GitHub Actions."
          },
          {
            name: "Docker",
            icon: <FaDocker className="text-primary text-3xl" />,
            description: "Containerization platform used to package and run applications in isolated environments."
          },
        ],
      },
      {
        label: "Deployment",
        items: [
          {
            name: "DigitalOcean",
            icon: <SiDigitalocean className="text-primary text-3xl" />,
            description: "Cloud platform used for hosting applications, databases, and managing deployments."
          },
        ],
      },
    ],
  }

  return (
    <div className="mx-auto p-6 space-y-8">
      {deployment.groups.map((group) => (
        <section key={group.label} className="space-y-4">
          <h2 className="text-xl font-semibold">{group.label}</h2>
          {group.items.map((item) => (
            <Card key={item.name} className="w-full">
              <CardHeader className="flex flex-row items-center gap-4">
                {item.icon}
                <div>
                  <CardTitle>{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      ))}
    </div>
  )
}
