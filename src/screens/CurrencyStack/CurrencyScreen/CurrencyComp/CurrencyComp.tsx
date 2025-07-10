import { Text, View } from "react-native";
import {styles} from "./CurrencyCopm"
import PageCoin from "../../../../components/SvgComponents/PageCoin";
type CurrencyProps={
    currency:string;
    rate:number;
}
function CurrencyComp({currency,rate}:CurrencyProps){
    
    return(
        <View style={styles.container}>
            <PageCoin/>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.rate}>${Math.round(rate * 100) / 100}</Text>
        </View>
    )
}

export default CurrencyComp