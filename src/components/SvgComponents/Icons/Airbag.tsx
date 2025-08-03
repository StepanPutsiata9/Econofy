import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Airbag = (props: SvgProps) => (
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
      d="M18 34.714c9 0 15.429-3.183 15.429-10.27 0-7.702-3.858-12.837-11.572-16.688l3.034-3.903a1.692 1.692 0 0 0-1.44-2.567H12.55a1.699 1.699 0 0 0-1.683 1.72c.005.299.088.591.243.847l3.034 3.928C6.429 11.658 2.57 16.793 2.57 24.496 2.571 31.53 9 34.714 18 34.714Z"
    />
    <Path
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.556 17.5a2.785 2.785 0 0 0-2.628-1.857h-2.156a2.487 2.487 0 0 0-.531 4.916l3.283.718a2.787 2.787 0 0 1-.596 5.51h-1.857a2.787 2.787 0 0 1-2.627-1.858M18 15.643v-2.786M18 29.572v-2.786"
    />
  </Svg>
)
export default Airbag
