import { getCurrentUser } from 'aws-amplify/auth';

export async function currentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}