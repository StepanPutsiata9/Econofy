import { Text, View } from 'react-native';
import { styles } from './TargetCard.ts';
import ModalForCard from '../ModalForCard/ModalForCard.tsx';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Target } from '../../../../store/slices/Home.slice.ts';



interface ITargetProps{
  item:Target
}
function TargetCard({item}: ITargetProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ModalForCard
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
      <TouchableOpacity style={item.savedMoney>=item.allMoney?styles.completedTargetView:styles.targetView} onPress={()=>setModalVisible(true)}>
        <View style={styles.infoLine}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.moneyView}>
          <Text style={styles.savedMoney}>{item.savedMoney}</Text>
          <Text style={styles.allMoney}>/{item.allMoney}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
export default TargetCard;
