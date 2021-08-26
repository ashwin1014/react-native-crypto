import React, {memo} from 'react'
import { View, Text } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartXLabel, ChartYLabel, monotoneCubicInterpolation } from '@rainbow-me/animated-charts';
import moment from 'moment';

import {SIZES, COLORS, FONTS} from '../constants';

const Chart = ({ containerStyle, chartPrices }) => {

    const startUnixTimestamp = moment().subtract(7, 'day').unix();
    const data = chartPrices?.map((item, index) => ({
        x: startUnixTimestamp + (index + 1) * 3600,
        y: item
    })) ?? [];

    const points = monotoneCubicInterpolation({ data, range: 40 });

    return (
        <View style={{...containerStyle}}>
            {
                data.length > 0 && (
                    <ChartPathProvider
                      data={{
                          points,
                          smoothingStrategy: 'bezier'
                      }}
                    >
                        <ChartPath
                          height={150}
                          width={SIZES.width}
                          stroke={COLORS.lightGreen}
                          strokeWidth={2}
                        />
                        <ChartDot style={{ backgroundColor: COLORS.lightGreen }} />
                    </ChartPathProvider>
                )
            }
        </View>
    )
}

export default memo(Chart);
