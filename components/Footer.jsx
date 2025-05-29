function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            © {new Date().getFullYear()} – BitBond. Built by
            Aishwarya, debugged at 3AM, and deployed on vibes.
          </p>
        </aside>
      </footer>
    </>
  );
}
export default Footer;
