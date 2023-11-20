import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
<footer class="text-center text-lg-start text-muted" style={{backgroundColor: "#d8d8d8"}}>
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div class="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>

    <div>
      <a href="https://facebook.com" target="blank" className="me-4 link-secondary">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="blank" class="me-4 link-secondary">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://google.com" target="blank" class="me-4 link-secondary">
        <i class="fab fa-google"></i>
      </a>
      <a href="https://instagram.com" target="blank" class="me-4 link-secondary">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="blank" class="me-4 link-secondary">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com" target="blank" class="me-4 link-secondary">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </section>

  <section class="">
    <div class="container text-center text-md-start mt-5">
      <div class="row mt-3">
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3 text-secondary"></i>MG.STRENGHT 
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

        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" class="text-reset">Angular</a>
          </p>
          <p>
            <a href="#!" class="text-reset">React</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Vue</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Laravel</a>
          </p>
        </div>

        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i class="fas fa-home me-3 text-secondary"></i> Belgrade 11000, Serbia , SR</p>
          <p>
            <i class="fas fa-envelope me-3 text-secondary"></i>
            miticgoran.pt@icloud.com
          </p>
          <p><i class="fas fa-phone me-3 text-secondary"></i> +381 640757265</p>
          {/* <p><i class="fas fa-print me-3 text-secondary"></i> +381 640757265</p> */}
        </div>
      </div>
    </div>
  </section>

  <div class="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="https://github.com/GoranMitic183/FitnessApp" target="blank">Goran Mitic</a>
  </div>
</footer>
    </div>
  );
};
export default Footer;
