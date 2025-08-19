"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SiNextdotjs } from "react-icons/si"
import { FaReact } from "react-icons/fa"

export default function TechStackFrontend() {
  const frontend = {
    title: "Frontend",
    groups: [
      {
        label: "Frameworks",
        items: [
          { 
            name: "Next.js", 
            icon: <SiNextdotjs className="text-foreground text-3xl" />, 
            description: "React-based framework providing server-side rendering, static site generation, and routing for the frontend." 
          },
        ],
      },
      {
        label: "Languages",
        items: [
          { 
            name: "TypeScript", 
            icon: <FaReact className="text-primary text-3xl" />, 
            description: "Typed superset of JavaScript used for safer, more maintainable frontend development." 
          },
        ],
      },
    ],
  }


  return (
    <div className="mx-auto p-6 space-y-8">
      {frontend.groups.map((group) => (
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
