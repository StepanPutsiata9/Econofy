import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Products = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <G
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M1.305 1.16h6.28l2.237 22.244a2.57 2.57 0 0 0 2.572 2.185h16.2a2.57 2.57 0 0 0 2.571-1.748l3.42-10.286a2.569 2.569 0 0 0-.36-2.314 2.573 2.573 0 0 0-2.211-1.08H8.485M28.157 34.59a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 0 1 0 2.571ZM11.442 34.59a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 0 1 0 2.571Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Products
