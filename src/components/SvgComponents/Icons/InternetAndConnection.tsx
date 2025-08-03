import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const InternetAndConnection = (props: SvgProps) => (
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
      <Path d="M5.477 34.405a3.857 3.857 0 1 0 0-7.714 3.857 3.857 0 0 0 0 7.714ZM34.406 31.166A29.573 29.573 0 0 0 4.834 1.595M5.451 13.834a16.714 16.714 0 0 1 16.715 16.714" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default InternetAndConnection
