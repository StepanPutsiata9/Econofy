import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const UnforExpenses = (props: SvgProps) => (
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
      <Path d="M25.215 10.9a2.62 2.62 0 0 0-2.471-1.747h-2.03a2.34 2.34 0 0 0-.5 4.625l3.09.676a2.622 2.622 0 0 1-.56 5.183h-1.748a2.622 2.622 0 0 1-2.472-1.747M21.87 9.153v-2.62M21.87 22.258v-2.62" />
      <Path d="M21.87 26.972c6.946 0 12.577-5.631 12.577-12.577S28.816 1.818 21.87 1.818 9.293 7.448 9.293 14.395c0 6.946 5.631 12.577 12.577 12.577ZM3.093 15.773a12.52 12.52 0 0 0-1.513 5.986c0 6.946 5.63 12.577 12.575 12.577 1.969 0 3.832-.453 5.49-1.259" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default UnforExpenses
