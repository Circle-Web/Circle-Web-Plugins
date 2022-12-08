import {h, render} from "vue";
import type {Component} from 'vue'
import dialog from "./dialog-contructor.vue";

import type {AppContext, ComponentPublicInstance} from "vue";

const dialogInstance = new Map<
    ComponentPublicInstance, // marking doClose as function
    {
        resolve: (value: PromiseLike<undefined>) => void;
        reject: () => void;
    }
>();

const initInstance = (props: any, container: HTMLElement, appContext: AppContext | null = null) => {
    const vnode = h(dialog, props);
    vnode.appContext = appContext;
    render(vnode, container);
    document.body.appendChild(container.firstElementChild!);
    return vnode.component;
};

const genContainer = () => {
    return document.createElement("div");
};

const showDialog = (options: DialogProps, appContext?: AppContext | null) => {
    const container = genContainer();
    const instance = initInstance(options, container, appContext)!;
    const vm = instance.proxy as ComponentPublicInstance;
    options.onClose = () => {
        render(null, container);
        dialogInstance.delete(vm);
    };
    return vm;
};

interface DialogProps {
    title?: string;
    width?: string;
    showClose?: boolean;
    defaultSlot?: Component;
    footerSlot?: Component;
    wrapperProps?: Record<string, any>;
    onClose?: () => void;
}

export const MyDialog = (
    options: DialogProps = {},
    appContext: AppContext | null = null
): Promise<undefined> => {
    return new Promise((resolve, reject) => {
        const vm = showDialog(options, appContext ?? MyDialog._context)!;
        // collect this vm in order to handle upcoming events.
        dialogInstance.set(vm, {
            resolve,
            reject
        });
    });
};

MyDialog._context = null as any;

MyDialog.close = () => {
    dialogInstance.forEach((_, vm: any) => {
        vm.close();
    });
    dialogInstance.clear();
};

export default MyDialog;
