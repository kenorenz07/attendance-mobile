<template>
  <ion-page>
      <ExploreContainer name="Tab 2 page" />
  </ion-page>
</template>

<script >
import { IonPage } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'Tab2',
  components: { ExploreContainer, IonPage }
}
</script>