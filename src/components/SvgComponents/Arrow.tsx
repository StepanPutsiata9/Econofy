import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={9}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M5.6 8 .4 2.8c-.244-.244-.367-.556-.367-.933 0-.378.123-.69.367-.934C.644.69.956.567 1.333.567c.378 0 .69.122.934.366L8.4 7.067c.267.266.4.577.4.933 0 .356-.133.667-.4.933l-6.133 6.134c-.245.244-.556.366-.934.366-.377 0-.689-.122-.933-.366-.244-.245-.367-.556-.367-.934 0-.377.123-.689.367-.933L5.6 8Z"
    />
  </Svg>
)
export default SvgComponent
