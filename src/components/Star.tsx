import { Star1 } from 'iconsax-react-native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

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

    if (star >= 1) {
        for (let i = 0; i < Math.floor(star); i++) {
            starUI.push(
                <View key={i} style={[styles.starContainer, { width: size, height: size }]}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
                        color='#517fa4'
                    />
                    <Star1 size="32" color="#dce775" variant="Bold" />
                </View>
            );
        }

        if (checkStar(star)) {
            starUI.push(
                <View key={starUI.length} style={[styles.starContainer, { width: size, height: size }]}>
                    <Star1 size="32" color="#dce775" variant="Bulk" />
                </View>
            );
        }
    } else {
        starUI.push(
            <View key={0} style={[styles.starContainer, { width: size, height: size }]}>
                <Text style={styles.starText}>0</Text>
                <Star1 size="32" color="#dce775" variant="Outline" />
            </View>
        );
    }

    return (
        <View style={[styles.container, { justifyContent: 'flex-start' }]}>
            {starUI}
        </View>
    );
};

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
        fontSize: 24,
    },
});

export default Star;