<template>
  <ion-menu side="start" type="overlay" menu-id="teacher" content-id="main-content">
    <ion-header>
      <ion-toolbar>
          <ion-button @click="closeMenu" slot="start">
              <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        <ion-title>PROFILE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <div style="text-align:-webkit-center; padding: 0 15px">
            <div class="user-profile">
                <span> Click image to change</span>
              
            </div>
        </div>
    </ion-content>
  </ion-menu>
</template>
<script>
import {
  IonMenu,menuController
} from "@ionic/vue";
// import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { closeOutline,logOutOutline,createOutline,create } from 'ionicons/icons';

export default {
  components: {
    IonMenu,
  },
  data: () => ({
      closeOutline,
      logOutOutline,
      createOutline,
      create,
  }),
  methods:{
    closeMenu(){
      menuController.close('teacher');
    //   this.$router.push(url);
    },

  }
};
</script>
<style lang="scss" scoped>
    ion-toolbar {
        height: 25vh;
        --background: var(--ion-color-primary);
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }
</style>
