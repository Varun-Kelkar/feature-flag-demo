
---

## 🚩 Feature Flags with LaunchDarkly

This app uses [LaunchDarkly](https://launchdarkly.com/) to toggle features without having the need to redeploy them.

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
```
---

## Environment Variables

Please configure following env variables in your .env file

```plaintext
VITE_API_BASE_URL=https://dummyjson.com
VITE_LAUNCH_DARKLY_CLIENT_ID=<your-launch-darkly-client-id>
```

---

## How it Works?

I've created two users, one with a free plan & one with a premium

Free plan user

```plaintext
email - johndoe@recipes.com
password - password123
```
Premium plan user

```plaintext
email - ethanhunt@recipes.com
password - impossible 
```

The user with **Free Plan** will not be able to see **Recipe Instructions** on Recipe Details page.

---

## Feature Flags

Currently, i've configured two feature flags, one for filters on recipes page & another one for premium users in recipe details page
The user with free plan cannot view recipe instructions.

- `filter-by-tags`: Enable / Disable filters on recipes page.
- `foodies-premium-users` : Show / Hide recipe instructions depending on user plan on recipe detail page.

#### Incase you're interested in configuring flags yourself,

- To toggle the feature flag, please setup an account with [LaunchDarkly](https://launchdarkly.com/)
- Create flags - `filter-by-tags` & `foodies-premium-users`.
- For flag `foodies-premium-users`, add a rule in Launch Darkly saying `If user plan starts with premium` serve `true`
- Toggle the flag values in Launch Darkly & watch the variations in Filters & Instructions.

> **Note:** Strangely, I did not find `equal to` operator in Launch Darkly Rule UI.


## Live Demo

Please checkout [Feature Flag Demo](https://feature-flag-demo-one.vercel.app)


