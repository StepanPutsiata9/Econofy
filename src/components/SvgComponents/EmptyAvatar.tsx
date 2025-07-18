import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const EmptyAvatar = (props: SvgProps) => (
  <Svg
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <G
      stroke="#5BFF6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6}
      clipPath="url(#a)"
    >
      <Path d="M48 54.857c9.468 0 17.143-7.675 17.143-17.143 0-9.467-7.675-17.143-17.143-17.143s-17.143 7.675-17.143 17.143S38.532 54.857 48 54.857ZM18.72 81.6A34.281 34.281 0 0 1 48 65.152 34.282 34.282 0 0 1 77.28 81.6" />
      <Path d="M48 92.571C72.616 92.571 92.57 72.617 92.57 48 92.571 23.384 72.616 3.429 48 3.429S3.428 23.384 3.428 48c0 24.617 19.956 44.571 44.572 44.571Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h96v96H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default EmptyAvatar
