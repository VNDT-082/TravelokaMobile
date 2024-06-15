
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    star: number;
    size: number;
}

const Star: React.FC<IProps> = (props: IProps) => {
    const { star, size } = props;

    const checkStar = (star: number): boolean => {
        return star / 0.5 % 2 ? true : false;
    };

    const starUI = [];
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        starContainer: {
            marginRight: 4,
        },
        starText: {
            fontWeight: 'bold',
            fontSize: size,
        },
    });

    if (star >= 1) {
        for (let i = 0; i < Math.floor(star); i++) {
            starUI.push(
                <View key={i} style={[styles.starContainer, { width: size, height: size }]}>
                    <Icon name='star' size={size} color="#FFCC00" />

                </View>
            );
        }

        if (checkStar(star)) {
            starUI.push(
                <View key={starUI.length} style={[styles.starContainer, { width: size, height: size }]}>
                    <Icon name='star-half' size={size} color="#FFCC00" />
                </View>
            );
        }
    } else {
        starUI.push(
            <View key={0} style={[styles.starContainer, { width: size, height: size }]}>
                <Text style={styles.starText}>0</Text>
                <Icon name='star-o' size={size} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { justifyContent: 'flex-start' }]}>
            {starUI}
        </View>
    );
};



export default Star;