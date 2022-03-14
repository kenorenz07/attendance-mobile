<template>
    <ion-page class="pages">
         <ion-refresher slot="fixed" @ionRefresh="initialize($event)" >
            <ion-refresher-content 
                pullingIcon="arrow-down-outline" 
                pullingText="Pull to refresh" 
                refreshingSpinner="crescent"
                refreshingText="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
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
            <div v-if="!getting_notifications">
                <ion-item class="notification-list-item" :class="checkIfToday(notification.created_at) ? 'notification-not-read':'notification-read'"  v-for="notification in notifications" :key="notification.id">
                    <ion-label>
                            <ion-row class="ion-no-padding">
                                
                                <ion-col class="ion-no-padding"><ion-text :color="checkIfToday(notification.created_at) ? 'light':'primary'"><h2 class="subject-text subject-title" >{{notification.name}}</h2></ion-text></ion-col>
                                <ion-col class="ion-no-padding"><ion-text :color="checkIfToday(notification.created_at) ? 'light':'primary'"><p class="notification-created text-right">({{humanRead(notification.created_at)}})</p>  </ion-text></ion-col>
                                
                            </ion-row>
                            
                        <ion-text :color="checkIfToday(notification.created_at)? 'light':'dark'">
                            <h3 class="subject-text">{{notification.class_detail.subject.name}}</h3>
                            <p class="subject-sched">{{abbrDay(notification.class_detail.schedule.day)}} {{time_moment(notification.class_detail.schedule.time_start)}} to {{time_moment(notification.class_detail.schedule.time_end)}}</p>
                        </ion-text>
                    </ion-label>
                    <!-- <ion-text :color="checkIfToday(notification.created_at)? 'light':'dark'">
                        <p class="notification-created text-right">{{humanRead(notification.created_at)}}</p>
                    </ion-text> -->
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
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonSkeletonText,IonItem,IonList,IonRefresher,IonRefresherContent} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline,pencilOutline,trashOutline} from 'ionicons/icons';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonSkeletonText,IonItem,IonList,IonRefresher,IonRefresherContent
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
        initialize($event = null){
            this.getting_notifications = true
            this.$axios.get('teacher/v1/notifications').then(({data}) => {
                this.notifications = data
                this.getting_notifications = false

                if($event){
                    $event.target.complete();
                }
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
