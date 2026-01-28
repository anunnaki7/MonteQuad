const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold">
              Monte<span className="text-primary">Quad</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Avantura počinje ovdje
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 MonteQuad Kolašin. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;