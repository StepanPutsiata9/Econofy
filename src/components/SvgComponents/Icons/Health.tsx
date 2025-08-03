import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Health = (props: SvgProps) => (
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
      d="M17.979 31.92 4.045 19.032C-3.548 11.403 7.53-3.366 17.98 8.582c10.45-11.913 21.63 2.856 13.933 10.45L17.979 31.92Z"
    />
    <Path
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.038 17.366h3.937l2.652-5.063 4.018 9.322 3.455-4.26h3.857"
    />
  </Svg>
)
export default Health
