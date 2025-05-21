import React from "react";
import { useLaunchDarkly } from "../../hooks/useLaunchDarkly";

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
  const { flags } = useLaunchDarkly();

  return <>{flags[flagName] ? <>{children}</> : <>{fallback}</>}</>;
};

export default FeatureFlag;
