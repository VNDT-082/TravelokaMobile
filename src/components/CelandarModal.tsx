import moment from 'moment';
import { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { AppColor } from '../assets/AppColor';
interface IProps {
    searchDate: Date;
    setSearchDate: (searchDate: Date) => void;
    celandarModalState: boolean;
    setCelandarModalState: (searchProvince: boolean) => void;
}
export default function CelandarModal(props: IProps) {
    const { searchDate, setSearchDate, celandarModalState, setCelandarModalState } = props;
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

    const toggleModal = () => {
        setCelandarModalState(!celandarModalState);
    };
    return (
        <View>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Chọn lịch đặt</Text>
            </TouchableOpacity>
            <Modal visible={celandarModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Calendar
                            onDayPress={(day) => {
                                setSearchDate(new Date(day.year, day.month - 1, day.day));
                                setCelandarModalState(false);
                            }}
                            style={styles.calendar}
                            markedDates={{
                                [selectedDate]: { selected: true, marked: true },
                            }}
                        />
                        <TouchableOpacity onPress={toggleModal}
                            style={styles.closeButton}>
                            <Text style={{
                                fontWeight: 'semibold',
                                color: AppColor.Cyan
                            }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    calendar: {
        width: Dimensions.get('window').width - 60,
        height: 350,
    },
    closeButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 50,
    }
});