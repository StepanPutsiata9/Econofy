import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const TrashBin = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <G
      stroke="#FF1B44"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#a)"
    >
      <Path d="M2.286 8h27.428M5.714 8h20.572v20.571A2.286 2.286 0 0 1 24 30.857H8a2.286 2.286 0 0 1-2.286-2.286V8ZM10.286 8V6.857a5.714 5.714 0 0 1 11.428 0V8M12.571 14.86v9.147M19.428 14.86v9.147" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TrashBin
