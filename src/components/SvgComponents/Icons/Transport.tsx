import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Transport = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M29.893 29.55h2.062a2.572 2.572 0 0 0 2.572-2.571V20.46a2.572 2.572 0 0 0-2.572-2.572h-1.42V8.68a2.571 2.571 0 0 0-2.57-2.572H4.331A2.571 2.571 0 0 0 1.76 8.68v18.666c0 1.218.988 2.205 2.206 2.205h1.177M30.536 10.822H1.762M30.536 17.889H1.762M11.48 10.822v7.057M20.652 10.822v7.057"
    />
    <Path
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.717 33.105a3.59 3.59 0 1 0 0-7.18 3.59 3.59 0 0 0 0 7.18ZM26.306 33.105a3.59 3.59 0 1 0 0-7.18 3.59 3.59 0 0 0 0 7.18ZM12.308 29.515H22.716"
    />
  </Svg>
)
export default Transport
