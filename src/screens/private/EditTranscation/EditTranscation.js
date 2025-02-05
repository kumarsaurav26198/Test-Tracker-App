import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { C_Text, CustomButton, CustomTextInput, Header } from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';
import { connect, useDispatch } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { deleteTransaction, updateTransaction } from '../../../store/redux/action/eventAction';
import { useRoute } from '@react-navigation/native';
import { DeleteIcon } from '../../../assets/svg';

const EditTranscation = ({ contactusRes }) => {
    const route = useRoute();
    const { item } = route.params || {};
    const dispatch = useDispatch();
    const [ category, setCategory ] = useState(item?.category);
    const [ description, setDescription ] = useState(item?.description);
    const [ amount, setAmount ] = useState(item?.amount);
    const [ date, setDate ] = useState(new Date());
    const [ incomeOrExpense, setIncomeOrExpense ] = useState(item?.incomeOrExpense);

    const [ errorCategory, setErrorCategory ] = useState(false);
    const [ errorDesc, setDescError ] = useState(false);
    const [ errorAmount, setErrorAmount ] = useState(false);
    const [ errorDate, setErrorDate ] = useState(false);
    const [ errorIncomeExpense, setErrorIncomeExpense ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ refreshing, setRefreshing ] = useState(false);

    const containerOpacity = useSharedValue(0);
    const containerTranslateY = useSharedValue(20);

    const animatedTextContainerStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(containerOpacity.value, { duration: 1700 }),
            transform: [
                { translateY: withTiming(containerTranslateY.value, { duration: 1700 }) },
            ],
        };
    });

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(containerOpacity.value, { duration: 1700 }),
            transform: [
                { translateY: withTiming(containerTranslateY.value, { duration: 1700 }) },
            ],
        };
    });

    useEffect(() => {
        containerOpacity.value = 1;
        containerTranslateY.value = 0;
    }, []);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(true);
        // Simulating network request
        setTimeout(() => {
            setLoading(false);
            setRefreshing(false);
        }, 1000);
    }, []);
    const handleAmountChange = (text) => {
        const cleanText = text.replace(/[^0-9.]/g, '');
        setAmount(cleanText);
    };

    const validateInputs = () => {
        let valid = true;
        if (!category)
        {
            setErrorCategory(true);
            valid = false;
        } else
        {
            setErrorCategory(false);
        }
        if (!description)
        {
            setDescError(true);
            valid = false;
        } else
        {
            setDescError(false);
        }

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0)
        {
            setErrorAmount(true);
            valid = false;
        } else
        {
            setErrorAmount(false);
        }

        if (!date)
        {
            setErrorDate(true);
            valid = false;
        } else
        {
            setErrorDate(false);
        }

        if (!incomeOrExpense)
        {
            setErrorIncomeExpense(true);
            valid = false;
        } else
        {
            setErrorIncomeExpense(false);
        }

        return valid;
    };

    const handleUpdateTranscation = async () => {
        if (validateInputs())
        {
            setLoading(true);

            const payload = {
                category: category,
                amount: amount,
                date: date,
                id: item?.id,
                incomeOrExpense: incomeOrExpense,
                description: description,
            };
            await dispatch(updateTransaction(payload));
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={[ 1 ]}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Animated.View style={[ animatedTextContainerStyle, styles.textContainer ]}>
                        <C_Text text_title="Edit Transcation" />
                        <TouchableOpacity
                            onPress={async () => {
                                setLoading(true);
                                await dispatch(deleteTransaction(item));
                                setLoading(false);
                            }}
                        >
                            <DeleteIcon />
                        </TouchableOpacity>
                    </Animated.View>
                }
                renderItem={() => (
                    <View style={{ marginTop: 10, padding: 20 }}>
                        <CustomTextInput
                            placeholder={'Category'}
                            value={category}
                            onChangeText={setCategory}
                            borderColor={errorCategory ? 'red' : null}
                        />
                        {errorCategory && <Text style={styles.errorText}>Enter category</Text>}
                        <CustomTextInput
                            placeholder={'Amount'}
                            value={amount}
                            onChangeText={handleAmountChange}
                            keyboardType="numeric"
                            borderColor={errorAmount ? 'red' : null}
                        />
                        {errorAmount && <Text style={styles.errorText}>Enter a valid amount</Text>}
                        <CustomTextInput
                            placeholder={'Description'}
                            value={description}
                            onChangeText={setDescription}
                            borderColor={errorDesc ? 'red' : null}
                        />
                        {errorDesc && <Text style={styles.errorText}>Enter Description</Text>}

                        <CustomTextInput
                            placeholder={'Date'}
                            onPress={() => {
                                setOpen(true);
                            }}
                            value={date ? date.toLocaleDateString() : ''}
                            onChangeText={setDate}
                            borderColor={errorDate ? 'red' : null}
                            editable={false}
                        />
                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false);
                                setDate(date);
                            }}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        />
                        {errorDate && <Text style={styles.errorText}>Enter date</Text>}

                        <View style={styles.selectorContainer}>
                            {[ 'income', 'expense' ].map((option) => (
                                <TouchableOpacity
                                    style={[
                                        styles.smallButton,
                                        {
                                            backgroundColor:
                                                incomeOrExpense === option
                                                    ? Colors.darkgrey
                                                    : Colors.bgColor,
                                        },
                                    ]}
                                    key={option}
                                    onPress={() => setIncomeOrExpense(option)}
                                >
                                    <Text
                                        style={{
                                            color:
                                                incomeOrExpense === option
                                                    ? Colors.white
                                                    : Colors.text,
                                        }}
                                    >
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {errorIncomeExpense && <Text style={styles.errorText}>Select income or expense</Text>}
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

            <Animated.View style={[ animatedButtonStyle, { alignItems: 'center' } ]}>
                <CustomButton title={'Update'} marginTop={30} onPress={handleUpdateTranscation} loading={loading} />
            </Animated.View>
        </View>
    );
};

const mapStateToProps = state => ({
    contactusRes: state?.contactFormReducer,
});

export default connect(mapStateToProps)(EditTranscation);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontWeight: '500',
        marginBottom: 10,
        bottom: 10,
    },
    selectorContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    smallButton: {
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        marginBottom: 15,
    },
    loading: {
        marginTop: 20,
    },
});
