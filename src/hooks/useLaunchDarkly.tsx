// src/hooks/useLaunchDarkly.ts
import { useEffect, useState } from "react";
import { initialize } from "launchdarkly-js-client-sdk";

const clientSideId = import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID;
const user = {
  key: "user-123",
  name: "Varun",
  custom: {
    plan: "premium",
  },
};
export function useLaunchDarkly() {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const client = initialize(clientSideId, user);

    client.on("ready", () => {
      setFlags(client.allFlags());
    });

    client.on("change", () => {
      setFlags(client.allFlags());
    });

    return () => {
      client.close();
    };
  }, []);

  return { flags };
}
