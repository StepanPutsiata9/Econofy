import { Text, View } from 'react-native';
import { styles } from './TargetCard.ts';
import ModalForCard from '../ModalForCard/ModalForCard.tsx';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';


interface ITargetProps {
  title: string;
  date: string;
  savedMoney: number;
  allMoney: number;
  id:string;
}
function TargetCard(props: ITargetProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ModalForCard
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity style={styles.targetView} onPress={()=>setModalVisible(true)}>
        <View style={styles.infoLine}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.moneyView}>
          <Text style={styles.savedMoney}>{props.savedMoney}</Text>
          <Text style={styles.allMoney}>/{props.allMoney}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
export default TargetCard;
