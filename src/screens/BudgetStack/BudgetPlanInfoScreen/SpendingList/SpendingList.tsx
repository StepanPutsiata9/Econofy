import {FlatList} from "react-native"
import {styles} from "./SpendingList.ts"


function SpendingList(){
    return(
        <FlatList
            style={styles.spendingList}
        />
    )
}