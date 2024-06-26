<script setup>
import { useUserStore } from '~/store/user';
const route = useRouter();

const userStore = useUserStore();

// Define a reactive variable to hold userDetails
let userDetails = ref(null);

// Watch for changes to userStore.details
watch(() => userStore.details, (newValue, oldValue) => {
    userDetails.value = newValue;
});

let navRoute = route.currentRoute.value.path;

watch(() => route.currentRoute.value.path, (newValue, oldValue) => {
    navRoute = newValue;
})


// logout user
const logOutUser = () => {
    userStore.logOutUser()
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
                    <BadgesPlan v-if="user.isPro" badge_class="plan_badge pro">
                        <template #badgeText>
                            Pro
                        </template>
                    </BadgesPlan>
                    <BadgesPlan v-else badge_class="plan_badge free-trial">
                        <template #badgeText>
                            Free Trial
                        </template>
                    </BadgesPlan>
                </div>
            </div>
            <PhosphorIconCaretDown :size="20" />

        </div>

        <div class="core_menu flex-col">

            <div class="menu_list_group flex-col">

                <!-- my polls -->
                <NuxtLink to="/mypolls">
                    <NavSidenavmenu class="side_menu flex-row"
                        :sideMenu_class="navRoute === '/mypolls' ? 'active_menu' : ''">
                        <template #side_menu_icon>

                            <PhosphorIconFlagPennant v-if="navRoute === '/mypolls'" :size="20" weight="fill" />
                            <PhosphorIconFlagPennant v-else :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">My Polls</p>
                        </template>
                    </NavSidenavmenu>
                </NuxtLink>

            </div>

            <div class="menu_group flex-col">
                <p class="menu_group_title">ACCOUNT</p>
                <div class="menu_list_group flex-col">

                    <!-- Preferences -->
                    <NuxtLink to="/preferences">
                        <NavSidenavmenu class="side_menu flex-row"
                            :sideMenu_class="navRoute === '/preferences' ? 'active_menu' : ''">
                            <template #side_menu_icon>
                                <PhosphorIconSlidersHorizontal v-if="navRoute === '/preferences'" :size="20"
                                    weight="fill" />
                                <PhosphorIconSlidersHorizontal v-else :size="20" weight="bold" />
                            </template>
                            <template #side_menu_name>
                                <p class="side_menu_text">Preferences</p>
                            </template>
                        </NavSidenavmenu>
                    </NuxtLink>

                    <!-- Notifications -->
                    <NavSidenavmenu class="side_menu flex-row">
                        <template #side_menu_icon>
                            <PhosphorIconBell :size="20" weight="bold" />
                        </template>
                        <template #side_menu_name>
                            <p class="side_menu_text">Notifications</p>
                        </template>
                    </NavSidenavmenu>

                    <!-- Subscription -->
                    <NuxtLink to="/subscription">
                        <NavSidenavmenu class="side_menu flex-row"
                            :sideMenu_class="navRoute === '/subscription' ? 'active_menu' : ''">
                            <template #side_menu_icon>
                                <PhosphorIconCardholder v-if="navRoute === '/subscription'" :size="20" weight="fill" />
                                <PhosphorIconCardholder v-else :size="20" weight="bold" />
                            </template>
                            <template #side_menu_name>
                                <p class="side_menu_text">Subscription</p>
                            </template>
                        </NavSidenavmenu>
                    </NuxtLink>
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