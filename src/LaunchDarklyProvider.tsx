import { withLDProvider } from "launchdarkly-react-client-sdk";

const clientSideID = import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID;

const LaunchDarklyProvider = withLDProvider({
  clientSideID,
  options: {
    // Optional config like bootstrap, key, etc.
  },
})(() => null);

export default LaunchDarklyProvider;
