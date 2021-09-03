import React, {useCallback, createRef, useRef, useState, useEffect} from 'react';
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

const TabIndicator = ({measureLayout, scrollX}) => {

  const inputRange = marketTabs.map((_,i) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout?.map(measure => measure.x)
  })

  return (
    <Animated.View style={{
      position: 'absolute',
      left: 0,
      height: '100%',
      width: (SIZES.width - (SIZES.radius  * 2)) / 2,
      backgroundColor: COLORS.lightGray,
      borderRadius: SIZES.radius,
      transform: [{
        translateX
      }]
    }} />
  );
};

const Tabs = ({scrollX, onMarketTabPress}) => {
  console.log('scrollX', scrollX)
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];
    marketTabs.forEach(marketTab => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x, y, width, height
          })

          if(ml.length === marketTabs.length) {
            setMeasureLayout(ml)
          }
        }
      )
    })
  }, [containerRef.current]);

  return (
    <View style={{ flexDirection: 'row' }} ref={containerRef}>
      {
        measureLayout?.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX}  />
      }

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

                  onPress={() => onMarketTabPress(index)}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
          ))
        }
    </View>
  );
};

const TabBar = ({ scrollX, onMarketTabPress }) => {
  return (
    <View style={{
      marginTop: SIZES.radius,
      marginHorizontal: SIZES.radius,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.gray
    }}>
      <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
    </View>
  );
}

const priceColor = (item) => {
  const change = item.price_change_percentage_7d_in_currency;
  return change === 0 ? COLORS.lightGray3 : (change > 0) ? COLORS.lightGreen : COLORS.red;
};


const RenderList = React.forwardRef((props, ref) => {

  const { scrollX, coins } = props;

  return (
    <Animated.FlatList
      ref={ref}
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
                  <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}>
                    <Text style={{
                      color: COLORS.white,
                      ...FONTS.h4
                    }}>$ {item.current_price}</Text>
                    <View style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexDirection: 'row'
                    }}>
                      {
                        item.price_change_percentage_7d_in_currency !== 0 && (
                          <Image source={icons.upArrow} style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor(item),
                            transform: item.price_change_percentage_7d_in_currency > 0 ? [{rotate: '45deg'}] : [{ rotate: '125deg'}]
                          }} />
                        )
                      }
                      <Text style={{
                        color: priceColor(item),
                        marginLeft: 5,
                        ...FONTS.body5
                      }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                    </View>
                  </View>
               </View>
             )}
           />
        </View>
      )}
    />
  );
})

const Market = () => {
  const dispatch = useDispatch();

  const coins = useSelector(state => state.marketReducer.coins);

  const scrollX = useRef(new Animated.Value(0))?.current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback((tabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width
    })
  },[]);

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
            <TabBar scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
            {renderButtons()}
            <RenderList scrollX={scrollX} coins={coins} ref={marketTabScrollViewRef} />
          </View>
       </MainLayout>
    )
}

export default Market;