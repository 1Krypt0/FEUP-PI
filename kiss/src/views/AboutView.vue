<template>
  <div class="text-center md:pt-14 pt-10">
    <div class="lg:bg-keyboard pt-8 bg-cover">
      <h1 class="accent-fg text-6xl font-extrabold ">We make things happen!</h1>
      <p class="accent-fg text-xl font-semibold pt-10 pb-14 px-4">Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Proin aliquet lacus lobortis vestibulum tellus</p>
    </div>
    <div class="about-text py-16 mx-[20%] accent-fg text-lg text-justify space-y-10">
      <p class="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, dictum dictum cursus arcu. Lectus eu
        eleifend gravida amet sagittis amet, vulputate. Id auctor ut eleifend ut nunc. Volutpat ullamcorper fames eget
        sit nunc convallis nec. Pellentesque nibh quisque viverra lectus non sit felis. Egestas lectus leo vitae cras.
        Arcu, scelerisque faucibus venenatis sagittis in quis pharetra justo semper. Rhoncus molestie sed sodales
        vivamus morbi morbi aliquet leo. Netus pharetra a, adipiscing est interdum orci curabitur posuere feugiat.</p>

      <p>Euismod aliquam lobortis sed hendrerit cursus aenean. Velit a, facilisis est integer platea venenatis sit
        dolor, ultrices. Amet arcu varius id sed lorem. Dapibus ipsum nec at rutrum volutpat ut diam. Mauris massa
        tempus eu, quis. Nunc nisl ac amet placerat ac nisi, facilisi adipiscing quisque. In morbi mi libero quisque
        imperdiet libero. Id sit tristique ante pellentesque feugiat. Ut sagittis proin amet nullam quisque pharetra
        ultrices. In ullamcorper nibh accumsan laoreet. Nisi, dolor, facilisis lacus lacus, sed nulla. Quis accumsan
        nisl, donec tempor nisl vitae pellentesque. Dictum orci, phasellus id nec ullamcorper. Quis sed hac amet eu
        integer amet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'
import { inject, onMounted } from 'vue'

// Cast the value to avoid being changed by the child class
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

onMounted(() => {
  setTheme(theme.value)
})
</script>
