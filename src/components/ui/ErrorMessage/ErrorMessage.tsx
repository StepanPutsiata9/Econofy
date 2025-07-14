import { View, Text } from 'react-native';
import { styles } from './ErrorMessage';

import LoadPig from '../../SvgComponents/LoadPig';


function ErrorMessage() {
  
  return (
    <>
      <View style={styles.errorView}>
        <LoadPig />
        <Text style={styles.errorText}>
          Что то пошло не так!
        </Text>
      </View>
    </>
  );
}

export default ErrorMessage;