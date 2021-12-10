<template>
  <ion-page class="tab-pages">
        <ion-list>
          <ion-list-header class="tab-page-title ">
            <ion-text color="primary">
              <h1>Classes </h1>
            </ion-text>
          </ion-list-header>

          <ion-item color="primary" button v-for="i in 8" :key="i">
            <ion-button  disabled fill="clear" slot="end" color="light">
              <ion-icon size="large" :icon="people"></ion-icon>
              <ion-badge color="light">20</ion-badge>
            </ion-button>
            <ion-label>
              <h2>English</h2>
              <h3>Room CET100</h3>
              <p>Tuesday 10:00 am to 1,2: 00 pm</p>
            </ion-label>
          </ion-item>
        </ion-list>
  </ion-page>
</template>

<script >
import { IonPage,IonList,IonListHeader,IonItem,IonLabel,IonText,IonButton} from '@ionic/vue';
import { people } from 'ionicons/icons';

export default  {
  name: 'ClassDetails',
  components: { IonPage,IonList,IonListHeader,IonItem,IonLabel,IonText,IonButton },
  data : () => ({
    people
  }),
}
</script>

<style scoped>
ion-item{
  --border-radius: 15px;
  margin-bottom: 2px;
}
ion-toolbar {
  height: 70px;
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}
</style>