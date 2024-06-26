import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const usePollStore = defineStore("polls", {
  state: () => ({
    userPolls: [],
    loadingPolls: true,
    noPolls: false,
    pollDets: [],
    accountID: null,
    inviteList: [],
    savingPoll: false,
    newPoll: {
      pollTitle: "",
      pollID: "",
      positions: [],
    },
  }),

  actions: {
    // fetch polls
    async getPolls() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      const route = useRouter();

      if (user.value) {
        this.loadingPolls = true;
        this.noPolls = false;

        try {
          const { data: allPolls, error } = await supabase
            .from("userList")
            .select("polls(*, votes(*), positions(*, candidates(*)))")
            .eq("userId", user.value.id);

          if (allPolls[0].polls.length >= 1) {
            this.userPolls = allPolls[0].polls;
            this.loadingPolls = false;
            this.noPolls = false;
          } else if (allPolls[0].polls.length === 0) {
            this.loadingPolls = false;
            this.noPolls = true;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        route.push("/");
      }
    },

    // // filter one poll
    // getPollDetails(pollid) {

    // },
    // save pollname
    savePollName_ID(newPollName, newPollID) {
      this.newPoll.pollTitle = newPollName;
      this.newPoll.pollID = newPollID;
    },

    async userDetails() {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient();
      const { data: userDets } = await supabase
        .from("userList")
        .select("*")
        .eq("userId", user.value.id);
      this.accountID = userDets[0].accountId;
    },

    // create poll
    async createPoll() {
      this.savingPoll = true;
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      const route = useRouter();

      if (user.value) {
        try {
          const { pollserror } = await supabase.from("polls").insert({
            id: this.newPoll.pollID,
            poll_name: this.newPoll.pollTitle,
            user_id: `${this.accountID}`,
          });

          const { positionerror } = await supabase.from("positions").insert(
            this.newPoll.positions.map((pos) => ({
              id: pos.pos_id,
              position_name: pos.positionName,
              poll_id: this.newPoll.pollID,
            }))
          );

          const { candidateError } = await supabase.from("candidates").insert(
            this.newPoll.positions.flatMap((pos) => {
              return pos.candidates.map((candidate) => ({
                id: candidate.candidate_id,
                candidate_name: candidate.fullName,
                candidate_campaign_name: candidate.campaignName,
                position_id: pos.pos_id,
              }));
            })
          );

          this.savingPoll = false;
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    },

    // end poll
    async endPoll(pollid) {
      const supabase = useSupabaseClient();
      const route = useRouter();
      try {
        const { error } = await supabase
          .from("polls")
          .update({ isLive: FALSE })
          .eq("id", pollid);
        route.push("/mypolls");
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    },

    storeInvitees(list) {
      this.inviteList = list;
    },

    async saveInviteesToDB() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      const route = useRouter();

      if (user.value && this.inviteeList.length !== 0) {
        try {
          const { data } = await supabase.from("invitees").insert(
            this.inviteeList.map((invitee) => ({
              id: invitee.invitee_id,
              email: invitee.invitee_email,
              hasVoted: false,
              poll_id: invitee.pollId,
            }))
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});
