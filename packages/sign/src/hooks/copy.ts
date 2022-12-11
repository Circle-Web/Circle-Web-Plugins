import Clipboard from 'clipboard';

export const copyText = (text: string) => {
   return new Promise<void>((resolve, reject) => {
        const clipboard = new Clipboard('.copy-btn', {
            text: () => text,
        });

        clipboard.on('success', () => {
            clipboard.destroy();
            resolve();
        });

        clipboard.on('error', (e) => {
            clipboard.destroy();
            reject(e.text);
        });
   })
}