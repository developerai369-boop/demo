# Assets

- `logo.png`, `banner-home.jpg`, `no-image.png` are **placeholders** generated
  for this project structure. Swap them for real brand assets whenever you have them.
- Current components (Navbar, Footer, Hero) use a text logo + inline SVG, so
  these files aren't wired in by default — import them where you want, e.g.:
  ```jsx
  import logo from '../assets/logo.png';
  <img src={logo} alt="LaptopHub" />
  ```
- `icons/` holds standalone copies of the SVG icons already used inline in
  components (cart, heart, search) in case you want to reuse them elsewhere
  (e.g. `import { ReactComponent as CartIcon } from '../assets/icons/cart.svg'`
  with an SVGR-enabled Vite setup).
