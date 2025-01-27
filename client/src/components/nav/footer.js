export default function Footer() {
  return (
    <div className="text-center p-4 bg-dark text-light mt-4">
      <h4 className="mt-4">Oasis Atrium- Buy Sell or Rent Properties</h4>
      <i className="social-icon fa-brands fa-twitter"></i>
      <i className="social-icon fa-brands fa-facebook"></i>
      <i className="social-icon fa-brands fa-instagram"></i>
      <i className="social-icon fa-solid fa-envelope"></i>
      <p className="mt-3">
        &copy; {new Date().getFullYear()} All rights reserved - Aditya Apurba
      </p>
    </div>
  );
}
