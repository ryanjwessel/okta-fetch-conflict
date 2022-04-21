import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createConfig } from "@okta/okta-react-native";
import { fetch } from "whatwg-fetch";

export default function App() {
    const [data, setData] = useState(null);
    const [oktaReady, setOktaReady] = useState(false);

    useEffect(() => {
        const oktaInit = async () => {
            try {
                const oktaReady = await createConfig({
                    clientId: "mockClientId",
                    redirectUri: `https://fakeauth.com:/login`,
                    endSessionRedirectUri: `https://fakeauth.com:/logout`,
                    discoveryUri: "https://mock-123.okta.com/oauth2/default",
                    scopes: ["openid", "profile"],
                });
                setOktaReady(oktaReady);
            } catch (error) {
                console.error(error);
            }
        };
        oktaInit();
    }, []);

    useEffect(() => {
        fetchMockData();
    }, []);

    const fetchMockData = () => {
        fetch("https://625885c892dc8873186269f4.mockapi.io/data")
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.error("request failed", err);
            });
    };
    return (
        <View style={styles.container}>
            <Text>{`Okta ready: ${oktaReady}`}</Text>
            <Text>{JSON.stringify(data?.[0])}</Text>
            <Button title="Make API Request" onPress={fetchMockData}>
                Make request
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
