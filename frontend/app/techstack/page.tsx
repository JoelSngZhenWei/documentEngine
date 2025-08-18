export default function TechStack() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Tech Stack & Architecture</h1>
        <p className="mb-6">
          Document Engine is built to process documents, run OCR, and provide AI-powered feedback. 
          Here’s a quick overview of the tools and technologies powering it.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Frontend: React + Next.js + Tailwind CSS</li>
          <li>Backend: Java + Spring Boot</li>
          <li>Database: PostgreSQL</li>
          <li>Cache & Session: Redis</li>
          <li>OCR: Integrated text extraction from scanned PDFs and images</li>
          <li>AI/ML: LLM integration for extraction and feedback</li>
          <li>Deployment: Docker, GitHub Actions, DigitalOcean</li>
        </ul>
      </div>
    );
  }
  