import React from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class SaeWithLine extends BaseInput {
    static propTypes = {
        height: PropTypes.number,
        /*
         * active border height
         */
        borderHeight: PropTypes.number,
        /*
         * Passed to react-native-vector-icons library as name prop
         */
        iconName: PropTypes.string,
        /*
         * Passed to react-native-vector-icons library as color prop.
         * This is also used as border color.
         */
        labelHeight: PropTypes.number,
    };

    static defaultProps = {
        iconColor: 'white',
        height: 48,
        inputPadding: 16,
        labelHeight: 24,
        borderHeight: 1,
        animationDuration: 300,
        iconName: 'pencil',
    };

    _onPressEye() {
        this.setState(
            {
                passwordIcon: this.state.passwordIcon === 'eye' ? 'eye-slash' : 'eye',
            }
            , this.focus);
    }

    render() {
        const {
            iconColor,
            label,
            style: containerStyle,
            height: inputHeight,
            inputPadding,
            labelHeight,
            borderHeight,
            inputStyle,
            labelStyle,
            textInputStyle,
            borderColor,
        } = this.props;
        const {width, focusedAnim, value, passwordIcon} = this.state;
        const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

        return (
            <View
                style={[
                    styles.container,
                    containerStyle,
                    {
                        height: inputHeight + inputPadding,
                    },
                ]}
                onLayout={this._onLayout}
            >
                <TouchableWithoutFeedback onPress={this.focus}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: focusedAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, labelHeight + inputPadding - 10],
                            }),
                        }}
                    >
                        <Animated.Text
                            style={[
                                styles.label,
                                {
                                    fontSize: focusedAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [14, 12],
                                    }),
                                    color: focusedAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.5)']
                                    })
                                },
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TextInput
                    ref={this.input}
                    {...this.props}
                    style={[
                        styles.textInput,
                        inputStyle,
                        {
                            width,
                            height: inputHeight,
                            paddingTop: (inputPadding / 2),
                        },
                        textInputStyle
                    ]}
                    value={value}
                    onBlur={this._onBlur}
                    onChange={this._onChange}
                    onFocus={this._onFocus}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={this.props.secureTextEntry && this.state.passwordIcon === 'eye'}
                />
                {
                    this.props.secureTextEntry &&
                    <TouchableWithoutFeedback onPress={() => this._onPressEye()}>
                        <AnimatedIcon
                            name={passwordIcon}
                            color={'white'}
                            style={{
                                position: 'absolute',
                                bottom: 5,
                                right: 0,
                                fontSize: 20,
                                backgroundColor: 'transparent',
                            }}
                        />
                    </TouchableWithoutFeedback>
                }
                {/* bottom border */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        height: borderHeight,
                        width: width,
                        backgroundColor: (borderColor || 'rgba(255, 255, 255, 0.5)'),
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    label: {
        backgroundColor: 'transparent',
        fontWeight: '600',
        fontSize: 14,
        color: 'white',
        marginBottom: 5,
        fontFamily: 'Avenir Next',
        letterSpacing: 0.5,
    },
    textInput: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        paddingLeft: 0,
        color: 'white',
        fontSize: 16,
        borderBottomWidth: 1.0,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
