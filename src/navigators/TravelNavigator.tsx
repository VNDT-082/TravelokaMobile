import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Travel from "../screens/travel";

const TravelNavigator = () => {
    const Tack = createNativeStackNavigator();
    return (
        <Tack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tack.Screen name='Travel' component={Travel} />
        </Tack.Navigator>
    )
}
export default TravelNavigator;