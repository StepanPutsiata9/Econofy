import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Hobby = (props: SvgProps) => (
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
      <Path d="M21.857 12.857a2.571 2.571 0 1 0 0-5.143 2.571 2.571 0 0 0 0 5.143ZM11.571 25.714a1.286 1.286 0 1 0 0-2.571 1.286 1.286 0 0 0 0 2.571ZM11.571 16.714a2.572 2.572 0 1 0 0-5.143 2.572 2.572 0 0 0 0 5.143Z" />
      <Path d="M24.48 31.577a2.571 2.571 0 0 0-1.671-2.263 5.144 5.144 0 0 1 1.62-10.028h4.808a5.144 5.144 0 0 0 4.86-6.866A16.713 16.713 0 0 0 4.694 8.35a16.714 16.714 0 0 0 13.64 26.364 16.199 16.199 0 0 0 4.475-.617 2.313 2.313 0 0 0 1.671-2.52Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Hobby
