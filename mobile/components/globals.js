import {StyleSheet} from "react-native";

const backgroundColor = '#E1F5FE'

export const STYLES = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: backgroundColor,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    adviceText: {
        fontStyle: 'italic',
        textAlign: 'center',
    },
    surveyContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: backgroundColor,
    },
    surveyOptionsLayout: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    surveyQuestion: {
        color: '#263238',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
});