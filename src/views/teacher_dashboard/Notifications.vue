<template>
    <ion-page class="pages">
        <ion-row class="notification-details">
            <ion-col size=12> 
                 <ion-button class="back-button" @click="$router.back()">
                    <ion-icon color="light" :icon="caretBackOutline"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col size=12>
                <h1 class="notification-title"><strong> Notifications </strong></h1>
            </ion-col>
        </ion-row>
        <ion-list>
            <div v-if="true">
                <ion-item class="notification-list-item" :class="class_detail% 2 ? 'notification-not-read':'notification-read'"  v-for="class_detail in 9" :key="class_detail">
                    <ion-label>
                        <ion-text :color="class_detail% 2 ? 'light':'primary'">
                            <h2 class="subject-text subject-title" >LATE</h2>
                        </ion-text>
                        <ion-text :color="class_detail% 2 ? 'light':'dark'">
                            <h3 class="subject-text">Differential Equations</h3>
                            <p class="subject-sched">Su 12:01 am to 01:30 am</p>
                        </ion-text>
                    </ion-label>
                </ion-item>
            </div>
            <div v-else>
                <ion-item class="notification-list-item notification-read" v-for="i in 7" :key="i">
                    <ion-label>
                        <h2 class="subject-text subject-title">
                        <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
                        </h2>
                        <h3 class="subject-text">
                        <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
                        </h3>
                        <p class="subject-sched"> 
                        <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
                        </p>
                    </ion-label>
                </ion-item>
            </div>
        </ion-list>
    </ion-page>
</template>

<script>
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonSkeletonText,IonItem,IonList} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline,pencilOutline,trashOutline} from 'ionicons/icons';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonSkeletonText,IonItem,IonList,
    },
    data : () => ({
        caretBackOutline,addCircleOutline,pencilOutline,trashOutline,
        notifications : {},
        getting_notifications : true,
        days : [],
        selected_day : '',
        select_options : {
            cssClass : 'select-option-filter'
        },
        attendances :[],
        getting_attendance :false,
        available_students : []
    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted () {
        this.initialize()
    },
    watch : {
    },
    methods : {
        initialize(){
            this.getting_notifications = true
            this.$axios.get('teacher/v1/notifications/').then(({data}) => {
                this.notifications = data
                this.getting_notifications = false
            })

        },


    }
}
</script>

<style scoped>
    .notification-details{
        margin-top :30px;
    }
    .notification-title {
        margin-top :15px;
        color : #120055;
    }
    .notification-list-item {
        --min-height :100px;
        --border-radius: 5px;
        margin-bottom: 10px;
    }
    .notification-not-read {
        --background: var(--ion-color-secondary);
        --border-color: var(--ion-color-secondary);
        --color : var(--ion-color-light);
    }

    .notification-read {
        --background: var(--ion-color-light);
        --border-color: var(--ion-color-light);
        --color : var(--ion-color-dark);
    }
    ion-list {
        height: 57vh;
        overflow: hidden;
        overflow-y: scroll;
    }

</style>
