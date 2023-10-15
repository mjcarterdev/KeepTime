export const authProvider = {
  isAuthenticated: false,
  username: null,

  async signIn(username) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = true;
    authProvider.username = username;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = '';
  },
};
