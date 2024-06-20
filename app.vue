<script setup>
const supabase = useSupabaseClient();
const route = useRouter();
const userActive = ref(true);

useSeoMeta({
  title: "Voting made easy -Provotar",
  ogTitle: "Voting made easy -Provotar",
  description: "Securely invite voters, get voting insights and announce results with ease.",
  ogDescription: "Securely invite voters, get voting insights and announce results with ease.",
  ogImage: "/images/og/home.png",
  twitterCard: "summary_large_image"
})

// sessionTimeOut function
const setUserActive = () => {
  userActive.value = true;
};

let sessionTimeOut;

const checkActivity = () => {
  if (!userActive.value) {
    logOutUser();
  } else {
    userActive.value = false;
  }
};

let navRoute = route.currentRoute.value.name;

watch(() => route.currentRoute.value.name, (newValue, oldValue) => {
  navRoute = newValue;
})

// onMounted(() => {

//   if (navRoute !== 'vote-id-result' && navRoute !== 'vote-id' && navRoute !== 'login' && navRoute !== 'vote-id-slides') {

//     window.addEventListener("mousemove", setUserActive);
//     window.addEventListener("keydown", setUserActive);

//     checkActivity();

//     sessionTimeOut = setInterval(checkActivity, 300000);
//   }
// }),

//   onBeforeUnmount(() => {
//     window.addEventListener("mousemove", setUserActive);
//     window.addEventListener("keydown", setUserActive);
//     clearInterval(sessionTimeOut);
//   });

const logOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    route.push('/login');
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
