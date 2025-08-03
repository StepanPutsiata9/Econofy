import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Credit = (props: SvgProps) => (
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
      <Path d="M24.429 21.857c5.68 0 10.285-4.605 10.285-10.286 0-5.68-4.605-10.285-10.285-10.285-5.681 0-10.286 4.605-10.286 10.285 0 5.681 4.605 10.286 10.286 10.286ZM24.429 14.143V9M1.286 28.286l6.284 5.236a5.142 5.142 0 0 0 3.292 1.192h16.567c1.183 0 2.142-.96 2.142-2.142a4.286 4.286 0 0 0-4.285-4.286H13.768" />
      <Path d="m9 25.714 1.929 1.929a2.727 2.727 0 0 0 3.857-3.857l-2.994-2.994a5.143 5.143 0 0 0-3.637-1.506h-6.87" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Credit
