import { Auth } from "aws-amplify";

export async function updateCurrentUserAttributes(userAttributes) {
  let user = await Auth.currentAuthenticatedUser();
  return Auth.updateUserAttributes(user, userAttributes);
}

export async function currentUserInfo() {
  return Auth.currentUserInfo();
}
