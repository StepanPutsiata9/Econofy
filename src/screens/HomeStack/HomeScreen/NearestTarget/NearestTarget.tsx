import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './NearestTarget.ts';
import ModalForCard from "../ModalForCard/ModalForCard.tsx"
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { useState } from 'react';

interface INearTargetProps {
  title: string;
  date: string;
  savedMoney: number;
  allMoney: number;
}
function NearestTarget(props: INearTargetProps) {
  const progress = props.savedMoney / props.allMoney;
    const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <>
    <ModalForCard modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    <TouchableOpacity style={styles.nearestTargetView} onPress={()=>setModalVisible(true)}>
      <View style={styles.infoLine}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.moneyView}>
        <Text style={styles.savedMoney}>{props.savedMoney}</Text>
        <Text style={styles.allMoney}>/{props.allMoney}</Text>
      </View>
      <ProgressBar
        progress={progress}
        width={null}
        height={4}
        color="#5BFF6F"
        unfilledColor="#B2B2B2"
        borderWidth={0}
        borderRadius={4}
        animated={true}
        animationType="spring"
        animationConfig={{
          tension: 20,
          friction: 3,
          duration: 500,
        }}
      />
    </TouchableOpacity>
    </>

  );
}
export default NearestTarget;
