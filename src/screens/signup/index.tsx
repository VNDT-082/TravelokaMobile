import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

// import * as RootNavigation from '../navigation/RootNavigation';
import Input from '../../components/login/Input';
import Button from '../../components/login/Button';
import * as ProfileNavigator from '../../navigators/ProfileNavigator';
import { AppColor } from '../../assets/AppColor';
import { Dimensions } from 'react-native';


export default function Signup() {
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [passwordSecure, setPasswordSecure] = useState(true);

    return <View style={styles.container}>
        <Image
            resizeMode="cover"
            style={styles.backgroundImage}
            source={require('../../assets/home/bookings/landmark.jpg')}
        />
        <View style={styles.formContainer}>
            <View style={{ position: 'absolute', top: 150 }}>
                <Text style={styles.title}>Finder</Text>
                <Text style={styles.subtitle}>Easy To Book Your Hotel</Text>
            </View>
            <View style={styles.inputsContainer}>
                <Input
                    placeholder="Nhập họ và tên"
                    leadingIcon={require("../../assets/login/mail.png")}
                    value={fullName}
                    setValue={setFullName}
                />
                <View style={{ height: 25 }} />
                <Input
                    value={email}
                    setValue={setEmail}
                    placeholder="Nhập email"
                    leadingIcon={require("../../assets/login/mail.png")}
                />
                <View style={{ height: 25 }} />
                <Input
                    value={phone}
                    setValue={setPhone}
                    placeholder="Nhập số điện thoại"
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
                <TouchableOpacity onPress={() => { }}>
                    <Text style={{
                        width: Dimensions.get('window').width - 40,
                        alignItems: 'center',
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        fontSize: 13,
                        textAlign: 'center',
                        marginVertical: 20
                    }}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={styles.accountActions}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <Text style={styles.accountActionText}>Quên mật khẩu?</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <Text style={styles.accountActionText}>Đăng nhập</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {/* action={() => ProfileNavigator.navigate("main")}  */}

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
        fontSize: 72,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: 'rgba(7, 0, 255, 1)',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(7, 0, 255, 1)',
        textAlign: 'center',
    },
    inputsContainer: {
        paddingVertical: 30,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(16, 180, 255, 0.6)',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        paddingBottom: 50,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
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