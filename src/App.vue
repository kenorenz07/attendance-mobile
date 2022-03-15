<template>
  <ion-app>
    <Menu v-if="$store.getters.user.id"></Menu>
    
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    IonApp,Menu,
    IonRouterOutlet
  }
};
</script>
<style>
.toast-notify {
  color : #fff;
}
</style>