import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const NoUser = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <G
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#a)"
    >
      <Path d="M24 27.429a8.571 8.571 0 1 0 0-17.143 8.571 8.571 0 0 0 0 17.143ZM9.36 40.8a17.14 17.14 0 0 1 23.036-6.027A17.14 17.14 0 0 1 38.64 40.8" />
      <Path d="M24 46.286c12.308 0 22.286-9.978 22.286-22.286 0-12.308-9.978-22.286-22.286-22.286C11.692 1.714 1.714 11.692 1.714 24c0 12.308 9.978 22.286 22.286 22.286Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h48v48H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default NoUser
