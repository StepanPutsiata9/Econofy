import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const BudgetTab = (props: SvgProps) => (
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
      <Path d="M14.571.857H9.43c-.947 0-1.715.768-1.715 1.714v.858c0 .946.768 1.714 1.715 1.714h5.142c.947 0 1.715-.768 1.715-1.714V2.57c0-.946-.768-1.714-1.715-1.714Z" />
      <Path d="M16.714 2.571h2.572A1.714 1.714 0 0 1 21 4.286v17.143a1.714 1.714 0 0 1-1.714 1.714H4.714A1.714 1.714 0 0 1 3 21.429V4.286A1.714 1.714 0 0 1 4.714 2.57h2.572" />
      <Path d="m8.571 15.429 2.572 1.714 5.143-6.857" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default BudgetTab
