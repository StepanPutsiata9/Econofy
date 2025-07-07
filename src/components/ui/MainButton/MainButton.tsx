import { TouchableOpacity,Text } from "react-native";
import {styles} from "./MainButton"
type TButtonProps = {
    title: string;
    onClick: () => void;
};

function MainButton({title,onClick}:TButtonProps) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onClick}>
        <Text style={styles.btnText}>
            {title}
        </Text>
    </TouchableOpacity>
  );
}
export default MainButton;
