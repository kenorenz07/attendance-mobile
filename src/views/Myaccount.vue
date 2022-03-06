<template>
    <ion-page class="pages">
        <ion-content scroll-y="false">
        <ion-row class="my-account-header">
            <ion-col size=12> 
                <ion-button class="back-button" @click="$router.back()">
                    <ion-icon color="light" :icon="caretBackOutline"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col size=12>
                <ion-item lines="none">
                    <ion-icon slot="start" color="primary" :icon="person"></ion-icon>
                    <ion-label>My Account</ion-label>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size=6>
                <ion-avatar>
                    <ion-img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"></ion-img>
                </ion-avatar>
            </ion-col>
            <ion-col size=6>
                <ion-button color="primary">Change Profile</ion-button>
                <span>John Doe</span>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size=12>
                <ion-list>
                    <ion-item>
                        <ion-label position="stacked">First Name</ion-label>
                        <div class="input-field">
                            <ion-input value="test"></ion-input>
                            <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Middle Name</ion-label>
                        <div class="input-field">
                        <ion-input value="test"></ion-input>
                        <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Last Name</ion-label>
                        <div class="input-field">
                        <ion-input value="test"></ion-input>
                        <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Email</ion-label>
                        <div class="input-field">
                        <ion-input value="test"></ion-input>
                        <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Username</ion-label>
                        <div class="input-field">
                        <ion-input value="test"></ion-input>
                        <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                </ion-list>
            </ion-col>
        </ion-row>
        </ion-content>
    </ion-page>
</template>
<script>
import { caretBackOutline, pencil, person } from 'ionicons/icons';

export default {
    setup() {
        
    },
    data: () => ({
        caretBackOutline, pencil, person
    }), 
}
</script>
<style lang="scss" scoped>
.my-account-header{
        margin-top :50px;
    }
.input-field {
    display: flex;
    width: 100%;
    align-items: center;
}
ion-row:nth-child(2) {
    justify-content: center;
    align-items: center;
    padding: 25px;
}
ion-row:nth-child(2) ion-col:first-child ion-avatar {
    height: 150px;
    width: 150px;
    border: 3px solid var(--ion-color-primary)
}
ion-row:nth-child(2) ion-col:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>