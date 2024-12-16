import { getCurrentUser } from 'aws-amplify/auth';

export async function currentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    if(!user){
        return  { username:'', userId:'' }
    }
    const { username, userId, signInDetails } = user
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    return { username, userId, signInDetails };
  } catch (err) {
    console.log(err);
  }
}