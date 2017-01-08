import {StyleSheet} from "react-native";

export const STYLES = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
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
    surveyContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    surveyOptionsLayout: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    surveyQuestion: {
        color: 212121,
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
});