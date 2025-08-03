import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Cosmetics = (props: SvgProps) => (
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
      d="M3.317 24.969a2.571 2.571 0 0 0 0 3.625l5.375 5.375a2.571 2.571 0 0 0 3.625 0l9.54-9.54-9-9-9.54 9.54ZM14.246 16.817 29.03 2.03a2.572 2.572 0 0 1 2.803-.54 2.57 2.57 0 0 1 1.595 2.366v5.58a2.566 2.566 0 0 1-.746 1.826l-12.111 11.88M20.674 10.389l6.429 6.428"
    />
  </Svg>
)
export default Cosmetics
