import { Alert, FlatList, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AxiosInstance from "../Instance/AxiosInstance";
import { useEffect, useState } from "react";
import Dropdown from "../component/DropDown";
import { EditInstance } from "../Instance/EditInstance";

const Home = () => {
  const [dbTables, setDbTables] = useState();
  const [category, setCategory] = useState();
  const [tableColumns, setTableColumns] = useState([]);


  const fetchAllDb = async () => {
    await AxiosInstance.get("api/db/allDbTableNames")
      .then(async res => {
        console.log(res.data);
        setCategory(res.data);

      })
      .catch(err => {
        console.log("Connection failed " + err);
        Alert.alert("Connection failed", "Please check your connection");
      });
  }

  useEffect(() => {
    fetchAllDb();
  }, [])

  const handleTableSelect = async (table) => {
    await AxiosInstance.get("api/db/getDynamicTables?tableName=" + table)
      .then(async res => {
        console.log(res.data);
        setTableColumns(res.data);

      })
      .catch(err => {
        console.log("Connection failed " + err);
        Alert.alert("Connection failed", "Please check your connection");
      });

    await AxiosInstance.get("api/db/allDbTables?tableName=" + table)
      .then(async res => {
        console.log(res.data);
        setDbTables(res.data);

      })
      .catch(err => {
        console.log("Connection failed " + err);
        Alert.alert("Connection failed", "Please check your connection");
      });

  }

  const renderHeader = () => (
    <View style={styles.header}>
      {tableColumns.map((column, index) => (
        <Text key={index} numberOfLines={1} ellipsizeMode="tail" style={styles.headerCell}>{column} </Text>
      ))}
    </View>
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={()=>{
      EditInstance.show(item)
    }}>
      {item.map(header => (
        <Text numberOfLines={1} ellipsizeMode="tail"  key={header} style={styles.dataCell}>{header}</Text>
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Text style={styles.headerText}>DB TABLE</Text>
      <Dropdown size={"md"} options={category} callback={(res) => { handleTableSelect(res) }} />
      <ScrollView horizontal contentContainerStyle={styles.content}>
        <View>
          {renderHeader()}
          <FlatList
            data={dbTables}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>



    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 20
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  headerCell: {

    width: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',

  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  dataCell: {
    flex: 1,
    width: 100,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  content: {

    padding: 20,
  },
})

export default Home;