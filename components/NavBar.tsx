"use client";
import { useEffect, useState } from "react";
import SynapseLogo from "./SynapseLogo";

type EvmProvider = {
  isMetaMask?: boolean;
  isRabby?: boolean;
  providers?: EvmProvider[];
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  off?: (event: string, handler: (...args: any[]) => void) => void;
};

function getEvmProvider() {
  const ethereum = (window as Window & { ethereum?: EvmProvider }).ethereum;
  if (!ethereum) return null;

  const providers = ethereum.providers?.length ? ethereum.providers : [ethereum];
  return providers.find(provider => provider.isMetaMask && !provider.isRabby)
    ?? providers.find(provider => provider.isRabby)
    ?? providers[0];
}

function shorten(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export default function NavBar() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const provider = getEvmProvider();
    if (!provider) return;
    const handleAccountsChanged = (accounts: unknown) => {
      const nextAddress = Array.isArray(accounts) ? accounts[0] : null;
      setAddress(typeof nextAddress === "string" ? nextAddress : null);
    };
    const handleDisconnect = () => setAddress(null);
    provider.request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch(() => setAddress(null));
    provider.on?.("accountsChanged", handleAccountsChanged);
    provider?.on?.("disconnect", handleDisconnect);
    return () => {
      provider?.off?.("accountsChanged", handleAccountsChanged);
      provider?.off?.("disconnect", handleDisconnect);
    };
  }, []);

  async function onConnectClick() {
    const provider = getEvmProvider();
    if (!provider) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const nextAddress = Array.isArray(accounts) ? accounts[0] : null;
      if (typeof nextAddress === "string" && nextAddress) setAddress(nextAddress);
    } catch (e) {
      // silently ignore user rejection
    }
  }

  async function onDisconnectClick() {
    // EVM wallets do not expose a universal disconnect method. Clearing the
    // local account keeps the button state consistent without revoking access.
    setAddress(null);
  }
  
  return (
    <header className="bg-gradient-to-r from-dark-secondary/90 to-dark-primary/90 backdrop-blur-md border-b border-neon-cyan/20 shadow-lg">
      <div className="container-grid flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <SynapseLogo size={64} className="animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="leading-tight">
              <div className="font-heading font-bold text-[21px] text-neon-cyan neon-glow">NEURA402</div>
              <div className="text-[12px] text-neon-cyan/60 uppercase tracking-wider"><span className="text-green-400">Robinhood Chain</span> • Layer 402</div>
            </div>
        </div>
        <div className="text-center hidden md:block">
          <div className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-neon-light neon-glow">
            NEURA Hood
          </div>
          <div className="badge-dot justify-center mt-1">
            <span className="size-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)' }}></span>
            Cognitive Layer Online
          </div>
        </div>
        <div className="flex items-center gap-3">
          {address ? (
            <button 
              onClick={onDisconnectClick} 
              className="px-4 py-2 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/30 hover:border-neon-cyan/60 transition-all"
            >
              {shorten(address)} · Disconnect
            </button>
          ) : (
            <button 
              onClick={onConnectClick} 
              className="btn-neon text-sm"
            >
              Connect wallet
            </button>
          )}
          <a
            href={process.env.NEXT_PUBLIC_TWITTER_URL ?? "https://x.com/neurahood_xyz"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 grid place-items-center hover:bg-neon-cyan/20 transition-colors"
            aria-label="Open Twitter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neon-cyan">
              <path fill="currentColor" d="M18.244 2H21.5l-7.5 8.57L23 22h-6.23l-4.87-6.35L6.33 22H3.07l8.03-9.17L1 2h6.36l4.4 5.8L18.24 2Zm-1.09 18h1.69L7.93 4h-1.7l10.93 16Z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}


