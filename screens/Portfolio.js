import React, {useCallback} from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native"


import { getHoldings } from '../stores/market/marketActions';
import {BalanceInfo, Chart} from '../components';
import {SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
import MainLayout from './MainLayout';

const WalletInfoSection = ({totalWallet, changePct}) => {

  return (
    <View style={{
      paddingHorizontal: SIZES.padding,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      backgroundColor: COLORS.gray
    }}>
      <Text style={{
        marginTop: 20,
        color: COLORS.white,
        ...FONTS.largeTitle
      }}>Portfolio</Text>
      <BalanceInfo title="Your Wallet" displayAmount={totalWallet} changePct={changePct} containerStyle={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }} />
      <View style={{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: -15,
        paddingHorizontal: SIZES.radius
      }}>
      </View>
    </View>
  );
}

const Portfolio = () => {
  const dispatch = useDispatch();

  const myHoldings = useSelector(state => state.marketReducer.myHoldings);

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings(dummyData.holdings))
    }, [])
  );

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
  const changePct = valueChange / (totalWallet - valueChange) * 100;

  const priceColor = (item) => {
    const change = item.price_change_percentage_7d_in_currency;
    return change === 0 ? COLORS.lightGray3 : (change > 0) ? COLORS.lightGreen : COLORS.red;
  };


    return (
     <MainLayout>
        <View style={{
            flex: 1,
            backgroundColor: COLORS.black
        }}>
           <WalletInfoSection totalWallet={totalWallet} changePct={changePct} />
           <Chart
              containerStyle={{
                marginTop: SIZES.radius
              }}
              chartPrices={myHoldings[0]?.sparkline_in_7d?.value}
            />
            <FlatList
             data={myHoldings}
             keyExtractor={item => item.id}
             contentContainerStyle={{
               marginTop: SIZES.padding,
               paddingHorizontal: SIZES.padding
             }}
             ListHeaderComponent={
              <View>
                  <Text style={{
                    color: COLORS.white,
                    ...FONTS.h3
                  }}>Your Assets</Text>
                  <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                  }}>
                  <Text style={{
                    color: COLORS.lightGray3,
                    flex: 1,
                  }}>Assets</Text>
                  <Text style={{
                    color: COLORS.lightGray3,
                    flex: 1,
                    textAlign: 'right'
                  }}>Price</Text>
                  <Text style={{
                    color: COLORS.lightGray3,
                    flex: 1,
                    textAlign: 'right'
                  }}>Holdings</Text>
                  </View>
              </View>
            }
            renderItem={({item}) => {
              return (
                  <TouchableOpacity style={{
                    flexDirection: 'row',
                    height: 55
                  }}>

                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Image source={{ uri: item.image }} style={{ height: 20, width: 20 }} />
                    <Text style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4
                    }}>{item.name}</Text>
                  </View>

                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                      <Text style={{
                        ...FONTS.h4,
                        lineHeight: 15,
                        textAlign: 'right',
                        color: COLORS.white
                      }}>$ {item.current_price.toLocaleString()}</Text>

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                      }}>

                      </View>
                  </View>

                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                      }}>

                      </View>

                  </TouchableOpacity>
              )
            }}
            />
        </View>
     </MainLayout>
    )
}

export default Portfolio;