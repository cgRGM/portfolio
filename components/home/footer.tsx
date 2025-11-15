import { Nextjs, VercelDark, Convex } from "@ridemountainpig/svgl-react";

export default function Footer() {
  return (
    <footer className="md:ml-64 px-8 py-12 pb-20 md:pb-12 border-t border-border text-center">
      <p className="text-sm text-muted-foreground mb-4">
        © {new Date().getFullYear()} CG Stewart
      </p>
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Built with</span>
          <Nextjs className="size-4" />
          <span>&</span>
          <Convex className="size-4" />
        </div>
        <div className="flex items-center gap-2">
          <span>Hosted on</span>
          <VercelDark className="size-4" />
        </div>
      </div>
    </footer>
  );
}
