import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Calendar = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
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
      <Path d="M6.857 6V.857M12 6V.857M17.143 6V.857M21.429 3.429H2.57c-.946 0-1.714.767-1.714 1.714v16.286c0 .946.768 1.714 1.714 1.714H21.43c.946 0 1.714-.768 1.714-1.714V5.143c0-.947-.768-1.714-1.714-1.714Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Calendar
