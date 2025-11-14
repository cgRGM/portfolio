import Hero from "@/components/home/hero";
import BlogPosts from "@/components/home/blog-posts";
import Projects from "@/components/home/projects";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 overflow-auto md:ml-64 md:pb-0">
        <Hero />
        <BlogPosts />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
