const technologies = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Vercel", "GitHub"]

export default function TechStack() {
  return (
    <section className="md:ml-64 px-8 py-20 border-t border-border max-w-4xl">
      <h2 className="text-2xl font-bold text-foreground mb-8">Tech Stack</h2>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="px-4 py-2 rounded-md bg-card border border-border text-sm text-foreground hover:border-accent transition-colors cursor-default"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  )
}
