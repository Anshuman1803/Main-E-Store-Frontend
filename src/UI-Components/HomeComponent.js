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

      <HomeProductSlider category={"mobile"} title={"best of mobile"}/>
      <HomeProductSlider category={"laptop"} title={"best of laptop"}/>
      <HomeProductSlider category={"camera"} title={"best of camera"}/>
      <HomeProductSlider category={"headphone"} title={"best of headphone"}/>
      <HomeProductSlider category={"television"} title={"best of television"}/>

    </>
  )
}

export default HomeComponent
