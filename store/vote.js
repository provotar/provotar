import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useVoteStore = defineStore("vote", {
  state: () => ({
    voteSelection: [],
    inviteeId: "",
  }),

  actions: {
    async saveVotesToDB() {
      const supabase = useSupabaseClient();
      try {
        const { data } = await supabase.from("votes").insert(
          this.voteSelection.map((votes) => ({
            id: uuidv4(),
            candidate_id: votes.candidate_id,
            poll_id: votes.poll_id,
            position_id: votes.position_id,
            invitee_id: this.inviteeId,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    },

    async updateVotedStatus() {
      const supabase = useSupabaseClient();
      try {
        const { error } = await supabase
          .from("invitees")
          .update({ hasVoted: true })
          .eq("id", this.inviteeId);
        if (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
