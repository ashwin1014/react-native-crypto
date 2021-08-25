import React from 'react'
import { View, Text, Image } from 'react-native'

import { SIZES, COLORS, FONTS, icons } from '../constants';

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle={} }) => {
    return (
        <View style={{
            ...containerStyle
        }}>
            <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>{title}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>$</Text>
                <Text style={{ ...FONTS.h2, color: COLORS.white, marginLeft: SIZES.base }}>{displayAmount.toLocaleString()}</Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>USD</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                {
                    changePct !== 0 ? (
                        <Image
                          source={icons.upArrow}
                          style={{
                              width: 10,
                              height: 10,
                              alignSelf: 'center',
                              tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                              transform: (changePct > 0) ? [{ rotate: '45deg'}] : [{ rotate: '125deg'}]
                          }}
                        />
                    ) : null
                }
                <Text style={{ ...FONTS.h4, color: (changePct === 0) ? COLORS.lightGray3 : (changePct > 0) ? COLORS.lightGreen : COLORS.red, marginLeft: SIZES.base, alignSelf: 'flex-end' }}>{Number(changePct).toFixed(2)}%</Text>
                <Text style={{ ...FONTS.h5, color: COLORS.lightGray3, marginLeft: SIZES.radius, alignSelf: 'flex-end' }}>7d Change</Text>
            </View>
        </View>
    )
}

export default BalanceInfo
