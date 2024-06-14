import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    //login/signup
    session: null,
    details: null,
    loggedIn: false,
    authError: false,
    errorMessage: false,
    loading: false,

    // password reset
    NoExistingEmail: false,
    loadingReset: false,
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

    // create user
    async createUserViaEmail(newEmail, newPassword, fullName) {
      this.loading = true;
      const supabase = useSupabaseClient();
      const route = useRouter();

      try {
        const { data: newUser, error } = await supabase.auth.signUp({
          email: `${newEmail}`,
          password: `${newPassword}`,
        });

        if (newUser.session) {
          this.errorMessage = false;
          const { error } = await supabase.from("userList").insert({
            user_email: newEmail,
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

    // request reset password
    // async requestResetPassword(email) {
    //   this.NoExistingEmail = false;
    //   this.loadingReset = true;
    //   const supabase = useSupabaseClient();
    //   const route = useRouter();

    //   try {
    //     const { data, error } = await supabase
    //       .from("userList")
    //       .select("user_email")
    //       .eq("user_email", `${email}`);
    //     if (data.length === 0) {
    //       console.log("user does not exist");
    //       this.NoExistingEmail = true;
    //       this.loadingReset = false;
    //     } else {
    //       console.log("Reset email sent");
    //       this.NoExistingEmail = false;
    //       try {
    //         const { error } = await supabase.auth.resetPasswordForEmail(
    //           `${email}`
    //         );
    //         if (error) {
    //           console.log(console.log(error.message));
    //         }
    //       } catch (err) {
    //         console.log(error);
    //       }
    //       this.loadingReset = false;
    //       route.push(`/auth/reset_password/${email}/`);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   // try {
    //   //   const { error } = await supabase.auth.resetPasswordForEmail(
    //   //     `${email}`,
    //   //     {
    //   //       redirectTo: "http://localhost:3000/auth/reset_password",
    //   //     }
    //   //   );
    //   // } catch (err) {
    //   //   console.log(err);
    //   // }
    // },
  },
});
