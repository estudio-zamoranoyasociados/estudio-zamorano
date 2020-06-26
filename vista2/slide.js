class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      React.createElement("div", { className: classNames("slider", { "s--ready": sliderReady }) },
      React.createElement("p", { className: "slider__top-heading" }, "Travelers"),
      React.createElement("div", { className: "slider__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement("div", {
        className: classNames("slider__slide", {
          "s--active": activeSlide === index,
          "s--prev": prevSlide === index }),

        key: slide.city },

      React.createElement("div", { className: "slider__slide-content" },
      React.createElement("h3", { className: "slider__slide-subheading" },
      slide.country || slide.city),

      React.createElement("h2", { className: "slider__slide-heading" },
      slide.city.split("").map((l) =>
      React.createElement("span", null, l))),


      React.createElement("p", { className: "slider__slide-readmore" }, "read more")),

      React.createElement("div", { className: "slider__slide-parts" },
      [...Array(this.IMAGE_PARTS).fill()].map((x, i) =>
      React.createElement("div", { className: "slider__slide-part", key: i },
      React.createElement("div", {
        className: "slider__slide-part-inner",
        style: { backgroundImage: `url(${slide.img})` } }))))))),







      React.createElement("div", {
        className: "slider__control",
        onClick: () => this.changeSlides(-1) }),

      React.createElement("div", {
        className: "slider__control slider__control--right",
        onClick: () => this.changeSlides(1) })));



  }}


const slides = [
{
  city: ". Brindamos solucionas a nuestros clientes en todo lo que necesite.",
  country: "SOLUCIONES CONTABLES A SU MEDIDA",
  img: "https://live.staticflickr.com/127/333447132_87ae335326_b.jpg" },

{
  city: "Su-57",
  img: "https://www.radiolider.com/data/blog/719/images/original/783/fiestavendimia6.jpg" },

{
  city: "F-35",
  country: "LTE",
  img: "https://static.nationalgeographicla.com/files/styles/image_3200/public/18-mendoza_argentina_0.jpg?w=1600" },

{
  city: "A-10",
  country: "Tdr",
  img: "https://www.marketingdirecto.com/wp-content/uploads/2019/01/Asesoria-fiscal.jpg" },

{
  city: "V-2",
  country: "Spirit",
  img: "https://global-fdi.com/wp-content/uploads/2018/07/Contact.jpg" }];



ReactDOM.render(
React.createElement(CitiesSlider, { slides: slides }),
document.querySelector("#app"));