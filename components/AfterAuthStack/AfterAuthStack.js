import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-paper';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button icon="camera" mode="contained" onPress={() => navigation.navigate('Notifications')}>
        Go to Notifications
      </Button>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button icon="camera" mode="contained" onPress={() => navigation.navigate('Home')}>
        Go to Home
      </Button>
      
    </View>
  );


}

const Drawer = createDrawerNavigator();


export default function AfterAuthStack() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="LoginScreen">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  