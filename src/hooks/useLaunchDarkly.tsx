// src/hooks/useLaunchDarkly.ts
import { useEffect, useState } from "react";
import { initialize } from "launchdarkly-js-client-sdk";
import type { User } from "../userContext";

const clientSideId = import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID;

const fallBackUser = {
  key: "user-123",
  name: "Varun",
  plan: "premium",
};
export function useLaunchDarkly(user: User) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log("user", user);
    const client = initialize(clientSideId, {
      key: user?.id?.toString() ?? fallBackUser.key,
      name: user?.name ?? fallBackUser.name,
      custom: {
        plan: user?.plan ?? fallBackUser.plan,
      },
    });

    client.on("ready", () => {
      setFlags(client.allFlags());
    });

    client.on("change", () => {
      setFlags(client.allFlags());
    });

    return () => {
      client.close();
    };
  }, [user]);

  return { flags };
}
