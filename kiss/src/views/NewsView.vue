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
        News of the world
      </h1>
      <div class="flex flex-col gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-28 pt-28">
        <NewsOverview v-for="news in allNews" :id="news.id" :key="news.id" :title="news.title"
          :short-text="news.shortText" :thumbnail="news.thumbnail" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewsOverview from '@/components/NewsOverview.vue'
import { retrievePageData } from '@/lib/gsheets'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'
import { computed } from '@vue/reactivity'
import { inject, onMounted, reactive, ref } from 'vue'

const loading = ref<boolean>()
loading.value = true

const data = reactive({
  data: [{ title: '', shortText: '', thumbnail: '', id: 0 }]
})

// NOTE: For the news to show up in reverse insertion order,
// uncomment the .reverse() part
const allNews = computed(() => {
  return data.data // .reverse()
})

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

function getNewsData (data: { News: unknown[] }): unknown[] {
  return data.News
}

onMounted(async () => {
  await retrievePageData('News', id, key).then(
    (spreadsheetData) => {
      data.data = getNewsData(spreadsheetData as { News: unknown[] }) as { title: string, shortText: string, thumbnail: string, id: number }[]
      loading.value = false
    }
  ).then(
    () => {
      setTheme(theme.value)
    }
  )
})
</script>
