.<template>
  <ion-menu side="start" type="overlay" content-id="main-content" v-if="$store.getters.user.id">
    <ion-content scroll-y="false">
        <div class="header">
            <ion-row>
              <ion-col>
                <ion-avatar><ion-img :src="$store.getters.user.image_path ? $store.getters.user.image_path : '/assets/img/person-icon.png'"></ion-img></ion-avatar>
              </ion-col>
              <ion-col>
                <h3>{{$store.getters.user.display_name_mobile}}</h3>
                <p>{{user_type}}</p>
                <p>#{{$store.getters.user.id}}</p>
              </ion-col>
            </ion-row>
        </div>
        <div class="body">
          <ion-list>
            <ion-item @click="openMyAccount()">
              <ion-icon slot="start" :icon="person" color='primary'></ion-icon>
              <ion-label>My Account</ion-label>
            </ion-item>
            <ion-item @click="myClasses()">
              <ion-icon slot="start" :icon="bookmarks" color='primary'></ion-icon>
              <ion-label>My Classes</ion-label>
            </ion-item>
            <ion-item @click="resetPassword()">
                <ion-icon slot="start" :icon="eye" color='primary'></ion-icon>
                <ion-label>Reset Password</ion-label>
            </ion-item>
          </ion-list>
          <ion-button color="danger" @click="logout">Logout</ion-button>
        </div>
    </ion-content>
  </ion-menu>
</template>
<script>
import {
  IonMenu,IonContent,IonList,IonItem,IonIcon,IonLabel,IonButton,IonRow,IonCol,IonAvatar,IonImg, menuController
} from "@ionic/vue";
// import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { closeOutline,logOutOutline,createOutline,create, person,eye,bookmarks } from 'ionicons/icons';

export default {
  components: {
    IonMenu,IonContent,IonList,IonItem,IonIcon,IonLabel,IonButton,IonRow,IonCol,IonAvatar,IonImg, 
  },
  data: () => ({
      closeOutline,
      logOutOutline,
      createOutline,
      create,
      person,eye,bookmarks
      // user : this.$store.getters.user
  }),
  computed : {
    user_type () {
      return localStorage.getItem('user_type') == 'student' ? 'Student' : 'Teacher'
    }
  },
  methods:{
    openMyAccount(){
      this.$router.push(`/${localStorage.getItem('user_type')}/myaccount`);
      menuController.close();
    },
    myClasses(){
      this.$router.push(`/${localStorage.getItem('user_type')}/class-details`);
      menuController.close();
    },
    resetPassword(){
      this.$router.push(`/${localStorage.getItem('user_type')}/reset-password`);
      menuController.close();
    },
    closeMenu(){
      menuController.close();
    //   this.$router.push(url);
    },
    logout(){
      this.$axios.post(`${localStorage.getItem('user_type')}/v1/logout`).then(({data}) => {
        data
        menuController.close();
        this.$router.push('/login');
      })
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
    .header h3,
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
