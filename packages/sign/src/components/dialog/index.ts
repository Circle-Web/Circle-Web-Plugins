import MyDialog from "./dialog";
import type {App, Plugin} from "vue";

const _MyDialog = MyDialog as Plugin & typeof MyDialog;

_MyDialog.install = (app: App) => {
    _MyDialog._context = app._context;
};

export default _MyDialog;
