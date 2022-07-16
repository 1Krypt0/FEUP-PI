<template>
  <div class="h-5/6 w-3/4 m-auto px-10 pt-10 lg:px-12">
    <div v-if="loading">
      <div class="flex justify-center items-center m-auto">
        <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
          style="border-top-color: transparent;">
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="accent-fg text-5xl font-extrabold text-center">
        Here is a bit of what we do
      </h1>
      <div class="flex flex-col gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-28 pt-28">
        <ProjectOverview v-for="project in data.data" :id="project.id" :key="project.name" :name="project.name"
          :short-description="project.shortDescription" :image-share-link="project.imageShareLink" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectOverview from '@/components/ProjectOverview.vue'
import { retrievePageData } from '@/lib/gsheets'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'
import { inject, onMounted, reactive, ref } from 'vue'

const loading = ref<boolean>()
loading.value = true

const data = reactive({
  data: [{ name: '', shortDescription: '', imageShareLink: '', id: 0 }]
})

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

function getProjectData (data: { Projects: unknown[] }): unknown[] {
  return data.Projects
}

onMounted(async () => {
  await retrievePageData('Projects', id, key).then(
    (spreadsheetData) => {
      data.data = getProjectData(spreadsheetData as { Projects: unknown[] }) as { name: string, shortDescription: string, imageShareLink: string, id: number }[]
      loading.value = false
    }
  ).then(() => {
    setTheme(theme.value)
  })
})
</script>
