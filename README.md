
---

## 🚩 Feature Flags with LaunchDarkly

This app uses [LaunchDarkly](https://launchdarkly.com/) to toggle Filters features without redeploying.

### Example Flags:
- `filter-by-tags`: Enable/disable filters section
---

## 🛠️ Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/feature-flag-demo.git
cd feature-flag-demo

# 2. Install dependencies
npm install

# 3. Add .env file
touch .env
// add the following keys
VITE_API_BASE_URL=https://dummyjson.com
VITE_LAUNCH_DARKLY_CLIENT_ID=<your-launch-darkly-client-id>
```

## Live Demo

This app is deployed on Vercel. Please checkout [Feature Flag Demo](https://feature-flag-demo-7k8r25wcc-varun-kelkars-projects.vercel.app/).

To toggle the feature flag, please setup an account with [LaunchDarkly](https://launchdarkly.com/) & create a flag named filter-by-tags. Toggle the flag value in Launch Darkly & watch the variations in Filters UI.
