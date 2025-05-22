import React from "react";
import { useLaunchDarkly } from "../../hooks/useLaunchDarkly";
import { useUser, type User } from "../../userContext";

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
  const { user } = useUser();
  const { flags } = useLaunchDarkly(user as User);

  return <>{flags[flagName] ? <>{children}</> : <>{fallback}</>}</>;
};

export default FeatureFlag;
