<template>
  <ion-page>
    
     
    
      <ExploreContainer name="Class Details page" />

  </ion-page>
</template>

<script >
import { IonPage} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'ClassDetails',
  components: { ExploreContainer, IonPage }
}
</script>

<style scoped>
ion-header{
  }
ion-toolbar {
  height: 70px;
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}
</style>