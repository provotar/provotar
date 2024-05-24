<script setup>
const route = useRouter();

useHead({
    title: 'Voting made easy'
});

const getStarted = () => {
    route.push("/signup")
}
const login = () => {
    route.push("/signup")
}

</script>

<template>
    <div class="home-page">
        <NavTopnav @get-started="getStarted()" />

        <div class="hero-section flex-col">
            <div class="hero-content-wrapper flex-col">
                <div class="hero-text-wrapper flex-col">
                    <h1 class="hero-copy">Create dynamic polls in minutes</h1>
                    <p class="hero-subcopy">Securely host elections, bulk invite participants to vote and track insights
                        and analytics </p>
                </div>
                <Buttons btn_class="lg_btn pry_purple" @btn_click="getStarted()">Get Started for free</Buttons>
            </div>
            <img loading="eager" class="hero-img" src="/images/edited/hero_img.svg" alt="hero-img">

        </div>

        <div class="sub-info flex-col">
            <p class="sub-info-title">Fully-customised poll, anywhere, anytime.</p>
            <div class="sub-info-rack flex-row">
                <div class="rack-item flex-col">
                    <img class="rack-img" src="/images/icons/activity.svg" alt="rack-img">
                    <div class="rack-text flex-col">
                        <p class="rack-title">Realtime updates</p>
                        <p class="rack-subtitle">Track live polls and metrics as they come in.</p>
                    </div>
                </div>
                <div class="rack-item flex-col">
                    <img class="rack-img" src="/images/icons/lock.svg" alt="rack-img">
                    <div class="rack-text flex-col">
                        <p class="rack-title">Air-tight security</p>
                        <p class="rack-subtitle">Rig-proof voting process with fortified security measures.</p>
                    </div>
                </div>
                <div class="rack-item flex-col">
                    <img class="rack-img" src="/images/icons/eye.svg" alt="rack-img">
                    <div class="rack-text flex-col">
                        <p class="rack-title">True transparency</p>
                        <p class="rack-subtitle">All results available with in-depth detail and visibility</p>
                    </div>
                </div>
                <div class="rack-item flex-col">
                    <img class="rack-img" src="/images/icons/database.svg" alt="rack-img">
                    <div class="rack-text flex-col">
                        <p class="rack-title">Backed up storage</p>
                        <p class="rack-subtitle">Up to 100,000 vote data storage for free.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature-wrapper flex-col">

            <div class="feature-card flex-row one">
                <div class="feature-content flex-col">
                    <div class="feature-badge flex-row">
                        <p>
                            Custom invites
                        </p>
                    </div>
                    <div class="feature-text flex-col">
                        <p class="feature-title">Securely bulk invite voters with one-click</p>
                        <p class="feature-subtitle">Invite and setup up to 2k voters in bulk with CSV or directly with
                            their email address. No
                            Stress.</p>
                    </div>
                </div>
                <img class="feature-img img-one" loading="lazy" src="/images/edited/feature_img_one.svg" alt="img-one">
            </div>

            <div class="feature-card flex-row two">

                <div class="feature-content flex-col">
                    <div class="feature-badge flex-row">
                        <p>
                            Custom invites
                        </p>
                    </div>
                    <div class="feature-text flex-col">
                        <p class="feature-title">Track vote analytics and auto-send results</p>
                        <p class="feature-subtitle">Never miss an update and see winning projections backed by AI.
                            Automatically declare winners with one-click.</p>
                    </div>
                </div>
                <img class="feature-img img-two" loading="lazy" src="/images/edited/feature_img_two.svg" alt="img-two">

            </div>

            <div class="feature-card flex-row three">
                <div class="feature-content flex-col">
                    <div class="feature-badge flex-row">
                        <p>
                            Custom invites
                        </p>
                    </div>
                    <div class="feature-text flex-col">
                        <p class="feature-title">Vote from the comfort of your home</p>
                        <p class="feature-subtitle">Transparent and intuitive voting flow that minimises errors and
                            void votes. Receive email verification of votes cast. </p>
                    </div>
                </div>
                <img class="feature-img img-three" loading="lazy" src="/images/edited/feature_img_three.svg"
                    alt="img-three">
            </div>
        </div>

        <div class="footer-section flex-col">
            <div class="footer-card flex-col">
                <div class="footer-card-content flex-col">
                    <div class="footer-card-text flex-col">
                        <p class="footer-card-title">Host your next poll for free</p>
                        <p class="footer-card-subtitle">No credit card. No hidden charge.</p>
                    </div>
                    <Buttons btn_class="lg_btn pry_white" @btn_click="getStarted()">Get Started</Buttons>
                </div>
                <img class="footer-card-img" src="/images/edited/footer_card_img.svg" alt="footer-card-img">
            </div>

            <FooterLinkfooter />
        </div>
    </div>

</template>