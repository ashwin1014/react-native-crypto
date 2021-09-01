import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import { COLORS, FONTS } from '../constants';

const TagButton = ({ label, containerStyle = {}, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 3,
                paddingHorizontal: 18,
                borderRadius: 15,
                backgroundColor: COLORS.gray1,
                ...containerStyle
            }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TagButton
