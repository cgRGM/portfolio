import Hero from "@/components/home/hero";
import BlogPosts from "@/components/home/blog-posts";
import Projects from "@/components/home/projects";
import Navigation from "@/components/home/navigation";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-auto md:ml-64 pb-20 md:pb-0">
        <Hero />
        <BlogPosts />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
