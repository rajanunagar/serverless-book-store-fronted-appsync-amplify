import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

export async function currentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function getSessionData() {
    try{
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        return accessToken?.payload;
    }
    catch(err:any) {
        console.log(err);
    }
}