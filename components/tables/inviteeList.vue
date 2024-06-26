<script setup>
defineProps({
    inviteeList: Array,
})

const convertTimestampz = (timestampz) => {
    let dateObj = new Date(timestampz)
    let dateStr = dateObj.toLocaleDateString();
    let timeStr = dateObj.toLocaleTimeString();
    return `${dateStr}, ${timeStr}`
}
</script>

<template>
    <div>
        <table class="invite-list">
            <thead>
                <tr class="table-header">
                    <th>
                        <p>Email</p>
                    </th>
                    <th>
                        <p>Date Invited</p>
                    </th>
                    <th>
                        <p>Vote Status</p>
                    </th>
                    <th>
                        <p>Vote Time</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="invitee in inviteeList" class="invitee-row" :key="invitee.id">
                    <td>
                        <p class="invitee-email">{{ invitee.email }}</p>
                    </td>
                    <td>
                        <p class="date-invited">{{ convertTimestampz(invitee.created_at) }}</p>
                    </td>
                    <td>
                        <div v-if="invitee.hasVoted" class="badge green flex-row">
                            <p>Voted</p>
                        </div>
                        <div v-else class="badge grey flex-row">
                            <p class="not-voted">Not Voted</p>
                        </div>
                    </td>

                    <td>
                        <p v-if="invitee.timeVoted">{{ convertTimestampz(invitee.timeVoted) }}</p>
                        <p v-else>-</p>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>