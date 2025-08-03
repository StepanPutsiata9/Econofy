import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Other = (props: SvgProps) => (
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
      d="M29.571 1.286H6.43a2.571 2.571 0 0 0-2.572 2.571v28.286a2.571 2.571 0 0 0 2.572 2.571H29.57a2.571 2.571 0 0 0 2.572-2.571V3.857a2.571 2.571 0 0 0-2.572-2.571ZM3.857 14.143h28.286"
    />
    <Path
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.929 21.857a.643.643 0 1 1 0-1.286M10.929 21.857a.643.643 0 0 0 0-1.286M18 21.857a.643.643 0 1 1 0-1.286M18 21.857a.643.643 0 1 0 0-1.286M25.071 21.857a.643.643 0 1 1 0-1.286M25.071 21.857a.643.643 0 1 0 0-1.286M10.929 28.286a.643.643 0 1 1 0-1.286M10.929 28.286a.643.643 0 1 0 0-1.286M18 28.286A.643.643 0 1 1 18 27M18 28.286A.643.643 0 1 0 18 27M25.071 28.286a.643.643 0 1 1 0-1.286M25.071 28.286a.643.643 0 1 0 0-1.286M25.714 7.714h-2.571"
    />
  </Svg>
)
export default Other
