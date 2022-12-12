<script lang="ts" setup>
    import {
nextTick,
onBeforeUnmount,
onMounted,
        ref, shallowRef, watch
    } from 'vue';
    import * as monaco from 'monaco-editor'

    import {
        loadMonacoEnv
    } from './env'
    loadMonacoEnv()

    const props = withDefaults(defineProps < {
        modelValue: string
        language?: string
        theme?: string
    } > (), {
        modelValue: '',
        language: 'javascript',
        theme: 'vs-dark'
    })

    const emits = defineEmits([
        'update:modelValue',
        'save'
    ])

    const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()

    const containerRef = ref < HTMLElement > ()

    watch(() => props.modelValue, (value) => {
        if (editor.value?.getValue() !== value) {
            editor.value?.setValue(value)
        }
    })

    const handleChangeLanguage = (language: string) => {
        const model = monaco.editor.createModel(props.modelValue, language)
        editor.value?.setModel(model)
    }

    watch(() => props.language, handleChangeLanguage)

    onMounted(async () => {
        await nextTick()
        if (!containerRef.value ) {
            return
        }

        const model = monaco.editor.createModel(props.modelValue, props.language)
        editor.value = monaco.editor.create(containerRef.value, {
            model,
            theme: props.theme,
            automaticLayout: true,
            minimap: {
                enabled: false
            }
        })
        
        editor.value.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // 格式化代码
            editor.value?.getAction('editor.action.formatDocument').run()
            emits('update:modelValue', editor.value?.getValue() || '')
        })

        editor.value.onDidChangeModelContent((e) => {
            emits('update:modelValue', editor.value?.getValue() || '')
        })
    })

    onBeforeUnmount(() => {
        editor.value?.dispose()
    })

</script>

<template>
    <div class="ext__monaco-body" ref="containerRef"></div>
</template>

<style lang="scss">
.ext__monaco-body {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>