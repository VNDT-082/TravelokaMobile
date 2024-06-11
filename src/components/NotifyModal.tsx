import { useEffect, useState } from "react";
import { Dimensions, Modal, Pressable, Text, View } from "react-native";
import { AppColor } from "../assets/AppColor";

interface IProps {
    notifyModalState: boolean;
    setNotifyModalState: (notifyModalState: boolean) => void;
    notifyValue: string;
}
export default function NotifyModal(props: IProps) {
    const { notifyModalState, setNotifyModalState, notifyValue } = props;

    useEffect(() => {
        if (notifyModalState == true) {
            const timer = setTimeout(() => {
                setNotifyModalState(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notifyModalState]);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            width: Dimensions.get('window').width - 10,
            backgroundColor: AppColor.Green21
        }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={notifyModalState}>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}>
                    <View style={{
                        margin: 20,
                        borderRadius: 20,
                        padding: 10,
                        alignItems: 'center',
                        shadowColor: '#000',
                        justifyContent: 'center',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        backgroundColor: AppColor.Green21

                    }}>
                        <Text style={{
                            color: AppColor.Gray31,
                            textAlign: 'center',
                            width: Dimensions.get('screen').width - 50,
                            backgroundColor: AppColor.Green21
                        }}>{notifyValue}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}