import React, {useCallback, createRef, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from "@react-navigation/native";

import MainLayout from './MainLayout';
import {HeaderBar, TagButton} from '../components';
import {SIZES, COLORS, FONTS, constants, icons } from '../constants';

import { getCoinMarket } from '../stores/market/marketActions';

const marketTabs = constants.marketTabs.map((tab) => ({
  ...tab,
  ref: createRef
}))

const Tabs = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
        {
          marketTabs.map((item, index) => (
            <TouchableOpacity key={`marketTab-${index}`} style={{ flex: 1 }}>
                <View
                  ref={item.ref}
                  style={{
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
          ))
        }
    </View>
  );
};

const TabBar = () => {
  return (
    <View style={{
      marginTop: SIZES.radius,
      marginHorizontal: SIZES.radius,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.gray
    }}>
      <Tabs />
    </View>
  );
}

const priceColor = (item) => {
  const change = item.price_change_percentage_7d_in_currency;
  return change === 0 ? COLORS.lightGray3 : (change > 0) ? COLORS.lightGreen : COLORS.red;
};

const RenderList = ({ scrollX, coins }) => {

  return (
    <Animated.FlatList
      data={marketTabs}
      contentContainerStyle={{
        marginTop: SIZES.padding,
      }}
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      onScroll={
        Animated.event([
          {
            nativeEvent: { contentOffset: {x: scrollX} }
          }
        ], { useNativeDriver: false })
      }
      renderItem={({item, index}) => (
        <View style={{
          flex: 1,
          width: SIZES.width
         }}>
           <FlatList
             data={coins}
             keyExtractor={item => item.id}
             renderItem={({item, index}) => (
               <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.padding, marginBottom: SIZES.radius }}>
                  {/* Coins */}
                  <View style={{
                     flex: 1.5,
                     flexDirection: 'row',
                     alignItems: 'center'
                   }}>
                      <Image source={{ uri: item.image }} style={{ height: 20, width: 20 }} />
                      <Text style={{
                        marginLeft: SIZES.radius,
                        color: COLORS.white,
                        ...FONTS.h3
                      }}>{item.name}</Text>
                  </View>
                  {/* chart */}
                  <View style={{
                     flex: 1,
                     alignItems: 'center'
                   }}>
                     <LineChart
                      withVerticalLabels={false}
                      withHorizontalLabels={false}
                      withDots={false}
                      withInnerLines={false}
                      withVerticalLines={false}
                      withOuterLines={false}
                      data={{
                        datasets: [
                          {
                            data: item.sparkline_in_7d.price
                          }
                        ]
                      }}
                      width={100}
                      height={60}
                      chartConfig={{
                        color: () => priceColor(item)
                      }}
                      bezier
                      style={{
                        paddingRight: 0
                      }}
                     />
                  </View>
                  {/* figures */}
               </View>
             )}
           />
        </View>
      )}
    />
  );
};

const Market = () => {
  const dispatch = useDispatch();

  const coins = useSelector(state => state.marketReducer.coins);

  const scrollX = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      dispatch(getCoinMarket())
    }, [])
  );

  function renderButtons() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius
      }}>
          <TagButton label='USD' />
          <TagButton label='% (7d)' containerStyle={{ marginLeft: SIZES.base }} />
          <TagButton label='Top' containerStyle={{ marginLeft: SIZES.base }} />
      </View>
    );
  }

    return (
       <MainLayout>
          <View style={{
            flex: 1,
            backgroundColor: COLORS.black
           }}>
            {/* Header */}
            <HeaderBar title="Market" />
            <TabBar />
            {renderButtons()}
            <RenderList scrollX={scrollX} coins={coins} />
          </View>
       </MainLayout>
    )
}

export default Market;