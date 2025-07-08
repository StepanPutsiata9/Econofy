import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const HomeTab = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <G
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M23.143 12.397a1.712 1.712 0 0 0-.549-1.268L12 1.357 1.406 11.13a1.715 1.715 0 0 0-.549 1.268v9.531a1.714 1.714 0 0 0 1.715 1.715h18.857a1.715 1.715 0 0 0 1.714-1.715v-9.53ZM12 23.643v-6.857" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default HomeTab

