const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© {currentYear} User Management Dashboard. All rights reserved.</p>
        <p>Developed by <span className="font-medium text-foreground">Your Name</span></p>
      </div>
    </footer>
  );
};

export default Footer;
