import React, { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { NavigationContainer, InitialState } from "@react-navigation/native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

type FontSource = Parameters<typeof Font.loadAsync>[0];

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest.sdkVersion}`;

interface LoadAssetsProps {
    fonts?: FontSource;
    assets?: number[];
    children: ReactElement | ReactElement[];
}

const usePromiseAll = (promises: Promise<void | void[] | Asset[]>[], cb: () => void): void =>
    useEffect(() => {
        (async (): Promise<void> => {
            await Promise.all(promises);
            cb();
        })();
    });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
    const [ready, setReady] = useState(false);
    usePromiseAll([Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))], () => setReady(true));
    return ready;
};

const LoadAssets = ({ assets, fonts, children }: LoadAssetsProps) => {
    const [isNavigationReady, setIsNavigationReady]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!__DEV__);
    const [initialState, setInitialState] = useState<InitialState | undefined>();
    const ready: boolean = useLoadAssets(assets || [], fonts || {});

    useEffect(() => {
        const restoreState = async (): Promise<void> => {
            try {
                const savedStateString: string | null = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
                const state: any = savedStateString ? JSON.parse(savedStateString) : undefined;
                setInitialState(state);
            } finally {
                setIsNavigationReady(true);
            }
        };
        if (!isNavigationReady) {
            restoreState();
        }
    }, [isNavigationReady]);

    const onStateChange = useCallback((state) => AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)), []);

    if (!ready || !isNavigationReady) {
        return <AppLoading />;
    }

    return <NavigationContainer {...{ onStateChange, initialState }}>{children}</NavigationContainer>;
};

export default LoadAssets;
