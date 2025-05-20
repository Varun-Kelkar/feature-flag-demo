import React from "react";
import { useFlags } from "launchdarkly-react-client-sdk";

type FeatureFlagProps = {
  flagName: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
};

const FeatureFlag = ({
  flagName,
  children,
  fallback = null,
}: FeatureFlagProps) => {
  const flags = useFlags();

  return <>{flags[flagName] ? <>{children}</> : <>{fallback}</>}</>;
};

export default FeatureFlag;
