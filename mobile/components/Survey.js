import React, {Component} from "react";
import {AsyncStorage, AppRegistry, Button, StyleSheet, Text, View, Image, TextInput, Navigator, WebView} from "react-native";
import {STYLES} from "./globals"



export default class Survey extends Component {
    static propTypes = {
        questionText: React.PropTypes.string.isRequired,
        isAnswered: React.PropTypes.bool.isRequired,
        option1Text: React.PropTypes.string,
        option2Text: React.PropTypes.string,
        onOption1Clicked: React.PropTypes.func,
        onOption2Clicked: React.PropTypes.func,
        thankYouText: React.PropTypes.string,
    }

    static defaultProps = {
        option1Text: 'Yes',
        option2Text: 'No',
        onOption1Clicked: () => {},
        onOption2Clicked: () => {},
        thankYouText: 'Thanks for your response!',
    }

    render() {

        const renderSurvey = () => {
            return (
                <View style={STYLES.surveyContainer}>
                    <Text style={STYLES.surveyQuestion}>
                        {this.props.questionText}
                    </Text>
                    <View style={STYLES.surveyOptionsLayout}>
                        <Button
                            onPress={this.props.onOption1Clicked}
                            title={this.props.option1Text}
                            color="#8BC34A"
                            accessibilityLabel={this.props.option1Text}
                        />
                        <Button
                            onPress={this.props.onOption2Clicked}
                            title={this.props.option2Text}
                            color="#FF9800"
                            accessibilityLabel={this.props.option2Text}
                        />
                    </View>
                </View>
            )
        }

        const renderAcknowledgement = () => {
            return (
                <View style={STYLES.surveyContainer}>
                    <Text style={STYLES.surveyQuestion}>
                        {this.props.thankYouText}
                    </Text>
                </View>
            )
        }

        return (
            <View style={STYLES.surveyContainer}>
                {this.props.isAnswered ? renderAcknowledgement() : renderSurvey()}
            </View>
        );
    }
}