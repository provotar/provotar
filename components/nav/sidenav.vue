<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

// Define a reactive variable to hold userDetails
let userDetails = ref(null);

// Watch for changes to userStore.details
watch(() => userStore.details, (newValue, oldValue) => {
    userDetails.value = newValue;
});

// logout user
const logOutUser = () => {
    userStore.logOutUser()
}


const selectedTab = ref(1);
const selectTab = (tab) => {
    selectedTab.value = tab;
}

onMounted(() => {
    userStore.getUserSession();
})

</script>


<template>
    <div class="side_nav flex-col">
        <div class="user_menu flex-row">
            <div class="menu_dets flex-row">
                <img src="/images/icons/user_avatar.svg" alt="user_avatar">
                <div class="name_role flex-col" v-for="user in userDetails">
                    <p class="user_name">{{ user.full_name }}</p>
                    <p class="user_role">Admin</p>
                </div>
            </div>
            <PhosphorIconCaretDown :size="20" />

        </div>

        <div class="core_menu flex-col">

            <div class="menu_list_group flex-col">

                <!-- my polls -->
                <NavSidenavmenu class="side_menu flex-row" @sideMenu_click=selectTab(1)
                    :sideMenu_class="selectedTab === 1 ? 'active_menu' : ''" @click="$emit('selectViewOne')">
                    <template #side_menu_icon>
                        <PhosphorIconFlagPennant v-if="selectedTab === 1" :size="20" weight="fill" />
                        <PhosphorIconFlagPennant v-else :size="20" weight="bold" />
                    </template>
                    <template #side_menu_name>
                        <p class="side_menu_text">My Polls</p>
                    </template>
                </NavSidenavmenu>

                <!-- Organisations -->
                <NavSidenavmenu class="side_menu flex-row" @sideMenu_click=selectTab(2)
                    :sideMenu_class="selectedTab === 2 ? 'active_menu' : ''" @click="$emit('selectViewTwo')">
                    <template #side_menu_icon>
                        <PhosphorIconUsersThree v-if="selectedTab === 2" :size="20" weight="fill" />
                        <PhosphorIconUsersThree v-else :size="20" weight="bold" />
                    </template>
                    <template #side_menu_name>
                        <p class="side_menu_text">Organisations</p>
                    </template>
                </NavSidenavmenu>
            </div>

            <div class="menu_group flex-col">
                <p class="menu_group_title">ACCOUNT</p>
                <div class="menu_list_group flex-col">

                    <!-- Preferences -->
                    <NavSidenavmenu class="side_menu flex-row" @sideMenu_click=selectTab(3)
                        :sideMenu_class="selectedTab === 3 ? 'active_menu' : ''" @click="$emit('selectViewThree')">
                        <template #side_menu_icon>
                            <PhosphorIconSlidersHorizontal v-if="selectedTab === 3" :size="20" weight="fill" />
                            <PhosphorIconSlidersHorizontal v-else :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">Preferences</p>
                        </template>
                    </NavSidenavmenu>

                    <!-- Notifications -->
                    <NavSidenavmenu class="side_menu flex-row" @sideMenu_click=selectTab(4)
                        :sideMenu_class="selectedTab === 4 ? 'active_menu' : ''" @click="$emit('selectViewFour')">
                        <template #side_menu_icon>
                            <PhosphorIconBell v-if="selectedTab === 4" :size="20" weight="fill" />
                            <PhosphorIconBell v-else :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">Notifications</p>
                        </template>
                    </NavSidenavmenu>

                    <!-- Subscription -->
                    <NavSidenavmenu class="side_menu flex-row" @sideMenu_click=selectTab(5)
                        :sideMenu_class="selectedTab === 5 ? 'active_menu' : ''" @click="$emit('selectViewFive')">
                        <template #side_menu_icon>
                            <PhosphorIconCardholder v-if="selectedTab === 5" :size="20" weight="fill" />
                            <PhosphorIconCardholder v-else :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">Subscription</p>
                        </template>
                    </NavSidenavmenu>
                </div>
            </div>

            <div class="menu_group flex-col">
                <p class="menu_group_title">HELP</p>
                <div class="menu_list_group flex-col">
                    <NavSidenavmenu sideMenu_class="side_menu flex-row">
                        <template #side_menu_icon>
                            <PhosphorIconQuestion :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">FAQs</p>
                        </template>
                    </NavSidenavmenu>
                    <NavSidenavmenu sideMenu_class="side_menu flex-row">
                        <template #side_menu_icon>
                            <PhosphorIconHeadset :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">Contact Us</p>
                        </template>
                    </NavSidenavmenu>

                </div>
            </div>
            <NavSidenavmenu sideMenu_class="side_menu exit_menu flex-row" @click="logOutUser()">
                <template #side_menu_icon>
                    <PhosphorIconSignOut :size="20" />
                </template>
                <template #side_menu_name>
                    <p class="side_menu_text">Logout</p>
                </template>
            </NavSidenavmenu>
        </div>

    </div>
</template>