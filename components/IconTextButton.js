import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const IconTextButton = ({
    label, icon, containerStyle = {}, onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...containerStyle
        }}>
            <Image source={icon} resizeMode='contain' style={{
                height: 20,
                width: 20,
            }} />
            <Text style={{
                marginLeft: SIZES.base,
                ...FONTS.h3
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default IconTextButton
