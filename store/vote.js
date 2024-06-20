import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useVoteStore = defineStore("vote", {
  state: () => ({
    voteSelection: [],
    inviteeId: "",
    voteTime: "",
    voteSubmitting: false,
  }),

  actions: {
    async saveVotesToDB() {
      this.voteSubmitting = true;
      const supabase = useSupabaseClient();
      const voteFullTime = new Date();
      this.voteTime = voteFullTime.toISOString();

      // add votes
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

        // update invitee
        const { error } = await supabase
          .from("invitees")
          .update({ hasVoted: true, timeVoted: this.voteTime })
          .eq("id", this.inviteeId);
        if (error) {
          console.log(error);
        }
        this.voteSubmitting = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
