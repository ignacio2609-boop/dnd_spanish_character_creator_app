import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import type { App } from 'vue';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import AutoComplete from 'primevue/autocomplete';
import DatePicker from 'primevue/datepicker';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import ToggleButton from 'primevue/togglebutton';
import Menubar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';
import Drawer from 'primevue/drawer';
import Panel from 'primevue/panel';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import ProgressBar from 'primevue/progressbar';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Fieldset from 'primevue/fieldset';
import Steps from 'primevue/steps';
import Tabs from 'primevue/tabs';
import TabPanel from 'primevue/tabpanel';
import FileUpload from 'primevue/fileupload';
import Skeleton from 'primevue/skeleton';

import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

export const primeVueConfig = (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });

  // Servicios
  app.use(ToastService);
  app.use(ConfirmationService);

  // Directivas
  app.directive('tooltip', Tooltip);
  app.directive('ripple', Ripple);

  // Componentes (registro global)
  // Se ha añadido el prefijo "P-" a los nombres de los componentes para evitar conflictos
  app.component('P-Button', Button);
  app.component('P-InputText', InputText);
  app.component('P-InputNumber', InputNumber);
  app.component('P-InputTextarea', Textarea);
  app.component('P-Select', Select);
  app.component('P-MultiSelect', MultiSelect);
  app.component('P-AutoComplete', AutoComplete);
  app.component('P-DatePicker', DatePicker);
  app.component('P-Checkbox', Checkbox);
  app.component('P-RadioButton', RadioButton);
  app.component('P-ToggleButton', ToggleButton);
  app.component('P-Menubar', Menubar);
  app.component('P-Toolbar', Toolbar);
  app.component('P-Drawer', Drawer);
  app.component('P-Panel', Panel);
  app.component('P-Card', Card);
  app.component('P-DataTable', DataTable);
  app.component('P-Column', Column);
  app.component('P-Paginator', Paginator);
  app.component('P-Dialog', Dialog);
  app.component('P-ConfirmDialog', ConfirmDialog);
  app.component('P-Toast', Toast);
  app.component('P-Badge', Badge);
  app.component('P-ProgressBar', ProgressBar);
  app.component('P-Avatar', Avatar);
  app.component('P-Chip', Chip);
  app.component('P-Fieldset', Fieldset);
  app.component('P-Steps', Steps);
  app.component('P-Tabs', Tabs);
  app.component('P-TabPanel', TabPanel);
  app.component('P-FileUpload', FileUpload);
  app.component('P-Skeleton', Skeleton);
};
