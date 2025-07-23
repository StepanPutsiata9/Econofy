import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Plus = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M9.29 19.565V.935h2.025v18.63H9.29ZM.74 11.24V9.305h19.125v1.935H.74Z"
    />
  </Svg>
)
export default Plus
