import { Text, View } from 'react-native';
import { styles } from './TargetCard.ts';
// @ts-ignore

interface INearTargetProps {
  title: string;
  date: string;
  savedMoney: number;
  allMoney: number;
}
function TargetCard(props: INearTargetProps) {
  return (
    <View style={styles.targetView}>
      <View style={styles.infoLine}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.moneyView}>
        <Text style={styles.savedMoney}>{props.savedMoney}</Text>
        <Text style={styles.allMoney}>/{props.allMoney}</Text>
      </View>
    </View>
  );
}
export default TargetCard;
