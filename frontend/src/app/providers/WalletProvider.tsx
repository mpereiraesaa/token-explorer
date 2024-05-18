'use client';
import "@rainbow-me/rainbowkit/styles.css";

import { type FC, type PropsWithChildren } from 'react'; 
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http, createConfig } from "wagmi";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
    const config = createConfig({
      chains: [mainnet, sepolia, arbitrum],
      transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [arbitrum.id]: http(),
      },
    });

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                  {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default WalletProvider;
