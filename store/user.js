import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    session: null,
    details: null,
    loggedIn: false,
    authError: false,
    errorMessage: false,
    loading: false,
  }),
  actions: {
    // get user session
    async getUserSession() {
      const supabase = useSupabaseClient();

      try {
        const { data: userSessionData, error } =
          await supabase.auth.getSession();

        if (userSessionData.session === null) {
          this.loggedIn = false;
        } else {
          this.session = userSessionData.session;
          this.loggedIn = true;
          const { data: userDets } = await supabase
            .from("userList")
            .select("*")
            .eq("userId", this.session.user.id);

          this.details = userDets;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // sign out
    async logOutUser() {
      const supabase = useSupabaseClient();
      const route = useRouter();

      try {
        const { error } = await supabase.auth.signOut();
        route.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    async createUserViaEmail(newEmail, newPassword, fullName) {
      this.loading = true;
      const supabase = useSupabaseClient();
      const route = useRouter();

      try {
        const { data: newUser, error } = await supabase.auth.signUp({
          email: newEmail,
          password: newPassword,
        });
        if (newUser.session) {
          this.errorMessage = false;
          const { error } = await supabase.from("userList").insert({
            full_name: fullName,
            userId: newUser.user.id,
          });
          route.push("/mypolls");
          this.loading = false;
        } else {
          console.log(error);
          this.loading = false;
          this.errorMessage = true;
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },

    // log in
    async signInUser(emailInput, passwordInput) {
      this.loading = true;
      const supabase = useSupabaseClient();
      const route = useRouter();
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailInput,
          password: passwordInput,
        });

        if (data.user) {
          this.authError = false;
          route.push("/mypolls");
          this.loading = false;
        } else {
          this.authError = true;
          this.loading = false;
        }
      } catch (error) {
        this.authError = true;
        this.loading = false;
      }
    },
  },
});
