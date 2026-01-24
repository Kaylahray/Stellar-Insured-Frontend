"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AuthSession = {
  address: string;
  signedMessage: string;
  signerAddress: string;
  authenticatedAt: number;
};

type AuthContextValue = {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  signOut: () => void;
  isAddressRegistered: (address: string) => boolean;
  registerAddress: (address: string) => void;
};

const SESSION_KEY = "stellar_insured_session";
const USERS_KEY = "stellar_insured_users";

const AuthContext = createContext<AuthContextValue | null>(null);

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readRegisteredUsers(): string[] {
  if (typeof window === "undefined") return [];
  const parsed = safeParseJson<string[]>(window.localStorage.getItem(USERS_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

function writeRegisteredUsers(users: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(null);

  useEffect(() => {
    const parsed = safeParseJson<AuthSession>(
      typeof window === "undefined" ? null : window.localStorage.getItem(SESSION_KEY),
    );
    if (parsed && parsed.address && parsed.signedMessage) {
      setSessionState(parsed);
    }
  }, []);

  const setSession = useCallback((next: AuthSession | null) => {
    setSessionState(next);
    if (typeof window === "undefined") return;
    if (next) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
  }, [setSession]);

  const isAddressRegistered = useCallback((address: string) => {
    const users = readRegisteredUsers();
    return users.includes(address);
  }, []);

  const registerAddress = useCallback((address: string) => {
    const users = readRegisteredUsers();
    if (users.includes(address)) return;
    writeRegisteredUsers([...users, address]);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ session, setSession, signOut, isAddressRegistered, registerAddress }),
    [session, setSession, signOut, isAddressRegistered, registerAddress],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
