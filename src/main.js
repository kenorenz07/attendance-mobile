import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from './axios';
import ToastNotify from './mixins/ToastNotify.vue';
import Moment from './mixins/Moment.vue';
import Abbreviation from './mixins/Abbreviation.vue';

import { 
  IonicVue,
  // createAnimation 
} from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */ 
import './theme/variables.css';
import './theme/core.css';

// const myAnimation = (baseEl, opts) => {
//   const { enteringEl, leavingEl } = opts;

//   const enteringPage = createAnimation('entering-page-animation')
//     .addElement(enteringEl)
//     .fromTo('opacity', 1, 0);

//   const leavingPage = createAnimation('leaving-page-animation')
//     .addElement(leavingEl)
//     .fromTo('opacity', 0, 1);

//   return createAnimation('root-transition')
//     .duration(500)
//     .addAnimation([enteringPage, leavingPage]);
// }


const app = createApp(App)
  .use(IonicVue, {
    // animated: true,
    // navAnimation: myAnimation
  })
  .use(router);
  
app.mixin(ToastNotify);
app.mixin(Moment);
app.mixin(Abbreviation);
app.config.globalProperties.$axios = axios;

router.isReady().then(() => {
  app.mount('#app');
});