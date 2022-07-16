<template>
  <div v-if="loading">
    <div class="flex justify-center items-center m-auto">
      <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
        style="border-top-color: transparent;">
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-10 py-10">
    <div class="flex flex-row gap-20">
      <div class="flex flex-col gap-10">
        <div class="text-4xl accent-fg text-center font-bold">
          <h1>{{ news?.title }}</h1>
        </div>
        <div class="flex flex-row justify-start gap-10">
          <div class="mr-5">
            <img v-if="news?.thumbnail && NewsOverview.isFromDrive" :src="NewsOverview.imageURL"
              class=" object-cover h-[250px] w-[250px] rounded-2xl" alt="News Picture">
            <img v-else-if="news?.thumbnail && !NewsOverview.isFromDrive" :src="news.thumbnail"
              class="object-fill h-[250px] w-[250px] rounded-2xl" alt="News Picture">
            <img v-else src="../assets/newspaper.png" class="object-fill h-[250px] w-[250px] rounded-2xl"
              alt="News Picture">
          </div>
          <div class="w-1/2">
            <Markdown class="text-xl prose" :source="news?.shortText" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-5 py-20">
        <div>
          <h2 class="text-xl accent-fg font-semibold">Tags</h2>
          <div class="text-lg"> {{ news?.tags }}</div>
        </div>
        <div>
          <h2 class="text-xl accent-fg font-semibold">Date</h2>
          <div class="text-lg"> {{ news?.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { inject, onMounted, ref } from 'vue'
import Markdown from 'vue3-markdown-it'
import { News } from '@/lib/interfaces'
import { retrievePageData } from '@/lib/gsheets'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'
import NewsOverview from '@/views/NewsView.vue'

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })
const newsID: string | string[] = useRoute().params.id
const news = ref<News>()
const loading = ref<boolean>()
loading.value = true

function getNewsData (data: { News: unknown[] }): unknown[] {
  return data.News
}

onMounted(async () => {
  await retrievePageData('News', id, key).then(
    (newsSpreadsheetData) => {
      const newsData: News[] = getNewsData(newsSpreadsheetData as { News: unknown[] }) as News[]
      news.value = newsData.find((news) => {
        return news.id === newsID
      })
      loading.value = false
    }
  ).then(
    () => {
      setTheme(theme.value)
    }
  )
})
</script>

<style scoped>
@media (min-width: 768px) {
  #description {
    border-bottom: 2px solid #8c2d19;
  }
}

a {
  color: #111827;
  text-decoration: underline;
  font-weight: 500;
}
</style>
