import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const usePollStore = defineStore("polls", {
  state: () => ({
    // userPolls: null,
    userPolls: [],
    loadingPolls: true,
    noPolls: false,
    pollDets: [],
    accountID: null,
    newPoll: {
      pollTitle: "",

      positions: [],
      // positionName: "",
      // positionId: uuidv4(), //To pass to position table
      // pollCandidates: [],
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

    // save pollname
    savePollName(newPollName) {
      this.newPoll.pollTitle = newPollName;

      console.log(this.newPoll.pollTitle);
    },

    async userDetails() {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient();
      const { data: userDets } = await supabase
        .from("userList")
        .select("*")
        .eq("userId", user.value.id);
      console.log(userDets[0].accountId);
      this.accountID = userDets[0].accountId;
    },
    // save candidates
    // saveCandidates(candidateName, candidateCampaignName) {
    //   this.newPoll.pollCandidates.push({
    //     candidate_name: candidateName,
    //     candidate_campaign_name: candidateCampaignName,
    //     position_id: this.newPoll.positionId,
    //   });
    // },
    // add a poll
    async createPoll() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      const route = useRouter();

      if (user.value) {
        const pollUUID = uuidv4();

        try {
          const { pollserror } = await supabase.from("polls").insert({
            id: pollUUID,
            poll_name: this.newPoll.pollTitle,
            user_id: `${this.accountID}`,
          });

          const { positionerror } = await supabase.from("positions").insert(
            this.newPoll.positions.map((pos) => ({
              id: pos.pos_id,
              position_name: pos.positionName,
              poll_id: pollUUID,
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
          if (candidateError) {
            console.log(candidateError);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    },
  },
});
