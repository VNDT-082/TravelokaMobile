import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    ToastAndroid,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

// import * as RootNavigation from '../navigation/RootNavigation';
import Input from '../../components/login/Input';
import Button from '../../components/login/Button';
import * as ProfileNavigator from '../../navigators/ProfileNavigator';
import { login } from '../../service/auth.service';
import NotifyModal from '../../components/NotifyModal';
import { useNavigation } from '@react-navigation/native';

function isNumber(str: string): boolean {
    return !isNaN(parseFloat(str)) && isFinite(+str);
}
export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [notifyState, setNotyfyState] = useState<boolean>(false);
    const [notyfyValue, setNotyfyValue] = useState<string>('');
    const Login_ = async (
        emailOrPhone: string,
        password: string,
        type: string
    ) => {
        let respone = null;
        type = isNumber(emailOrPhone) ? 'Email' : 'Phone';
        respone = await login(emailOrPhone, password);
        setNotyfyValue(respone.message)
        setNotyfyState(true);
        if (respone) {
            if (respone.success) {
                setTimeout(() => {
                    navigation.navigate('Trang chủ');
                }, 2000)

            }
        }
    }


    return <View style={styles.container}>
        <Image
            resizeMode="cover"
            style={styles.backgroundImage}
            blurRadius={2}
            source={require('../../assets/login/background.jpg')}
        />
        <View style={styles.formContainer}>
            <Text style={styles.title} onPress={() => navigation.goBack()}>Finder</Text>
            <Text style={styles.subtitle}>Easy To Book Your Hotel</Text>
            <View style={styles.inputsContainer}>
                <Input
                    value={email}
                    setValue={setEmail}
                    placeholder="Email Address"
                    leadingIcon={require("../../assets/login/mail.png")}
                />
                <View style={{ height: 25 }} />
                <Input
                    value={pass}
                    setValue={setPass}
                    placeholder="Mật khẩu"
                    endingAction={() => setPasswordSecure(!passwordSecure)}
                    leadingIcon={require("../../assets/login/key.png")}
                    endingIcon={require("../../assets/login/view.png")}
                />
            </View>
            {/* action={() => ProfileNavigator.navigate("main")}  */}
            <TouchableOpacity onPress={() => {
                console.log('lick')
                Login_(email, pass, '');
            }}>
                <Text style={{
                    width: Dimensions.get('window').width - 60,
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingHorizontal: 25,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    fontSize: 13,
                    textAlign: 'center',
                }}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.accountActions}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <Text style={styles.accountActionText}>Quên mật khẩu?</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <Text style={styles.accountActionText}
                        onPress={() => {
                            navigation.navigate('Signup');
                        }}>Đăng ký</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
        <View>
            <NotifyModal notifyModalState={notifyState} notifyValue={notyfyValue}
                setNotifyModalState={setNotyfyState} />
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    backgroundImage: {},
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 9,
        paddingHorizontal: '8%',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 13,
        color: '#fff',
        textAlign: 'center',
    },
    inputsContainer: {
        paddingVertical: 30,
        width: '100%',
    },
    accountActions: {
        width: '100%',
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    accountActionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});