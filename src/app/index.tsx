import React from "react"
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import './index.scss'
import { Routing } from "pages"
import { withProviders } from "./providers"

gsap.registerPlugin(ScrollTrigger);

function App() {
  return <Routing />
}

export default withProviders(App)
