<template>
    <ion-page class="pages">
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
            <ion-col size=5>
                <ion-avatar>
                    <ion-img :src="user.image ? user.image : ($store.getters.user.image_path ? 'http://3.129.43.86'+ $store.getters.user.image_path :'/assets/img/person-icon.png')"></ion-img>
                </ion-avatar>
            </ion-col>
            <ion-col size=6>
                <ion-button color="primary" @click="takePhoto">Change Profile</ion-button>
                <span class="user-name">{{user.full_name}}</span>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size=12>
                <ion-list>
                    <ion-item>
                        <ion-label position="stacked">First Name</ion-label>
                        <div class="input-field">
                            <ion-input @ionBlur="saveCredentials"  :value="user.first_name" type="text" @IonInput="user.first_name = $event.target.value" required></ion-input>
                            <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Middle Name</ion-label>
                        <div class="input-field">
                            <ion-input @ionBlur="saveCredentials" :value="user.middle_name" type="text" @IonInput="user.middle_name = $event.target.value" required></ion-input>
                            <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Last Name</ion-label>
                        <div class="input-field">
                            <ion-input @ionBlur="saveCredentials" :value="user.last_name" type="text" @IonInput="user.last_name = $event.target.value" required></ion-input>
                            <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Email</ion-label>
                        <div class="input-field">
                            <ion-input @ionBlur="saveCredentials" :value="user.email" type="text" @IonInput="user.email = $event.target.value" required></ion-input>
                            <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Username</ion-label>
                        <div class="input-field">
                            <ion-input @ionBlur="saveCredentials" :value="user.username" type="text" @IonInput="user.username = $event.target.value" required></ion-input>
                            <ion-icon slot="end" color="primary" :icon="pencil"></ion-icon>
                        </div>
                    </ion-item>
                </ion-list>
            </ion-col>
        </ion-row>
    </ion-page>
</template>
<script>
import { caretBackOutline, pencil, person } from 'ionicons/icons';
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonItem,IonLabel,IonAvatar,IonImg,IonList,IonInput} from '@ionic/vue';
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonItem,IonLabel,IonAvatar,IonImg,IonList,IonInput
    },
    mounted() {
        this.initialize()
    },
    data: () => ({
        caretBackOutline, pencil, person,
        user : {}
    }), 
    methods : {
        initialize() {
            this.user = JSON.parse(JSON.stringify(this.$store.getters.user))
        },
        async takePhoto(){
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                source: CameraSource.Camera,
                resultType: CameraResultType.Base64,
            });

            this.user.image ="data:image/jpeg;base64," + image.base64String;

            this.saveCredentials()
        },
        saveCredentials(){
            this.$axios.post(`${localStorage.getItem('user_type')}/v1/update`,this.user).then(({data}) => {
                data
                this.$store.dispatch('updateUser')
            })
        }
    },
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
    padding-bottom: 10px;
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
.user-name {
    padding-left: 20px;
}
ion-list {
    height: 77%;
    overflow: hidden;
    overflow-y: scroll;
}
</style>