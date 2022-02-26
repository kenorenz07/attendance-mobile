<template>
  <ion-page>
    <ion-header collapse="condense" class="ion-no-border" mode="ios">
      <ion-toolbar>
        <ion-button  slot="start" fill="clear" >
          <ion-avatar>
            <img src="https://www.simplelyst.com/_image-uploads/profile_photo-agents-agent-2-87173.jpg" />
          </ion-avatar>
        </ion-button>
        <ion-title>
          <ion-img class="logo-at" src="/assets/img/lenzy_logo_small.png"/>
        </ion-title>
        <ion-button  slot="end" fill="clear" class="notification-btn" @click="$router.push('/teacher/notifications')">
          <ion-icon size="large"  :icon="notifications"></ion-icon>
          <ion-badge slot="start" color="danger">2</ion-badge>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" force-overscroll="true">
    <ion-router-outlet ></ion-router-outlet>
      <!-- <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/teacher/class-details" layout="icon-top">
            <ion-icon :icon="book" />
            <ion-label>Class</ion-label>
          </ion-tab-button> -->
            
          <!-- <ion-tab-button tab="tab2" href="/teacher/tab2" layout="icon-top">
            <ion-icon class="notification-icon" :icon="ellipse" />
            <ion-label>Tab 2</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="tab3" href="/teacher/tab3" layout="icon-top">
            <ion-icon :icon="square" />
            <ion-label>Tab 3</ion-label>
          </ion-tab-button> -->
        <!-- </ion-tab-bar>
      </ion-tabs> -->
    </ion-content>
  </ion-page>
</template>

<script >
import { IonAvatar,IonButton,IonBadge,IonHeader,IonToolbar,IonContent, IonIcon, IonPage,IonImg,IonTitle, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, book,notifications } from 'ionicons/icons';

export default {
  components: { IonAvatar,IonButton,IonBadge,IonHeader,IonToolbar,IonContent,IonIcon, IonPage,IonImg,IonTitle, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      book,notifications
    }
  }
}
</script>
<style scoped lang="scss">
ion-tab-bar {
  bottom: 10px;
  position: relative;
  border-radius: 16px;
  width: 100%;
  margin: 0 auto;
}

ion-tab-button {
  --color: var(--ion-color-medium);
  --color-selected: var(--ion-color-primary);
}

ion-tab-button::before {
    background-color: transparent;
    display: block;
    content: "";
    margin: 0 auto;
    width: 80%;
    height: 2px;
}
ion-tab-button.tab-selected::before {
  background-color: var(--ion-color-primary);
}
.logo-at {
  width: 80px; 
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
}
/* .notification-icon {
  font-size
} */
.notification-btn {
  position: relative;

  ion-badge {
    position: absolute;
    top: 10px;
    z-index: 1;
    left: -5px;
    font-size: 10px;
    border-radius: 70%;
  }
}
</style>