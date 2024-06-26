import React from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { AppColor } from '../../assets/AppColor';

export default function Input(props: any) {
    const {
        value, setValue,
        placeholder,
        secure = false,
        leadingIcon,
        endingIcon,
        endingAction = () => { },
    } = props;

    return <View style={styles.inputGroup}>
        {!leadingIcon ? null :
            <Image
                source={leadingIcon}
                style={styles.inputIcon}
                resizeMode="contain"
            />
        }
        <TextInput
            placeholder={placeholder}
            secureTextEntry={secure}
            placeholderTextColor="#fff"
            style={[styles.inputField, endingIcon ? styles.inputEndingSpace : {}]}
            // value={value}
            onChangeText={(value) => setValue(value)}
        />
        {!endingIcon ? null :
            <TouchableWithoutFeedback onPress={endingAction}>
                <View style={styles.endingAction}>
                    <Image
                        source={endingIcon}
                        style={[styles.inputIcon, styles.inputEndingIcon]}
                        resizeMode="contain"
                    />
                </View>
            </TouchableWithoutFeedback>
        }
    </View>
}


const styles = StyleSheet.create({
    inputGroup: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: 'rgba(53, 52, 74, 0.8)'
    },
    inputIcon: {
        width: 15,
        height: 15,
        marginRight: 20,
    },
    inputEndingIcon: {
        width: 20,
        height: 20,
        marginRight: 0,
    },
    inputField: {
        color: '#fff',
        fontSize: 13,
        width: '90%',

    },
    inputEndingSpace: {
        width: '80%',
    },
    endingAction: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});