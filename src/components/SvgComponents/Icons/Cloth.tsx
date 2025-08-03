import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Cloth = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M33.12 31.86a2.57 2.57 0 0 1-1.516 2.636c-.333.147-.692.221-1.055.218H5.45a2.57 2.57 0 0 1-2.464-1.782 2.572 2.572 0 0 1-.107-1.072l2.263-20.289h25.714L33.12 31.86ZM11.571 11.571V7.714a6.429 6.429 0 0 1 12.858 0v3.857"
    />
  </Svg>
)
export default Cloth
