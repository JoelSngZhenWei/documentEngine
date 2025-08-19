"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { SiSpringboot, SiFlask, SiPostgresql, SiRedis, SiLangchain } from "react-icons/si"
import { FaJava, FaPython } from "react-icons/fa"

export default function TechStackBackend() {
  const backend = {
    groups: [
      {
        label: "Backend Orchestrator",
        items: [
          {
            name: "Spring Boot",
            role: "Framework",
            icon: <SiSpringboot className="text-success text-3xl" />,
            description: "Java-based framework used to build the backend controller and gateway services."
          },
          {
            name: "Java",
            role: "Language",
            icon: <FaJava className="text-danger text-3xl" />,
            description: "Core backend language for building robust, scalable services with Spring Boot."
          },
          {
            name: "PostgreSQL",
            role: "Database",
            icon: <SiPostgresql className="text-primary text-3xl" />,
            description: "Relational database for persistent storage and transactional workloads.",
          },
          {
            name: "Redis",
            role: "Cache and session storage",
            icon: <SiRedis className="text-danger text-3xl" />,
            description: "In-memory store for caching and session/token management.",
          },
        ],
      },
      {
        label: "Document Processing Microservice",
        items: [
          {
            name: "Flask",
            role: "Framework",
            icon: <SiFlask className="text-foreground text-3xl" />,
            description: "Lightweight Python framework powering the OCR and AI interaction services."
          },
          {
            name: "Python",
            role: "Language",
            icon: <FaPython className="text-primary text-3xl" />,
            description: "Used for AI/ML workflows and OCR services, offering flexibility and strong library support."
          },
          {
            name: "LangChain + LangGraph",
            role: "Language",
            icon: <SiLangchain className="text-purple-accent text-3xl" />,
            description: "Orchestration and graph-based control flows for LLM-driven extraction and feedback.",
          },
          {
            name: "Docling",
            role: "OCR",
            icon: <FaPython className="text-warning text-3xl" />,
            description: "OCR/text-extraction tooling integrated into the Python service for scanned PDFs and images.",
          },
        ],
      },
    ],
  }

  return (
    <div className="mx-auto p-6 space-y-8">
      {backend.groups.map((group) => (
        <section key={group.label} className="space-y-4">
          <h2 className="text-xl font-semibold">{group.label}</h2>
          {group.items.map((item) => (
            <Card key={item.name} className="w-full">
              <CardHeader className="flex flex-row items-center gap-4">
                {item.icon}
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.role}</CardDescription>
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
