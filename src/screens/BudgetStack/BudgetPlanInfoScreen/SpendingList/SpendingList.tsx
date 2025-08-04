import { FlatList } from 'react-native';
import { styles } from './SpendingList.ts';
import Products from '../../../../components/SvgComponents/Icons/Products.tsx'
import Cosmetics from '../../../../components/SvgComponents/Icons/Cosmetics.tsx'
import Transport from "../../../../components/SvgComponents/Icons/Transport.tsx"
import ZhKU from "../../../../components/SvgComponents/Icons/ZhKU.tsx"
import Health from "../../../../components/SvgComponents/Icons/Health.tsx"
import ConnectionAndInternet from "../../../../components/SvgComponents/Icons/InternetAndConnection.tsx"
import Hobby from "../../../../components/SvgComponents/Icons/Hobby.tsx"
import Credit from "../../../../components/SvgComponents/Icons/Credit.tsx"
import Cloth from "../../../../components/SvgComponents/Icons/Cloth.tsx"
import Airbag from "../../../../components/SvgComponents/Icons/Airbag.tsx"
import Other from "../../../../components/SvgComponents/Icons/Other.tsx"
import UnforExpenses from "../../../../components/SvgComponents/Icons/UnforExpenses.tsx"
const componentsIcon = {
  STORE :<Products/>,
  COSMETICS : <Cosmetics/>,
  HOUSEHOLD : <Products/>,
  TRANSPORT : <Transport/>,
  HOUSING_AND_COMMUNAL_SERVICES : <ZhKU/>,
  HEALTH : <Health/>,
  INTERNET :<ConnectionAndInternet/>,
  HOBBY : <Hobby/>,
  LOANS : <Credit/>,
  CLOTH : <Cloth/>,
  UNFORESSEN_EXPENSES : <UnforExpenses/>,
  AIRBAG : <Airbag/>,
  ADDITIONAL_EXPENSES :<Other/>,
};

function SpendingList() {
  return <FlatList style={styles.spendingList} />;
}
