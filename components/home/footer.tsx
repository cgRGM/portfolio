import { Nextjs, VercelDark } from "@ridemountainpig/svgl-react";

export default function Footer() {
  return (
    <footer className="md:ml-64 px-8 py-12 border-t border-border text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} CG Stewart
      </p>
      <span className="flex items-center justify-center">
        Built with{" "}
        <p>
          <Nextjs className="size-3" />
        </p>
        and hosted on{" "}
        <p className="">
          {" "}
          <VercelDark className="size-3" />
        </p>
      </span>
    </footer>
  );
}
