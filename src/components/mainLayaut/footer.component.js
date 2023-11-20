import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
<footer className="text-center text-lg-start text-muted" style={{backgroundColor: "#d8d8d8"}}>
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>

    <div>
      <a href="https://facebook.com" target="blank" className="me-4 link-secondary">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="blank" className="me-4 link-secondary">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://google.com" target="blank" className="me-4 link-secondary">
        <i className="fab fa-google"></i>
      </a>
      <a href="https://instagram.com" target="blank" className="me-4 link-secondary">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="blank" className="me-4 link-secondary">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com" target="blank" className="me-4 link-secondary">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3 text-secondary"></i>MG.STRENGHT 
          </h6>
          <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?q=beograd%20zivka%20davidovica%2072a&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameBorder="0"
          scrolling="no"
          style={{ width: '280px', height: '200px' }}
        ></iframe>
      </div>
    </div>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" className="text-reset">Angular</a>
          </p>
          <p>
            <a href="#!" className="text-reset">React</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Vue</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Laravel</a>
          </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" className="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3 text-secondary"></i> Belgrade 11000, Serbia , SR</p>
          <p>
            <i className="fas fa-envelope me-3 text-secondary"></i>
            miticgoran.pt@icloud.com
          </p>
          <p><i className="fas fa-phone me-3 text-secondary"></i> +381 640757265</p>
          {/* <p><i class="fas fa-print me-3 text-secondary"></i> +381 640757265</p> */}
        </div>
      </div>
    </div>
  </section>

  <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
    © 2021 Copyright:
    <a className="text-reset fw-bold" href="https://github.com/GoranMitic183/FitnessApp" target="blank">Goran Mitic</a>
  </div>
</footer>
    </div>
  );
};
export default Footer;
