<template>
  <div class="h-5/6 md:w-3/4 lg:w-2/4 2xl:w-1/3 m-auto px-10 lg:px-12">
    <div class=" text-center pt-10 md:pt-14">
      <h1 class="accent-fg text-5xl font-extrabold ">Welcome to GIG!</h1>
      <p class="accent-fg text-xl font-semibold py-14">Graphics, Interaction and Gaming Group at FEUP</p>
      <p class="accent-fg text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud. </p>
      <div class="flex-col flex md:flex-row items-center md:items-baseline md:justify-center my-2">
        <div class="pt-14">
          <router-link to="/projects" class="px-10 py-6 accent-bg text-white rounded-full ">Our Projects</router-link>
        </div>
        <div class="pt-14">
          <router-link to="/team" class="mx-14 text-black accent-b border-b-2 border-x-0">Meet the Team</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="py-28">
    <div v-if="loading">
      <div class="flex justify-center items-center m-auto">
        <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
          style="border-top-color: transparent;">
        </div>
      </div>
    </div>
    <div v-else>
      <p class="accent-fg text-5xl font-semibold py-14 text-center">Latest News</p>
      <div class="flex justify-center">
        <div class="w-3/4 flex flex-col gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-28 pt-28">
          <NewsOverview v-for="news in topThreeNews" :title="news.title" :short-text="news.shortText"
            :thumbnail="news.thumbnail" :id="news.id" :key="news.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewsOverview from '@/components/NewsOverview.vue'
import { retrievePageData } from '@/lib/gsheets'
import { computed } from '@vue/reactivity'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { inject, onMounted, reactive, ref } from 'vue'
import { setTheme } from '@/lib/themes'

const id = inject(configInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })
const key = inject(apiKeyInjectionKey) as string

const loading = ref<boolean>()
loading.value = true

const data = reactive({
  data: [{ title: '', shortText: '', thumbnail: '', id: 0 }]
})

function getNewsData (data: { News: unknown[] }): unknown[] {
  return data.News
}

const topThreeNews = computed(() => {
  const reversed = data.data.reverse()
  return reversed.slice(0, 3)
})

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
