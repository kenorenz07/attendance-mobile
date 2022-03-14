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
                    <ion-label>Reset Password</ion-label>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size=12>
                <ion-list>
                    <ion-item>
                        <ion-label position="stacked">Previous Password</ion-label>
                        <div class="input-field">
                            <ion-input class="input-text" color="primary" placeholder="Password" :value="user.previous_password" @IonInput="user.previous_password = $event.target.value" required :type="show_pass ?'text' :'password'" ></ion-input>
                            <ion-icon color="primary" :icon="!show_pass ? eye : eyeOff" slot="end" @click="show_pass = !show_pass"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">New Password</ion-label>
                        <div class="input-field">
                            <ion-input class="input-text" color="primary" placeholder="Password" :value="user.new_password" @IonInput="user.new_password = $event.target.value" required :type="show_new_pass ?'text' :'password'" ></ion-input>
                            <ion-icon color="primary" :icon="!show_new_pass ? eye : eyeOff" slot="end" @click="show_new_pass = !show_new_pass"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Confirm New Password</ion-label>
                        <div class="input-field">
                           <ion-input class="input-text" color="primary" placeholder="Password" :value="user.confirm_password" @IonInput="user.confirm_password = $event.target.value" required :type="show_confirm_pass ?'text' :'password'" ></ion-input>
                            <ion-icon color="primary" :icon="!show_confirm_pass ? eye : eyeOff" slot="end" @click="show_confirm_pass = !show_confirm_pass"></ion-icon>
                        </div>
                    </ion-item>
                    <ion-button color="primary" expand="block" class="ion-margin-top" @click="saveCredentials">Reset Password</ion-button>

                </ion-list>
            </ion-col>
        </ion-row>
    </ion-page>
</template>
<script>
import { caretBackOutline, pencil, person,eye,eyeOff} from 'ionicons/icons';
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonItem,IonLabel,IonList,IonInput} from '@ionic/vue';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonItem,IonLabel,IonList,IonInput
    },
    mounted() {
    },
    data: () => ({
        caretBackOutline, pencil, person,eye,eyeOff,
        show_pass: false,show_new_pass:false,show_confirm_pass:false,
        user : {
            previous_password : '',
            new_password : '',
            confirm_password : '',
        }
    }), 
    methods : {
        saveCredentials(){
            this.$axios.post(`${localStorage.getItem('user_type')}/v1/reset-password`,this.user).then(({data}) => {
                if(data.error) {
                    this.errorNotify(data.error)
                }
                else {
                    this.successNotify(data)
                    this.user = {
                        previous_password : '',
                        new_password : '',
                        confirm_password : '',
                    }
                }
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
ion-row:nth-child(1) {
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
}
ion-row:nth-child(1) ion-col:first-child ion-avatar {
    height: 150px;
    width: 150px;
    border: 3px solid var(--ion-color-primary)
}
ion-row:nth-child(1) ion-col:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user-name {
    padding-left: 20px;
}
</style>