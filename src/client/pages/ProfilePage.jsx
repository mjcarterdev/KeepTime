import { useFetcher } from 'react-router-dom';

const ProfilePage = () => {
  let fetcher = useFetcher();

  let isLoggingOut = fetcher.formData != null;

  return (
    <>
      <div className="h-[calc(100vh-4rem)] bg-base-100">
        <br />
        <h1>Protected</h1>
        <br />
        <fetcher.Form method="post" action="/auth/logout">
          <button type="submit" className="btn btn-primary" disabled={isLoggingOut}>
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </fetcher.Form>
      </div>
    </>
  );
};

export default ProfilePage;
