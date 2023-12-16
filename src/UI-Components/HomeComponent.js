import WebNavBarComponent from './WebNavBarComponent'
import HeaderComponents from './HeaderComponents'
import HomeSlider from './HomeSlider'
import HomeProductSlider from './HomeProductSlider'


function HomeComponent() {

  return (
    <>
      <HeaderComponents />
      <WebNavBarComponent />
      <HomeSlider />

      <HomeProductSlider category={"mobile"} />
      <HomeProductSlider category={"laptop"} />
      <HomeProductSlider category={"camera"} />
      <HomeProductSlider category={"headphone"} />
      <HomeProductSlider category={"television"} />

    </>
  )
}

export default HomeComponent
