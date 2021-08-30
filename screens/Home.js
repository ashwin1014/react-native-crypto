import React, {useCallback, useState} from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native";

import MainLayout from './MainLayout';
import {BalanceInfo, IconTextButton, Chart} from '../components';
import {SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

import { getCoinMarket, getHoldings } from '../stores/market/marketActions';

const WalletInfoSection = ({totalWallet, changePct}) => {

  return (
    <View style={{
      paddingHorizontal: SIZES.padding,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      backgroundColor: COLORS.gray
    }}>
      {/* Balance Info */}
      <BalanceInfo title="Your Wallet" displayAmount={totalWallet} changePct={changePct} containerStyle={{ marginTop: 50 }} />
      <View style={{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: -15,
        paddingHorizontal: SIZES.radius
      }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          containerStyle={{
            flex: 1,
            height: 40,
            marginRight: SIZES.radius
          }}
          // onPress={}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            flex: 1,
            height: 40
          }}
          // onPress={}
        />
      </View>
    </View>
  );
}

const Home = () => {
  const dispatch = useDispatch();


  const myHoldings = useSelector(state => state.marketReducer.myHoldings);
  const coins = useSelector(state => state.marketReducer.coins);

  const [selectedCoin, setSelectedCoin] = useState();

  // console.log("myHoldings", myHoldings);
  // console.log("coins", coins);

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings(dummyData.holdings))
      dispatch(getCoinMarket())
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
            {/* Header */}
            {/* Wallet */}
            <WalletInfoSection totalWallet={totalWallet} changePct={changePct} />
            <Chart
              containerStyle={{
                marginTop: SIZES.padding * 2
              }}
              chartPrices={selectedCoin ? selectedCoin.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
            />
            {/* TOp Crypto */}
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  marginTop: 30,
                  paddingHorizontal: SIZES.padding
                }}
                ListHeaderComponent={
                  <View style={{
                    marginBottom: SIZES.radius
                  }}>
                      <Text style={{
                        color: COLORS.white,
                        ...FONTS.h3
                      }}>Top Cryptocurrencies</Text>
                  </View>
                }
                ListFooterComponent={
                  <View style={{
                    marginBottom: 50
                  }}>

                  </View>
                }
                renderItem={({item}) => (
                  <TouchableOpacity style={{
                    height: 55,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => setSelectedCoin(item)}
                  >
                      <View style={{ width: 35 }}>
                        <Image source={{uri: item.image}} style={{ height: 20, width: 20 }} />
                      </View>
                      <View style={{ flex: 1 }}>
                          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.name}</Text>
                      </View>

                      <View>
                         <Text style={{ textAlign: 'right', color: COLORS.white, ...FONTS.h4 }}>$ {item.current_price}</Text>
                         <View style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                           justifyContent: 'flex-end'
                         }}>
                            {
                              item.price_change_percentage_7d_in_currency !== 0 && (
                                <Image source={icons.upArrow} style={{
                                  height: 10,
                                  width: 10,
                                  tintColor: priceColor(item),
                                  transform: item.price_change_percentage_7d_in_currency > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                }} />
                              )
                            }
                            <Text style={{
                              marginLeft: 5,
                              lineHeight: 15,
                              color: priceColor(item),
                              ...FONTS.body5
                            }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                         </View>
                      </View>
                  </TouchableOpacity>
                )}
              />

          </View>
       </MainLayout>
    )
}

export default Home;