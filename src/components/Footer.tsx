const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-14 shrink-0 border-t border-border bg-card px-4 lg:px-6">
      <div className="h-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 text-sm text-muted-foreground">
        <p>© {currentYear} User Management Dashboard. All rights reserved.</p>
        <p>
          Developed by <span className="font-medium text-foreground">Your Name</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
