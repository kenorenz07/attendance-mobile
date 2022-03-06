<template>
  <ion-menu side="start" type="overlay" menu-id="teacher" content-id="main-content">
    <ion-content scroll-y="false">
        <div class="header">
            <ion-row>
              <ion-col>
                <ion-avatar><ion-img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"></ion-img></ion-avatar>
              </ion-col>
              <ion-col>
                <h2>John Doe</h2>
                <p>Professor</p>
                <p>#1234567</p>
              </ion-col>
            </ion-row>
        </div>
        <div class="body">
          <ion-list>
            <ion-item @click="open()">
              <ion-icon slot="start" :icon="person" color='primary'></ion-icon>
              <ion-label>My Account</ion-label>
            </ion-item>
          </ion-list>
          <ion-button color="danger">Logout</ion-button>
        </div>
    </ion-content>
  </ion-menu>
</template>
<script>
import {
  IonMenu,menuController
} from "@ionic/vue";
// import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { closeOutline,logOutOutline,createOutline,create, person } from 'ionicons/icons';

export default {
  components: {
    IonMenu,
  },
  data: () => ({
      closeOutline,
      logOutOutline,
      createOutline,
      create,
      person
  }),
  methods:{
    open(){
      this.$router.push('/teacher/myaccount');
    },
    closeMenu(){
      menuController.close('teacher');
    //   this.$router.push(url);
    },

  }
};
</script>
<style lang="scss" scoped>
    .header {
      height: 25vh;
      background: var(--ion-color-primary);
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      //added
      padding: 25px 30px;
    }
    .header ion-row {
      justify-content: center;
      align-items: center;
    }
    .header h2,
    .header p {
      margin: 0;
      color: #fff;
      padding: 4px 0;
    }
    .header p:last-child {
      background: var(--ion-color-secondary);
      border-radius: 4px;
      text-align: center;
      width: 85%;
      padding: 9px 5px;
      margin-top: 5px;
    }
    //added
    ion-avatar {
      height: 100px;
      width: 100px;
      border: 3px solid white;
    }
    .body {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100%/1.38);
    }
    .body ion-list {
      margin-top: 15px;
    }
    .body ion-label {
      font-weight: 900;
    }
    .body ion-button {
      height: 45px;
      margin: 0 15px;
      text-transform: capitalize; 
    }
</style>
