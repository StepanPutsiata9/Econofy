import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const CurrencyTab = (props: SvgProps) => (
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
      <Path d="M21.429 6H2.57C1.625 6 .857 6.768.857 7.714V21.43c0 .946.768 1.714 1.714 1.714H21.43c.946 0 1.714-.768 1.714-1.714V7.714c0-.946-.768-1.714-1.714-1.714ZM17.143 6V2.571A1.714 1.714 0 0 0 15.429.857H8.57a1.714 1.714 0 0 0-1.714 1.714V6" />
      <Path d="M14.188 12.286a1.714 1.714 0 0 0-1.617-1.143h-1.326a1.53 1.53 0 0 0-.327 3.025l2.02.442A1.715 1.715 0 0 1 12.57 18h-1.143a1.715 1.715 0 0 1-1.616-1.143M12 11.143V9.429M12 19.714V18" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CurrencyTab
