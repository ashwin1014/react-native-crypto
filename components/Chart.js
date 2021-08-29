import React, {memo} from 'react'
import { View, Text } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartXLabel, ChartYLabel, monotoneCubicInterpolation } from '@rainbow-me/animated-charts';
import moment from 'moment';

import {SIZES, COLORS, FONTS} from '../constants';

const Chart = ({ containerStyle, chartPrices }) => {

    // console.log('chartPrices', chartPrices);

    const startUnixTimestamp = moment().subtract(7, 'day').unix();
    const data = chartPrices?.map((item, index) => ({
        x: startUnixTimestamp + (index + 1) * 3600,
        y: item
    })) ?? [];

    const points = monotoneCubicInterpolation({ data, range: 40 });

    const formatUSD = val => {
        'worklet';

        return val === '' ? '' : `$${Number(val).toFixed(2)}`;
    };

    const formatDateTime = val => {
        'worklet';

        const selectedDate = new Date(val * 1000);
        const date = `0${selectedDate.getDate()}`.slice(-2);
        const month = `0${selectedDate.getMonth()}`.slice(-2);

        return val === '' ? '' : `${date} / ${month}`;
    };

    const formatNumber = (value, roundValue) => {
        if(value > 1e9) {
            return `${(value / 1e9).toFixed(roundValue)}B`;
        }
        if(value > 1e6) {
            return `${(value / 1e6).toFixed(roundValue)}M`;
        }
        if(value > 1e3) {
            return `${(value / 1e3).toFixed(roundValue)}K`;
        }
        return value.toFixed(roundValue);
    };

    const getYAxisLabelValues = () => {
        if (typeof chartPrices !== 'undefined') {
            const minValue = Math.min(...chartPrices);
            const maxValue = Math.max(...chartPrices);

            const mean = (minValue + minValue) / 2;

            const higherMidValue = (maxValue + mean) / 2;
            const lowerMidValue = (minValue + mean) / 2;

            let roundValue = 2;

            return [
                formatNumber(maxValue, roundValue),
                formatNumber(higherMidValue, roundValue),
                formatNumber(lowerMidValue, roundValue),
                formatNumber(minValue, roundValue)
            ];
        }
        return [];
    };

    return (
        <View style={{...containerStyle}}>

            {/* Y Axis Label */}

            <View style={{
                position: 'absolute',
                left: SIZES.padding,
                top: 0,
                bottom: 0,
                justifyContent: 'space-between'
             }}>
                {/* getYAxisLabelValues */}

                {
                    getYAxisLabelValues().map((item, index) => (
                        <Text key={index} style={{
                            color: COLORS.lightGray3,
                            ...FONTS.body4
                        }}>{item}</Text>
                    ))
                }

            </View>

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
                        <ChartDot>
                            <View style={{
                                position: 'absolute',
                                left: -35,
                                width: 80,
                                alignItems: 'center',
                                backgroundColor: COLORS.transparentBlack
                            }}>
                             {/* Dot */}
                             <View style={{
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 width: 25,
                                 height: 25,
                                 borderRadius: 50,
                                 backgroundColor: COLORS.white
                              }}>
                                <View style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.lightGreen
                                 }}>

                               </View>
                             </View>
                               {/* Y-label */}
                                 <ChartYLabel style={{
                                     color: COLORS.white,
                                     ...FONTS.body5
                                 }}
                                 format={formatUSD}
                                 />


                               {/* X-label */}
                               <ChartXLabel
                                 format={formatDateTime}
                                 style={{
                                    marginTop: 3,
                                    color: COLORS.lightGray3,
                                    lineHeight: 5,
                                    ...FONTS.body5
                                 }}
                               />
                            </View>
                        </ChartDot>
                    </ChartPathProvider>
                )
            }
        </View>
    )
}

export default memo(Chart);
