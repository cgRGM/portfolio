export default function Footer() {
  return (
    <footer className="md:ml-64 px-8 py-12 border-t border-border text-center">
      <p className="text-sm text-muted-foreground">
        {new Date().getFullYear()} CG Stewart | Built with Next.js and hosted on
        Vercel.
      </p>
    </footer>
  );
}
